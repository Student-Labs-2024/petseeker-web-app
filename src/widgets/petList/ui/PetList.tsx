import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import * as petModel from "@entities/pet";
import { AutoSizer, Grid } from "react-virtualized";
import styles from "./card.module.scss";
import { match } from "ts-pattern";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/index";

export const PetList: React.FC = () => {
  const columnCount = 2;
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.pets.filters);
  const isOpenFilters = useAppSelector((state) => state.pets.openFilters);
  const isSearchOnFocus = useAppSelector((state) => state.pets.searchOnFocus);
  const favorites = useAppSelector((state) => state.pets.ids);
  const { data: favoriteIds = [] } = petModel.api.useGetFavoritesQuery();
  const [page, setPage] = useState(1);
  const [allPets, setAllPets] = useState<petModel.type.Pet[]>([]);
  const [rowHeight, setRowHeight] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);
  const petItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const params = { ...filters, page, page_size: 10 };
  const isShowList = !isSearchOnFocus && !isOpenFilters;
  const {
    data: pets,
    isLoading,
    isError,
    isFetching,
  } = petModel.api.useGetPetsQuery(params);

  useEffect(() => {
    if (favoriteIds.length > 0) {
      const ids = favoriteIds.map((i) => i.id);
      dispatch(petModel.slice.addFavorites(ids));
    }
  }, [favoriteIds]);

  useEffect(() => {
    if (pets?.results) {
      const newPets = pets.results;
      setAllPets((prevPets) => {
        const existingIds = new Set(prevPets.map((pet) => pet.id));
        const filteredNewPets = newPets.filter(
          (pet) => !existingIds.has(pet.id)
        );
        return [...prevPets, ...filteredNewPets];
      });
    }
  }, [pets]);

  const updateRowHeight = () => {
    const visibleItems = petItemRefs.current.filter(Boolean);
    const heights = visibleItems.map((ref) => ref?.offsetHeight || 0);
    if (heights.length > 0) {
      setRowHeight(Math.max(...heights));
    }
  };

  useLayoutEffect(() => {
    updateRowHeight();
  }, [allPets]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateRowHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const loadMoreItems = useCallback(() => {
    if (pets?.next !== null && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [pets, isFetching]);

  const cellRenderer = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const pet = allPets[index];
    if (!pet) return null;
    return (
      <div
        key={pet.id}
        style={style}
        className={styles.petItem}
        ref={(el) => (petItemRefs.current[index] = el)}
      >
        <petModel.PetCard
          key={pet.id}
          description={pet}
          isSaved={favorites.includes(pet.id)}
          isFavoritePage={false}
        />
      </div>
    );
  };

  const handleSectionRendered = ({ rowStopIndex }) => {
    if (rowStopIndex === Math.ceil(allPets.length / columnCount) - 1) {
      loadMoreItems();
    }
  };

  const gridStyle = {
    columnWidth: (width: number) => width / columnCount,
    rowHeight: rowHeight,
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {isShowList &&
        match({ isLoading, isError, pets })
          .with({ isLoading: true }, () => <div>Loading...</div>)
          .with({ isError: true }, () => <div>Error: </div>)
          .with({ pets: { length: 0 } }, () => <p>No pets available.</p>)
          .otherwise(() => (
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  className={styles.grid}
                  cellRenderer={cellRenderer}
                  columnCount={columnCount}
                  columnWidth={gridStyle.columnWidth(width)}
                  height={height}
                  rowCount={Math.ceil(allPets.length / columnCount)}
                  rowHeight={gridStyle.rowHeight}
                  width={width}
                  onSectionRendered={handleSectionRendered}
                />
              )}
            </AutoSizer>
          ))}
      {isFetching && (
        <div className={styles.isFetching}>Loading more pets...</div>
      )}
    </div>
  );
};

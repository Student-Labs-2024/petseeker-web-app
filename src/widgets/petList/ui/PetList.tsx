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
import { selectAllPets } from "@/entities/pet/model/slice";
import { petListConsts } from "@shared/constants";
import PetCell from "./PetCell";

export const PetList: React.FC = () => {
  const columnCount = petListConsts.columnCount;
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.pets.filters);
  const isOpenFilters = useAppSelector((state) => state.pets.openFilters);
  const isSearchOnFocus = useAppSelector((state) => state.pets.searchOnFocus);
  const favorites = useAppSelector((state) => state.pets.favorites.ids);
  const allPets = useAppSelector(selectAllPets);
  const { data: favoriteIds = [] } = petModel.api.useGetFavoritesQuery();
  const [page, setPage] = useState(petListConsts.initialPage);
  const [rowHeight, setRowHeight] = useState(petListConsts.initialRowHeight);
  const [hasMoreData, setHasMoreData] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const petItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const params = { ...filters, page, page_size: petListConsts.initialPage };
  const isShowList = !isSearchOnFocus && !isOpenFilters;
  const {
    data: pets,
    isLoading,
    isError,
    isFetching,
  } = petModel.api.useGetPetsQuery(params);

  useEffect(() => {
    if (favoriteIds.length > 0) {
      const favorites = favoriteIds.map((i) => ({ id: i.id }));
      dispatch(petModel.slice.addFavorites(favorites));
    }
  }, [favoriteIds]);

  useEffect(() => {
    if (pets?.results) {
      dispatch(petModel.slice.addPets(pets.results));
      if (!pets.next) {
        setHasMoreData(false);
      }
    }
  }, [pets, dispatch]);

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
    if (hasMoreData && !isFetching) {
      setPage((prevPage) => prevPage + petListConsts.nextPage);
    }
  }, [hasMoreData, isFetching]);

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
          .with({ pets: { results: [] } }, () => <p>No pets available.</p>)
          .otherwise(() => (
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  className={styles.grid}
                  cellRenderer={(props) => (
                    <PetCell
                      {...props}
                      allPets={allPets}
                      favorites={favorites}
                      petItemRefs={petItemRefs}
                    />
                  )}
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
      {isFetching && !isLoading && (
        <div className={styles.isFetching}>Loading more pets...</div>
      )}
    </div>
  );
};

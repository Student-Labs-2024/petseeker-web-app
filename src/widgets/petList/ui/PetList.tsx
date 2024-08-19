import React, { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import * as petModel from "@entities/pet";
import { AutoSizer, Grid } from "react-virtualized";
import styles from "./card.module.scss";
import { match } from "ts-pattern";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/index";

export const PetList: React.FC = () => {
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

  const params = { ...filters, page, page_size: 4 };
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
        const existingIds = new Set(prevPets.map(pet => pet.id));
        const filteredNewPets = newPets.filter(pet => !existingIds.has(pet.id));
        return [...prevPets, ...filteredNewPets];
      });
    }
  }, [pets]);

  const petItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateRowHeight = () => {
    const visibleItems = petItemRefs.current.filter(Boolean);
    const heights = visibleItems.map(ref => ref?.offsetHeight || 0);
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

  const isShowList = !isSearchOnFocus && !isOpenFilters;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 2 + columnIndex;
    const pet = allPets[index];

    if (!pet) return null;

    return (
      <div
        style={style}
        className={styles.petItem}
        ref={el => petItemRefs.current[index] = el}
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

  const gridStyle = {
    columnCount: 2,
    columnWidth: (width: number) => (width ) / 2,  
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
                  cellRenderer={Cell}
                  columnCount={gridStyle.columnCount}
                  columnWidth={gridStyle.columnWidth(width)}
                  height={height}
                  rowCount={Math.ceil(allPets.length / 2)}
                  rowHeight={gridStyle.rowHeight}
                  width={width}
                  onSectionRendered={({ rowStopIndex }) => {
                    if (rowStopIndex === Math.ceil(allPets.length / 2) - 1) {
                      loadMoreItems();
                    }
                  }}
                />
              )}
            </AutoSizer>
          ))}
      {isFetching && <div className={styles.isFetching}>Loading more pets...</div>}
    </div>
  );
};

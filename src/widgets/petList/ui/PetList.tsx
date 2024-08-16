import React, { useEffect } from "react";
import * as petModel from "@entities/pet";
import styles from "./card.module.scss";
import { match } from "ts-pattern";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/index";
export const PetList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.pets.filters);
  const isOpenFilters = useAppSelector((state) => state.pets.openFilters);
  const isSearchOnFocus = useAppSelector((state) => state.pets.searchOnFocus);
  const {
    data: pets,
    isLoading,
    isError,
  } = petModel.api.useGetPetsQuery(filters);
  const isShowList = !isSearchOnFocus && !isOpenFilters;
  const favorites = useAppSelector((state) => state.pets.ids);
  const { data: favoriteIds = [] } = petModel.api.useGetFavoritesQuery();

  useEffect(() => {
    if (favoriteIds.length > 0) {
      const ids = favoriteIds.map((i) => i.id);
      dispatch(petModel.slice.addFavorites(ids));
    }
  }, [favoriteIds]);
  return (
    <div className={styles.container}>
      <h1>{isOpenFilters}</h1>

      {isShowList &&
        match({ isLoading, isError, pets })
          .with({ isLoading: true }, () => <div>Loading...</div>)
          .with({ isError: true }, () => <div>Error: </div>)
          .with({ pets: { length: 0 } }, () => <p>No pets available.</p>)
          .otherwise(() => (
            <div className={styles.card__list_container}>
              {pets?.results?.map((pet: petModel.type.Pet) => (
                <petModel.PetCard
                  key={pet.id}
                  description={pet}
                  isSaved={favorites.includes(pet.id)}
                  isFavoritePage={false}
                />
              ))}
            </div>
          ))}
    </div>
  );
};

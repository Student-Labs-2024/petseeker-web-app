import React, { useEffect } from "react";
import { petModel, PetCard } from "@entities/pet";
import styles from "./favorite.module.scss";
import { match } from "ts-pattern";
import { Text } from "@shared/ui/text";
import { ReactComponent as Back } from "@shared/assets/back_arrow_icon.svg";
import { useAppSelector } from "@/shared/hooks/index";
import { ReactComponent as SortIcon } from "@shared/assets/sort_icon.svg";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "@/app/router/consts";
import { FilterPetType } from "@/features/pet/filterPetType";
export const FavoriteList: React.FC = () => {
  const navigate = useNavigate();
  const filters = useAppSelector((state) => state.pets.favorites.filters);
  const {
    data: pets,
    isLoading,
    isError,
  } = petModel.useGetFavoritesQuery(filters);

  const handleBack = () => {
    navigate(MAIN_ROUTE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form__top}>
        <button onClick={handleBack} className={styles.form__back}>
          <Back />
        </button>
        <div className={styles.text_center}>
          <Text myClass="bold_medium_big">Избранное</Text>
        </div>
      </div>
      <FilterPetType></FilterPetType>
      <div className={styles.sort}>
        <SortIcon />

        <Text myClass="medium">сначала недавние</Text>
      </div>
      {match({ isLoading, isError, pets })
        .with({ isLoading: true }, () => <div>Loading...</div>)
        .with({ isError: true }, () => <div>Error: </div>)
        .with({ pets: { length: 0 } }, () => <p>No favorites available.</p>)
        .otherwise(() => (
          <div className={styles.card__list_container}>
            {pets?.map((pet: petModel.Pet) => (
              <PetCard
                key={pet.id}
                description={pet}
                isSaved={true}
                isFavoritePage={true}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

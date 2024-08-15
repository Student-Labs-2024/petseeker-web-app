import React from "react";
import * as petModel from "@entities/pet";
import styles from "./favorite.module.scss";
import { match } from "ts-pattern";
import { Text } from "@shared/ui/text";

import { ReactComponent as Back } from "@shared/assets/back_arrow_icon.svg";
import { useAppSelector } from "@/shared/hooks/index";
import { ReactComponent as SortIcon } from "@shared/assets/sort_icon.svg";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "@/app/router/consts";
import { Button } from "@/shared/ui/button";

export const FavoriteList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: pets,
    isLoading,
    isError,
  } = petModel.api.useGetFavoritesQuery();
  console.log(pets);
  const handleBack = () => {
    navigate(MAIN_ROUTE);
  };
  const favorites = useAppSelector((state) => state.pets.ids);
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
      <div className={styles.filter_list}>
        <Button isSmall={true}>Все</Button>
        <Button isDefault={true} isSmall={true}>
          Кошки
        </Button>
        <Button isDefault={true} isSmall={true}>
          Собаки
        </Button>
      </div>

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
            {pets?.map((pet: petModel.type.Pet) => (
              <petModel.PetCard
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

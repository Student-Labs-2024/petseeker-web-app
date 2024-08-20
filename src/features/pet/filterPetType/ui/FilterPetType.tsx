import React from "react";
import styles from "./filterPetType.module.scss";
import { ReactComponent as CircleIcon } from "@shared/assets/circle.svg";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Button } from "@/shared/ui/button";
import { petModel } from "@entities/pet/index";
import { buttonsData } from "@shared/constants/filterPetsConsts";
export const FilterPetType: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.pets.favoriteFilters);
  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    dispatch(petModel.setFavoriteFilters({ [target.name]: target.value }));
  };

  return (
    <div className={styles.filter_list}>
      <Button
        isDefault={!(filters.pet_type === "")}
        name="pet_type"
        value=""
        onClick={handleFilter}
        isSmall={true}
      >
        Все
      </Button>
      <Button
        name="pet_type"
        value="Кошка"
        onClick={handleFilter}
        isDefault={!(filters.pet_type === "Кошка")}
        isSmall={true}
      >
        Кошки
      </Button>
      <Button
        name="pet_type"
        value="Собака"
        onClick={handleFilter}
        isDefault={!(filters.pet_type === "Собака")}
        isSmall={true}
      >
        Собаки
      </Button>
    </div>
  );
};

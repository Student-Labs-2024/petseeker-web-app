import React from "react";
import styles from "./filterPets.module.scss";
import { ReactComponent as CircleIcon } from "../../../../shared/assets/circle.svg";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import { setActiveButton } from "../../../../entities/pet/index";
import { buttonsData } from "../../../../shared/constants/filterPetsConsts";
export const FilterPets: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeButton = useAppSelector((state) => state.pets.activeButton);

  const handleClick = (
    id: string
  ) => {

    dispatch(setActiveButton(id));
  };
  return (
    <div className={styles.filter__list}>
      {buttonsData.map(({ id, label }) =>  {
        return (
          <button
            key={id}
            
            className={
              activeButton === id
                ? styles.filter__item_active
                : styles.filter__item
            }
            onClick={()=>handleClick(id)}
          >
            <CircleIcon className={styles.filter__item_icon}></CircleIcon>
            <span className={styles.text}>{label}</span>
          </button>
        )
      })}
    </div>
  );
};

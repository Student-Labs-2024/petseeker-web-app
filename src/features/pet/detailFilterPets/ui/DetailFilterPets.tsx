import React, { useEffect, useState } from "react";
import * as petModel from "@entities/pet/index";
import { Button } from "@shared/ui/button";
import styles from "./detailFilterPets.module.scss";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import { ReactComponent as Close } from "@shared/assets/close_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { pluralize } from "numeralize-ru";
export const DetailFilterPets: React.FC = () => {
  const [announcementWord, setAnnouncementWord] = useState({
    one: "объявление",
    two: "объявления",
    five: "объявлений",
  });

  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    pet_type: "",
    male: "",
  });

  const [trigger, { data: animals, isFetching }] =
    petModel.api.useLazyGetPetsQuery();

  useEffect(() => {
    trigger(filters);
  }, []);

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    setFilters((prevState) => {
      const newState = { ...prevState, [target.name]: target.value };
      trigger(newState);
      return newState;
    });
  };

  const handleCloseFilters = () => {
    dispatch(petModel.slice.setOpenFilters(false));
  };

  const handleResetFilters = () => {
    setFilters(() => {
      const newState = {
        pet_type: "",
        male: "",
      };
      trigger(newState);
      return newState;
    });
  };

  const getDeclinedAnnouncementWord = (number: number) => {
    return pluralize(
      number,
      announcementWord.one,
      announcementWord.two,
      announcementWord.five
    );
  };

  return (
    <div className={styles.filter__container}>
      <div className={styles.filter}>
        <div className={styles.filter__top}>
          <button onClick={handleCloseFilters} className={styles.filter__close}>
            <Close></Close>
          </button>
          <Text color="dark" myClass="subtitle_slim">
            Фильтры
          </Text>
          <button onClick={handleResetFilters} className={styles.filter__reset}>
            <Text color="btn" myClass="medium">
              Сбросить
            </Text>
          </button>
        </div>

        <div className={styles.filter__list}>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Вид
            </Text>
            <div className={styles.filter__buttons}>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"cat" !== filters.pet_type}
                  name="pet_type"
                  value="cat"
                  onClick={handleFilter}
                >
                  Кошка
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"dog" !== filters.pet_type}
                  name="pet_type"
                  value="dog"
                  onClick={handleFilter}
                >
                  Собака
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Пол
            </Text>
            <div className={styles.filter__buttons}>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Мужской
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Женский
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Возраст
            </Text>
            <div className={styles.filter__buttons}>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Маленький
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Молодой
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Взрослый
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Старый
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Здоровье
            </Text>
            <div className={styles.filter__buttons}>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Стерелизация
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Прививки
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Характер
            </Text>
            <div className={styles.filter__buttons}>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Активный
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Спокойный
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Добрый
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Независимый
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.search__btn}>
            <Button onClick={handleCloseFilters}>
              {" "}
              Показать {animals?.count}{" "}
              {getDeclinedAnnouncementWord(animals?.count)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

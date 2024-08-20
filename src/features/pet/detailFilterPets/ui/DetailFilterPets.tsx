import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks"; // Хуки для работы с Redux
import { petModel } from "@entities/pet/index";
import { Button } from "@shared/ui/button";
import styles from "./detailFilterPets.module.scss";
import { Text } from "@shared/ui/text";
import { ReactComponent as Close } from "@shared/assets/close_icon.svg";
import { pluralize } from "numeralize-ru";

export const DetailFilterPets: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.pets.filters);

  const { data: animals } = petModel.useGetPetsQuery(filters);

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    dispatch(petModel.setFilters({ [target.name]: target.value }));
  };

  const handleCloseFilters = () => {
    dispatch(petModel.setOpenFilters(false));
  };

  const handleResetFilters = () => {
    dispatch(petModel.resetFilters());
  };

  const getDeclinedAnnouncementWord = (number: number) => {
    return pluralize(number, "объявление", "объявления", "объявлений");
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
            <Text color="btn_color" myClass="medium">
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
                  name="age"
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
                  name="age"
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
                  name="age"
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
                  name="age"
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
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Здоровый
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
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Нуждается в лечении
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Тип шерсти
            </Text>
            <div className={styles.filter__buttons}>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"female" !== filters.male}
                  name="male"
                  value="female"
                  onClick={handleFilter}
                >
                  Длинная
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
                  Короткая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Пушистая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Жесткая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"male" !== filters.male}
                  name="male"
                  value="male"
                  onClick={handleFilter}
                >
                  Бесшерстная
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.filter__item}>
            <Text myClass="label" color="gray">
              Алергенность
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
                  Есть
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
                  Нет
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

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks"; // Хуки для работы с Redux
import { petModel } from "@entities/pet/index";
import { Button } from "@shared/ui/button";
import styles from "./detailFilterPets.module.scss";
import { Text } from "@shared/ui/text";
import { ReactComponent as Close } from "@shared/assets/close_icon.svg";
import { pluralize } from "numeralize-ru";

export const DetailFilterPets: React.FC = () => {
  const filters = useAppSelector((state) => state.pets.filters);
  const [filtersToggle, setFiltersToggle] = useState({
    vaccinations: false,
    sterilization: false,
  });
  const dispatch = useAppDispatch();
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

  const handleToggleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    setFiltersToggle((prevFilters) => ({
      ...prevFilters,
      [target.name]: !prevFilters[target.name],
    }));
    dispatch(petModel.setFilters({ [target.name]: [target.value] }));
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
                  isDefault={"Кошка" !== filters.pet_type}
                  name="pet_type"
                  value="Кошка"
                  onClick={handleFilter}
                >
                  Кошка
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"Собака" !== filters.pet_type}
                  name="pet_type"
                  value="Собака"
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
                  isDefault={"1" !== filters.age}
                  name="age"
                  value="1"
                  onClick={handleFilter}
                >
                  Маленький
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"5" !== filters.age}
                  name="age"
                  value="5"
                  onClick={handleFilter}
                >
                  Молодой
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"7" !== filters.age}
                  name="age"
                  value="7"
                  onClick={handleFilter}
                >
                  Взрослый
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"9" !== filters.age}
                  name="age"
                  value="9"
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
                  isDefault={"true" !== filters.health_issues}
                  name="health_issues"
                  value="true"
                  onClick={handleFilter}
                >
                  Здоровый
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={!filtersToggle.vaccinations}
                  name="vaccinations"
                  value={filtersToggle.vaccinations}
                  onClick={handleToggleFilter}
                >
                  Прививки
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={!filtersToggle.sterilization}
                  name="sterilization"
                  value={filtersToggle.sterilization}
                  onClick={handleToggleFilter}
                >
                  Стерелизация
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"false" !== filters.health_issues}
                  name="health_issues"
                  value="false"
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
                  isDefault={"Длинная" !== filters.wool_type}
                  name="wool_type"
                  value="Длинная"
                  onClick={handleFilter}
                >
                  Длинная
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"Короткая" !== filters.wool_type}
                  name="wool_type"
                  value="Короткая"
                  onClick={handleFilter}
                >
                  Короткая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"Пушистая" !== filters.wool_type}
                  name="wool_type"
                  value="Пушистая"
                  onClick={handleFilter}
                >
                  Пушистая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"Жесткая" !== filters.wool_type}
                  name="wool_type"
                  value="Жесткая"
                  onClick={handleFilter}
                >
                  Жесткая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"Бесшерстная" !== filters.wool_type}
                  name="wool_type"
                  value="Бесшерстная"
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
                  isDefault={"true" !== filters.allergenicity}
                  name="allergenicity"
                  value="true"
                  onClick={handleFilter}
                >
                  Есть
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={"false" !== filters.allergenicity}
                  name="allergenicity"
                  value="false"
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

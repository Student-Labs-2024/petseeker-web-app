import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks"; // Хуки для работы с Redux
import { petModel } from "@entities/pet/index";
import { Button } from "@shared/ui/button";
import styles from "./detailFilterPets.module.scss";
import { Text } from "@shared/ui/text";
import { ReactComponent as Close } from "@shared/assets/close_icon.svg";
import { pluralize } from "numeralize-ru";

export const DetailFilterPets: React.FC = () => {
  const { values, age, woolType, petType } = useAppSelector(
    (state) => state.pets.announcements
  );

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
    setFiltersToggle({
      vaccinations: false,
      sterilization: false,
    });
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
  const getIsDefault = (type: string, filterType: string) => {
    return type !== filterType;
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
                  isDefault={getIsDefault(petType.cat, filters.pet_type)}
                  name="pet_type"
                  value={petType.cat}
                  onClick={handleFilter}
                >
                  Кошка
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(petType.dog, filters.pet_type)}
                  name="pet_type"
                  value={petType.dog}
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
                  isDefault={getIsDefault(filters.gender, "true")}
                  name="gender"
                  value={true}
                  onClick={handleFilter}
                >
                  Мужской
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(filters.gender, "false")}
                  name="gender"
                  value={false}
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
                  isDefault={getIsDefault(age.small, filters.age)}
                  name="age"
                  value={age.small}
                  onClick={handleFilter}
                >
                  Маленький
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(age.young, filters.age)}
                  name="age"
                  value={age.young}
                  onClick={handleFilter}
                >
                  Молодой
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(age.adult, filters.age)}
                  name="age"
                  value={age.adult}
                  onClick={handleFilter}
                >
                  Взрослый
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(age.old, filters.age)}
                  name="age"
                  value={age.old}
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
                  isDefault={getIsDefault(filters.health_issues, "true")}
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
                  isDefault={getIsDefault(filters.health_issues, "false")}
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
                  isDefault={getIsDefault(woolType.long, filters.wool_type)}
                  name="wool_type"
                  value={woolType.long}
                  onClick={handleFilter}
                >
                  Длинная
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(woolType.short, filters.wool_type)}
                  name="wool_type"
                  value={woolType.short}
                  onClick={handleFilter}
                >
                  Короткая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(woolType.fluffy, filters.wool_type)}
                  name="wool_type"
                  value={woolType.fluffy}
                  onClick={handleFilter}
                >
                  Пушистая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(woolType.tough, filters.wool_type)}
                  name="wool_type"
                  value={woolType.tough}
                  onClick={handleFilter}
                >
                  Жесткая
                </Button>
              </div>
              <div className={styles.filter__button}>
                <Button
                  isSmall={true}
                  isDefault={getIsDefault(woolType.hairless, filters.wool_type)}
                  name="wool_type"
                  value={woolType.hairless}
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
                  isDefault={getIsDefault(filters.allergenicity, "true")}
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
                  isDefault={getIsDefault(filters.allergenicity, "false")}
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

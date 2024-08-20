import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { petModel } from "@entities/pet/index";

import { Text } from "@shared/ui/text";

import styles from "./searchPet.module.scss";
import { useTranslation } from "react-i18next";
import { DetailFilterPets } from "@/features/pet/detailFilterPets";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import classNames from "classnames";
type FormValues = {
  pet_type: string;
};

export const SearchPet: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSearchOnFocus = useAppSelector((state) => state.pets.searchOnFocus);
  const isOpenFilters = useAppSelector((state) => state.pets.openFilters);
  const { t } = useTranslation("search");
  const { control, handleSubmit, reset, getValues, setValue, watch, trigger } =
    useForm<FormValues>({
      defaultValues: {
        pet_type: "",
      },
    });
  const petTypeData = watch("pet_type");
  const history = useAppSelector((state) => state.pets.historySearch);
  const filters = useAppSelector((state) => state.pets.filters);
  petModel.useGetPetsQuery(filters);
  const searchValue = getValues("pet_type");

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("historySearch") || "[]"
    );
    dispatch(petModel.loadHistoryFromStorage(savedHistory));
  }, []);
  const handleOpenFilters = () => {
    dispatch(petModel.setOpenFilters(true));
  };

  const onSubmit = (data: FormValues) => {
    dispatch(petModel.setFilters({ pet_type: data.pet_type }));
    dispatch(petModel.setHistorySearch(data.pet_type));

    dispatch(petModel.setSearchOnFocus(false));
  };

  const handleFocus = () => {
    dispatch(petModel.setSearchOnFocus(true));
  };

  const handleResetSearch = () => {
    dispatch(petModel.setSearchOnFocus(false));
    reset({ pet_type: "" });
    dispatch(petModel.setFilters({ pet_type: "" }));
  };
  const filteredHistory = history.filter((option) =>
    option?.toLowerCase().includes(searchValue?.toLowerCase())
  );

  const handleOptionClick = async (option: string) => {
    setValue("pet_type", option);
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };
  const modalStyle = classNames(styles.modal, {
    [styles.modal__active]: isSearchOnFocus,
  });
  return (
    <>
      <div className={modalStyle}>
        <div className={styles.search}>
          <form
            className={styles.search_container}
            onSubmit={handleSubmit(onSubmit)}
          >
            <button type="submit" className={styles.search_btn}></button>
            <Controller
              name="pet_type"
              control={control}
              render={({ field }) => (
                <input
                  placeholder={
                    isSearchOnFocus ? t("placeholder-focus") : t("placeholder")
                  }
                  className={styles.search_input}
                  {...field}
                  onFocus={handleFocus}
                />
              )}
            />
            {!isSearchOnFocus && (
              <button
                type="button"
                onClick={handleOpenFilters}
                className={styles.search_filter}
              ></button>
            )}
          </form>
          {isSearchOnFocus && (
            <>
              <button
                onClick={handleResetSearch}
                className={styles.search_discard}
              >
                <Text myClass="medium" color="btn_color">
                  Отменить
                </Text>
              </button>
            </>
          )}
        </div>
        {isSearchOnFocus && (
          <div className={styles.option__list}>
            {filteredHistory?.map((option) => (
              <button
                key={option}
                className={classNames(styles.option, {
                  [styles.active]: searchValue === option,
                })}
                onClick={() => handleOptionClick(option)}
              >
                <Text color="dark" myClass="medium_big">
                  {" "}
                  {option}
                </Text>
              </button>
            ))}
          </div>
        )}
      </div>
      {isOpenFilters && <DetailFilterPets></DetailFilterPets>}
    </>
  );
};

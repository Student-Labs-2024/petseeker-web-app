import React, { ChangeEvent, useState } from "react";
import * as petModel from "@entities/pet/index";
import { Input } from "@/shared/ui/input";
import { Button } from "@shared/ui/button";
import searchIcon from "@shared/assets/search_icon.svg";
import styles from "./searchPet.module.scss";
import { useTranslation } from "react-i18next";
import { DetailFilterPets } from "@/features/pet/detailFilterPets";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
export const SearchPet: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpenFilters = useAppSelector((state) => state.pets.openFilters);
  const [placeholder, setPlaceholder] = useState("Введите текст");
  const { t } = useTranslation("search");
  const [name, setName] = useState("");

  const [searchParams, setSearchParams] = useState<{
    pet_type?: string;
  }>({});

  petModel.api.useGetPetsQuery(searchParams);

  const handleOpenFilters = () => {
    dispatch(petModel.slice.setOpenFilters(true));
  };
  const handleSearch = () => {
    setSearchParams({
      pet_type: name || undefined,
    });
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder(t("placeholder-focus"));
  };

  const handleBlur = () => {
    setPlaceholder(t("placeholder"));
  };

  return (
    <>
      <div className={styles.search_container}>
        <button onClick={handleSearch} className={styles.search_btn}></button>
        <input
          placeholder={placeholder}
          className={styles.search_input}
          value={name}
          onChange={handleChangeName}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          onClick={handleOpenFilters}
          className={styles.search_filter}
        ></button>
      </div>
      {isOpenFilters && <DetailFilterPets></DetailFilterPets>}
    </>
  );
};

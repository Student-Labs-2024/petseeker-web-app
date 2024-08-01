import React, { ChangeEvent, useState } from "react";
import * as petModel from "@entities/pet/index";
import { Input } from "@/shared/ui/input";
import { Button } from "@shared/ui/button";
import searchIcon from "@shared/assets/search_icon.svg";
import styles from "./searchPet.module.scss";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
export const SearchPet: React.FC = () => {
  const handleSearch = () => {};

  return (
    <div className={styles.filter}>
      <div className="filter__top">
        <button className={styles.filter__close}></button>
        <Text>Фильтры</Text>
        <button className={styles.filter__reset}></button>
      </div>

      <div className="filter__list">
        <div className="filter__item">
          <Text></Text>
          <input type="checkbox" className="filter__item_buttons"></input>
        </div>
      </div>

      <button onClick={handleSearch} className={styles.filter_search}></button>
    </div>
  );
};

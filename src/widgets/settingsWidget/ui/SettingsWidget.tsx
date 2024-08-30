import React, { useState } from "react";
import { userModel } from "@entities/user";
import styles from "./SettingsWidget.module.scss";
import { match } from "ts-pattern";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";
import { ReactComponent as LightThemeIcon } from "@shared/assets/settings_light_theme.svg";
import { ReactComponent as DarkThemeIcon } from "@shared/assets/settings_dark_theme.svg";
import { Button } from "@shared/ui/button";
import { NavLink } from "react-router-dom";
import { PROFILE } from "@/app/router/consts";
import { Radio } from "@/shared/ui/radio";
import { useTheme } from "@shared/hooks/useTheme";
import { Input } from "@shared/ui/input";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Toggle } from "@/shared/ui/toggle";
import { useAppDispatch } from "@/shared/hooks";
import { petModel } from "@entities/pet/index";
import { useNavigate } from "react-router-dom";
export const SettingsWidget: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, register, getValues, setValue, watch, reset } =
    useForm({});
  const cityValue = watch("city");
  const options = ["Омск", "Москва", "Новосибирск"];
  const handleOpenModal = () => {
    if (options.includes(cityValue)) {
      setIsOpenModal(false);
    } else {
      setIsOpenModal(true);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(getValues("city")?.toLowerCase())
  );
  const handleOptionClick = (option: string) => {
    setValue("city", option);
    setIsOpenModal(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredOptions[0].length) {
      e.preventDefault();

      handleOptionClick(filteredOptions[0]);
    }
  };
  const handleBlur = (value: string) => {
    if (!options.includes(value)) {
      setValue("city", "");
    }
  };
  const isDarkTheme = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const defaultTheme = isDarkTheme ? "dark" : "light";
  const handleChangeTheme = (
    isDefaultTheme: boolean,
    value: string = defaultTheme
  ) => {
    if (isDefaultTheme || getValues("theme_default")) {
      if (!getValues("theme_default") && getValues("theme") !== undefined) {
        setTheme(getValues("theme"));
      } else {
        setTheme(defaultTheme);
      }
    } else {
      setTheme(value);
    }
  };
  const handleCleanSearchHistory = () => {
    localStorage.removeItem("historySearch");
    dispatch(petModel.loadHistoryFromStorage([]));
  };

  const handleNavigateProfile = () => {
    navigate(PROFILE);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.settings__top}>
        <div className={styles.settings__text_center}>
          <Text myClass="btn">Настройки </Text>
        </div>
        <button
          onClick={handleNavigateProfile}
          className={styles.settings__ready}
        >
          <Text myClass="btn" color="btn_color">
            Готово{" "}
          </Text>
        </button>
      </div>
      <div className={styles.settings__region}>
        <Label>
          <Text myClass="btn">Регион для поиска</Text>
          <div className={styles.modal__input}>
            <Input
              onFocus={handleOpenModal}
              onKeyDown={handleInputKeyDown}
              placeholder="Искать"
              myClass="form_input"
              register={register("city", {
                required: true,
                validate: (value) => options.includes(value) || "",
                onBlur: (e) => handleBlur(e.target.value),
              })}
            />{" "}
          </div>
        </Label>
        {isOpenModal && (
          <div className={styles.option__list}>
            {filteredOptions.map((option) => (
              <button
                key={option}
                className={classNames(styles.option, {
                  [styles.active]: cityValue === option,
                })}
                onClick={() => handleOptionClick(option)}
              >
                <Text color="dark" myClass="btn">
                  {" "}
                  {option}
                </Text>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={handleCleanSearchHistory}
          className={styles.settings__region_clean}
        >
          <Text color="btn_color" myClass="btn">
            {" "}
            Очистить историю поиска
          </Text>
        </button>
      </div>
      <div className={styles.settings__theme_default}>
        <Text myClass="btn">Оформление</Text>
        <Label>
          <div className={styles.settings__theme_phone}>
            <Text myClass="btn">Тема, как на телефоне</Text>
            <Toggle
              onChange={() => handleChangeTheme(true)}
              name="theme_default"
              control={control}
              value={"true"}
            />
          </div>
        </Label>
      </div>
      <div className={styles.settings__styles}>
        <Label>
          <div className={styles.settings__theme}>
            <div className={styles.settings__theme_content}>
              <LightThemeIcon className={styles.settings__theme_icon} />
              <Text myClass="btn">Светлая тема</Text>
            </div>
            <Radio
              onChange={() => handleChangeTheme(false, "light")}
              name="theme"
              control={control}
              value={"light"}
            ></Radio>
          </div>
        </Label>
        <Label>
          <div className={styles.settings__theme}>
            <div className={styles.settings__theme_content}>
              <DarkThemeIcon className={styles.settings__theme_icon} />
              <Text myClass="btn">Темная тема</Text>
            </div>
            <Radio
              onChange={() => handleChangeTheme(false, "dark")}
              name="theme"
              control={control}
              value={"dark"}
            ></Radio>
          </div>
        </Label>
      </div>
    </div>
  );
};

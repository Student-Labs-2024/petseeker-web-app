import React, { useEffect, useState } from "react";
import { petModel } from "@entities/pet";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import { Label } from "@shared/ui/label";
import { Radio } from "@shared/ui/radio";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";
import { Toggle } from "@/shared/ui/toggle";
import { InfoFormProps } from "../model/type";
export const CharacteristicForm3: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  control,
  register,
  errors,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Характеристики</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Text myClass="btn">Алергенность</Text>

          <label className={styles.form__label_toggle}>
            <Text myClass="medium_big" color="gray">
              Наличие аллергена
            </Text>
            <Toggle
              name="allergenicity"
              control={control}
              value={"true"}
            ></Toggle>
          </label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="btn">Тип шерсти</Text>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.hairless}
            ></Radio>{" "}
            <Text myClass="medium_big">Бесшерстная</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.fluffy}
            ></Radio>{" "}
            <Text myClass="medium_big">Пушистая</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.tough}
            ></Radio>
            <Text myClass="medium_big">Жесткая</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.long}
            ></Radio>{" "}
            <Text myClass="medium_big">Длинная</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.short}
            ></Radio>{" "}
            <Text myClass="medium_big">Короткая</Text>
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

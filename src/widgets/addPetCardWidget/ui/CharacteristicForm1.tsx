import React, { useEffect, useState } from "react";
import * as petModel from "@entities/pet/index";
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
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";
import { InfoFormProps } from "../model/type";
import dogSmall from "@shared/assets/dog_small.svg";
import dogMedium from "@shared/assets/dog_medium.svg";
import dogFat from "@shared/assets/dog_fat.svg";
import catSmall from "@shared/assets/cat_small.svg";
import catMedium from "@shared/assets/cat_medium.svg";
import catFat from "@shared/assets/cat_fat.svg";
export const CharacteristicForm1: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  control,
  register,
  getValues,
  errors,
  t,
}) => {
  const dispatch = useAppDispatch();
  const isCatType = getValues("pet_type") === "Кошка";
  const smallAnimalImage = isCatType ? catSmall : dogSmall;
  const mediumAnimallImage = isCatType ? catMedium : dogMedium;
  const fatAnimalImage = isCatType ? catFat : dogFat;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Характеристики</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Text myClass="btn">Телосложение</Text>
          <div className={styles.form__item_flex}>
            <label className={styles.form__label_column}>
              <div className={styles.form__label_image}>
                <img src={smallAnimalImage} alt="" />
              </div>
              <Text myClass="btn" color="gray">
                Худое
              </Text>
              <Radio
                required={true}
                name="dimensions"
                control={control}
                value={"Худое"}
              ></Radio>
            </label>
            <label className={styles.form__label_column}>
              <div className={styles.form__label_image}>
                <img src={mediumAnimallImage} alt="" />
              </div>
              <Text myClass="btn" color="gray">
                Среднее
              </Text>
              <Radio
                required={true}
                name="dimensions"
                control={control}
                value={"Среднее"}
              ></Radio>
            </label>
            <label className={styles.form__label_column}>
              <div className={styles.form__label_image}>
                <img src={fatAnimalImage} alt="" />
              </div>
              <Text myClass="btn" color="gray">
                Полное
              </Text>
              <Radio
                required={true}
                name="dimensions"
                control={control}
                value={"Полное"}
              ></Radio>
            </label>
          </div>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="btn">Вес</Text>
            <Controller
              name="weigth"
              control={control}
              defaultValue=""
              rules={{
                required: t("fillInTheField"),
              }}
              render={({ field }) => (
                <Input
                  type="number"
                  errorMessage={errors.weigth?.message}
                  ref={field.ref}
                  placeholder={"Введите значение"}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="btn">Возраст</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Маленький от 0 до 1 года
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={"1"}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Молодой от 1 до 7 лет
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={"3"}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Взрослый от 7 до 12 лет
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={"7"}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Старый 12 и более лет
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={"12"}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Неизвестно
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={"0"}
            ></Radio>
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

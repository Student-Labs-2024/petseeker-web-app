import React, { useEffect, useState } from "react";
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
import { petModel } from "@entities/pet";
export const InfoForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  control,
  register,
  errors,
  t,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Главная информация</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Text myClass="bold_medium">Выберите категорию</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Кошки
            </Text>
            <Radio
              required={true}
              name="pet_type"
              control={control}
              value={petModel.announcmentPetType.cat}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Собаки
            </Text>
            <Radio
              required={true}
              name="pet_type"
              control={control}
              value={petModel.announcmentPetType.dog}
            ></Radio>
          </label>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="bold_medium">Имя питомца</Text>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: t("fillInTheField"),
              }}
              render={({ field }) => (
                <Input
                  errorMessage={errors.name?.message}
                  ref={field.ref}
                  placeholder={"Например, Мурка"}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="bold_medium">Пол</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Мужской
            </Text>
            <Radio
              required={true}
              name="gender"
              control={control}
              value={"true"}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Женский
            </Text>
            <Radio
              required={true}
              name="gender"
              control={control}
              value={"false"}
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

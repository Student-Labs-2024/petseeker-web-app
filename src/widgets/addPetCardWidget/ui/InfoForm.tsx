import React, { useEffect, useState } from "react";

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
interface InfoFormProps {
  onChangeForm: (data: any) => void;
  handleNext: (data: any) => void;
  control: any;
  register: UseFormRegister<any>;
}
export const InfoForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  control,
  register,
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
            <Radio name="pet_type" control={control} value={"Кошка"}></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Собаки
            </Text>
            <Radio name="pet_type" control={control} value={"Собака"}></Radio>
          </label>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="bold_medium">Имя питомца</Text>
            <Input
              placeholder="Например, Мурка"
              myClass="form_input"
              register={register("name", { required: true })}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="bold_medium">Пол</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Мужской
            </Text>
            <Radio name="gender" control={control} value={"true"}></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              Женский
            </Text>
            <Radio name="gender" control={control} value={"false"}></Radio>
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

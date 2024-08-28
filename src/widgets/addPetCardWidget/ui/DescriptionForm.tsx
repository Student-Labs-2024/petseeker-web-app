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
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { TextArea } from "@/shared/ui/textArea";
import { InfoFormProps } from "../model/type";
export const DescriptionForm: React.FC<InfoFormProps> = ({
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
        <Text myClass="bold_big">Описание объявления</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: t("fillInTheField"),
              }}
              render={({ field }) => (
                <TextArea
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Введите описание"
                  myClass="form_textArea"
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

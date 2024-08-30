import React, { useEffect, useState } from "react";
import { Text } from "@shared/ui/text";
import styles from "./AddShelter.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { TextArea } from "@/shared/ui/textArea";
import { InfoFormProps } from "../model/type";
import { Controller } from "react-hook-form";
export const DescriptionForm: React.FC<InfoFormProps> = ({
  onSubmitForm,
  control,
  errors,
  t,
  isLoading,
}) => {
  const textSubmitButton = isLoading ? "Загрузка" : "Далее";
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Text myClass="btn">Расскажите о вашем приюте</Text>
      </div>
      <form onSubmit={onSubmitForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="medium_big">Название</Text>

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
          <Button isAuthButton={true} type="submit">
            {textSubmitButton}
          </Button>
        </div>
      </form>
    </div>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Controller } from "react-hook-form";
import { TextArea } from "@/shared/ui/textArea";
import { InfoFormProps } from "../model/type";

export const DescriptionForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  control,
  errors,
  t,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">{t("descriptionFormTitle")}</Text>
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
                  placeholder={t("enterDescription")}
                  myClass="form_textArea"
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </div>
  );
};

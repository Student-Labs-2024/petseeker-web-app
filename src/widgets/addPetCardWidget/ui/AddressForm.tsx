import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Controller } from "react-hook-form";
import { InfoFormProps } from "../model/type";

export const AddressForm: React.FC<InfoFormProps> = ({
  onSubmitForm,
  register,
  isLoading,
  errors,
  control,
}) => {
  // Hook to use translations
  const { t } = useTranslation("petCardForm");

  // Text for the submit button with a loading state
  const textSubmitButton = isLoading ? t("loading") : t("create");

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">{t("address")}</Text>
      </div>
      <form onSubmit={onSubmitForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: t("fillInTheField"),
              }}
              render={({ field }) => (
                <Input
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t("address")} // Translated placeholder
                  myClass="form_input"
                  errorMessage={errors.address?.message}
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.bottom}>
          <Button isLoading={isLoading} type="submit">
            {textSubmitButton}
          </Button>
        </div>
      </form>
    </div>
  );
};

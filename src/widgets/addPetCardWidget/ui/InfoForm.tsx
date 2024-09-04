import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Radio } from "@shared/ui/radio";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm, Controller } from "react-hook-form";
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
        <Text myClass="bold_big">{t("mainInfo")}</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Text myClass="bold_medium">{t("selectCategory")}</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("cats")}
            </Text>
            <Radio
              required={true}
              name="pet_type"
              control={control}
              value={petModel.announcmentPetType.cat}
            />
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("dogs")}
            </Text>
            <Radio
              required={true}
              name="pet_type"
              control={control}
              value={petModel.announcmentPetType.dog}
            />
          </label>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="bold_medium">{t("petName")}</Text>
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
                  placeholder={t("enterPetName")}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="bold_medium">{t("gender")}</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("male")}
            </Text>
            <Radio
              required={true}
              name="gender"
              control={control}
              value={"true"}
            />
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("female")}
            </Text>
            <Radio
              required={true}
              name="gender"
              control={control}
              value={"false"}
            />
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </div>
  );
};

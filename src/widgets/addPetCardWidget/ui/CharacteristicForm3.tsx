import React from "react";
import { useTranslation } from "react-i18next";
import { petModel } from "@entities/pet";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Button } from "@shared/ui/button";
import { Radio } from "@shared/ui/radio";
import { Toggle } from "@/shared/ui/toggle";
import { InfoFormProps } from "../model/type";

export const CharacteristicForm3: React.FC<InfoFormProps> = ({
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
        <Text myClass="bold_big">{t("characteristics")}</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Text myClass="btn">{t("allergenicity")}</Text>

          <label className={styles.form__label_toggle}>
            <Text myClass="medium_big" color="gray">
              {t("allergenicity")}
            </Text>
            <Toggle
              name="allergenicity"
              control={control}
              value={"true"}
            ></Toggle>
          </label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="btn">{t("woolType")}</Text>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.hairless}
            ></Radio>
            <Text myClass="medium_big">{t("hairless")}</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.fluffy}
            ></Radio>
            <Text myClass="medium_big">{t("fluffy")}</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.tough}
            ></Radio>
            <Text myClass="medium_big">{t("tough")}</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.long}
            ></Radio>
            <Text myClass="medium_big">{t("long")}</Text>
          </label>
          <label className={styles.form__label_default}>
            <Radio
              required={true}
              name="wool_type"
              control={control}
              value={petModel.announcmentWoolType.short}
            ></Radio>
            <Text myClass="medium_big">{t("short")}</Text>
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </div>
  );
};

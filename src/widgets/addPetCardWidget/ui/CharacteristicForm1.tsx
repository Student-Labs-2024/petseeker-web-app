import React from "react";
import { petModel } from "@entities/pet/";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { Label } from "@shared/ui/label";
import { Radio } from "@shared/ui/radio";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Controller } from "react-hook-form";
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
  const isCatType = getValues("pet_type") === t("cat");
  const smallAnimalImage = isCatType ? catSmall : dogSmall;
  const mediumAnimalImage = isCatType ? catMedium : dogMedium;
  const fatAnimalImage = isCatType ? catFat : dogFat;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">{t("characteristics")}</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Text myClass="btn">{t("bodyType")}</Text>
          <div className={styles.form__item_flex}>
            <label className={styles.form__label_column}>
              <div className={styles.form__label_image}>
                <img src={smallAnimalImage} alt={t("thin")} />
              </div>
              <Text myClass="btn" color="gray">
                {t("thin")}
              </Text>
              <Radio
                required={true}
                name="dimensions"
                control={control}
                value={petModel.announcmentDimensions.thin}
              ></Radio>
            </label>
            <label className={styles.form__label_column}>
              <div className={styles.form__label_image}>
                <img src={mediumAnimalImage} alt={t("average")} />
              </div>
              <Text myClass="btn" color="gray">
                {t("average")}
              </Text>
              <Radio
                required={true}
                name="dimensions"
                control={control}
                value={petModel.announcmentDimensions.average}
              ></Radio>
            </label>
            <label className={styles.form__label_column}>
              <div className={styles.form__label_image}>
                <img src={fatAnimalImage} alt={t("full")} />
              </div>
              <Text myClass="btn" color="gray">
                {t("full")}
              </Text>
              <Radio
                required={true}
                name="dimensions"
                control={control}
                value={petModel.announcmentDimensions.full}
              ></Radio>
            </label>
          </div>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="btn">{t("weight")}</Text>
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
                  placeholder={t("enterValue")}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Text myClass="btn">{t("age")}</Text>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("ageSmall")}
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={petModel.announcmentAge.small}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("ageYoung")}
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={petModel.announcmentAge.young}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("ageAdult")}
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={petModel.announcmentAge.adult}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("ageOld")}
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={petModel.announcmentAge.old}
            ></Radio>
          </label>
          <label className={styles.form__label}>
            <Text myClass="btn" color="gray">
              {t("ageUnknown")}
            </Text>
            <Radio
              required={true}
              name="age"
              control={control}
              value={petModel.announcmentAge.unknown}
            ></Radio>
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </div>
  );
};

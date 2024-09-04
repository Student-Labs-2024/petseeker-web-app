import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Button } from "@shared/ui/button";
import { Toggle } from "@/shared/ui/toggle";
import { ReactComponent as UploadIcon } from "@shared/assets/upload_icon.svg";
import { InfoFormProps } from "../model/type";

export const CharacteristicForm4: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  control,
  register,
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
          <label className={styles.form__label_toggle}>
            <Text myClass="btn">{t("sterilization")}</Text>
            <Toggle name="sterilization" control={control} value={"true"} />
          </label>
        </div>
        <div className={styles.form__item}>
          <label className={styles.form__label_toggle}>
            <Text myClass="btn">{t("healthIssues")}</Text>
            <Toggle name="health_issues" control={control} value={"true"} />
          </label>
          <label className={styles.upload}>
            <UploadIcon />
            <Text color="gray">{t("uploadFile")}</Text>
            <input type="file" />
          </label>
        </div>
        <div className={styles.form__item}>
          <label className={styles.form__label_toggle}>
            <Text myClass="btn">{t("vaccinations")}</Text>
            <Toggle name="vaccinations" control={control} value={"true"} />
          </label>
          <label className={styles.upload}>
            <UploadIcon />
            <Text color="gray">{t("uploadFile")}</Text>
            <input type="file" />
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </div>
  );
};

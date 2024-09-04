import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { ReactComponent as Shelter } from "@shared/assets/shelter_icon.svg";
import { ReactComponent as Private } from "@shared/assets/private_icon.svg";
import { ReactComponent as Message } from "@shared/assets/message_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import classNames from "classnames";
import { InfoFormProps } from "../model/type";
import { petModel } from "@entities/pet";

export const TypeForm: React.FC<InfoFormProps> = ({ setValue }) => {
  const { t } = useTranslation("petCardForm");
  const darkCardStyle = classNames(styles.card, styles.dark);
  const dispatch = useAppDispatch();

  const handleSetAnnouncmentType = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLButtonElement;
    setValue("status", target.value);
    dispatch(petModel.setAddPetUrl(target.name as petModel.AnnouncmentType));
    dispatch(petModel.nextStep());
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">{t("announcementType")}</Text>
      </div>
      <button
        value={petModel?.announcmentStatus.looking_home}
        name={petModel?.announcmentValues?.shelter}
        onClick={handleSetAnnouncmentType}
        className={styles.card}
      >
        <div className={styles.card__top}>
          <Text myClass="bold_medium">{t("shelterFormat")}</Text>
          <Private />
        </div>
        <div className={styles.card__text}>
          <Text color="light_gray" myClass="small">
            {t("shelterDescription")}
          </Text>
        </div>
      </button>
      <button
        value={petModel?.announcmentStatus.give}
        name={petModel?.announcmentValues?.private}
        onClick={handleSetAnnouncmentType}
        className={styles.card}
      >
        <div className={styles.card__top}>
          <Text myClass="bold_medium">{t("userFormat")}</Text>
          <Shelter />
        </div>
        <div className={styles.card__text}>
          <Text color="light_gray" myClass="small">
            {t("userDescription")}
          </Text>
        </div>
      </button>
      <button
        value={petModel?.announcmentStatus.lost}
        onClick={handleSetAnnouncmentType}
        className={darkCardStyle}
      >
        <div className={styles.card__top}>
          <Text myClass="bold_medium">{t("reportLostPet")}</Text>
          <Message />
        </div>
        <div className={styles.card__text}>
          <Text color="light_gray" myClass="small">
            {t("reportDescription")}
          </Text>
        </div>
      </button>
    </div>
  );
};

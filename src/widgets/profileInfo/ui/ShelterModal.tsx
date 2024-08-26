import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./profileInfo.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { shelterNameConsts } from "@shared/constants";
import { Controller } from "react-hook-form";
import { InfoFormProps } from "../../addShelter/model/type";
import { Modal } from "@shared/ui/modal";
import { ReactComponent as ArrowIcon } from "@shared/assets/arrow_icon.svg";

type ShelterModal = {
  onClick?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
};
export const ShelterModal: React.FC<ShelterModal> = ({
  onClick,
  isOpen = false,
  onClose,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className={styles.shelter__content}>
        <Text myClass="bold_medium_big" tag={"h3"}>
          Вы можете зарегистрировать ваш приют на нашей платформе{" "}
        </Text>
        <div className={styles.shelter__items}>
          <div className={styles.shelter__item}>
            <ArrowIcon className={styles.shelter__icon} />
            <Text myClass="medium_big">
              Пройдите верификацию, которая подтвердит подлинность вашего
              приюта.
            </Text>
          </div>
          <div className={styles.shelter__item}>
            <ArrowIcon className={styles.shelter__icon} />
            <Text myClass="medium_big">
              Откройте больше возможностей поиска любящих хозяев для ваших
              подопечных.
            </Text>
          </div>
        </div>
        <div className={styles.shelter__item}></div>
        <Button onClick={onClick} isAuthButton={true}>
          Пройти проверку
        </Button>
      </div>
    </Modal>
  );
};

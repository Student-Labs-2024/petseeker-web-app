import React, { useState } from "react";
import { petModel } from "@entities/pet/index";
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
export const TypeForm: React.FC = () => {
  const darkCardStyle = classNames(styles.card, styles.dark);
  const dispatch = useAppDispatch();

  const handleSetAnnouncmentType = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLButtonElement;

    dispatch(petModel.setAddPetUrl(target.name as petModel.AnnouncmentType));
    dispatch(petModel.nextStep());
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Вид объявления</Text>
      </div>
      {/* замапить кнопки? */}
      <button
        name={petModel?.announcmentValues?.shelter}
        onClick={handleSetAnnouncmentType}
        className={styles.card}
      >
        <div className={styles.card__top}>
          <Text color="white" myClass="bold_medium">
            Формат приюта
          </Text>
          <Private />
        </div>
        <div className={styles.card__text}>
          <Text color="light_gray" myClass="small">
            <div> Объявления формата приют помогает</div>
            <div> находить семьи для животных</div>
            <div> и привлекает материальную помощь</div>
          </Text>
        </div>
      </button>
      <button
        name={petModel?.announcmentValues?.private}
        onClick={handleSetAnnouncmentType}
        className={styles.card}
      >
        <div className={styles.card__top}>
          <Text color="white" myClass="bold_medium">
            Формат пользователя
          </Text>
          <Shelter />
        </div>
        <div className={styles.card__text}>
          <Text color="light_gray" myClass="small">
            <div>Объявление от лица пользователя</div>
            <div>привлекает больше внимания </div>
            <div>и помогает быстро найти дом для питомца</div>
          </Text>
        </div>
      </button>
      <button
        value={petModel?.announcmentValues?.message}
        onClick={handleSetAnnouncmentType}
        className={darkCardStyle}
      >
        <div className={styles.card__top}>
          <Text color="white" myClass="bold_medium">
            Сообщить о потере питомца
          </Text>
          <Message />
        </div>
        <div className={styles.card__text}>
          <Text color="light_gray" myClass="small">
            <div>Потеряли домашнего питомца </div>
            <div>или нашли питомца из объявления?</div>
            <div>Сообщите об этом</div>
          </Text>
        </div>
      </button>
    </div>
  );
};

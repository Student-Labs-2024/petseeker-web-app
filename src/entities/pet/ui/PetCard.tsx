import type { FC } from "react";
import styles from "./petCard.module.scss";
import { petModel } from "../index";
import { Text } from "@shared/ui/text";
import { NavLink } from "react-router-dom";
import { PET_CARD } from "@app/router/consts";
import useFormattedDate from "@shared/hooks/useFormattedDate/useFormattedDate";
import { SaveCard } from "@/features/pet/savePet";
import classNames from "classnames";
import cat from "@shared/assets/cat.png";
const apiUrl = import.meta.env.VITE_APP_URL;
type PetProps = {
  description: petModel.Pet;
  actionSlots?: React.ReactNode;
  isFavoritePage?: boolean;
  isSaved?: boolean;
};

export const PetCard: FC<PetProps> = ({
  description,
  isFavoritePage = false,
  isSaved = false,
}) => {
  const formattedDate = useFormattedDate(description.published_at);

  const petCardStyle = classNames(styles.card__container, {
    [styles.favorite]: isFavoritePage,
  });
  const statusStyle = classNames(styles.status, {
    [styles.status_red]: description.status === "lost",
  });
  return (
    <>
      <NavLink className={petCardStyle} to={`${PET_CARD}/${description.id}`}>
        <div className={styles.card__image_container}>
          <span className={statusStyle}>
            <Text myClass="small">
              {petModel.announcmentStatusTranslate[description.status]}
            </Text>
          </span>
          <img
            src={
              description.images?.length ? apiUrl + description.images[0] : cat
            }
            alt=""
          />
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__like_container}>
            <Text myClass={"subtitle"}>{description.name}</Text>
            <SaveCard id={description.id} isSaved={isSaved}></SaveCard>
          </div>
          <Text>{description.user}</Text>
          <Text color={"gray"}>{description.address}</Text>
          <Text color={"gray"}>{formattedDate}</Text>{" "}
        </div>
      </NavLink>
    </>
  );
};

import type { FC } from "react";
import styles from "./petCard.module.scss";
import { Pet } from "../index";
import { Text } from "../../../shared/ui/text";
import { NavLink } from "react-router-dom";
import { PET_CARD } from "../../../app/router/consts";
import useFormattedDate from '../../../shared/hooks/useFormattedDate';
type PetProps = {
  description: Pet;
  actionSlots?: React.ReactNode;
};

export const PetCard: FC<PetProps> = ({ description, actionSlots }) => {
  const formattedDate = useFormattedDate(description.published_at);
  return (
    <NavLink
      className={styles.card__container}
      to={PET_CARD + "/" + description.id}
    >
      <div className={styles.card__container}>
        <div className={styles.card__image_container}>
          <img
            src={description.images?.length ? description.images[0] : ""}
            alt=""
          />
        </div>
        <div className={styles.card__like_container}>
          <Text myClass={"subtitle"}>{description.name}</Text>
          {actionSlots}
        </div>
        <Text myClass="subtitle">{description.user}</Text>
        <Text color={"gray"}>{description.address}</Text>
        <Text color={"gray"}>{formattedDate}</Text>
      </div>
    </NavLink>
  );
};

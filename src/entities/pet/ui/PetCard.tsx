import type { FC } from "react";
import styles from "./petCard.module.scss";
import { type } from "../index";
import { Text } from "@shared/ui/text";
import { NavLink } from "react-router-dom";
import { PET_CARD } from "@app/router/consts";
import useFormattedDate from "@shared/hooks/useFormattedDate/useFormattedDate";
import { ReactComponent as LikeIcon } from "@shared/assets/like.svg";
import * as petModel from "@entities/pet/index";
import cat from "@shared/assets/cat.png";
type PetProps = {
  description: type.Pet;
  actionSlots?: React.ReactNode;
};
type SaveButtonProps = {
  id: string;
};
export const PetCard: FC<PetProps> = ({ description, actionSlots }) => {
  const formattedDate = useFormattedDate(description.published_at);
  const [saveFavorite] = petModel.api.useSaveFavoriteMutation();
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const response = await saveFavorite(`${description.id}`).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.card__container}>
      <NavLink
        className={styles.card__container}
        to={`${PET_CARD}"/"${description.id}`}
      >
        <div className={styles.card__image_container}>
          <span className={styles.status}>
            <Text myClass="small" color="white">
              {description.status}
            </Text>
          </span>
          <img
            // src={description.images?.length ? description.images[0] : ""}
            src={cat}
            alt=""
          />
        </div>
        <div className={styles.card__like_container}>
          <Text myClass={"subtitle"}>{description.name}</Text>
          <button onClick={handleSave}>
            <LikeIcon className={styles.card__like}></LikeIcon>
          </button>
        </div>
        <Text myClass="subtitle">{description.user}</Text>
        <Text color={"gray"}>{description.address}</Text>
        <Text color={"gray"}>{formattedDate}</Text>{" "}
      </NavLink>
    </div>
  );
};

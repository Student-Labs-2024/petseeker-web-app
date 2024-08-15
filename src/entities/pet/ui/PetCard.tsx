import type { FC } from "react";
import styles from "./petCard.module.scss";
import { type } from "../index";
import { Text } from "@shared/ui/text";
import { NavLink } from "react-router-dom";
import { PET_CARD } from "@app/router/consts";
import useFormattedDate from "@shared/hooks/useFormattedDate/useFormattedDate";
import { ReactComponent as LikeIcon } from "@shared/assets/like.svg";
import { ReactComponent as LikeActiveIcon } from "@shared/assets/like_active.svg";

import * as petModel from "@entities/pet/index";
import classNames from "classnames";
import cat from "@shared/assets/cat.png";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
type PetProps = {
  description: type.Pet;
  actionSlots?: React.ReactNode;
  isFavoritePage?: boolean;
  isSaved?: boolean;
};
type SaveButtonProps = {
  id: string;
};
export const PetCard: FC<PetProps> = ({
  description,
  isFavoritePage = false,
  isSaved = false,
}) => {
  const formattedDate = useFormattedDate(description.published_at);
  const [saveFavorite] = petModel.api.useSaveFavoriteMutation();
  const [deleteFavorite] = petModel.api.useDeleteFavoriteMutation();
  const dispatch = useAppDispatch();
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    let id = `${description.id}`;
    try {
      event.preventDefault();
      if (isSaved) {
        const response = await saveFavorite(id).unwrap();
        dispatch(petModel.slice.addFavorite(id));
      } else {
        const response = await deleteFavorite(id).unwrap();
        dispatch(petModel.slice.removeFavorite(id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const petCardStyle = classNames(styles.card__container, {
    [styles.favorite]: isFavoritePage,
  });
  console.log(isSaved);
  return (
    <>
      <NavLink className={petCardStyle} to={`${PET_CARD}"/"${description.id}`}>
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
        <div className={styles.card__content}>
          <div className={styles.card__like_container}>
            <Text myClass={"subtitle"}>{description.name}</Text>
            <button onClick={handleSave}>
              {isSaved ? (
                <LikeActiveIcon className={styles.card__like}></LikeActiveIcon>
              ) : (
                <LikeIcon className={styles.card__like}></LikeIcon>
              )}
            </button>
          </div>
          <Text myClass="subtitle">{description.user}</Text>
          <Text color={"gray"}>{description.address}</Text>
          <Text color={"gray"}>{formattedDate}</Text>{" "}
        </div>
      </NavLink>
    </>
  );
};

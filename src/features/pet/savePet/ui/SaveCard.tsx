import React from "react";
import styles from "./saveCard.module.scss";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import * as petModel from "@entities/pet/index";
import { ReactComponent as LikeIcon } from "@shared/assets/like.svg";
import { ReactComponent as LikeActiveIcon } from "@shared/assets/like_active.svg";
type SaveButtonProps = {
  id?: number;
  isSaved?: boolean;
};

export const SaveCard: React.FC<SaveButtonProps> = ({ id, isSaved }) => {
  const [saveFavorite] = petModel.api.useSaveFavoriteMutation();
  const [deleteFavorite] = petModel.api.useDeleteFavoriteMutation();
  const dispatch = useAppDispatch();
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      if (isSaved) {
        const response = await deleteFavorite(id).unwrap();
        dispatch(petModel.slice.removeFavorite(id));
      } else {
        const response = await saveFavorite(id).unwrap();
        dispatch(petModel.slice.addFavorites(id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button onClick={handleSave}>
      {isSaved ? (
        <LikeActiveIcon className={styles.card__like}></LikeActiveIcon>
      ) : (
        <LikeIcon className={styles.card__like}></LikeIcon>
      )}
    </button>
  );
};

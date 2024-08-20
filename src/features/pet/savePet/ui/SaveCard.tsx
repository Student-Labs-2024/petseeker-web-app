import React from "react";
import { petModel } from "@entities/pet/";
import { Button } from "@shared/ui/button";
import styles from "./saveCard.module.scss";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ReactComponent as LikeIcon } from "@shared/assets/like.svg";
import { ReactComponent as LikeActiveIcon } from "@shared/assets/like_active.svg";
type SaveButtonProps = {
  id?: number;
  isSaved?: boolean;
};

export const SaveCard: React.FC<SaveButtonProps> = ({ id, isSaved }) => {
  const [saveFavorite] = petModel.useSaveFavoriteMutation();
  const [deleteFavorite] = petModel.useDeleteFavoriteMutation();
  const dispatch = useAppDispatch();
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      if (isSaved) {
        dispatch(petModel.removeFavorite(id));
        const response = await deleteFavorite(id).unwrap();
      } else {
        dispatch(petModel.addFavorites(id));
        const response = await saveFavorite(id).unwrap();
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

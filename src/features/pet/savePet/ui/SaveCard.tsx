import React from "react";
import { petModel } from "@entities/pet/";
import { Button } from "@shared/ui/button";
type SaveButtonProps = {
  id: string;
};

export const SaveCard: React.FC<SaveButtonProps> = ({ id }) => {
  const [saveFavorite] = petModel.useSaveFavoriteMutation();
  const handleSave = async () => {
    try {
      const response = await saveFavorite(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={handleSave}>Забрать в семью</Button>;
};

import React from "react";
import { useSaveFavoriteMutation } from "../../../../entities/pet/index";
import {Button} from '../../../../shared/ui/button'
type SaveButtonProps = {
  id: string;
};
export const SaveCard: React.FC<SaveButtonProps> = ({ id }) => {
  const [saveFavorite] = useSaveFavoriteMutation();
  const handleSave = async () => {
    try {
      const response=await saveFavorite(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={handleSave} >
        Забрать в семью
    </Button>
  );
};

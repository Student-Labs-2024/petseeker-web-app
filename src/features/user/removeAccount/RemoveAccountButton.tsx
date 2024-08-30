import React from "react";
import { userModel } from "@entities/user/";
import { Button } from "@shared/ui/button";
import { useAppDispatch } from "@/shared/hooks/index";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "@/app/router/consts";
export const RemoveAccountButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = userModel.useGetMeQuery();
  const [deleteProfile] = userModel.useDeleteProfileMutation();

  const handleRemoveAcount = async () => {
    if (confirm("Вы действительно хотите удалить аккаунт?")) {
      try {
        const response = await deleteProfile(data.id).unwrap();

        dispatch(userModel.setAuthenticated(false));
        navigate(MAIN_ROUTE);
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Button onClick={handleRemoveAcount} isAuthButton={true} isDefault={true}>
      Удалить профиль
    </Button>
  );
};

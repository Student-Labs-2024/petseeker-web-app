import { useEffect } from "react";
import * as userModel from "@/entities/user/index";
import { useAppDispatch } from "@shared/hooks";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = userModel.api.useGetMeQuery();

  useEffect(() => {
    if (data && !isLoading && !error) {
      dispatch(userModel.slice.setAuthenticated(true));
    } else if (error) {
      dispatch(userModel.slice.setAuthenticated(false));
    }
  }, [data, error, isLoading, dispatch]);

  return { isLoading };
};

export default useAuthCheck;

import { useEffect } from "react";
import { userModel } from "@/entities/user/index";
import { useAppDispatch } from "@shared/hooks";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = userModel.useGetMeQuery();

  useEffect(() => {
    if (data && !isLoading && !error) {
      dispatch(userModel.setAuthenticated(true));
    } else if (error) {
      dispatch(userModel.setAuthenticated(false));
    }
  }, [data, error, isLoading, dispatch]);

  return { isLoading };
};

export default useAuthCheck;

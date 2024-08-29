import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";

import { EditUser } from "@/widgets/editUser";
export const ProfileEdit: React.FC = () => {
  return (
    <>
      <MainContainer>
        <EditUser></EditUser>
      </MainContainer>
    </>
  );
};

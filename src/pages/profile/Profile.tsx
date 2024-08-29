import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@/widgets/navbar";

import { ProfileInfo } from "@/widgets/profileInfo/index";
export const Profile: React.FC = () => {
  return (
    <>
      <MainContainer>
        <ProfileInfo></ProfileInfo>
      </MainContainer>
      <Navbar />
    </>
  );
};

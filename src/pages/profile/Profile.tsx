import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@/widgets/navbar";
import { AddShelter } from "@widgets/addShelter/index.ts";
import * as petModel from "@entities/pet/index.ts";
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

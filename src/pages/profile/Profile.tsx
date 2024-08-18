import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@/widgets/temp_navbar";
import { AddShelter } from "@widgets/addShelter/index.ts";
import * as petModel from "@entities/pet/index.ts";
import { ProfileInfo } from "@/widgets/profileInfo/index";
export const Profile: React.FC = () => {
  const { data: favorites } = petModel.api.useGetFavoritesQuery();
  useEffect(() => {}, [favorites]);
  return (
    <>
      <MainContainer>
        <ProfileInfo></ProfileInfo>
      </MainContainer>
      <Navbar />
    </>
  );
};

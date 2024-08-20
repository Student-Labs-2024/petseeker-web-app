import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@/widgets/navbar";
import { AddShelter } from "@widgets/addShelter/";
import * as petModel from "@entities/pet/";
export const Profile: React.FC = () => {
  const { data: favorites } = petModel.api.useGetFavoritesQuery();
  useEffect(() => {}, [favorites]);
  return (
    <>
      <MainContainer>
        <h1>PROFILE</h1>
        <AddShelter />
      </MainContainer>
      <Navbar />
    </>
  );
};

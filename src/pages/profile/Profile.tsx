import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@/widgets/temp_navbar";
import { AddShelter } from "@widgets/addShelter/index.ts";
import * as petModel from "@entities/pet/index.ts";
import { EditUser } from "@widgets/editUser";
export const Profile: React.FC = () => {
  const { data: favorites } = petModel.api.useGetFavoritesQuery();
  useEffect(() => {}, [favorites]);
  return (
    <>
      <MainContainer>
        <h1>PROFILE</h1>
        <AddShelter />
        <EditUser />
      </MainContainer>
      <Navbar />
    </>
  );
};

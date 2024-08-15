import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@widgets/navbar";
import { AddShelter } from "@widgets/addShelter/index.ts";
import * as petModel from "@entities/pet/index.ts";
export const Favorites: React.FC = () => {
  const { data: favorites } = petModel.api.useGetFavoritesQuery();

  console.log(favorites);
  return (
    <>
      <MainContainer></MainContainer>
      <Navbar />
    </>
  );
};

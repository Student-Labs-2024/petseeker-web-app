import React from "react";
import { PetList } from "@widgets/petList";
import { Navbar } from "@/widgets/navbar";
import { MainContainer } from "@shared/ui/mainContainer";
import { petModel } from "@entities/pet/";
export const Favorite: React.FC = () => {
  const { data: pets, isLoading, isError } = petModel.useGetFavoritesQuery();

  const petData = pets?.results || [];

  return (
    <>
      <MainContainer>
        <PetList pets={petData} isLoading={isLoading} isError={isError} />
      </MainContainer>
      <Navbar />
    </>
  );
};

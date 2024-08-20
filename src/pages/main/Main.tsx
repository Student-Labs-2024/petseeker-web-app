import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "@widgets/petList";
import { MainContainer } from "@shared/ui/mainContainer";
import { SearchPet } from "@features/pet/searchPet";
import { Navbar } from "@/widgets/navbar";
import { FilterPets } from "@features/pet/filterPets";
import { petModel } from "@entities/pet/";
export const Main: React.FC = () => {
  const { data: pets, isLoading, isError } = petModel.useGetPetsQuery();

  const petData = pets?.results || [];

  return (
    <>
      <MainContainer>
        <SearchPet></SearchPet>
        <FilterPets></FilterPets>
        <PetList pets={petData} isLoading={isLoading} isError={isError} />
      </MainContainer>
      <Navbar />
    </>
  );
};

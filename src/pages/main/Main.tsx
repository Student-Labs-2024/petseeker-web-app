import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "@widgets/petList";
import { MainContainer } from "@shared/ui/mainContainer";
import { SearchPet } from "@features/pet/searchPet";
import { Navbar } from "@/widgets/navbar";
import { FilterPets } from "@features/pet/filterPets";
export const Main: React.FC = () => {
  return (
    <>
      <MainContainer>
        <SearchPet></SearchPet>
        <FilterPets></FilterPets>
        <PetList></PetList>
      </MainContainer>
      <Navbar />
    </>
  );
};

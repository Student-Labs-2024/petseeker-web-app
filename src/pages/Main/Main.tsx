import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "@widgets/petList";
import { MainContainer } from "@shared/ui/mainContainer";
import { SearchPet } from "@features/pet/searchPet";
import { Button } from "@shared/ui/button";
import { ADD_PET_CARD } from "@app/router/consts";
import { Navbar } from "@widgets/navbar";
import { FilterPets } from "@features/pet/filterPets";
import { Morpher } from 'morpher-ws3-client';
export const Main: React.FC = () => {
  const navigate = useNavigate();
  const morpher = new Morpher('your-api-key');
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

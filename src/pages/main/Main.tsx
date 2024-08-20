import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "@widgets/petList";
import { MainContainer } from "@shared/ui/mainContainer";

import { Navbar } from "@/widgets/navbar";
import { FilterPets } from "@features/pet/filterPets";
import { petModel } from "@entities/pet/";
export const Main: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainContainer>
        <FilterPets></FilterPets>
        <PetList />
      </MainContainer>
      <Navbar />
    </>
  );
};

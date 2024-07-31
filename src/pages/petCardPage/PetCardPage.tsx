import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "@widgets/petList";
import { MainContainer } from "@shared/ui/mainContainer";
import { SearchPet } from "@features/pet/searchPet";
import { Button } from "@shared/ui/button";
import { ADD_PET_CARD } from "@app/router/consts";
import { Navbar } from "@widgets/navbar";
import { FilterPets } from "@features/pet/filterPets";
import { PetCardDetail } from "@widgets/petCardDetail/ui/PetCardDetail";

export const PetCardPage: React.FC = () => {
  return (
    <>
      <MainContainer>
        <PetCardDetail></PetCardDetail>
      </MainContainer>
    </>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "../../widgets/petList";
import {MainContainer} from "../../shared/ui/mainContainer";
import { SearchPet } from "../../features/pet/searchPet";
import { Button } from "../../shared/ui/button";
import { ADD_PET_CARD } from "../../app/router/consts";
export  const Main: React.FC = () => {
  const navigate=useNavigate()

  return (
      <MainContainer>
        <SearchPet></SearchPet>
        <Button onClick={()=>navigate(ADD_PET_CARD)} >Создать объявление</Button>
        <PetList></PetList>
      </MainContainer>
  );
};



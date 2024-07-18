import React from "react";

import { PetList } from "../../widgets/petList";
import {MainContainer} from "../../shared/ui/mainContainer";
import { SearchPet } from "../../features/pet/searchPet";
export  const Main: React.FC = () => {
  return (
      <MainContainer>
        <SearchPet></SearchPet>
        <PetList></PetList>
      </MainContainer>
  );
};



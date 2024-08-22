import React from "react";
import { AddShelterForm } from "@/widgets/addShelter";
import { MainContainer } from "@shared/ui/mainContainer";
export const AddShelter: React.FC = () => {
  return (
    <MainContainer>
      <AddShelterForm />
    </MainContainer>
  );
};

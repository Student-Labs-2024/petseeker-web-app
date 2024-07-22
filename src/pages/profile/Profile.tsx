import React from "react";
import { MainContainer } from "../../shared/ui/mainContainer";
import { Navbar } from "../../widgets/navbar";
import { AddShelter } from "../../widgets/addShelter/index.ts";
export const Profile: React.FC = () => {
  return (
    <>
      <MainContainer>
        <h1>PROFILE</h1>
        <AddShelter/>
      </MainContainer>
      <Navbar />
    </>
  );
};

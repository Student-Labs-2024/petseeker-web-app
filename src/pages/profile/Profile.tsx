import React, { useEffect } from "react";
import { MainContainer } from "../../shared/ui/mainContainer";
import { Navbar } from "../../widgets/navbar";
import { AddShelter } from "../../widgets/addShelter/index.ts";
import { useGetFavoritesQuery } from '../../entities/pet/index.ts';
export const Profile: React.FC = () => {
  const { data: favorites } = useGetFavoritesQuery();
  useEffect(()=>{
    console.log(favorites)
  },[favorites])
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

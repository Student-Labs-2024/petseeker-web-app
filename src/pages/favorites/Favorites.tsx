import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";
import { Navbar } from "@/widgets/navbar";

import { FavoriteList } from "@/widgets/favoriteList";
export const Favorites: React.FC = () => {
  return (
    <>
      <MainContainer>
        <FavoriteList></FavoriteList>
      </MainContainer>
      <Navbar />
    </>
  );
};

import React, { useEffect } from "react";
import { MainContainer } from "@shared/ui/mainContainer";

import { SettingsWidget } from "@/widgets/settingsWidget";
export const SettingsPage: React.FC = () => {
  return (
    <>
      <MainContainer>
        <SettingsWidget></SettingsWidget>
      </MainContainer>
    </>
  );
};

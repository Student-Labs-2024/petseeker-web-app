import React from "react";
import { Link } from "react-router-dom";
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "../../app/router/consts";
import { useTheme } from "../../shared/hooks/useTheme";
import { Button } from "../../shared/ui/button";
import { MainContainer } from "../../shared/ui/mainContainer";
const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };
  return (
    <MainContainer>
      <nav>
        <ul>
          <li>
            <Link to={MAIN_ROUTE}>Home</Link>
          </li>
          <li>
            <Link to={REGISTRATION_ROUTE}>Войти</Link>
          </li>
        </ul>
        {/* <div >
          <Button onClick={handleLightThemeClick}>Light</Button>
          <Button onClick={handleDarkThemeClick}>Dark</Button>
        </div> */}
      </nav>
    </MainContainer>
  );
};

export default Navbar;

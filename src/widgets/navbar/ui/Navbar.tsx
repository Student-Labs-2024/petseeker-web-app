import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  ADD_PET_CARD,
  FAVORITE_ROUTE,
  PROFILE,
  SHELTER,
  FAVORITES,
} from "@app/router/consts";
import { ReactComponent as MainIcon } from "@shared/assets/main_icon.svg";
import { ReactComponent as ProfileIcon } from "@shared/assets/profile_icon.svg";
import { ReactComponent as FavoriteIcon } from "@shared/assets/favorite_icon.svg";
import { ReactComponent as AddIcon } from "@shared/assets/add_icon.svg";
import { useAppSelector } from "@shared/hooks/useAppSelector";
import styles from "./navbar.module.scss";
const Navbar: React.FC = () => {
  const token = useAppSelector((state) => state.user.auth);
  const profileRoute = token ? PROFILE : AUTH_ROUTE;
  const favoriteRoute = token ? FAVORITES : AUTH_ROUTE;
  const addPetCardRoute = token ? ADD_PET_CARD : AUTH_ROUTE;
  const activeMainIcon =
    location.pathname === MAIN_ROUTE ? styles.active_icon : "";
  const activeMainText =
    location.pathname === MAIN_ROUTE ? styles.active_text : "";
  const activeFavoriteIcon =
    location.pathname === favoriteRoute ? styles.active_fill_icon : "";
  const activeFavoriteText =
    location.pathname === favoriteRoute ? styles.active_text : "";
  const activeProfileIcon =
    location.pathname === PROFILE || location.pathname === SHELTER
      ? styles.active_icon
      : "";
  const activeProfileText =
    location.pathname === PROFILE || location.pathname === SHELTER
      ? styles.active_text
      : "";

  return (
    <nav className={styles.navbar__container}>
      <div className={styles.navbar__list}>
        <Link className={styles.navbar__item} to={MAIN_ROUTE}>
          <div className={styles.navbar__icon_container}>
            <MainIcon className={activeMainIcon} />
          </div>
          <span className={activeMainText}> Главная</span>
        </Link>

        <Link className={styles.navbar__item} to={addPetCardRoute}>
          <div className={styles.navbar__icon_container}>
            {" "}
            <AddIcon />
          </div>
          Объявления
        </Link>
        <Link className={styles.navbar__item} to={favoriteRoute}>
          <div className={styles.navbar__icon_container}>
            <FavoriteIcon className={activeFavoriteIcon} />
          </div>
          <span className={activeFavoriteText}>Избранное</span>
        </Link>
        <Link className={styles.navbar__item} to={profileRoute}>
          <div className={styles.navbar__icon_container}>
            <ProfileIcon className={activeProfileIcon} />
          </div>
          <span className={activeProfileText}> Профиль</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

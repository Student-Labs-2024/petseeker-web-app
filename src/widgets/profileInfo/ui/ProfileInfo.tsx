import React, { useEffect, useState } from "react";
import { userModel } from "@entities/user";
import { shelterModel } from "@entities/shelter";
import styles from "./profileInfo.module.scss";
import { match } from "ts-pattern";
import { Text } from "@shared/ui/text";
import { ReactComponent as UploadIcon } from "@shared/assets/upload_icon.svg";
import { ReactComponent as SettingsIcon } from "@shared/assets/settings_icon.svg";
import { ReactComponent as NotificationsDefaultIcon } from "@shared/assets/notification_default_icon.svg";
import { ReactComponent as NotificationsIcon } from "@shared/assets/notification_icon.svg";
import { ReactComponent as RaitingStarIcon } from "@shared/assets/raiting_star_icon.svg";
import { ReactComponent as AddressIcon } from "@shared/assets/address_icon.svg";
import { ReactComponent as TgIcon } from "@shared/assets/tg_icon.svg";
import { ReactComponent as PhoneIcon } from "@shared/assets/phone_icon.svg";
import { ReactComponent as EditIcon } from "@shared/assets/edit_profile_icon.svg";
import { ReactComponent as CatImage } from "@shared/assets/cat_empty_profile.svg";
import { Button } from "@shared/ui/button";

import { NavLink } from "react-router-dom";
import {
  PROFILE_EDIT,
  SETTINGS,
  ADD_SHELTER,
  MAIN_ROUTE,
  PROFILE,
  SHELTER,
} from "@/app/router/consts";
import { tgConsts, phoneConsts } from "@shared/constants";
import InputMask from "react-input-mask-next";
import { Modal } from "@/shared/ui/modal";
import { ShelterModal } from "./ShelterModal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/index";
const apiUrl = import.meta.env.VITE_APP_URL;
export const ProfileInfo: React.FC = () => {
  const isProfilePage = location.pathname === PROFILE;
  const totalStars = 5;
  const stars = 4;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
    isSuccess: isSuccessUser,
  } = userModel.useGetMeQuery();
  const [data, setData] = useState(userInfo);
  const { data: shelter, isSuccess: isSuccessShelter } =
    shelterModel.useGetShelterQuery(userInfo?.id);
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    if (!isProfilePage) {
      setSheltetData();
    }
  }, [shelter]);
  useEffect(() => {
    if (isProfilePage) {
      setUserData();
    }
  }, [userInfo]);
  const handleNavigateSettings = () => {
    navigate(SETTINGS);
  };
  const handleNavigateShelterPage = () => {
    navigate(ADD_SHELTER);
  };
  const handleOpenShelter = () => {
    if (shelter?.length > 0) {
      setSheltetData();
      navigate(SHELTER);
    } else {
      setIsOpenModal(true);
    }
  };
  const handleOpenProfile = () => {
    if (!isProfilePage) {
      setUserData();
      navigate(PROFILE);
    }
  };
  const setUserData = () => {
    setData({
      name: userInfo?.name,
      surname: userInfo?.surname,
      phone: userInfo?.phone_number,
      image: userInfo?.profile_image,
      social: userInfo?.telegram,
    });
  };
  const setSheltetData = () => {
    if (shelter?.length > 0)
      setData({
        name: shelter[0]?.name,
        surname: shelter[0]?.surname,
        phone: shelter[0]?.telephone_number,
        image: shelter[0]?.images[0],
        address: shelter[0]?.address,
        social: shelter[0]?.social_network_1,
      });
  };

  const handleCloseShelterModal = () => {
    setIsOpenModal(false);
  };

  const handleLogout = () => {
    dispatch(userModel.setAuthenticated(false));
    navigate(MAIN_ROUTE);
  };

  return (
    <>
      {" "}
      <ShelterModal
        isOpen={isOpenModal}
        onClose={handleCloseShelterModal}
        onClick={handleNavigateShelterPage}
      ></ShelterModal>
      <div className={styles.profile}>
        <div className={styles.profile__top}>
          <button className={styles.profile__top_btn}>
            <UploadIcon />
          </button>
          <div className={styles.profile__top_text}>
            <Text myClass="subtitle_slim">Профиль</Text>
          </div>
          <div className={styles.profile__top_right}>
            <button className={styles.profile__top_btn}>
              <NotificationsDefaultIcon />
            </button>
            <button
              onClick={handleNavigateSettings}
              className={styles.profile__top_btn}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
        {userInfo && !userInfo.name ? (
          <Modal isOpen={true}>
            <div className={styles.modal__content}>
              <div className={styles.modal__image}></div>
              <Button isAuthButton={true}>
                <NavLink to={PROFILE_EDIT}>Заполнить профиль</NavLink>
              </Button>
            </div>
          </Modal>
        ) : (
          <div className={styles.profile__content}>
            <div className={styles.profile__avatars}>
              <button
                onClick={handleOpenProfile}
                className={styles.profile__avatar}
              >
                {data?.image && (
                  <img
                    className={styles.preview_image}
                    src={`${apiUrl}${data?.image}`}
                    alt=""
                  />
                )}
              </button>

              <button onClick={handleOpenShelter}>
                <div className={styles.profile__shelter}></div>
              </button>
            </div>
            <div className={styles.profile__info}>
              <Text myClass="bold_medium_big">
                {data?.name} {data?.surname}
              </Text>
              <Text myClass="medium_big">Частное</Text>
              <Text myClass="medium_big">дата рег</Text>
            </div>
            <div className={styles.profile__rating}>
              <Text myClass="bold_medium_big">5.0</Text>
              <div className={styles.profile__stars}>
                {[...Array(totalStars)].map((_, index) => (
                  <span
                    key={index}
                    className={index < stars ? styles.active : styles.inactive}
                  >
                    <RaitingStarIcon />
                  </span>
                ))}
              </div>
            </div>
            <button className={styles.profile__feedbacks}>
              <Text myClass="medium_big" color="btn_color">
                12 отзывов
              </Text>
            </button>
            <div className={styles.profile__phone}>
              <PhoneIcon />
              <InputMask mask={phoneConsts.mask} value={data?.phone}>
                <input className={styles.medium_big} />
              </InputMask>
            </div>
            <div className={styles.profile__tg}>
              <TgIcon />
              <Text myClass="medium_big" color="dark">
                {data?.social}
              </Text>
            </div>
            <div className={styles.line}></div>
            <div className={styles.profile__addresses}>
              <div className={styles.profile__address}>
                <AddressIcon />
                <Text myClass="medium_big" color="dark">
                  {data?.address}
                </Text>
              </div>
              <div className={styles.line}></div>
            </div>
            <NavLink to={PROFILE_EDIT} className={styles.profile__edit}>
              <Text myClass="subtitle">Редактировать профиль</Text>
              <EditIcon />
            </NavLink>
            <div className={styles.profile__bottom}>
              <Button onClick={handleLogout} isAuthButton={true}>
                Выйти
              </Button>
              <Button isAuthButton={true} isDefault={true}>
                Удалить профиль
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

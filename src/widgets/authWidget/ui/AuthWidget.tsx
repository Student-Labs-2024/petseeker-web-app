import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import * as petModel from "@entities/user/index";

import { useAppDispatch, useAppSelector } from "@shared/hooks";

import { Button } from "@shared/ui/button";
import {
  AUTH_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  PROFILE,
} from "@app/router/consts";
import styles from "./auth.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Text } from "@shared/ui/text";
import { ConfirmForm } from "./confirmForm/ConfirmForm";
import { AuthForm } from "./authForm/AuthForm";
import { match } from "ts-pattern";

export const AuthWidget: React.FC = () => {
  const { t } = useTranslation("authWidget");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const phoneNumber = useAppSelector((state) => state.user.phoneNumber);
  const name = useAppSelector((state) => state.user.name);
  const code = useAppSelector((state) => state.user.code);
  const isConfirm = useAppSelector((state) => state.user.isConfirm);
  const [login, { isLoading: isSendingLogin }] =
    petModel.api.useLoginMutation();
  const [
    confirm,
    { isLoading: isSendingConfirm, isSuccess: isConfirmSuccess, isError },
  ] = petModel.api.useConfirmMutation();
  const isAuth = location.pathname === AUTH_ROUTE;

  const handleClickSubmit = async () => {
    try {
      const response = await login({ phone_number: phoneNumber }).unwrap();

      if (response.success) {
        dispatch(petModel.slice.setIsConfirm(true));
      }
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  const handleClickConfirm = async () => {
    try {
      const response = await confirm({
        phone_number: phoneNumber,
        code: code,
      }).unwrap();
      if (response.message) {
        // dispatch(setToken(response.token));
        navigate(PROFILE);
      }
    } catch (err) {
      console.error("Failed to confirm", err);
    }
  };
  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const onlyNumbers = value.replace(/\D/g, "");
    dispatch(petModel.slice.setPhoneNumber(onlyNumbers));
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(petModel.slice.setName(event.target.value));
  };

  const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const masked = value.replace(/\D/g, "");
    dispatch(petModel.slice.setCode(masked));
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.title}>
          <NavLink to={MAIN_ROUTE}>
            <Text tag={"h1"} myClass="title">
              PetSeeker
            </Text>
          </NavLink>
        </div>
        {isConfirm && (
          <div className={styles.confirm__text}>
            <Text myClass="subtitle">Введите код из смс</Text>
            <Text myClass="medium">Отправили на +7 000 ***-**-00</Text>
          </div>
        )}

        <div className={styles.auth__top}>
          <Button
            isAuthButton={true}
            onClick={() => navigate(AUTH_ROUTE)}
            isDefault={isAuth}
          >
            {t("Login")}
          </Button>
          <Button
            isAuthButton={true}
            onClick={() => navigate(REGISTRATION_ROUTE)}
            isDefault={!isAuth}
          >
            {t("Register")}
          </Button>
        </div>
        {match(isConfirm)
          .with(false, () => (
            <AuthForm
              handleClickSubmit={handleClickSubmit}
              handleChangePhone={handleChangePhone}
              handleChangeName={handleChangeName}
              phoneNumber={phoneNumber}
              name={name}
              isAuth={isAuth}
              isSendingLogin={isSendingLogin}
            ></AuthForm>
          ))
          .with(true, () => (
            <ConfirmForm
              isSendingConfirm={isSendingConfirm}
              isSendingLogin={isSendingLogin}
              handleClickConfirm={handleClickConfirm}
              handleClickSubmit={handleClickSubmit}
              handleChangeCode={handleChangeCode}
            ></ConfirmForm>
          ))
          .exhaustive()}
        <div className={styles.agree_message}>
          {" "}
          <Text>{t("AgreeMessage")}</Text>
        </div>
      </div>
    </div>
  );
};

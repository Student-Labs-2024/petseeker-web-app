import React, { ChangeEvent } from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { userModel } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Button } from "@shared/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { Text } from "@shared/ui/text";
import { ConfirmForm } from "./confirmForm/ConfirmForm";
import { AuthForm } from "./authForm/AuthForm";
import { match } from "ts-pattern";
import { phoneConsts, nameConsts, codeConsts } from "@shared/constants";
import InputMask from "react-input-mask-next";
import styles from "./auth.module.scss";
import { AUTH_ROUTE, MAIN_ROUTE, PROFILE } from "@app/router/consts";
export const AuthWidget: React.FC = () => {
  const { t } = useTranslation("authWidget");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const phoneNumber = useAppSelector((state) => state.user.phoneNumber);
  const code = useAppSelector((state) => state.user.code);
  const isConfirm = useAppSelector((state) => state.user.isConfirm);
  const [login, { isLoading: isSendingLogin }] = userModel.useLoginMutation();
  const [
    confirm,
    { isLoading: isSendingConfirm, isSuccess: isConfirmSuccess, isError },
  ] = userModel.useConfirmMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phoneNumber: phoneNumber,

      code: code,
    },
  });

  const handleClickSubmit = async () => {
    try {
      const response = await login({ phone_number: phoneNumber }).unwrap();
      if (response.success) {
        dispatch(userModel.setIsConfirm(true));
        reset();
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
        dispatch(userModel.setAuthenticated(true));
        navigate(PROFILE);
      }
    } catch (err) {
      console.error("Failed to confirm", err);
    }
  };

  const onSubmit = async (data: any) => {
    if (isConfirm) {
      await handleClickConfirm();
    } else {
      await handleClickSubmit();
    }
  };
  const handleChangePhone = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>
  ) => {
    const value = event.target.value;
    const onlyNumbers = value.replace(/\D/g, "");
    field.onChange(onlyNumbers);
    dispatch(userModel.setPhoneNumber(onlyNumbers));
  };
  const handleChangeCode = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>
  ) => {
    const value = event.target.value;
    const onlyNumbers = value.replace(/\D/g, "");
    field.onChange(onlyNumbers);
    dispatch(userModel.setCode(onlyNumbers));
  };
  const maskedNumber = (phoneNumber: string): string => {
    return `+${phoneNumber[0]} ${phoneNumber.slice(1, 4)} ***-**-${phoneNumber.slice(9)}`;
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

        <div className={styles.confirm__text}>
          {isConfirm ? (
            <>
              <Text myClass="btn">Введите код из смс</Text>
              <Text myClass="medium">
                Отправили на {maskedNumber(phoneNumber)}
              </Text>
            </>
          ) : (
            <>
              {" "}
              <Text myClass="btn">Введите номер телефона</Text>
            </>
          )}
        </div>

        {match(isConfirm)
          .with(false, () => (
            <AuthForm
              handleChangePhone={handleChangePhone}
              control={control}
              handleSubmit={handleSubmit(onSubmit)}
              isSendingLogin={isSendingLogin}
            />
          ))
          .with(true, () => (
            <ConfirmForm
              control={control}
              handleChangeCode={handleChangeCode}
              handleSubmit={handleSubmit(onSubmit)}
              isSendingConfirm={isSendingConfirm}
              isSendingLogin={isSendingLogin}
            />
          ))
          .exhaustive()}
        <div className={styles.agree_message}>
          <Text>{t("AgreeMessage")}</Text>
        </div>
      </div>
    </div>
  );
};

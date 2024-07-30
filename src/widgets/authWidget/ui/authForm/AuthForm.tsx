import React from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@shared/ui/button";
import InputMask from "react-input-mask-next";
import { phoneConsts, nameConsts } from "@shared/constants";
import { useTranslation } from "react-i18next";
import { Form } from "@shared/ui/form";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";
import styles from "./authForm.module.scss";
type AuthFormProps = {
  handleClickSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangePhone?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  phoneNumber?: string;
  name?: string;
  isSendingLogin?: boolean;
  isAuth?: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  handleClickSubmit,
  handleChangePhone,
  handleChangeName,
  isAuth,
  phoneNumber,
  name,
  isSendingLogin,
}) => {
  const { t } = useTranslation("authForm");
  const textAuthButton = isAuth ? t("enter") : t("registration");
  return (
    <Form>
      <div className={styles.input_container}>
        <Label>
          <Text myClass="label">{t("number")}</Text>
          <InputMask
            onChange={handleChangePhone}
            value={phoneNumber}
            mask={phoneConsts.mask}
            placeholder={phoneConsts.placeholder}
          >
            <Input />
          </InputMask>
        </Label>

        {!isAuth && (
          <Label>
            <Text myClass="label">{t("name")}</Text>
            <Input
              value={name}
              onChange={handleChangeName}
              placeholder={nameConsts.placeholder}
            />
          </Label>
        )}
      </div>
      <Button
        type="button"
        onClick={handleClickSubmit}
        disabled={isSendingLogin}
        isAuthButton={true}
      >
        {textAuthButton}
      </Button>
    </Form>
  );
};

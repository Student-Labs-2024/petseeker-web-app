import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@shared/ui/button";
import InputMask from "react-input-mask-next";
import { phoneConsts, nameConsts } from "@shared/constants";
import { useTranslation } from "react-i18next";
import { Form } from "@shared/ui/form";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";
import styles from "./authForm.module.scss";
import { validateMask } from "@/shared/hooks/isValidMask";
type AuthFormProps = {
  handleClickSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangePhone?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => void;
  handleChangeName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  control: any;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSendingLogin?: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  handleChangePhone,
  control,
  handleSubmit,

  isSendingLogin,
}) => {
  const { t } = useTranslation("authForm");

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <Label>
          <Text myClass="label">{t("number")}</Text>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: t("fillInTheField"),
              validate: (value) => validateMask(value, phoneConsts.mask),
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputMask
                value={field.value}
                mask={phoneConsts.mask}
                placeholder={phoneConsts.placeholder}
                onChange={(e) => handleChangePhone(e, field)}
              >
                <Input
                  errorMessage={
                    fieldState.invalid ? t("fillInTheField") : false
                  }
                  ref={field.ref}
                />
              </InputMask>
            )}
          />
        </Label>
      </div>
      <Button type="submit" disabled={isSendingLogin} isAuthButton={true}>
        {t("registration")}
      </Button>
    </Form>
  );
};

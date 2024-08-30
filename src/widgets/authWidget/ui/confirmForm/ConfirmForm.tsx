import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@shared/ui/button";
import styles from "./confirmForm.module.scss";
import InputMask from "react-input-mask-next";
import { codeConsts } from "@shared/constants";
import { useTranslation } from "react-i18next";
import { Form } from "@shared/ui/form";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";

import { validateMask } from "@/shared/hooks/isValidMask";
type ConfirmFormProps = {
  control: any;
  handleChangeCode?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSendingConfirm?: boolean;
  isSendingLogin?: boolean;
};

export const ConfirmForm: React.FC<ConfirmFormProps> = ({
  control,
  handleSubmit,
  handleChangeCode,
  isSendingConfirm,
  isSendingLogin,
}) => {
  const { t } = useTranslation("confirmForm");

  return (
    <div className={styles.confirm}>
      <Form onSubmit={handleSubmit}>
        <Label>
          <div className={styles.code_mask}>
            <Controller
              name="code"
              control={control}
              rules={{
                required: t("fillInTheField"),
                validate: (value) => validateMask(value, codeConsts.mask),
              }}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputMask
                  value={field.value}
                  mask={codeConsts.mask}
                  placeholder={codeConsts.placeholder}
                  onChange={(e) => handleChangeCode(e, field)}
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
          </div>
        </Label>
        <Button type="submit" isAuthButton={true} disabled={isSendingConfirm}>
          {t("next")}
        </Button>
        <Button
          isAuthButton={true}
          isDefault={true}
          type="button"
          disabled={isSendingConfirm || isSendingLogin}
        >
          {t("sendCodeAgain")}
        </Button>
      </Form>
    </div>
  );
};

import React from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@shared/ui/button";
import styles from "./confirmForm.module.scss";
import InputMask from "react-input-mask-next";
import { codeConsts } from "@shared/constants";
import { useTranslation } from "react-i18next";
import { Form } from "@shared/ui/form";
import { Text } from "@shared/ui/text";
type ConfirmFormProps = {
  handleClickSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCode?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  code?: string;
  isSendingConfirm?: boolean;
  isSendingLogin?: boolean;
};
export const ConfirmForm: React.FC<ConfirmFormProps> = ({
  handleClickSubmit,
  handleClickConfirm,
  handleChangeCode,
  code,
  isSendingConfirm,
  isSendingLogin,
}) => {
  const { t } = useTranslation("confirmForm");
  return (
    <div className={styles.confirm}>
      <Form>
        <div className={styles.code_mask}>
          <InputMask
            mask={codeConsts.mask}
            value={code}
            onChange={handleChangeCode}
            placeholder={codeConsts.placeholder}
          >
            <Input />
          </InputMask>
        </div>
        <Button
          isAuthButton={true}
          type="button"
          onClick={handleClickConfirm}
          disabled={isSendingConfirm}
        >
          {t("next")}
        </Button>
        <Button
          isAuthButton={true}
          isDefault={true}
          type="button"
          onClick={handleClickSubmit}
          disabled={isSendingConfirm || isSendingLogin}
        >
          {t("sendCodeAgain")}
        </Button>
      </Form>
    </div>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./AddShelter.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { innConsts, ogrnConsts } from "@shared/constants";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask-next";
import { AddShelterFormType, InfoFormProps } from "../model/type";
import { validateMask } from "@shared/hooks/idValidMask";
export const DocumentsForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  onSubmitForm,
  control,

  handleFieldChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Text myClass="btn">Укажите идентификационный номер</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="medium_big">ИНН</Text>

            <Controller
              name="inn"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => validateMask(value, innConsts.mask),
              }}
              render={({ field }) => (
                <InputMask
                  placeholder={innConsts.placeholder}
                  maskPlaceholder={innConsts.maskChar}
                  mask={innConsts.mask}
                  value={field.value}
                  onChange={(e) => handleFieldChange(e, field)}
                >
                  <Input ref={field.ref} myClass="form_input" />
                </InputMask>
              )}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="medium_big">ОГРН</Text>

            <Controller
              name="ogrn"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => validateMask(value, ogrnConsts.mask),
              }}
              render={({ field }) => (
                <InputMask
                  placeholder={ogrnConsts.placeholder}
                  maskPlaceholder={ogrnConsts.maskChar}
                  mask={ogrnConsts.mask}
                  value={field.value}
                  onChange={(e) => handleFieldChange(e, field)}
                >
                  <Input ref={field.ref} myClass="form_input" />
                </InputMask>
              )}
            />
          </Label>
        </div>
        <div className={styles.bottom}>
          <Button isAuthButton={true} onClick={onSubmitForm} type="submit">
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};

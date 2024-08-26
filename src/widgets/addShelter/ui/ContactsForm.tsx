import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./AddShelter.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { tgConsts, phoneConsts } from "@shared/constants";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask-next";
import { InfoFormProps } from "../model/type";
import { validateMask } from "@/shared/hooks/isValidMask";

export const ContactsForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  onSubmitForm,
  control,
  register,
  handleFieldChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Text myClass="btn">Контактные данные</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="medium_big">Номер</Text>

            <Controller
              name="telephone_number"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => validateMask(value, phoneConsts.mask),
              }}
              render={({ field }) => (
                <InputMask
                  placeholder={phoneConsts.placeholder}
                  maskPlaceholder={phoneConsts.maskChar}
                  mask={phoneConsts.mask}
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
            <Text myClass="medium_big">Ссылка на соцсети</Text>

            <Controller
              name="social_network_1"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  ref={field.ref}
                  placeholder={tgConsts.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
              )}
            />
          </Label>
        </div>
        <div className={styles.form__item}>
          <Label>
            <Text myClass="medium_big">Ссылка на соцсети</Text>

            <Controller
              name="social_network_2"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  ref={field.ref}
                  placeholder={tgConsts.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
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

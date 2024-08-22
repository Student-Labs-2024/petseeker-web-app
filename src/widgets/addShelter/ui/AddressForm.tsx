import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./AddShelter.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";

import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { shelterAddressConsts } from "@shared/constants";

import { Controller } from "react-hook-form";

import { InfoFormProps } from "../model/type";
export const AddressForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  control,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Text myClass="btn">Добавление адреса</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  ref={field.ref}
                  placeholder={shelterAddressConsts.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  myClass="form_input"
                />
              )}
            />
          </Label>
        </div>

        <div className={styles.bottom}>
          <Button isAuthButton={true} type="submit">
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};

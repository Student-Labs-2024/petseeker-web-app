import React, { useEffect, useState } from "react";
import * as petModel from "@entities/pet/index";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { Label } from "@shared/ui/label";
import { Radio } from "@shared/ui/radio";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";
import { TextArea } from "@/shared/ui/textArea";
interface InfoFormProps {
  onChangeForm: (data: any) => void;
  handleNext: (data: any) => void;
  control: any;
  register: UseFormRegister<any>;
  onSubmitForm: (data: any) => void;
}
export const AddressForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  onSubmitForm,
  control,
  register,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Адрес</Text>
      </div>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <Label>
            <Input
              placeholder="Укажите место"
              myClass="form_input"
              register={register("address", { required: true })}
            />
          </Label>
        </div>
        <div className={styles.bottom}>
          <Button onClick={onSubmitForm} type="submit">
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

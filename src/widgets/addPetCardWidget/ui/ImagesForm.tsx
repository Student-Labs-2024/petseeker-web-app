import React, { useEffect, useState } from "react";
import * as petModel from "@entities/pet/index";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";

import { Button } from "@shared/ui/button";

import { UseFormRegister } from "react-hook-form";
import { TextArea } from "@/shared/ui/textArea";
import { ReactComponent as ImageIcon } from "@shared/assets/image_icon.svg";
interface InfoFormProps {
  onChangeForm: (data: any) => void;
  handleNext: (data: any) => void;
  control: any;
  register: UseFormRegister<any>;
}
export const ImagesForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  control,
  register,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Добавьте фотографии</Text>
      </div>
      <Text color="dark" myClass="btn">
        не более 10 изображений
      </Text>
      <form onSubmit={onChangeForm} className={styles.form}>
        <div className={styles.form__item}>
          <label className={styles.upload_image}>
            <ImageIcon />
            <Text color="gray">Выбрать изображение</Text>
            <input multiple type="file" />
          </label>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

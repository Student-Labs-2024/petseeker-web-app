import React from "react";

import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./ImageForm.module.scss";

import { Controller } from "react-hook-form";

import { ReactComponent as ImageIcon } from "@shared/assets/image_icon.svg";
import editIcon from "@shared/assets/edit_icon.svg";
import { Control } from "react-hook-form";
type InfoFormProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  control?: Control<any>;
  previewUrl?: string;
};

export const ImageForm: React.FC<InfoFormProps> = ({
  previewUrl,
  control,
  handleFileChange,
}) => {
  return (
    <div className={styles.form__item}>
      <div className={styles.images_container}>
        <div className={styles.form__preview}>
          <div className={styles.text_container}>
            <Text color="white" myClass="small_bold">
              Главная
            </Text>
          </div>

          {previewUrl && (
            <img
              className={styles.preview_image}
              src={previewUrl}
              alt="Preview"
            />
          )}
          <button className={styles.edit_btn}>
            <img src={editIcon} alt="" />
          </button>
        </div>

        <label className={styles.upload_image}>
          <ImageIcon />
          <Text color="gray">Выбрать изображение</Text>
          <Controller
            name="imageFiles"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, ref, disabled } }) => (
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                disabled={disabled}
                ref={ref}
                onChange={(e) => handleFileChange(e, onChange)}
              />
            )}
          />
        </label>
      </div>
    </div>
  );
};

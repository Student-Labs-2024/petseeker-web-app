import React, { useEffect, useState } from "react";
import { petModel } from "@entities/pet/index";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@shared/ui/button";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { TextArea } from "@/shared/ui/textArea";
import { ReactComponent as ImageIcon } from "@shared/assets/image_icon.svg";
import { InfoFormProps } from "../model/type";

type FormData = {
  imageFiles: FileList;
};
export const ImagesForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
}) => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleImageSave = (data: FormData) => {
    const filesArray = Array.from(data.imageFiles);
    dispatch(petModel.addImages(filesArray));
    setPreviewUrl(URL.createObjectURL(filesArray[0]));
    handleNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Star />
        <Text myClass="bold_big">Добавьте фотографии</Text>
      </div>
      <Text color="dark" myClass="btn">
        не более 10 изображений
      </Text>
      <form onSubmit={handleSubmit(handleImageSave)} className={styles.form}>
        <div className={styles.form__item}>
          <label className={styles.upload_image}>
            <ImageIcon />
            <Text color="gray">Выбрать изображение</Text>
            <Controller
              name="imageFiles"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, ref, disabled } }) => (
                <input
                  type="file"
                  multiple
                  disabled={disabled}
                  ref={ref}
                  onChange={(e) => {
                    onChange(e.target.files);
                    if (e.target.files && e.target.files.length > 0) {
                      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              )}
            />
          </label>
          {previewUrl && (
            <div>
              <h3>Предварительный просмотр первой фотографии:</h3>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

import React from "react";
import * as petModel from "@entities/pet/index";
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
import editIcon from "@shared/assets/edit_icon.svg";

type FormData = {
  imageFiles: FileList | null;
};

export const ImagesForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
}) => {
  const storedImages = useAppSelector((state) => state.pets.images);
  const previewUrl = useAppSelector((state) => state.pets.previewUrl);
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      imageFiles:
        storedImages.length > 0 ? (storedImages as unknown as FileList) : null,
    },
  });
  const dispatch = useAppDispatch();

  const handleImageSave = (files: FileList) => {
    const filesArray = Array.from(files);
    dispatch(petModel.slice.addImages(filesArray));
    if (filesArray.length > 0) {
      const preview = URL.createObjectURL(filesArray[0]);
      dispatch(petModel.slice.setPreviewUrl(preview));
    }
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList | null) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageSave(e.target.files);
      onChange(e.target.files);
    }
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
      <form onSubmit={handleSubmit(handleNext)} className={styles.form}>
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
                render={({ field: { onChange, ref, disabled } }) => (
                  <input
                    type="file"
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
        <div className={styles.bottom}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </div>
  );
};

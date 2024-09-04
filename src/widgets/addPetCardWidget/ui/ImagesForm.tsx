import React from "react";
import { useTranslation } from "react-i18next";
import { petModel } from "@entities/pet/index";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@shared/ui/button";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { ImageForm } from "@entities/imageForm";
import { InfoFormProps } from "../model/type";

type FormData = {
  imageFiles: FileList | null;
};

export const ImagesForm: React.FC<InfoFormProps> = ({
  onChangeForm,
  handleNext,
  t,
}) => {
  const storedImages = useAppSelector((state) => state.pets.images);
  const previewUrl = useAppSelector((state) => state.pets.previewUrl);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      imageFiles:
        storedImages.length > 0 ? (storedImages as unknown as FileList) : null,
    },
  });
  const dispatch = useAppDispatch();

  const handleImageSave = (files: FileList) => {
    const filesArray = Array.from(files);
    dispatch(petModel.addImages(filesArray));
    if (filesArray.length > 0) {
      const preview = URL.createObjectURL(filesArray[0]);
      dispatch(petModel.setPreviewUrl(preview));
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
        <Text myClass="bold_big">{t("addPhotos")}</Text>
      </div>
      <Text color="dark" myClass="btn">
        {t("maxImages")}
      </Text>
      <form onSubmit={handleSubmit(handleNext)} className={styles.form}>
        <ImageForm
          previewUrl={previewUrl}
          handleFileChange={handleFileChange}
          control={control}
        />
        <div className={styles.bottom}>
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </div>
  );
};

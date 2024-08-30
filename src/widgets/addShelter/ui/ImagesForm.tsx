import React from "react";
import { petModel } from "@entities/pet/index";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./AddShelter.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { useForm } from "react-hook-form";
import { Button } from "@shared/ui/button";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { InfoFormProps } from "../model/type";
import { ImageForm } from "@entities/imageForm";
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
        <Text myClass="btn">Добавьте фотографии</Text>
      </div>
      <Text color="dark" myClass="btn">
        не более 10 изображений
      </Text>
      <form onSubmit={handleSubmit(handleNext)} className={styles.form}>
        <ImageForm
          previewUrl={previewUrl}
          handleFileChange={handleFileChange}
          control={control}
        />
        <div className={styles.bottom}>
          <Button isAuthButton={true} type="submit">
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as petModel from "@entities/pet/index";

import { useTranslation } from "react-i18next";

import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Back } from "@shared/assets/back_arrow_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import { MAIN_ROUTE } from "@/app/router/consts";
import { useNavigate, Navigate } from "react-router-dom";
import { match } from "ts-pattern";
import { TypeForm } from "./TypeForm";
import { CharacteristicForm1 } from "./CharacteristicForm1";
import { InfoForm } from "./InfoForm";
import { CharacteristicForm2 } from "./CharacteristicForm2";
import { CharacteristicForm3 } from "./CharacteristicForm3";
import { CharacteristicForm4 } from "./CharacteristicForm4";
import { DescriptionForm } from "./DescriptionForm";
import { ImagesForm } from "./ImagesForm";
import { AddressForm } from "./AddressForm";
export const PetCardForm: React.FC = () => {
  const { t } = useTranslation("petCardForm");
  const step = useAppSelector((state) => state.pets.step);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedImages = useAppSelector((state) => state.pets.images);
  const [addPetCard, { isLoading, error: errorMessage }] =
    petModel.api.useAddPetCardMutation();
  // const { data: petTypes = [], isLoading: petTypesLoading } =
  //   petModel.api.useGetPetTypesQuery();
  const [uploadImage, { isLoading: isUploadImageLoading }] =
    petModel.api.useUploadImageMutation();
  const formData = useAppSelector((state) => state.pets.data);
  const { control, handleSubmit, register, getValues, setValue, watch } =
    useForm({
      defaultValues: {
        pet_type: formData.pet_type,
        name: formData.name,
        gender: formData.gender,
        allergenicity: formData.allergenicity,
        fatness: formData.fatness,
        weight: formData.weight,
        breed: formData.breed,
        age: formData.age,
        wool_type: formData.wool_type,
        sterilization: formData.sterilization,
        // health_issues: formData.health_issues,
        vaccinations: formData.vaccinations,
        address: formData.address,
        description: formData.description,
        //временно
        status: "Нашел",
        dimmensions: "0",
        weigth: "0",
        contacts: "0",
        color: "0",
        state: "string",
        health_issues: "string",
      },
    });

  const handleBack = () => {
    if (step === 1) {
      navigate(MAIN_ROUTE);
    } else {
      dispatch(petModel.slice.prevStep());
    }
  };
  const handleSave = () => {
    navigate(MAIN_ROUTE);
    onChangeForm(getValues());
    localStorage.setItem("announcmentFormData", JSON.stringify(getValues()));
  };

  const handleNext = () => {
    dispatch(petModel.slice.nextStep());
  };
  const onChangeForm = (data: any) => {
    dispatch(petModel.slice.setFormData(data));

    handleNext();
  };
  const onSubmitForm = async () => {
    try {
      const response = await addPetCard(getValues()).unwrap();

      handleUploadStoredImages(response?.id);
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.error(errorMessage);
    }
  };

  const handleUploadStoredImages = async (id: string) => {
    if (storedImages.length !== 0) {
      const formData = new FormData();
      storedImages.forEach((file) => formData.append("files", file));
      try {
        const response = await uploadImage({ id: id, formData }).unwrap();
        dispatch(petModel.slice.clearImages());
      } catch (error) {
        console.error("Ошибка загрузки изображения:", error);
      }
    }
  };
  return (
    <>
      <div className={styles.form}>
        <div className={styles.form__top}>
          <button onClick={handleBack} className={styles.form__back}>
            <Back />
          </button>
          <button onClick={handleSave} className={styles.form__save}>
            <Text myClass="medium" color="btn_color">
              Сохранить и выйти
            </Text>
          </button>
        </div>
        {match(step)
          .with(1, () => <TypeForm />)
          .with(2, () => (
            <InfoForm
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(3, () => (
            <CharacteristicForm1
              getValues={getValues}
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(4, () => (
            <CharacteristicForm2
              watch={watch}
              getValues={getValues}
              register={register}
              onChangeForm={handleSubmit(onChangeForm)}
              setValue={setValue}
            />
          ))
          .with(5, () => (
            <CharacteristicForm3
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(6, () => (
            <CharacteristicForm4
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(7, () => (
            <DescriptionForm
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(8, () => (
            <ImagesForm
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(9, () => (
            <AddressForm
              control={control}
              register={register}
              handleNext={handleNext}
              onSubmitForm={onSubmitForm}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .otherwise(() => null)}
      </div>
    </>
  );
};

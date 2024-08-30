import React, { ChangeEvent } from "react";
import { useForm, SubmitHandler, ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { shelterModel } from "@/entities/shelter";
import { Text } from "@shared/ui/text";
import styles from "./AddShelter.module.scss";
import { ReactComponent as Back } from "@shared/assets/back_arrow_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import { SHELTER, PROFILE } from "@/app/router/consts";
import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";
import { AddressForm } from "./AddressForm";
import { DescriptionForm } from "./DescriptionForm";
import { ContactsForm } from "./ContactsForm";
import { DocumentsForm } from "./DocumentsForm";
import { NameForm } from "./NameForm";
import { ImagesForm } from "./ImagesForm";

export const AddShelterForm: React.FC = () => {
  const { t } = useTranslation("petCardForm");
  const step = useAppSelector((state) => state.shelter.step);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedImages = useAppSelector((state) => state.shelter.images);
  const [addShelter, { isLoading, error: errorMessage }] =
    shelterModel.useAddShelterMutation();

  const [uploadImage, { isLoading: isUploadImageLoading }] =
    shelterModel.useUploadAvatarMutation();
  const formData = useAppSelector((state) => state.shelter.data);

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: formData.address,
      description: formData.address,
      inn: formData.inn,
      name: formData.name,
      ogrn: formData.ogrn,
      social_network_1: formData.social_network_1,
      social_network_2: formData.social_network_2,
      telephone_number: formData.telephone_number,
    },
  });

  const handleBack = () => {
    if (step === 1) {
      navigate(PROFILE);
    } else {
      dispatch(shelterModel.prevStep());
    }
  };

  const handleNext = () => {
    dispatch(shelterModel.nextStep());
  };
  const onChangeForm: SubmitHandler<shelterModel.FormDataType> = (data) => {
    dispatch(shelterModel.setFormData(data));

    handleNext();
  };
  const onSubmitForm = async () => {
    try {
      const response = await addShelter(getValues()).unwrap();

      if (storedImages.length !== 0) {
        handleUploadStoredImages(response?.id);
      } else {
        reset();
        navigate(SHELTER);
      }
    } catch (error) {
      console.error(errorMessage);
    }
  };

  const handleUploadStoredImages = async (id: string) => {
    if (storedImages.length !== 0) {
      const formData = new FormData();
      storedImages.forEach((file) => formData.append("images", file));
      try {
        const response = await uploadImage({ id: id, formData }).unwrap();

        dispatch(shelterModel.clearImages());
        navigate(SHELTER);
      } catch (error) {
        console.error("Ошибка загрузки изображения:", error);
      }
    }
  };
  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>
  ) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    field.onChange(onlyNumbers);
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.form__top}>
          <button onClick={handleBack} className={styles.form__back}>
            <Back />
          </button>
          <div className={styles.text_center}>
            <Text myClass="subtitle">Регистрация приюта</Text>
          </div>
        </div>
        {match(step)
          .with(1, () => (
            <DocumentsForm
              t={t}
              errors={errors}
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
              handleFieldChange={handleFieldChange}
            />
          ))
          .with(2, () => (
            <NameForm
              t={t}
              errors={errors}
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(3, () => (
            <ContactsForm
              setValue={setValue}
              t={t}
              errors={errors}
              getValues={getValues}
              control={control}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
              handleFieldChange={handleFieldChange}
            />
          ))
          .with(4, () => (
            <AddressForm
              t={t}
              errors={errors}
              control={control}
              register={register}
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(5, () => (
            <ImagesForm
              handleNext={handleNext}
              onChangeForm={handleSubmit(onChangeForm)}
            />
          ))
          .with(6, () => (
            <DescriptionForm
              t={t}
              errors={errors}
              control={control}
              register={register}
              handleNext={handleNext}
              onSubmitForm={handleSubmit(onSubmitForm)}
              isLoading={isUploadImageLoading}
            />
          ))

          .otherwise(() => null)}
      </div>
    </>
  );
};

import React, { useEffect, ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { userModel } from "@entities/user/index";
import { Button } from "@shared/ui/button";
import styles from "./editUser.module.scss";
import { Input } from "@/shared/ui/input";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";
import { phoneConsts, tgConsts } from "@shared/constants";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { EditUserType } from "../model/type";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { ReactComponent as BackIcon } from "@shared/assets/back_arrow_icon.svg";
import { PROFILE } from "@/app/router/consts";
import classNames from "classnames";
import InputMask from "react-input-mask-next";
import { useNavigate } from "react-router-dom";
export const EditUser: React.FC = () => {
  const { t } = useTranslation("editUser");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const storedProfileImage = useAppSelector(
    (state) => state.user.profile_image
  );
  const { data: profileData, isLoading } = userModel.useGetMeQuery();
  const defaultValues = {
    name: profileData?.name,
    surname: profileData?.surname,
    phone_number: profileData?.phone_number,
    tg: profileData?.tg,
    patr: profileData?.patr,
    male: profileData?.male,
  };
  const [editUser, { isLoading: isDataLoading }] =
    userModel.useEditUserMutation();
  const [uploadImage, { isLoading: isImageLoading }] =
    userModel.useUploadProfileImageMutation();
  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    trigger,
    reset,
  } = useForm<EditUserType>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<EditUserType> = async (data) => {
    try {
      dispatch(userModel.setProfileData(data));
      const response = await editUser(data).unwrap();
      navigate(PROFILE);
    } catch (error) {
      console.error(error);
    }
  };
  watch();
  useEffect(() => {
    if (profileData) {
      reset(defaultValues);
    }
  }, [profileData]);
  const handleSubmitImage = async () => {
    if (storedProfileImage !== null) {
      const formData = new FormData();
      formData.append("profile_image", storedProfileImage);
      try {
        const response = await uploadImage({ formData }).unwrap();
        dispatch(userModel.setProfileImage(null));
      } catch (error) {
        console.error("Ошибка загрузки изображения:", error);
      }
    }
  };

  const handleMale = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    setValue("male", target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      dispatch(userModel.setProfileImage(e.target.files[0]));
    }
  };
  const handleNavigateBack = () => {
    navigate(PROFILE);
  };

  const avatarClass = classNames(styles.avatar, {
    [styles.avatar_male]: getValues("male") === "true",
    [styles.avatar_female]: getValues("male") === "false",
  });

  const textSubmitButton =
    isDataLoading || isImageLoading ? "Загрузка" : "Сохранить";

  return (
    <div className={styles.auth}>
      <div className={styles.top}>
        <button onClick={handleNavigateBack}>
          <BackIcon />
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Text myClass="bold_medium_big">Редактирование профиля</Text>
        <label className={avatarClass}>
          <div className={styles.avatar__logo}>
            {storedProfileImage && (
              <img
                className={styles.preview_image}
                src={URL.createObjectURL(storedProfileImage)}
                alt=""
              />
            )}

            <div className={styles.avatar__camera}></div>
          </div>

          <input type="file" onChange={handleFileChange} />
        </label>

        <Label>
          <Text myClass="medium_big">Фамилия</Text>
          <Input
            placeholder="Фамилия"
            myClass="form_input"
            id="surname"
            register={register("surname")}
          />
        </Label>
        <Label>
          <Text myClass="medium_big">Имя</Text>
          <Input
            placeholder="Имя"
            myClass="form_input"
            id="name"
            register={register("name")}
          />
        </Label>
        <Label>
          <Text myClass="medium_big">Отчество</Text>
          <Input
            placeholder="Отчество"
            myClass="form_input"
            id="phone_number"
            register={register("patr")}
          />
        </Label>
        <Label>
          <Text myClass="medium_big">Пол</Text>
          <div className={styles.checkBox__container}>
            <Button
              isSmall={true}
              isDefault={getValues("male") !== "true"}
              name="male"
              value="true"
              onClick={handleMale}
            >
              Мужской
            </Button>
            <Button
              isSmall={true}
              isDefault={getValues("male") !== "false"}
              name="male"
              value="false"
              onClick={handleMale}
            >
              Женский
            </Button>
          </div>
        </Label>
        <Label>
          <Text myClass="medium_big">Номер</Text>

          <Controller
            name="phone_number"
            control={control}
            defaultValue=""
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <InputMask
                placeholder={phoneConsts.placeholder}
                mask={phoneConsts.mask}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                <Input myClass="form_input" />
              </InputMask>
            )}
          />
        </Label>
        <Label>
          <Text myClass="medium_big"> Никнейм</Text>
          <Controller
            name="tg"
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^@[a-zA-Z0-9_]{1,32}$/,
                message: "",
              },
            }}
            render={({ field }) => (
              <InputMask
                placeholder={tgConsts.placeholder}
                mask={tgConsts.mask}
                maskPlaceholder={tgConsts.maskChar}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                <Input myClass="form_input" />
              </InputMask>
            )}
          />
        </Label>
        <div className={styles.bottom}>
          <Button onClick={handleSubmitImage} type="submit">
            {textSubmitButton}
          </Button>
        </div>
      </form>
    </div>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import * as userModel from "@entities/user/index";
import { Button } from "@shared/ui/button";
import styles from "./editUser.module.scss";
import { Input } from "@/shared/ui/input";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { EditUserType } from "../model/type";
import { useAppSelector } from "@/shared/hooks";
import { ReactComponent as BackIcon } from "@shared/assets/back_arrow_icon.svg";
export const EditUser: React.FC = () => {
  const { t } = useTranslation("editUser");
  const [editUser, { isLoading }] = userModel.api.useEditUserMutation();
  const onSubmit: SubmitHandler<EditUserType> = async (data) => {
    console.log(data);
    try {
      const response = await editUser(data).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // const profileData = useAppSelector((state) => state.user.profileData);
  const profileData = {};
  const { control, handleSubmit, register, getValues, setValue, watch } =
    useForm<EditUserType>({
      defaultValues: {
        name: profileData.name,
        contacts: profileData.contacts,
        tg: profileData.tg,
        patr: profileData.patr,
        male: profileData.male,
      },
    });
  const handleMale = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    setValue("male", target.value);
  };

  const textSubmitButton = isLoading ? t("loading") : t("save");
  return (
    <div className={styles.auth}>
      <div className={styles.top}>
        <button>
          <BackIcon />
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Text>Редактирование профиля</Text>

        <Label>
          <Text>Фамилия</Text>
          <Input myClass="form_input" id="name" register={register("name")} />
        </Label>
        <Label>
          <Text>Имя</Text>
          <Input
            myClass="form_input"
            id="contacts"
            register={register("contacts")}
          />
        </Label>
        <Label>
          <Text>Отчество</Text>
          <Input
            myClass="form_input"
            id="contacts"
            register={register("patr")}
          />
        </Label>
        <Label>
          <Text>Пол</Text>
          <div className={styles.checkBox__container}>
            <Button
              isSmall={true}
              isDefault={!!profileData?.male}
              name="male"
              value="true"
              onClick={handleMale}
            >
              Мужской
            </Button>
            <Button
              isSmall={true}
              isDefault={!!!profileData?.male}
              name="male"
              value="false"
              onClick={handleMale}
            >
              Женский
            </Button>
          </div>
        </Label>
        <Label>
          <Text>Номер</Text>
          <Input
            myClass="form_input"
            id="contacts"
            register={register("patr")}
          />
        </Label>
        <Label>
          <Text>Никнейм</Text>
          <Input
            myClass="form_input"
            id="contacts"
            register={register("patr")}
          />
        </Label>
        <div className={styles.bottom}>
          <Button type="submit">{textSubmitButton}</Button>
        </div>
      </form>
    </div>
  );
};

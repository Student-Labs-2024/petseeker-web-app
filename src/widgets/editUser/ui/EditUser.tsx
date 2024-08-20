import React from "react";
import { useTranslation } from "react-i18next";
import * as userModel from "@entities/user/index";
import { Button } from "@shared/ui/button";
import styles from "./editUser.module.scss";
import { Input } from "@/shared/ui/input";
import { Form } from "@shared/ui/form";
import { Label } from "@shared/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { EditUserType } from "../model/type";
export const EditUser: React.FC = () => {
  const { register, handleSubmit } = useForm<EditUserType>();
  const { t } = useTranslation("editUser");
  const [editUser, { isLoading }] = userModel.api.useEditUserMutation();
  const onSubmit: SubmitHandler<EditUserType> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contacts", data.contacts);
    // formData.append("is_shelter_owner", data.contacts);
    try {
      const response = await editUser(formData).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const textSubmitButton = isLoading ? t("loading") : t("save");
  return (
    <div className={styles.auth}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          {t("name")}
          <Input id="name" register={register("name")} />
        </Label>
        <Label>
          {t("contacts")}
          <Input id="contacts" register={register("contacts")} />
        </Label>
        <Button type="submit">{textSubmitButton}</Button>
      </Form>
    </div>
  );
};

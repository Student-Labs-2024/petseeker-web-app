import React from "react";
import { useTranslation } from "react-i18next";
import { useAddShelterMutation } from "../../../entities/shelter/index";
import { Button } from "../../../shared/ui/button";
import styles from "./addShelter.module.scss";
import { Input } from "../../../shared/ui/input";
import { Form } from "../../../shared/ui/form";
import { Label } from "../../../shared/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddShelterFormType } from "../model/addShelterType";
export const AddShelter: React.FC = () => {
  const { register, handleSubmit } = useForm<AddShelterFormType>();
  const { t } = useTranslation("AddShelter");
  const [addShelter, { isLoading }] = useAddShelterMutation();
  const onSubmit: SubmitHandler<AddShelterFormType> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("contacts", data.contacts);
    try {
      const response = await addShelter(formData).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const textSubmitButton = isLoading ? t("loading") : t("create");
  return (
    <div className={styles.auth}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          {t("name")}
          <Input id="name" register={register("name", { required: true })} />
        </Label>
        <Label>
          {t("address")}
          <Input
            id="address"
            register={register("address", { required: true })}
          />
        </Label>
        <Label>
          {t("description")}
          <Input
            id="description"
            register={register("description", { required: true })}
          />
        </Label>
        <Label>
          {t("contacts")}
          <Input
            id="contacts"
            register={register("contacts", { required: true })}
          />
        </Label>
        <Button type="submit">{textSubmitButton}</Button>
      </Form>
    </div>
  );
};

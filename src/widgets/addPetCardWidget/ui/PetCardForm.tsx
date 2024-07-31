import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as petModel from "@entities/pet/index";
import { Input } from "@/shared/ui/input";
import { TextArea } from "@shared/ui/textArea";
import { Select } from "@shared/ui/select";
import { Form } from "@shared/ui/form";
import { Button } from "@shared/ui/button";
import { useTranslation } from "react-i18next";
import { PetCardFormType } from "../model/type";
import { Label } from "@shared/ui/label";
export const PetCardForm: React.FC = () => {
  const { t } = useTranslation("petCardForm");

  const { register, handleSubmit } = useForm<PetCardFormType>();
  const [addPetCard, { isLoading, error: errorMessage }] =
    petModel.api.useAddPetCardMutation();
  const { data: petTypes = [], isLoading: petTypesLoading } =
    petModel.api.useGetPetTypesQuery();
  const textSubmitButton = isLoading ? t("loading") : t("create");
  const onSubmit: SubmitHandler<PetCardFormType> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("status", data.status);
    formData.append("age", data.age.toString());
    formData.append("address", data.address);
    formData.append("color", data.color);
    formData.append("dimmensions", data.dimmensions.toString());
    formData.append("health_issues", data.health_issues);
    formData.append("contacts", data.contacts);
    formData.append("weigth", data.weigth.toString());
    Array.from(data.images).forEach((file) => formData.append("images", file));

    try {
      const response = await addPetCard(formData).unwrap();
    } catch (error) {
      console.error(errorMessage);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          {t("name")}
          <Input id="name" register={register("name", { required: true })} />
        </Label>

        <Label>
          {t("images")}{" "}
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            register={register("images")}
          />
        </Label>
        <Label>
          {t("description")}
          <TextArea id="description" register={register("description")} />{" "}
        </Label>
        <Label>
          {t("address")}
          <Input
            id="address"
            register={register("address", { required: true })}
          />
        </Label>
        <Label>
          {t("type")}
          <Select id="type" options={petTypes} register={register("type")} />
        </Label>
        <Label>
          {t("status")}
          <Input
            id="status"
            register={register("status", { required: true })}
          />
        </Label>
        <Label>
          {t("age")}
          <Input
            id="age"
            type="number"
            register={register("age", { required: true })}
          />
        </Label>
        <Label>
          {t("dimmensions")}
          <Input
            type="number"
            id="dimmensions"
            register={register("dimmensions", { required: true })}
          />
        </Label>
        <Label>
          {t("color")}
          <Input id="color" register={register("color", { required: true })} />
        </Label>
        <Label>
          {t("health_issues")}
          <Input
            id="health_issues"
            register={register("health_issues", { required: true })}
          />
        </Label>
        <Label>
          {t("contacts")}
          <Input
            id="contacts"
            register={register("contacts", { required: true })}
          />
        </Label>
        <Label>
          {t("weigth")}
          <Input
            type="number"
            id="weigth"
            register={register("weigth", { required: true })}
          />
        </Label>
        <Label></Label>
        <Label></Label>

        <Button type="submit">{textSubmitButton}</Button>
      </Form>
    </>
  );
};

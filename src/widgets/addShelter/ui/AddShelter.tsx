
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAddShelterMutation } from "../../../entities/shelter/index";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
  setName,
} from "../../../entities/shelter/index";
import { Button } from "../../../shared/ui/button";
import styles from "./addShelter.module.scss";
import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";
import { Input } from "../../../shared/ui/input";
import InputMask from "react-input-mask-next";
import { phoneConsts, nameConsts } from "../../../shared/constants";
import { Form } from "../../../shared/ui/form";
export const AddShelter: React.FC = () => {
  const { t } = useTranslation("AddShelter");
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.shelter.name);
  const [addShelter, { isLoading: isSendingLogin }] = useAddShelterMutation();
  const handleAddShelterSubmit = async () => {
    try {
      const response = await addShelter({ name }).unwrap();

    } catch (err) {
      console.error( err);
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };


  return (
    <div className={styles.auth}>
      <Form>
        <Input
          label={t("name")}
          value={name}
          onChange={handleChangeName}
        />
        <Button
          type="button"
          onClick={handleAddShelterSubmit}
          disabled={isSendingLogin}
        >
          Добавить приют
        </Button> 
      </Form>
    </div>
  );
};

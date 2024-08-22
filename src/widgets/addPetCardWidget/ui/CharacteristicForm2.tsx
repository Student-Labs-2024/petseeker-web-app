import React, { useEffect, useState } from "react";
import * as petModel from "@entities/pet/index";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/text";
import styles from "./petCardForm.module.scss";
import { ReactComponent as Star } from "@shared/assets/star_icon.svg";
import { useAppDispatch } from "@/shared/hooks";
import { useAppSelector } from "@/shared/hooks";
import { Label } from "@shared/ui/label";
import { Radio } from "@shared/ui/radio";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { UseFormRegister, Controller } from "react-hook-form";
import { InfoFormProps } from "../model/type";
import { Modal } from "@shared/ui/modal";
export const CharacteristicForm2: React.FC<InfoFormProps> = ({
  onChangeForm,
  register,
  getValues,
  watch,
  setValue,
}) => {
  const breedValue = watch("breed");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const options = ["Бенгальская", "Европейская", "Бигль"];
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(getValues("breed")?.toLowerCase())
  );
  const handleOptionClick = (option: string) => {
    setValue("breed", option);
    setIsOpenModal(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredOptions[0].length) {
      e.preventDefault();

      handleOptionClick(filteredOptions[0]);
    }
  };
  const handleBlur = (value: string) => {
    if (!options.includes(value)) {
      setValue("breed", "");
    }
  };

  return (
    <>
      {" "}
      <div className={styles.container}>
        {isOpenModal && (
          <Modal isFullScreen={true}>
            <div className={styles.modal__top}>
              <button
                className={styles.modal__close}
                onClick={handleCloseModal}
              ></button>
              <div className={styles.modal__title}>
                <Text myClass="bold_medium_big">Порода</Text>
              </div>
            </div>
            <div className={styles.modal__input}>
              <Input
                onKeyDown={handleInputKeyDown}
                placeholder="Искать"
                myClass="form_input"
                register={register("breed", {
                  required: true,
                  validate: (value) => options.includes(value) || "",
                  onBlur: (e) => handleBlur(e.target.value),
                })}
              />{" "}
            </div>
            <div className={styles.option__list}>
              {filteredOptions.map((option) => (
                <button
                  key={option}
                  className={classNames(styles.option, {
                    [styles.active]: breedValue === option,
                  })}
                  onClick={() => handleOptionClick(option)}
                >
                  <Text color="dark" myClass="medium_big">
                    {" "}
                    {option}
                  </Text>
                </button>
              ))}
            </div>
          </Modal>
        )}

        <div className={styles.top}>
          <Star />
          <Text myClass="bold_big">Характеристики</Text>
        </div>
        <form onSubmit={onChangeForm} className={styles.form}>
          <div className={styles.form__item}>
            <Label>
              <Text myClass="btn">Порода</Text>
              <button
                className={styles.form__input_button}
                type="button"
                onClick={handleOpenModal}
              >
                {breedValue || "Выбрать"}
              </button>
            </Label>
          </div>

          <div className={styles.bottom}>
            <Button type="submit">Далее</Button>
          </div>
        </form>
      </div>
    </>
  );
};

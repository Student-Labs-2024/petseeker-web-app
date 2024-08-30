import {
  Control,
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
  ControllerRenderProps,
} from "react-hook-form";
import { ChangeEvent } from "react";
export type AddShelterFormType = {
  address: string;
  name: string;
  description: string;
  contacts: string;
};

export type InfoFormProps = {
  onChangeForm?: (data: any) => void;
  handleNext?: () => void;
  control?: Control<any>;
  register?: UseFormRegister<any>;
  getValues?: UseFormGetValues<any>;
  watch?: UseFormWatch<any>;
  setValue?: UseFormSetValue<any>;
  onSubmitForm?: (data: any) => void;
  handleFieldChange?: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>
  ) => void;
  t?: any;
  errors?: any;
  isLoading?: boolean;
};

import {
  Control,
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
export type PetCardFormType = {
  name: string;
  images: FileList;
  description: string;
  address: string;
  type: string;
  status: string;
  age: number;
  itn: string;
  color: string;
  dimmensions: number;
  health_issues: string;
  contacts: string;
  weigth: number;
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
};

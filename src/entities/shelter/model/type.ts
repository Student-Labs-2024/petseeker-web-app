export type ShelterState = {
  data: Record<string, any>;
  previewUrl: string;
  images: File[];
  step: number;
};
export type AddShelterResponse = {
  success: boolean;
};

export type AddShelterRequest = {
  name: string;
};
export type UploadImageRequest = {
  id: string;
  formData: FormData;
};

export type FormDataType = {
  address: string;
  contacts: string;
  description: string;
  inn: string;
  name: string;
  ogrn: string;
  telegram: string;
  telephone_number: string;
};

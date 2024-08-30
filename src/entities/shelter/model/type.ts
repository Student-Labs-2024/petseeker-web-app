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
  social_network_1: string;
  social_network_2: string;
  telephone_number: string;
};

export type User = {
  id: string;
  phoneNumber: string;
};
export type UserState = {
  user: User | null;
  phoneNumber: string;
  name: string;
  code: string;
  isConfirm: boolean;
  auth: boolean | null;

  profileData: Record<string, any>;
  profile_image: File;
};

export type LoginResponse = {
  success: boolean;
};

export type LoginRequest = {
  phone_number: string;
  // name: string;
};

export type ConfirmRequest = {
  code: string;
  phone_number: string;
};

export type ConfirmResponse = {
  token: string;
  message: string;
};
export type UploadImageRequest = {
  formData: FormData;
};

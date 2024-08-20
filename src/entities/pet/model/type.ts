export type Pet = {
  id: number;
  name: string;
  status: string;
  published_at: string;
  address: string;
  user: string;
  images?: string[];
};

export type PetDetail = {
  id: number;
  lattitude_longitude?: string;
  address?: string;
  name: string;
  description?: string;
  published_at?: string;
  updated_at?: string;
  contacts?: string;
  pet_type?: string;
  state?: string;
  status?: string;
  breed?: string;
  age?: number;
  gender?: true;
  wool_type?: null;
  color?: string;
  sterilization?: true;
  allergenicity?: null;
  health_issues?: string;
  vaccinations?: true;
  weigth?: number;
  dimmensions?: number;
  temperament?: string;
  shelter?: number;
  images?: string[];
};

export type PetState = {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  activeButton?: string | null;
  openFilters: boolean;
  step: number;
  data: Record<string, any>;
  historySearch: string[];
  searchOnFocus: boolean;
  filters: Record<string, any>;
  announcmentType: AnnouncmentType;
  images: File[];
  ids: number[];
  favoriteFilters: Record<string, any>;
  previewUrl: string;
};
export const announcmentValues = {
  private: "private",
  shelter: "shelter",
  message: "message",
} as const;

export type AnnouncmentType =
  (typeof announcmentValues)[keyof typeof announcmentValues];

export type UploadImageRequest = {
  id: string;
  formData: FormData;
};

export type FormDataType = {
  pet_type: string;
  name: string;
  gender: string;
  allergenicity: string;
  fatness: string;
  weight: string;
  breed: string;
  age: string;
  wool_type: string;
  sterilization: string;
  vaccinations: string;
  address: string;
  description: string;
  status: string;
  dimmensions: string;
  weigth: string;
  contacts: string;
  color: string;
  state: string;
  health_issues: string;
};

export type FilterState = {
  pet_type: string;
  male: string;
  age: string;
  fatness: string;
  health__issues: string;
  wool_type: string;
  allergenicity: string;
};

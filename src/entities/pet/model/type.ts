import { EntityState } from "@reduxjs/toolkit";

export type Pet = {
  id: number;
  name: string;
  status: string;
  published_at: string;
  address: string;
  user: string;
  images?: string[];
};

export type PetApiResponse = {
  results: Pet[];
  next: string | null;
  previous: string | null;
  count: number;
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
  weight?: number;
  dimensions?: number;
  temperament?: string;
  shelter?: number;
  images?: string[];
};

export type Favorite = {
  id: number;
};

export type FavoritesState = EntityState<Favorite, number> & {
  filters: Record<string, any>;
};

export const announcmentValues = {
  private: "/api/private-announcement/create/",
  shelter: "/api/shelter-announcement/create/",
} as const;
export const announcmentState = {
  active: "active",
  in_process: "in_process",
  inactive: "inactive",
} as const;

export const announcmentStatus = {
  find: "find",
  lost: "lost",
  looking_home: "looking_home",
  give: "give",
} as const;
export const announcmentStatusTranslate = {
  find: "Нашел",
  lost: "Потерялась",
  looking_home: "В приюте",
  give: "Отдаю",
} as const;

export const announcmentAge = {
  small: "small",
  young: "young",
  adult: "adult",
  old: "old",
  unknown: "unknown",
} as const;
export const announcmentWoolType = {
  long: "long",
  short: "short",
  fluffy: "fluffy",
  tough: "tough",
  hairless: "hairless",
} as const;

export const announcmentDimensions = {
  thin: "thin",
  average: "average",
  full: "full",
} as const;

export const announcmentPetType = {
  cat: "cat",
  dog: "dog",
} as const;

export type AnnouncmentState =
  (typeof announcmentState)[keyof typeof announcmentState];

export type AnnouncmentDimensions =
  (typeof announcmentDimensions)[keyof typeof announcmentDimensions];

export type AnnouncmentPetType =
  (typeof announcmentPetType)[keyof typeof announcmentPetType];

export type AnnouncmentWoolType =
  (typeof announcmentWoolType)[keyof typeof announcmentWoolType];

export type AnnouncmentStatus =
  (typeof announcmentStatus)[keyof typeof announcmentStatus];

export type UploadImageRequest = {
  id: string;
  formData: FormData;
};

export type AnnouncmentType =
  (typeof announcmentValues)[keyof typeof announcmentValues];

export type FormDataType = {
  pet_type: AnnouncmentPetType;
  name: string;
  gender: boolean;
  allergenicity: boolean;
  dimensions: AnnouncmentDimensions;
  weigth: string;
  breed: string;
  age: string;
  wool_type: AnnouncmentWoolType;
  sterilization: boolean;
  vaccinations: boolean;
  address: string;
  description: string;
  status: AnnouncmentStatus;
  contacts: string;
  color: string;
  state: AnnouncmentState;
  health_issues: boolean;
};

export type FilterState = {
  pet_type: string;
  male: string;
  age: string;
  dimensions: string;
  health__issues: string;
  wool_type: string;
  allergenicity: string;
};

export type PetState = EntityState<Pet, number> & {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  activeButton?: string | null;
  openFilters: boolean;
  step: number;
  data: FormDataType;
  historySearch: string[];
  searchOnFocus: boolean;
  filters: Record<string, any>;
  images: File[];
  ids: number[];
  favoriteFilters: Record<string, any>;
  previewUrl: string;
  addPetUrl: string;

  favorites: FavoritesState;
};

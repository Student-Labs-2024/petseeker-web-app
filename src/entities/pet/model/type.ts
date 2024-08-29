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

  images: File[];
  ids: number[];
  favoriteFilters: Record<string, any>;
  previewUrl: string;
  addPetUrl: string;
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

enum PetDimensions {}
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
  dimensions: string;
  weigth: string;
  breed: string;
  age: string;
  wool_type: string;
  sterilization: string;
  vaccinations: string;
  address: string;
  description: string;
  status: string;
  dimmensions: string;

  contacts: string;
  color: string;
  state: string;
  health_issues: string;
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

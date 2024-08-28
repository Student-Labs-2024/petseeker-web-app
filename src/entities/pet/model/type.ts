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

export type FilterState = {
  pet_type: string;
  male: string;
  age: string;
  fatness: string;
  health__issues: string;
  wool_type: string;
  allergenicity: string;
};

export type Favorite = {
  id: number;
};

export type FavoritesState = EntityState<Favorite, number> & {
  filters: Record<string, any>;
};

export const announcmentValues = {
  private: "private",
  shelter: "shelter",
  message: "message",
} as const;

export type AnnouncmentType =
  (typeof announcmentValues)[keyof typeof announcmentValues];

// Состояние для Pet
export type PetState = EntityState<Pet, number> & {
  loading: boolean;
  error: string | null;
  activeButton?: string | null;
  openFilters: boolean;
  step: number;
  data: Record<string, any>;
  historySearch: string[];
  searchOnFocus: boolean;
  filters: FilterState;
  announcmentType: AnnouncmentType;
  favorites: FavoritesState;
};

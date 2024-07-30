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
};

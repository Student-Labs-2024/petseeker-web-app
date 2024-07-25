export type Pet = {
  id: number;
  name: string;
  published_at:string;
  address: string;
  user: string;
  images?: string[];
};



export type PetState = {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  activeButton?:string | null;
};

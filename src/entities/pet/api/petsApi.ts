import { Pet } from "../index";
import { baseApi } from '../../../shared/api';
import { match, P } from "ts-pattern";
export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], { name?: string; type?: string; age?: number }>({
      query: (params) => {
        let queryString = "/";
        if (params) {
          const queryParts = [];
          if (params.name) queryParts.push(`name=${params.name}`);
          if (queryParts.length) queryString += `?${queryParts.join("&")}`;
          console.log(queryString)
        }
        return queryString;
      },
    }),
  }),
});

export const { useGetPetsQuery } = petsApi;

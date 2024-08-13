import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Address ={
  road?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export const geolocationApi = createApi({
  reducerPath: 'geolocationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://nominatim.openstreetmap.org/' }),
  endpoints: (builder) => ({
    getAddress: builder.query<Address, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: 'reverse',
        params: {
          lat,
          lon,
          format: 'json',
        },
      }),
      transformResponse: (response: any) => ({
        road: response.address.road,
        city: response.address.city,
        state: response.address.state,
        country: response.address.country,
        postalCode: response.address.postcode,
      }),
    }),
  }),
});

export const { useGetAddressQuery } = geolocationApi;

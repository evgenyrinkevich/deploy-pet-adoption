import { apiSlice } from '../api/apiSlice';

export const petsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPetsByUserId: builder.query({
      query: (userId) => `/pets/user/${userId}`,
      providesTags: ['Pets'],
    }),
  }),
});

export const { useGetPetsByUserIdQuery } = petsApiSlice;

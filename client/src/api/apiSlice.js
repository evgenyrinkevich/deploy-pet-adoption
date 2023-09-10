import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../store/authSlice';

const apiUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

const prepareApiHeaders = (headers, { getState }) => {
  const token = getState().auth.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: prepareApiHeaders,
  credentials: 'include',
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    const refreshResult = await baseQuery('/auth/token', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Pets', 'User'],
  endpoints: (builder) => ({
    // Pets queries
    getPets: builder.query({
      query: (queryParams) => {
        return {
          url: '/pets',
          params: queryParams,
        };
      },
      providesTags: ['Pets'],
    }),
    getPetById: builder.query({
      query: (id) => `/pets/${id}`,
      providesTags: ['Pets'],
    }),
    updatePet: builder.mutation({
      query: ({ formData, petId }) => ({
        url: `/pets/${petId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Pets'],
    }),
    addPet: builder.mutation({
      query: (data) => ({
        url: '/pets',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Pets'],
    }),
    adoptPet: builder.mutation({
      query: ({ petId, data }) => ({
        url: `/pets/${petId}/adopt`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Pets'],
    }),
    fosterPet: builder.mutation({
      query: ({ petId, data }) => ({
        url: `/pets/${petId}/adopt`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Pets'],
    }),
    returnPet: builder.mutation({
      query: (petId) => ({
        url: `/pets/${petId}/return`,
        method: 'POST',
      }),
      invalidatesTags: ['Pets'],
    }),
    likePet: builder.mutation({
      query: (petId) => ({
        url: `/pets/${petId}/save`,
        method: 'POST',
      }),
      invalidatesTags: ['Pets'],
    }),
    unlikePet: builder.mutation({
      query: (petId) => ({
        url: `/pets/${petId}/unsave`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});

export const {
  useGetPetsQuery,
  useGetPetByIdQuery,
  useAdoptPetMutation,
  useFosterPetMutation,
  useReturnPetMutation,
  useLikePetMutation,
  useUnlikePetMutation,
  useUpdatePetMutation,
  useAddPetMutation,
} = apiSlice;

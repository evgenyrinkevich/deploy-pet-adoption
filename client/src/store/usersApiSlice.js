import { apiSlice } from '../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getUserInfoById: builder.query({
      query: (id) => `/users/${id}/full`,
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/users/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserInfoByIdQuery,
  useUpdateUserMutation,
} = usersApiSlice;

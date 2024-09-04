import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    getAuthData: builder.query<any, { accessToken: string | undefined }>({
      query: ({ accessToken }) => ({
        url: '/users/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateUserProfile: builder.mutation<
      any,
      { accessToken: string; userData: any }
    >({
      query: ({ accessToken, userData }) => ({
        url: '/users/profile',
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAuthDataQuery,
  useUpdateUserProfileMutation,
} = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
    id: number;
    createdAt: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    status: boolean;
    lastLogin: string;
    roleName: string;
  }

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<User, string>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;

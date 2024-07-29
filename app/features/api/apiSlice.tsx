import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://udemy-lms-be-nestjs.onrender.com/api/v1' }),
    tagTypes: ['user'],
    endpoints: (builder) => ({
      addUser: builder.mutation({
        query: (user) => ({
          url:'/auth/register',
          method: 'POST',
          body: user,
        }),
      }),
    })
})

export const { useAddUserMutation } = apiSlice;
/**import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({}),
});*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Adjust to your API base URL
    endpoints: (builder) => ({
        // Define your endpoints here
        getUsers: builder.query({
            query: () => '/users',
        }),
        // Add more endpoints as needed
    }),
});

export const { useGetUsersQuery } = apiSlice;

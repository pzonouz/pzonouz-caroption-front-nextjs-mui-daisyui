import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoryType } from "../schemas";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/backend/" }),
  endpoints: (builder) => ({
    getCategores: builder.query<categoryType[], void>({
      query: () => `categories`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoresQuery } = api;

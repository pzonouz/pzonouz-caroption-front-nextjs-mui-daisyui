import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  brandType,
  categoryType,
  imageType,
  productType,
  signinType,
  signupType,
} from "../schemas";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  }),

  tagTypes: ["categories", "products", "brands", "images"],
  endpoints: (builder) => ({
    getCategories: builder.query<categoryType[], void>({
      query: () => `categories`,
      providesTags: ["categories"],
    }),
    getParentCategories: builder.query<categoryType[], void>({
      query: () => `parent_categories`,
      providesTags: ["categories"],
    }),
    getCategory: builder.query<categoryType, string>({
      query: (id: string) => `categories/${id}`,
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation<void, Partial<categoryType>>({
      query: ({ ...post }) => ({
        url: `categories`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["categories"],
    }),
    editCategory: builder.mutation<
      void,
      Partial<categoryType> & Pick<categoryType, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<void, Pick<categoryType, "id">>({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    getProducts: builder.query<productType[], void>({
      query: () => `products`,
      providesTags: ["products"],
    }),
    getProduct: builder.query<productType, string>({
      query: (id: string) => `products/${id}`,
      providesTags: ["products"],
    }),
    createProduct: builder.mutation<void, Partial<productType>>({
      query: ({ ...post }) => ({
        url: `products`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["products"],
    }),
    editProduct: builder.mutation<
      void,
      Partial<productType> & Pick<productType, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation<void, Pick<productType, "id">>({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getBrands: builder.query<brandType[], void>({
      query: () => `brands`,
      providesTags: ["brands"],
    }),
    getBrand: builder.query<brandType, string>({
      query: (id: string) => `brands/${id}`,
      providesTags: ["brands"],
    }),
    createBrand: builder.mutation<void, Partial<brandType>>({
      query: ({ ...post }) => ({
        url: `brands`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
    editBrand: builder.mutation<
      void,
      Partial<brandType> & Pick<brandType, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `brands/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["brands"],
    }),
    deleteBrand: builder.mutation<void, Pick<brandType, "id">>({
      query: ({ id }) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands"],
    }),
    getimages: builder.query<imageType[], void>({
      query: () => `images`,
      providesTags: ["images"],
    }),
    getImage: builder.query<imageType, string>({
      query: (id: string) => `images/${id}`,
      providesTags: ["images"],
    }),
    createImage: builder.mutation<void, Partial<imageType>>({
      query: ({ ...post }) => ({
        url: `images`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["images"],
    }),
    editImage: builder.mutation<
      void,
      Partial<imageType> & Pick<imageType, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `images/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["images"],
    }),
    deleteImage: builder.mutation<void, Pick<imageType, "id">>({
      query: (id) => ({
        url: `images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["images"],
    }),
    signup: builder.mutation<void, Partial<signupType>>({
      query: ({ ...patch }) => ({
        url: `auth/signup`,
        method: "POST",
        body: patch,
      }),
    }),
    signin: builder.mutation<void, Partial<signinType>>({
      query: ({ ...patch }) => ({
        url: `auth/signin`,
        method: "POST",
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetParentCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetBrandsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
  useGetimagesQuery,
  useGetImageQuery,
  useCreateImageMutation,
  useEditImageMutation,
  useDeleteImageMutation,
  useSignupMutation,
  useSigninMutation,
} = api;

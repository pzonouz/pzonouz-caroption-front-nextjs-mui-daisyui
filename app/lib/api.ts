import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  brandsType,
  brandType,
  categoriesType,
  categoryType,
  imageType,
  parameterGroupsType,
  parameterGroupType,
  parametersType,
  parameterType,
  productsType,
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

  tagTypes: [
    "categories",
    "products",
    "brands",
    "images",
    "parameterGroups",
    "parameters",
  ],
  endpoints: (builder) => ({
    getCategories: builder.query<categoriesType, string | null>({
      query: (query) => {
        if (query) return `categories${query}`;
        return `categories`;
      },
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
    getProducts: builder.query<productsType, string>({
      query: (query) => {
        if (query) return `products${query}`;
        return `products`;
      },
      providesTags: ["products"],
    }),
    getProductsForAccounts: builder.query<productType[], void>({
      query: () => `products_for_accounts`,
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
    getBrands: builder.query<brandsType, string | null>({
      query: (query) => {
        if (query) return `brands${query}`;
        return `brands`;
      },
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
    deleteImage: builder.mutation<void, string>({
      query: (id) => ({
        url: `images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["images"],
    }),
    getParameterGroups: builder.query<parameterGroupsType, string>({
      query: (query) => {
        if (query) return `parameter-groups${query}`;
        return `parameter-groups`;
      },
      providesTags: ["parameterGroups"],
    }),
    getParameterGroup: builder.query<parameterGroupType, string>({
      query: (id: string) => `parameter-groups/${id}`,
      providesTags: ["parameterGroups"],
    }),
    createParameterGroup: builder.mutation<void, Partial<parameterGroupType>>({
      query: ({ ...post }) => ({
        url: `parameter-groups`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["parameterGroups"],
    }),
    editParameterGroup: builder.mutation<
      void,
      Partial<parameterGroupType> & Pick<parameterGroupType, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `parameter-groups/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["parameterGroups"],
    }),
    deleteParameterGroup: builder.mutation<
      void,
      Pick<parameterGroupType, "id">
    >({
      query: ({ id }) => ({
        url: `parameter-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["parameterGroups"],
    }),
    getParametersByCategory: builder.query<parameterType[], string>({
      query: (id: string) => `parameters/by-category/${id}`,
      providesTags: ["parameters"],
    }),
    getParameters: builder.query<parametersType, string>({
      query: (query) => {
        if (query) return `parameters${query}`;
        return `parameters`;
      },
      providesTags: ["parameters"],
    }),
    getParameter: builder.query<parameterType, string>({
      query: (id: string) => `parameters/${id}`,
      providesTags: ["parameters"],
    }),
    createParameter: builder.mutation<void, Partial<parameterType>>({
      query: ({ ...post }) => ({
        url: `parameters`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["parameters"],
    }),
    editParameter: builder.mutation<
      void,
      Partial<parameterType> & Pick<parameterType, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `parameters/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["parameters"],
    }),
    deleteParameter: builder.mutation<void, Pick<parameterType, "id">>({
      query: ({ id }) => ({
        url: `parameters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["parameters"],
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
  useGetProductsForAccountsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetBrandsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
  useGetParameterGroupsQuery,
  useGetParameterGroupQuery,
  useCreateParameterGroupMutation,
  useEditParameterGroupMutation,
  useDeleteParameterGroupMutation,
  useGetParametersQuery,
  useGetParametersByCategoryQuery,
  useGetParameterQuery,
  useCreateParameterMutation,
  useEditParameterMutation,
  useDeleteParameterMutation,
  useGetimagesQuery,
  useGetImageQuery,
  useCreateImageMutation,
  useEditImageMutation,
  useDeleteImageMutation,
  useSignupMutation,
  useSigninMutation,
} = api;

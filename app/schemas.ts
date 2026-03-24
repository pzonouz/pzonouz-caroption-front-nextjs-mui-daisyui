import * as z from "zod";
import { describe } from "zod/v4/core";
export const categorySchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().optional().nullish().nullable(),
  priority: z.string().optional().nullish().nullable(),
  imageId: z.string().optional().nullish().nullable(),
  imageUrl: z.string().optional().nullish().nullable(),
  show: z.boolean(),
  slug: z.string().optional().nullish().nullable(),
  parentId: z.string().optional().nullish().nullable(),
  parentName: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const brandSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const invoiceItemSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  description: z.string().optional().nullish().nullable(),
  price: z.string().optional().nullish().nullable(),
  productId: z.string().optional().nullish().nullable(),
  productName: z.string().optional().nullish().nullable(),
  count: z.string().optional().nullish().nullable(),
  discount: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const invoiceSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  personId: z.string().min(1, { message: "نام را وارد کنید" }),
  personName: z.string().optional().nullish().nullable(),
  description: z.string().optional().nullish().nullable(),
  discount: z.string().optional().nullish().nullable(),
  type: z.enum(["SELL", "BUY", "RENT"]),
  items: z.array(invoiceItemSchema).min(1),
  date: z.date().optional(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const imageSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  imageUrl: z.string().min(1, { message: "نام را وارد کنید" }),
  createdAt: z.string().optional().nullish().nullable(),
});
export const parameterGroupSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  categoryId: z.string().optional().nullish().nullable(),
  categoryName: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
});
export const parameterSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().optional().nullish().nullable(),
  type: z.string(),
  parameterGroupId: z.string().optional().nullish().nullable(),
  parameterGroup: z.string().optional().nullish().nullable(),
  selectables: z.array(z.string()).optional().nullish().nullable(),
  priority: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const productParameterValueSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  productId: z.string().optional().nullish().nullable(),
  parameterId: z.string().optional().nullish().nullable(),
  textValue: z.string().optional().nullish().nullable(),
  boolValue: z.boolean().optional().nullish().nullable(),
  selectableValue: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const productSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().optional().nullish().nullable(),
  info: z.string().optional().nullish().nullable(),
  price: z.string().optional().nullish().nullable(),
  count: z.string().optional().nullish().nullable(),
  categoryId: z.uuid(),
  brandId: z.uuid(),
  entityId: z.string().optional().nullish().nullable(),
  entityName: z.string().optional().nullish().nullable(),
  slug: z.string().optional().nullish().nullable(),
  imageId: z.string().optional().nullish().nullable(),
  // imageIds: z.string().optional().nullish().nullable(),
  // images: z.string().optional().nullish().nullable(),
  imageUrl: z.string().optional().nullish().nullable(),
  generatable: z.boolean().optional().nullish().nullable(),
  generated: z.boolean().optional().nullish().nullable(),
  show: z.boolean().optional().nullish().nullable(),
  position: z.string().optional().nullish().nullable(),
  code: z.string().optional().nullish().nullable(),
  brand: z.string().optional().nullish().nullable(),
  parameters: z.array(parameterSchema),
  productParameterValues: z.array(productParameterValueSchema),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const personSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  firstName: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام خانوادگی را وارد کنید" }),
  phoneNumber: z.string().min(1, { message: "شماره تلفن را وارد کنید" }),
  address: z.string().optional().nullish().nullable(),
  createdAt: z.string().optional().nullish().nullable(),
  updatedAt: z.string().optional().nullish().nullable(),
});
export const signupSchema = z
  .object({
    email: z.email({ message: "ساختار ایمیل درست نیست" }),
    password: z.string().min(1, { message: "پسورد را وارد کنید" }),
    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val?.confirmPassword !== val.password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "پسوردها یکسان نیست",
        code: "custom",
      });
    }
  });
export const signinSchema = z.object({
  email: z.string().min(1, { message: "ایمیل را وارد کنید" }),
  password: z.string().min(1, { message: "پسورد را وارد کنید" }),
});
export type User = { id: string; email: string; isAdmin: boolean };
export type categoryType = z.infer<typeof categorySchema>;
export type categoriesType = {
  rows: z.infer<typeof categorySchema>[];
  totalCount: number;
};
export type productType = z.infer<typeof productSchema>;
export type productsType = {
  rows: z.infer<typeof productSchema>[];
  totalCount: number;
};
export type brandType = z.infer<typeof brandSchema>;
export type brandsType = {
  rows: z.infer<typeof brandSchema>[];
  totalCount: number;
};
export type imageType = z.infer<typeof imageSchema>;
export type parameterGroupType = z.infer<typeof parameterGroupSchema>;
export type parameterGroupsType = {
  rows: z.infer<typeof parameterGroupSchema>[];
  totalCount: number;
};
export type parameterType = z.infer<typeof parameterSchema>;
export type parametersType = {
  rows: z.infer<typeof parameterSchema>[];
  totalCount: number;
};
export type invoiceType = z.infer<typeof invoiceSchema>;
export type invoicesType = {
  rows: z.infer<typeof invoiceSchema>[];
  totalCount: number;
};
export type personType = z.infer<typeof personSchema>;
export type personsType = {
  rows: z.infer<typeof personSchema>[];
  totalCount: number;
};
export type invoiceItemType = z.infer<typeof invoiceItemSchema>;
export type productParameterValueType = z.infer<
  typeof productParameterValueSchema
>;
export type signupType = z.infer<typeof signupSchema>;
export type signinType = z.infer<typeof signinSchema>;

// Datagrid Types
export type ColDef = {
  field: string;
  headerName: string;
  width: number;
  order: number;
  renderCell: Function;
  transformFunction?: Function;
};
export type SortDirection = "ASC" | "DESC";
export type FilterOperand = "contains" | "<" | ">" | "=<" | "=>";
export type GridOptions = {
  sort: { name: string; direction: SortDirection }[];
};
export type SimpleDataGridProps = {
  columns: ColDef[];
  rows: any[];
  options?: GridOptions;
  isLoading: boolean;
};

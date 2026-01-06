import * as z from "zod";
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
export const imageSchema = z.object({
  id: z.string().optional().nullish().nullable(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  imageUrl: z.string().min(1, { message: "نام را وارد کنید" }),
  createdAt: z.string().datetime().optional().nullish().nullable(),
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
export type productType = z.infer<typeof productSchema>;
export type brandType = z.infer<typeof brandSchema>;
export type imageType = z.infer<typeof imageSchema>;
export type signupType = z.infer<typeof signupSchema>;
export type signinType = z.infer<typeof signinSchema>;

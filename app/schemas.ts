import * as z from "zod";
export const categorySchema = z.object({
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().optional().nullish().nullable(),
  priority: z.string().optional().nullish().nullable(),
  imageId: z.string().optional().nullish().nullable(),
  imageUrl: z.string().optional().nullish().nullable(),
  show: z.boolean(),
  slug: z.string().optional().nullish().nullable(),
  parentId: z.string().optional().nullish().nullable(),
  parentName: z.string().optional().nullish().nullable(),
});
export type categoryType = z.infer<typeof categorySchema>;

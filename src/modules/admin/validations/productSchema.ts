import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z.number().positive("Price must be positive"),
  categoryId: z.number().int().positive("Select a category"),
  imageUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  discount: z.number().min(0).max(100).optional(),
  preparationTime: z.number().int().positive().optional(),
  calories: z.number().int().positive().optional(),
  isAvailable: z.boolean(),
  isPopular: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

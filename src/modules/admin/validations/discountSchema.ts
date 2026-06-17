import { z } from "zod";

export const discountSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  type: z.enum(["percentage", "fixed"]),
  value: z.number().positive("Value must be positive"),
  minOrderAmount: z.number().min(0).optional(),
  maxDiscountAmount: z.number().min(0).nullable().optional(),
  usageLimit: z.number().int().positive().optional(),
  expireDate: z.string().min(1, "Expire date is required"),
  isActive: z.boolean(),
});

export type DiscountFormValues = z.infer<typeof discountSchema>;

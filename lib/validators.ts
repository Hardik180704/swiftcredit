import { z } from 'zod';

export const ApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  businessType: z.enum(["Retail", "Manufacturing", "Services", "Trading"], {
    message: "Invalid business type"
  }),
  monthlyRevenue: z.coerce.number().positive("Must be positive").min(1, "Must be at least 1"),
  loanAmount: z.coerce.number().positive("Must be positive").min(1000, "Must be at least 1000"),
  tenure: z.coerce.number().int("Must be an integer").min(6, "Minimum 6 months").max(60, "Maximum 60 months"),
  loanPurpose: z.string().min(10, "Must be at least 10 characters"),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;

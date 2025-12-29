import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  passportNumber: z.string().min(6, 'Passport must be at least 6 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  postOffice: z.string().min(2),
  state: z.string(),
  district: z.string(),
  contactNumber1: z.string().min(10),
  contactNumber2: z.string().min(10).nullable().optional(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;

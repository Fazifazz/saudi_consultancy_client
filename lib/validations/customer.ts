import { z } from 'zod';

export const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  passportNumber: z.string().min(6, 'Passport must be at least 6 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  postOffice: z.string().min(2),
  state: z.string(),
  district: z.string(),
  contactNumber1: z.string().min(10, 'Contact number 1 must be at least 10 characters'),
  contactNumber2: z.string().min(10, 'Contact number 2 must be at least 10 characters').optional(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;

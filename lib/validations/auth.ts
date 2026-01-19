import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().min(10, 'Phone number must be at least 10 characters').optional().or(z.literal('')),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone number is required',
    path: ['email'], // Pointing to email by default
  });

export type LoginSchema = z.infer<typeof loginSchema>;

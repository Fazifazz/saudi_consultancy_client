import { z } from 'zod';

export const visaDetailsSchema = z.object({
  id: z.string().optional(),
  transactionId: z.string().min(1, 'Transaction is required'),
  visaNumber: z.number('Visa number is required').min(1, 'Visa number must be greater than 0'),
  visaType: z.string().min(1, 'Visa type is required'),
  stampingDate: z.date('Stamping date is required'),
  paymentMode: z.string().min(1, 'Payment mode is required'),
  profession: z.string().min(1, 'Profession is required'),
  agency: z.string().min(1, 'Agency is required'),
  wakalaAgency: z.string().optional(),
  agencyCharge: z.number().optional(),
  remarks: z.string().optional(),
});

export type VisaDetailsSchema = z.infer<typeof visaDetailsSchema>;

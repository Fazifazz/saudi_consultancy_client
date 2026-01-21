import { z } from 'zod';

export const medicalPaymentSchema = z.object({
  id: z.string().optional(),
  transactionId: z.string().min(1, 'Transaction is required'),
  paymentMode: z.string().min(1, 'Payment mode is required'),
  amount: z.number({ error: 'Amount must be number' }).min(1, 'Amount must be greater than 0'),
  date: z.date({ error: 'Date is required' }),
  remarks: z.string().optional(),
});

export type MedicalPaymentSchema = z.infer<typeof medicalPaymentSchema>;

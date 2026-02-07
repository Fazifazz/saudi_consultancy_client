import { z } from 'zod';

export const agencyPaymentSchema = z.object({
  id: z.string().optional(),
  transactionId: z.string().min(1, 'Transaction is required'),
  date: z.date({ error: 'Date is required' }),
  amount: z.number({ error: 'Amount must be number' }).min(1, 'Amount must be greater than 0'),
  agency: z.string().min(1, 'Agency is required'),
  remarks: z.string().optional(),
});

export type AgencyPaymentSchema = z.infer<typeof agencyPaymentSchema>;

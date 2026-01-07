import { z } from 'zod';

export const transactionSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  customerId: z.string('Customer is required'),
  remarks: z.string(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;

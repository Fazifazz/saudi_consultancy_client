import { z } from 'zod';

export const vfsSchema = z.object({
  transactionId: z.string().min(1, 'Transaction is required'),
  center: z.string().min(1, 'Center is required'),
  date: z.date(),
  remarks: z.string().optional(),
});

export type VfsSchema = z.infer<typeof vfsSchema>;

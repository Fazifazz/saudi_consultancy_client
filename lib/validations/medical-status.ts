import { z } from 'zod';

export const medicalStatusSchema = z.object({
  transactionId: z.string().min(1, 'Transaction is required'),
  center: z.string().min(1, 'Center is required'),
  subCenter: z.string().optional(),
  slipDate: z.date().optional(),
  medicalDate: z.date(),
  statusUpdateDate: z.date(),
  revisitDate: z.date().optional(),
  paymentDate: z.date().optional(),
  mofaUpdateDate: z.date().optional(),
  paymentAmount: z.number().optional(),
  paymentMode: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
  remarks: z.string().optional(),
});

export type MedicalStatusSchema = z.infer<typeof medicalStatusSchema>;

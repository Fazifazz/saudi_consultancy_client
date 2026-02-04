import { z } from 'zod';

export const ksaStatusSchema = z
  .object({
    transactionId: z.string().min(1, 'Transaction is required'),

    saudiArrivedDate: z.coerce.date().optional(),

    iqamaIssuedDate: z.coerce.date().optional(),

    iqamaValidity: z.string().optional(),

    visaTransferStatus: z.string().trim().min(1, 'Visa transfer status is required'),

    customerPayment: z.number().min(0, 'Customer payment cannot be negative'),

    customerPaymentDate: z.coerce.date(),

    remarks: z.string().trim().max(500, 'Remarks cannot exceed 500 characters').optional(),
  })
  .strict();

export type KsaStatusSchema = z.infer<typeof ksaStatusSchema>;

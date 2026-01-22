import z from 'zod';

export const passportPossessionSchema = z.object({
  transactionId: z.string({ error: 'Transaction is required' }).min(1, 'Transaction is required'),
  agency: z.string({ error: 'Agency is required' }).min(1, 'Agency is required'),
  agencyDeliveryMethod: z
    .string({ error: 'Agency Delivery Mode is required' })
    .min(1, 'Agency is required'),
  agencyDeliveryDate: z.coerce.date({ error: 'Agency Delivery Date is required' }),
  workAgreementStatus: z.string().nullable().optional(),
  workAgreementOnProcessingInRiyadhDate: z.coerce.date().nullable().optional(),
  workAgreementRecievedInManjeriDate: z.coerce.date().nullable().optional(),
  stampingStatus: z.string().nullable().optional(),
  stampingDate: z.coerce.date().nullable().optional(),
  stampingRemarks: z.string().nullable().optional(),
  receivedInOfficeDate: z.coerce.date().nullable().optional(),
  receivedInOfficeDeliveryMethod: z.string().nullable().optional(),
  receivedToClientDate: z.coerce.date().nullable().optional(),
  receivedToClientDeliveryMethod: z.string().nullable().optional(),
});

export type PassportPossessionSchema = z.infer<typeof passportPossessionSchema>;

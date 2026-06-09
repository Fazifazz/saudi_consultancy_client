import { z } from 'zod';

export const tradeCertificateSchema = z.object({
  transactionId: z.string().min(1, 'Transaction is required'),
  issuedAgency: z.string().min(1, 'Issued agency is required'),
  appointmentDate: z.date(),
  appointMentPayment: z.number().optional(),
  paymentMethod: z.string().optional(),
  center: z.string().min(1, 'Center is required'),
  tcStatus: z.string().min(1, 'TC Status is required'),

  // tcSettingAmount: z.number().optional(),
  // tcSettingAmountCenter: z.string().optional(),
  // tcSettingAgency: z.string().optional(),
  // tcSettingDate: z.date().optional(),

  tcAppointmentAmount: z.number().optional(),
  tcAppointmentAmountCenter: z.string().optional(),
  tcAppointmentAgency: z.string().optional(),
  tcAppointmentDate: z.date().optional(),

  remarks: z.string().max(500, 'Remarks cannot exceed 500 characters').optional(),
});

export type TradeCertificateSchema = z.infer<typeof tradeCertificateSchema>;

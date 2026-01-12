import { z } from 'zod';

export const ticketSchema = z.object({
  transactionId: z.string('Transaction is required'),
  travelType: z.string().min(2, 'Travel type is required'),
  bookingDate: z.date(),
  travellingDate: z.date(),
  airlineCompany: z.string('Airline company is required'),
  paymentMode: z.string('Payment mode is required'),
});

export type TicketSchema = z.infer<typeof ticketSchema>;

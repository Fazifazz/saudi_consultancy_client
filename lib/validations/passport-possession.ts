import z from "zod";

export const passportPossessionSchema = z.object({
    customerId: z
        .string({ error: 'Customer is required' }).min(1, "Customer is required"),
    agency: z
        .string({ error: 'Agency is required' }).min(1, "Agency is required"),
    agencyDeliveryMethod: z
        .string({ error: 'Agency Delivery Mode is required' }).min(1, "Agency is required"),
    agencyDeliveryDate: z.date({ error: 'Agency Delivery Date is required' }),
    workAgreementStatus: z.string().nullable().optional(),
    workAgreementRecievedInRiyadhDate: z.date().nullable().optional(),
    workAgreementStatusDate: z.date().nullable().optional(),
    stampingStatus: z.string().nullable().optional(),
    stampingDate: z.date().nullable().optional(),
    stampingRemarks: z.string().nullable().optional(),
    receivedInOfficeDate: z.date().nullable().optional(),
    receivedInOfficeDeliveryMethod: z.string().nullable().optional(),
    receivedToClientDate: z.date().nullable().optional(),
    receivedToClientDeliveryMethod: z.string().nullable().optional(),
});

export type PassportPossessionSchema = z.infer<typeof passportPossessionSchema>;
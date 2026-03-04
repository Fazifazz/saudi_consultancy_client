export interface IMedicalPaymentList {
  _id: string;
  transactionId: string;
  amount: number;
  paymentMode: string;
  date: Date;
  remarks: string;
  isDeleted: boolean;
  createdAt?: Date;
}

export interface MedicalPaymentsResponse {
  data: IMedicalPaymentList[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

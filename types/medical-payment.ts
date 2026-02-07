export interface IMedicalPayment {
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
  data: IMedicalPayment[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

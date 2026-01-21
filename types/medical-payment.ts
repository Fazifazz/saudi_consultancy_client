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

export interface MedicalPaymentList {
  _id: string;
  transactionId: {
    name: string;
    customerId: {
      name: string;
    };
  };
  amount: number;
  paymentMode: string;
  date: Date;
  remarks: string;
  createdAt: Date;
}

export interface MedicalPaymentsListResponse {
  data: MedicalPaymentList[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

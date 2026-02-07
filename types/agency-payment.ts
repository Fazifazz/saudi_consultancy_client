export interface IAgencyPayment {
  _id?: string;
  id?: string;
  transactionId: string;
  date: Date;
  amount: number;
  agency: string;
  remarks: string;
  isDeleted?: boolean;
  createdAt?: Date;
}

export interface AgencyPaymentResponse {
  data: IAgencyPayment[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

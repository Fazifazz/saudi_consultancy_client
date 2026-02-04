export interface IKsaStatus {
  _id: string;
  transactionId: string;
  saudiArrivedDate?: Date;
  iqamaIssuedDate?: Date;
  iqamaValidity?: string;
  visaTransferStatus?: string;
  customerPayment?: number;
  customerPaymentDate?: Date;
  remarks?: string;
  isDeleted: boolean;
  createdAt: Date;
}

export interface KsaStatusResponse {
  data: IKsaStatus[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

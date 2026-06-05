export interface IMedicalStatus {
  _id: string;
  transactionId: string;
  center: string;
  subCenter?: string;
  slipDate?: Date;
  medicalDate: Date;
  statusUpdateDate: Date;
  revisitDate?: Date;
  paymentDate?: Date;
  mofaUpdateDate?: Date;
  paymentAmount?: number;
  paymentMode?: string;
  status: string;
  remarks?: string;
  isDeleted: Boolean;
  createdAt: Date;
}

export interface MedicalStatusResponse {
  data: IMedicalStatus[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface IMedicalStatus {
  _id: string;
  transactionId: string;
  center: string;
  slipDate?: Date;
  medicalDate: Date;
  statusUpdateDate: Date;
  revisitDate?: Date;
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

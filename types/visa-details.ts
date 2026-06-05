export interface IVisaDetail {
  _id: string;
  transactionId: string;
  visaNumber: number;
  visaType: string;
  stampingDate: Date;
  paymentMode: string;
  profession: string;
  agency: string;
  remarks: string;
  wakalaAgency?: string;
  agencyCharge?: number;
  isDeleted: boolean;
  createdAt?: Date;
}

export interface VisaDetailsResponse {
  data: IVisaDetail[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

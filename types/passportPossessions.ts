import { ICustomer } from './customer';

export interface IPassportPossession {
  _id: string;
  customerId: string;
  customer?: ICustomer;
  agency: string;
  agencyDeliveryMethod: string;
  agencyDeliveryDate: Date | null;
  workAgreementStatus?: string;
  workAgreementDate?: Date | null;
  stampingStatus?: string;
  stampingDate?: Date | null;
  stampingRemarks?: string;
  receivedInOfficeDate?: Date | null;
  receivedInOfficeDeliveryMethod?: string;
  receivedToClientDate?: Date | null;
  receivedToClientDeliveryMethod?: string;
  remarks?: string;
}

export interface PassportPossessionListResponse {
  data: IPassportPossession[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface PassportPossessionByIdResponse {
  data: IPassportPossession;
  message: string;
}

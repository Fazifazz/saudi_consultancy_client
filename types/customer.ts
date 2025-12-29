export interface ICustomer {
  _id: string;
  name: string;
  passportNumber: string;
  address: string;
  postOffice: string;
  state: string;
  district: string;
  contactNumber1: number;
  contactNumber2: number;
  isDeleted: Boolean;
  createdAt: Date;
}

export interface CustomersResponse {
  data: ICustomer[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

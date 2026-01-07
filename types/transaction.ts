export interface ITransaction {
  _id: string;
  customerId: string;
  name: string;
  remarks: Date;
  isDeleted: Boolean;
  createdAt: Date;
}

export interface TransactionsResponse {
  data: ITransaction[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface IVfs {
  _id: string;
  transactionId: string;
  center: string;
  date: Date;
  remarks?: string;
  isDeleted: Boolean;
  createdAt: Date;
}

export interface VfsResponse {
  data: IVfs[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface ITicket {
  _id: string;
  customerId: string;
  travelType: string;
  bookingDate: Date;
  travellingDate: Date;
  airlineCompany: string;
  paymentMode: string;
  isDeleted: Boolean;
  createdAt: Date;
}

export interface TicketsResponse {
  data: ITicket[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

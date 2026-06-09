export interface ITradeCertificate {
  _id: string;
  transactionId: string;
  issuedAgency: string;
  appointmentDate?: Date;
  appointMentPayment?: number;
  paymentMethod?: string;
  center: string;
  tcStatus: string;

  // tcSettingAmount: number;
  // tcSettingAmountCenter: string;
  // tcSettingAgency: string;
  // tcSettingDate: Date;

  tcAppointmentAmount: number;
  tcAppointmentAmountCenter: string;
  tcAppointmentAgency: string;
  tcAppointmentDate: Date;

  remarks?: string;
  isDeleted: Boolean;
  createdAt: Date;
}

export interface TradeCertificateResponse {
  data: ITradeCertificate[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

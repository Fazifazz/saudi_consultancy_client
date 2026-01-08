export interface IPassportPossession {
    _id: string;
    transactionId: string;
    agency: string;
    agencyDeliveryMethod: string;
    agencyDeliveryDate: Date;
    workAgreementStatus?: string;
    workAgreementDate?: Date;
    stampingStatus?: string;
    stampingDate?: Date;
    stampingRemarks?: string;
    receivedInOfficeDate?: Date;
    receivedInOfficeDeliveryMethod?: string;
    receivedToClientDate?: Date;
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


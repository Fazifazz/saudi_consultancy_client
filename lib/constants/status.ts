export enum WORK_AGREEMENT_STATUS_ENUM {
  PENDING = 'PENDING',
  RECIEVED_IN_RIYADH = 'RECIEVED_IN_RIYADH',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const WORK_AGREEMENT_STATUS: { value: WORK_AGREEMENT_STATUS_ENUM; label: string }[] = [
  { value: WORK_AGREEMENT_STATUS_ENUM.PENDING, label: 'Pending' },
  { value: WORK_AGREEMENT_STATUS_ENUM.RECIEVED_IN_RIYADH, label: 'Recieved In Riyadh' },
  { value: WORK_AGREEMENT_STATUS_ENUM.APPROVED, label: 'Approved' },
  { value: WORK_AGREEMENT_STATUS_ENUM.REJECTED, label: 'Rejected' },
];

export const STAMPING_STATUS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'STAMPED', label: 'Stamped' },
  { value: 'REJECTED', label: 'Rejected' },
];

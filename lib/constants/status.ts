export enum WORK_AGREEMENT_STATUS_ENUM {
  ON_PROCESSING_AT_RIYADH = 'ON_PROCESSING_AT_RIYADH',
  MANJERI = 'MANJERI ',
}

export const WORK_AGREEMENT_STATUS = [
  { value: WORK_AGREEMENT_STATUS_ENUM.ON_PROCESSING_AT_RIYADH, label: 'On Processing At Riyadh' },
  { value: WORK_AGREEMENT_STATUS_ENUM.MANJERI, label: 'Manjeri' },
];

export const STAMPING_STATUS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'STAMPED', label: 'Stamped' },
  { value: 'REJECTED', label: 'Rejected' },
];

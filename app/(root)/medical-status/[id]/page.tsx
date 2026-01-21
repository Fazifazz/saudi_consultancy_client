import { MedicalStatusForm } from '@/components/forms/MedicalStatusForm';
import { fetchOneMedicalStatus } from '@/lib/api/medical-status';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const medicalStatusDetails = await fetchOneMedicalStatus(id);
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <MedicalStatusForm
        medicalStatusDetails={medicalStatusDetails}
        transactions={transactionsData}
      />
    </div>
  );
};

export default page;

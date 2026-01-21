import { MedicalStatusForm } from '@/components/forms/MedicalStatusForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async () => {
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <MedicalStatusForm transactions={transactionsData} />
    </div>
  );
};

export default page;

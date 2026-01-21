import { MedicalPaymentForm } from '@/components/forms/MedicalPaymentForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import { CommonListForSelect } from '@/types/common';
import React from 'react';

const page = async () => {
  const transactionsData: CommonListForSelect[] = await fetchTransactionsForSelect();
  return (
    <div>
      <MedicalPaymentForm transactions={transactionsData} />
    </div>
  );
};

export default page;

import { KsaStatusForm } from '@/components/forms/KsaStatusForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async () => {
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <KsaStatusForm transactions={transactionsData} />
    </div>
  );
};

export default page;

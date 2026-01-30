import { TradeCertificateForm } from '@/components/forms/TradeCertificateForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async () => {
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <TradeCertificateForm transactions={transactionsData} />
    </div>
  );
};

export default page;

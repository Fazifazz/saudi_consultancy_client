import { AgencyPaymentForm } from '@/components/forms/AgencyPaymentForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import { CommonListForSelect } from '@/types/common';
import React from 'react';

const page = async () => {
  const transactionsData: CommonListForSelect[] = await fetchTransactionsForSelect();
  return (
    <div>
      <AgencyPaymentForm transactions={transactionsData} />
    </div>
  );
};

export default page;

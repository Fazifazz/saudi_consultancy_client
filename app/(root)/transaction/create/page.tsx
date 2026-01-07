import { TransactionForm } from '@/components/forms/TransactionForm';
import { fetchCustmersForSelect } from '@/lib/api/customer';
import React from 'react';

const page = async () => {
  const customersData: any[] = await fetchCustmersForSelect();
  return (
    <div>
      <TransactionForm customers={customersData} />
    </div>
  );
};

export default page;

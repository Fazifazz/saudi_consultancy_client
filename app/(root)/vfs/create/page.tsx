import { VfsForm } from '@/components/forms/VfsForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async () => {
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <VfsForm transactions={transactionsData} />
    </div>
  );
};

export default page;

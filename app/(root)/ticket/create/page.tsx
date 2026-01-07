import { TicketForm } from '@/components/forms/TicketForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async () => {
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <TicketForm transactions={transactionsData} />
    </div>
  );
};

export default page;

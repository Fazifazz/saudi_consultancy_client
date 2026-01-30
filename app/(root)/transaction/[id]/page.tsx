import React from 'react';
import { fetchCustmersForSelect } from '@/lib/api/customer';
import { fetchOneTransaction } from '@/lib/api/transaction';
import { TransactionForm } from '@/components/forms/TransactionForm';

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const transactionDetails = await fetchOneTransaction(id);
  const customers: any[] = await fetchCustmersForSelect();
  return (
    <div>
      <TransactionForm customers={customers} transactionDetails={transactionDetails} />
    </div>
  );
};

export default page;

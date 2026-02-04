import KsaStatusForm from '@/components/forms/KsaStatusForm';
import { fetchOneKsaStatus } from '@/lib/api/ksa-status';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const ksaStatusDetails = await fetchOneKsaStatus(id);
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <KsaStatusForm ksaStatusDetails={ksaStatusDetails} transactions={transactionsData} />
    </div>
  );
};

export default page;

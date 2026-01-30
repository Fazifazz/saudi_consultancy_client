import { TradeCertificateForm } from '@/components/forms/TradeCertificateForm';
import { fetchOneTradeCertificate } from '@/lib/api/trade-certificate';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const tradeCertificateDetails = await fetchOneTradeCertificate(id);
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <TradeCertificateForm
        tradeCertificateDetails={tradeCertificateDetails}
        transactions={transactionsData}
      />
    </div>
  );
};

export default page;

import { AgencyPaymentForm } from '@/components/forms/AgencyPaymentForm';
import { fetchAgencyPaymentById } from '@/lib/api/agency-payment';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import { CommonListForSelect } from '@/types/common';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const transactionsData: CommonListForSelect[] = await fetchTransactionsForSelect();
  const fetchAgencyPaymentResult = await fetchAgencyPaymentById(id);
  const agencyPayment = fetchAgencyPaymentResult.data;

  return (
    <div>
      <AgencyPaymentForm
        id={id}
        agencyPaymentDetails={agencyPayment}
        transactions={transactionsData}
      />
    </div>
  );
};

export default Page;

import { VisaDetailsForm } from '@/components/forms/VisaDetailsForm';
import { fetchVisaDetailById } from '@/lib/api/visa-details';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import { CommonListForSelect } from '@/types/common';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const transactionsData: CommonListForSelect[] = await fetchTransactionsForSelect();
  const fetchVisaDetailResult = await fetchVisaDetailById(id);
  const visaDetail = fetchVisaDetailResult.data;

  return (
    <div>
      <VisaDetailsForm id={id} visaDetailDetails={visaDetail} transactions={transactionsData} />
    </div>
  );
};

export default Page;

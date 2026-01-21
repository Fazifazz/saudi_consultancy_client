import { MedicalPaymentForm } from '@/components/forms/MedicalPaymentForm';
import { fetchMedicalPaymentById } from '@/lib/api/medical-payment';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import { CommonListForSelect } from '@/types/common';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const transactionsData: CommonListForSelect[] = await fetchTransactionsForSelect();
  const fetchMedicalPaymentResult = await fetchMedicalPaymentById(id);
  const medicalPayment = fetchMedicalPaymentResult.data;

  return (
    <div>
      <MedicalPaymentForm
        id={id}
        medicalPaymentDetails={medicalPayment}
        transactions={transactionsData}
      />
    </div>
  );
};

export default Page;

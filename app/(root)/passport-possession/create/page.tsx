import { PassportPossessionForm } from '@/components/forms/PassportPossessionForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';

async function page() {
  const transactions = await fetchTransactionsForSelect();
  return (
    <>
      <PassportPossessionForm transactions={transactions} />
    </>
  );
}

export default page;

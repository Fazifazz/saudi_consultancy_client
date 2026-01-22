import { PassportPossessionForm } from '@/components/forms/PassportPossessionForm';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import { fetchPassportPossessionById } from '@/lib/api/passport-possession';

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const transactions = await fetchTransactionsForSelect();
  const passportPossession = await fetchPassportPossessionById(id);

  const data = passportPossession?.data || null;

  return (
    <>
      <PassportPossessionForm transactions={transactions} id={id} data={data} />
    </>
  );
}

export default Page;

import { PassportPossessionForm } from '@/components/forms/PassportPossessionForm';
import { fetchCustmersForSelect } from '@/lib/api/customer';
import { fetchPassportPossessionById } from '@/lib/api/passport-possession';
import { format } from 'date-fns';

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const customers = await fetchCustmersForSelect();
  const passportPossession = await fetchPassportPossessionById(id);

  const data = passportPossession?.data || null;

  return (
    <>
      <PassportPossessionForm customers={customers} id={id} data={data} />
    </>
  );
}

export default Page;

import { CustomerForm } from '@/components/forms/CustomerForm';
import { fetchCustomerById } from '@/lib/api/customer';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const fetchCustomerResult = await fetchCustomerById(id);
  const customer = fetchCustomerResult.data;

  return (
    <div>
      <CustomerForm id={id} customer={customer} />
    </div>
  );
};

export default Page;

import { TicketForm } from '@/components/forms/TicketForm';
import { fetchCustmersForSelect } from '@/lib/api/customer';
import React from 'react';

const page = async () => {
  const customersData: any[] = await fetchCustmersForSelect();
  return (
    <div>
      <TicketForm customers={customersData} />
    </div>
  );
};

export default page;

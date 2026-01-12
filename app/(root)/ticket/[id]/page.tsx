import { TicketForm } from '@/components/forms/TicketForm';
import { fetchOneTicket } from '@/lib/api/ticket';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const ticketDetails = await fetchOneTicket(id);
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <TicketForm ticketDetails={ticketDetails} transactions={transactionsData} />
    </div>
  );
};

export default page;

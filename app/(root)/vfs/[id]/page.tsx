import { VfsForm } from '@/components/forms/VfsForm';
import { fetchOneVfs } from '@/lib/api/vfs';
import { fetchTransactionsForSelect } from '@/lib/api/transaction';
import React from 'react';

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const vfsDetails = await fetchOneVfs(id);
  const transactionsData: any[] = await fetchTransactionsForSelect();
  return (
    <div>
      <VfsForm vfsDetails={vfsDetails} transactions={transactionsData} />
    </div>
  );
};

export default page;

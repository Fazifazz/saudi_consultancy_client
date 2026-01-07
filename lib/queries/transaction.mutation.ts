import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TransactionSchema } from '../validations/transaction';
import axios from 'axios';

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
    },
  });
}

const createTransaction = async (data: TransactionSchema) => {
  const res = await axios.post('/api/transaction', data);
  return res.data;
};

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
    },
  });
}

const deleteTransaction = async (id: string) => {
  const res = await axios.delete(`/api/transaction?id=${id}`);
  return res.data;
};

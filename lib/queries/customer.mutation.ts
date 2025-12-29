import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerSchema } from '../validations/customer';
import axios from 'axios';

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
}

const createCustomer = async (data: CustomerSchema) => {
  const res = await axios.post('/api/customer', data);
  return res.data;
};

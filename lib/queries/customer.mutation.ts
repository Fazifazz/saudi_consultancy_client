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

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
}

const updateCustomer = async (data: CustomerSchema) => {
  const res = await axios.put(`/api/customer/${data.id}`, data);
  return res.data;
};

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}

const deleteCustomer = async (id: string) => {
  const res = await axios.delete(`/api/customer/${id}`);
  return res.data;
};

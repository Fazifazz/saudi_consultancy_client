import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AgencyPaymentSchema } from '../validations/agency-payment';
import axios from 'axios';

export function useCreateAgencyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAgencyPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencyPayments'] });
    },
  });
}

const createAgencyPayment = async (data: AgencyPaymentSchema) => {
  const res = await axios.post('/api/agency-payment', data);
  return res.data;
};

export function useUpdateAgencyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAgencyPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencyPayments'] });
    },
  });
}

const updateAgencyPayment = async (data: AgencyPaymentSchema) => {
  const res = await axios.put(`/api/agency-payment/${data.id}`, data);
  return res.data;
};

export function useDeleteAgencyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAgencyPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencyPayments'] });
    },
  });
}

const deleteAgencyPayment = async (id: string) => {
  const res = await axios.delete(`/api/agency-payment/${id}`);
  return res.data;
};

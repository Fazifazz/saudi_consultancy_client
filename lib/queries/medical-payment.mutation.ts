import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MedicalPaymentSchema } from '../validations/medical-payment';
import axios from 'axios';

export function useCreateMedicalPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedicalPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalPayments'] });
    },
  });
}

const createMedicalPayment = async (data: MedicalPaymentSchema) => {
  const res = await axios.post('/api/medical-payment', data);
  return res.data;
};

export function useUpdateMedicalPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMedicalPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalPayments'] });
    },
  });
}

const updateMedicalPayment = async (data: MedicalPaymentSchema) => {
  const res = await axios.put(`/api/medical-payment/${data.id}`, data);
  return res.data;
};

export function useDeleteMedicalPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedicalPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalPayments'] });
    },
  });
}

const deleteMedicalPayment = async (id: string) => {
  const res = await axios.delete(`/api/medical-payment/${id}`);
  return res.data;
};

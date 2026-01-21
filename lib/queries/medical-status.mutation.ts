import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MedicalStatusSchema } from '../validations/medical-status';
import axios from 'axios';

export function useCreateMedicalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedicalStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-status'] });
    },
  });
}

export function useUpdateMedicalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMedicalStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-status'] });
    },
  });
}

export function useDeleteMedicalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedicalStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-status'] });
    },
  });
}

const createMedicalStatus = async (data: MedicalStatusSchema) => {
  const res = await axios.post('/api/medical-status', data);
  return res.data;
};

const updateMedicalStatus = async ({ id, data }: { id: string; data: MedicalStatusSchema }) => {
  const res = await axios.put(`/api/medical-status/${id}`, data);
  return res.data;
};

const deleteMedicalStatus = async (id: string) => {
  const res = await axios.delete(`/api/medical-status?id=${id}`);
  return res.data;
};

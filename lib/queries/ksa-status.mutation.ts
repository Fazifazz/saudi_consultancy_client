import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ksaStatusSchema, type KsaStatusSchema } from '@/lib/validations/ksa-status';
import axios from 'axios';

export function useCreateKsaStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKsaStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ksa-status'] });
    },
  });
}

export function useUpdateKsaStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateKsaStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ksa-status'] });
    },
  });
}

export function useDeleteKsaStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteKsaStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ksa-status'] });
    },
  });
}

const createKsaStatus = async (data: KsaStatusSchema) => {
  const res = await axios.post('/api/ksa-status', data);
  return res.data;
};

const updateKsaStatus = async ({ id, data }: { id: string; data: KsaStatusSchema }) => {
  const res = await axios.put(`/api/ksa-status/${id}`, data);
  return res.data;
};

const deleteKsaStatus = async (id: string) => {
  const res = await axios.delete(`/api/ksa-status?id=${id}`);
  return res.data;
};

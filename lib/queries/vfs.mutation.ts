import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VfsSchema } from '../validations/vfs';
import axios from 'axios';

export function useCreateVfs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVfs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vfs'] });
    },
  });
}

export function useUpdateVfs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVfs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vfs'] });
    },
  });
}

export function useDeleteVfs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVfs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vfs'] });
    },
  });
}

const createVfs = async (data: VfsSchema) => {
  const res = await axios.post('/api/vfs', data);
  return res.data;
};

const updateVfs = async ({ id, data }: { id: string; data: VfsSchema }) => {
  const res = await axios.put(`/api/vfs/${id}`, data);
  return res.data;
};

const deleteVfs = async (id: string) => {
  const res = await axios.delete(`/api/vfs?id=${id}`);
  return res.data;
};

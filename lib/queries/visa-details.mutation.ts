import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VisaDetailsSchema } from '../validations/visa-details';
import axios from 'axios';

export function useCreateVisaDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVisaDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visaDetails'] });
    },
  });
}

const createVisaDetail = async (data: VisaDetailsSchema) => {
  const res = await axios.post('/api/visa-details', data);
  return res.data;
};

export function useUpdateVisaDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVisaDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visaDetails'] });
    },
  });
}

const updateVisaDetail = async (data: VisaDetailsSchema) => {
  const res = await axios.put(`/api/visa-details/${data.id}`, data);
  return res.data;
};

export function useDeleteVisaDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVisaDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visaDetails'] });
    },
  });
}

const deleteVisaDetail = async (id: string) => {
  const res = await axios.delete(`/api/visa-details/${id}`);
  return res.data;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TradeCertificateSchema } from '../validations/trade-certificate';
import axios from 'axios';

export function useCreateTradeCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTradeCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-certificate'] });
    },
  });
}

export function useUpdateTradeCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTradeCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-certificate'] });
    },
  });
}

export function useDeleteTradeCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTradeCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-certificate'] });
    },
  });
}

const createTradeCertificate = async (data: TradeCertificateSchema) => {
  const res = await axios.post('/api/trade-certificate', data);
  return res.data;
};

const updateTradeCertificate = async ({
  id,
  data,
}: {
  id: string;
  data: TradeCertificateSchema;
}) => {
  const res = await axios.put(`/api/trade-certificate/${id}`, data);
  return res.data;
};

const deleteTradeCertificate = async (id: string) => {
  const res = await axios.delete(`/api/trade-certificate?id=${id}`);
  return res.data;
};

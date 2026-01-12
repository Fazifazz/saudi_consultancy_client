import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type TicketApiPayload = {
  transactionId: string;
  travelType: string;
  bookingDate: Date;
  travellingDate: Date;
  airlineCompany: string;
  paymentMode: string;
};

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket'] });
    },
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket'] });
    },
  });
}

export function useDeleteTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket'] });
    },
  });
}

const createTicket = async (data: TicketApiPayload) => {
  const res = await axios.post('/api/ticket', data);
  return res.data;
};

const updateTicket = async ({ id, data }: { id: string; data: TicketApiPayload }) => {
  const res = await axios.put(`/api/ticket/${id}`, data);
  return res.data;
};

const deleteTicket = async (id: string) => {
  const res = await axios.delete(`/api/ticket?id=${id}`);
  return res.data;
};

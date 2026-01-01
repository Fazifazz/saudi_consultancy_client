import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TicketSchema } from '../validations/ticket';

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket'] });
    },
  });
}

const createTicket = async (data: TicketSchema) => {
  const res = await axios.post('/api/ticket', data);
  return res.data;
};

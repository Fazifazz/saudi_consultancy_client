import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PassportPossessionSchema } from '../validations/passport-possession';
import axios from 'axios';

export function useCreatePassportPossession() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPassportPossession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['passport-possession'] });
        },
    });
}

// api calls
const createPassportPossession = async (data: PassportPossessionSchema) => {
  const res = await axios.post('/api/passport-possession', data);
  return res.data;
};
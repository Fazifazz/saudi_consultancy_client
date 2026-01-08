import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PassportPossessionSchema } from '../validations/passport-possession';
import axios from 'axios';

// THIS FILE CONTAINS BOTH MUTATIONS AND QUERIES
export function useCreatePassportPossession() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPassportPossession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['passport-possession'] });
        },
    });
}

export function useDeletePassportPossession() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePassportPossession,
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

const deletePassportPossession = async (id: string) => {
    const res = await axios.delete(`/api/passport-possession/${id}`);
    return res.data;
};
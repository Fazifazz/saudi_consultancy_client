'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IPassportPossession } from '@/types/passportPossessions';
import { useDeletePassportPossession } from '@/lib/queries/passport-possession.mutations';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export const passportPossessionColumns: ColumnDef<IPassportPossession>[] = [
  {
    accessorKey: 'agency',
    header: 'Agency',
  },
  {
    accessorKey: 'agencyDeliveryMethod',
    header: 'Agency Delivery Method',
  },
  {
    accessorKey: 'agencyDeliveryDate',
    header: 'Agency Delivery Date',
  },
  {
    accessorKey: 'workAgreementStatus',
    header: 'Work Agreement Status',
  },
  {
    accessorKey: 'workAgreementDate',
    header: 'Work Agreement Date',
  },
  {
    accessorKey: 'stampingStatus',
    header: 'Stamping Status',
  },
  {
    accessorKey: 'stampingDate',
    header: 'Stamping Date',
  },
  {
    accessorKey: 'stampingRemarks',
    header: 'Stamping Remarks',
  },
  {
    accessorKey: 'receivedInOfficeDate',
    header: 'Received In Office Date',
  },
  {
    accessorKey: 'receivedInOfficeDeliveryMethod',
    header: 'Received In Office Delivery Method',
  },
  {
    accessorKey: 'receivedToClientDate',
    header: 'Received To Client Date',
  },
  {
    accessorKey: 'receivedToClientDeliveryMethod',
    header: 'Received To Client Delivery Method',
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const passportPossession = row.original;
      const router = useRouter();
      const { mutate: deletePassportPossession } = useDeletePassportPossession();

      const handleDelete = () => {
        deletePassportPossession(passportPossession._id, {
          onSuccess: () => {
            successToast('Passport Possession deleted successfully');
            router.refresh();
          },
          onError: (error) => {
            const errorMessage =
              error instanceof AxiosError
                ? error.response?.data.message
                : 'Failed to delete Passport Possession';
            destructiveToast(errorMessage);
          },
        });
      };

      const handleEdit = () => {
        router.push(`/passport-possession/edit/${passportPossession._id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

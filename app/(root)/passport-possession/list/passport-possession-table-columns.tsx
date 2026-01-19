'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IPassportPossession } from '@/types/passportPossessions';
import { useDeletePassportPossession } from '@/lib/queries/passport-possession.mutations';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export const passportPossessionColumns: ColumnDef<IPassportPossession>[] = [
  {
    accessorKey: 'customer.name',
    header: 'Customer',
  },
  {
    accessorKey: 'customer.passportNumber',
    header: 'Passport Number',
  },
  {
    accessorKey: 'customer.contactNumber1',
    header: 'Contact Number',
  },
  {
    accessorKey: 'agency',
    header: 'Agency',
  },
  {
    accessorKey: 'agencyDeliveryMethod',
    header: 'Agency Delivery Method',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? <Badge variant="secondary">{value}</Badge> : '-';
    },
  },
  {
    accessorKey: 'agencyDeliveryDate',
    header: 'Agency Delivery Date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? format(new Date(value), 'dd/MM/yyyy') : '-';
    },
  },
  {
    accessorKey: 'workAgreementStatus',
    header: 'Work Agreement Status',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? <Badge variant="secondary">{value}</Badge> : '-';
    },
  },
  {
    accessorKey: 'workAgreementDate',
    header: 'Work Agreement Date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? format(new Date(value), 'dd/MM/yyyy') : '-';
    },
  },
  {
    accessorKey: 'stampingStatus',
    header: 'Stamping Status',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? <Badge variant="secondary">{value}</Badge> : '-';
    },
  },
  {
    accessorKey: 'stampingDate',
    header: 'Stamping Date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? format(new Date(value), 'dd/MM/yyyy') : '-';
    },
  },
  {
    accessorKey: 'stampingRemarks',
    header: 'Stamping Remarks',
  },
  {
    accessorKey: 'receivedInOfficeDate',
    header: 'Received In Office Date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? format(new Date(value), 'dd/MM/yyyy') : '-';
    },
  },
  {
    accessorKey: 'receivedInOfficeDeliveryMethod',
    header: 'Received In Office Delivery Method',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? <Badge variant="secondary">{value}</Badge> : '-';
    },
  },
  {
    accessorKey: 'receivedToClientDate',
    header: 'Received To Client Date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? format(new Date(value), 'dd/MM/yyyy') : '-';
    },
  },
  {
    accessorKey: 'receivedToClientDeliveryMethod',
    header: 'Received To Client Delivery Method',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? <Badge variant="secondary">{value}</Badge> : '-';
    },
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? format(new Date(value), 'dd/MM/yyyy') : '-';
    },
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
        <div className="flex items-center gap-2">
          <Button variant="default" size="icon" onClick={handleEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

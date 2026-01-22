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
import { WORK_AGREEMENT_STATUS_ENUM } from '@/lib/constants/status';

export const passportPossessionColumns: ColumnDef<IPassportPossession>[] = [
  {
    accessorKey: 'transaction.customer.name',
    header: 'Customer',
  },
  {
    accessorKey: 'transaction.customer.passportNumber',
    header: 'Passport Number',
  },
  {
    accessorKey: 'transaction.customer.contactNumber1',
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
      return value ? (
        <Badge variant="secondary" className="bg-amber-200 dark:bg-amber-600">
          {value}
        </Badge>
      ) : (
        '-'
      );
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
      return value ? (
        <Badge variant="secondary" className="bg-green-200 dark:bg-green-600">
          {value}
        </Badge>
      ) : (
        '-'
      );
    },
  },
  {
    header: 'Work Agreement Date',
    cell: ({ row, getValue }) => {
      const value = getValue<string>();
      const date =
        value === WORK_AGREEMENT_STATUS_ENUM.ON_PROCESSING_AT_RIYADH
          ? row.original.onProcessingAtRiyadhDate
          : value === WORK_AGREEMENT_STATUS_ENUM.MANJERI
            ? row.original.recievedInManjeriDate
            : null;

      return (
        <div className="flex flex-col gap-1">
          {value ? (
            <Badge variant="secondary" className="w-fit">
              {value}
            </Badge>
          ) : (
            '-'
          )}
          {date ? (
            <Badge variant="secondary" className="w-fit">
              {format(new Date(date), 'dd/MM/yyyy')}
            </Badge>
          ) : (
            '-'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'stampingStatus',
    header: 'Stamping Status',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? (
        <Badge variant="secondary" className="bg-sky-200 dark:bg-sky-600">
          {value}
        </Badge>
      ) : (
        '-'
      );
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
    header: 'PP Received In Office Delivery Method',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? (
        <Badge variant="secondary" className="bg-amber-200 dark:bg-amber-600">
          {value}
        </Badge>
      ) : (
        '-'
      );
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
    header: 'PP Received To Client Delivery Method',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? (
        <Badge variant="secondary" className="bg-sky-200 dark:bg-sky-600">
          {value}
        </Badge>
      ) : (
        '-'
      );
    },
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

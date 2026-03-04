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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IMedicalStatus } from '@/types/medical-status';
import { useRouter } from 'next/navigation';
import { useDeleteMedicalStatus } from '@/lib/queries/medical-status.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { OtpVerificationDialog } from '@/components/otp/OtpVerificationDialog';

export const medicalStatusColumns: ColumnDef<IMedicalStatus>[] = [
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'center',
    header: 'Center',
  },
  {
    accessorKey: 'medicalDate',
    header: 'Medical Date',
    cell: ({ row }) => {
      const date = row.original.medicalDate;
      return date ? format(new Date(date), 'PPP') : '-';
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'statusUpdateDate',
    header: 'Status Update Date',
    cell: ({ row }) => {
      const date = row.original.statusUpdateDate;
      return date ? format(new Date(date), 'PPP') : '-';
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return date ? format(new Date(date), 'PPP') : '-';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const medicalStatus = row.original;
      const router = useRouter();
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
      const deleteMutation = useDeleteMedicalStatus();

      const handleDelete = async () => {
        try {
          await deleteMutation.mutateAsync(medicalStatus._id);
          router.push('/medical-status/list');
          successToast('Medical status deleted successfully');
          setIsDeleteDialogOpen(false);
        } catch (error) {
          toast.error('Failed to delete medical status');
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(medicalStatus._id)}>
                Copy Medical Status ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOtpDialogOpen(true)}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <OtpVerificationDialog
            open={isOtpDialogOpen}
            onOpenChange={setIsOtpDialogOpen}
            onVerified={() => router.push(`/medical-status/${medicalStatus._id}`)}
            title="Verify to Edit Medical Status"
            description="Please verify your identity with the OTP sent to your registered email before editing this record."
            purpose="EDIT_MEDICAL_STATUS"
            module="medical-status"
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the medical status.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];

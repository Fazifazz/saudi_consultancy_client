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
import { ITicket } from '@/types/ticket';
import { useRouter } from 'next/navigation';
import { useDeleteTicket } from '@/lib/queries/ticket.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { useState } from 'react';
import { toast } from 'sonner';
import { OtpVerificationDialog } from '@/components/otp/OtpVerificationDialog';

export const ticketColumns: ColumnDef<ITicket>[] = [
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'travelType',
    header: 'Arrival/Departure',
  },
  {
    accessorKey: 'formattedBookingDate',
    header: 'Booking Date',
  },
  {
    accessorKey: 'airlineCompany',
    header: 'Airline Company',
  },
  {
    accessorKey: 'formattedTravellingDate',
    header: 'Travelling Date',
  },
  {
    accessorKey: 'paymentMode',
    header: 'Payment Mode',
  },
  {
    accessorKey: 'formattedCreatedAt',
    header: 'Created At',
  },
  {
    accessorKey: 'createdAt',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      const router = useRouter();
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
      const deleteMutation = useDeleteTicket();

      const handleDelete = async () => {
        try {
          await deleteMutation.mutateAsync(ticket._id);
          router.push('/ticket/list');
          successToast('Ticket deleted successfully');
          setIsDeleteDialogOpen(false);
        } catch (error) {
          toast.error('Failed to delete ticket');
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ticket._id)}>
                Copy Ticket ID
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
            onVerified={() => router.push(`/ticket/${ticket._id}`)}
            title="Verify to Edit Ticket"
            description="Please verify your identity with the OTP sent to your registered email before editing this ticket."
            purpose="EDIT_TICKET"
            module="ticket"
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the ticket.
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

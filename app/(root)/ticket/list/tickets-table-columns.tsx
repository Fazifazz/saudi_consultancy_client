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
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const deleteMutation = useDeleteTicket();

      const handleDelete = async () => {
        try {
          await deleteMutation.mutateAsync(ticket._id);
          router.push('/ticket/list');
          successToast('Ticket deleted successfully');
          setIsDialogOpen(false);
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
              <DropdownMenuItem onClick={() => router.push(`/ticket/${ticket._id}`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => setIsDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

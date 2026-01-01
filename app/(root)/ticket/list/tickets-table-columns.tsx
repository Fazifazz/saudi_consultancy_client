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
import { ITicket } from '@/types/ticket';

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
    accessorKey: 'bookingDate',
    header: 'Booking Date',
  },
  {
    accessorKey: 'airlineCompany',
    header: 'Airline Company',
  },
  {
    accessorKey: 'travellingDate',
    header: 'Travelling Date',
  },
  {
    accessorKey: 'paymentMode',
    header: 'Payment Mode',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;

      return (
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

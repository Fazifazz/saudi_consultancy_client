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
import { IVfs } from '@/types/vfs';
import { useRouter } from 'next/navigation';
import { useDeleteVfs } from '@/lib/queries/vfs.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const vfsColumns: ColumnDef<IVfs>[] = [
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'center',
    header: 'Center',
  },
  {
    accessorKey: 'date',
    header: 'VFS Date',
    cell: ({ row }) => {
      const date = row.original.date;
      return date ? format(new Date(date), 'PPP') : '-';
    },
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
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
      const vfs = row.original;
      const router = useRouter();
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const deleteMutation = useDeleteVfs();

      const handleDelete = async () => {
        try {
          await deleteMutation.mutateAsync(vfs._id);
          router.push('/vfs/list');
          successToast('VFS deleted successfully');
          setIsDialogOpen(false);
        } catch (error) {
          toast.error('Failed to delete VFS');
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(vfs._id)}>
                Copy VFS ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/vfs/${vfs._id}`)}>
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
                  This action cannot be undone. This will permanently delete the VFS record.
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

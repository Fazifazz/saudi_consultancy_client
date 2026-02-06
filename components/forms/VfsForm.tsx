'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vfsSchema, type VfsSchema } from '@/lib/validations/vfs';
import CommonSelect from '../core/CommonSelect';
import { useCreateVfs, useUpdateVfs } from '@/lib/queries/vfs.mutation';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import { IVfs } from '@/types/vfs';
import { VFS_CENTERS } from '@/lib/constants/medical-status';

export function VfsForm({
  className,
  transactions,
  vfsDetails,
  ...props
}: React.ComponentProps<'div'> & {
  transactions?: { value: string; label: string }[];
  vfsDetails?: IVfs;
}) {
  const router = useRouter();
  const createVfs = useCreateVfs();
  const updateVfs = useUpdateVfs();

  const isEditing = !!vfsDetails;

  const { control, handleSubmit } = useForm<VfsSchema>({
    resolver: zodResolver(vfsSchema),
    defaultValues: vfsDetails
      ? {
          transactionId: vfsDetails.transactionId,
          center: vfsDetails.center,
          date: new Date(vfsDetails.date),
          remarks: vfsDetails.remarks || '',
        }
      : {
          transactionId: '',
          center: '',
          date: new Date(),
          remarks: '',
        },
  });

  const onSubmit = (values: VfsSchema) => {
    if (isEditing) {
      updateVfs.mutate(
        { id: vfsDetails._id, data: values },
        {
          onSuccess: () => {
            successToast('VFS updated successfully');
            router.push('/vfs/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createVfs.mutate(values, {
        onSuccess: () => {
          successToast('VFS created successfully');
          router.push('/vfs/list');
        },
        onError: (error: any) => {
          destructiveToast(error?.response?.data?.message || 'Something went wrong');
        },
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">{isEditing ? 'Edit VFS' : 'Create VFS'}</CardTitle>
          <Button variant="outline" onClick={() => router.push('/vfs/list')}>
            List
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <div className="grid grid-cols-2 place-content-between gap-4">
                <div className="space-y-4">
                  <CommonSelect
                    control={control}
                    name="transactionId"
                    label="Transaction"
                    options={transactions || []}
                  />
                  <CommonSelect
                    control={control}
                    name="center"
                    label="Center"
                    options={VFS_CENTERS || []}
                  />
                  <CommonDatePicker
                    control={control}
                    name="date"
                    label="VFS Date"
                    placeholder="Select VFS date"
                  />
                </div>
                <div className="space-y-4">
                  <CommonTextArea
                    control={control}
                    name="remarks"
                    label="Remarks"
                    placeholder="Enter remarks"
                  />
                </div>
              </div>
              <div className="flex flex-between gap-2">
                <Button
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={createVfs.isPending || updateVfs.isPending}
                >
                  {createVfs.isPending || updateVfs.isPending ? 'Reseting...' : 'Reset'}
                </Button>
                <Button
                  className="w-39"
                  type="submit"
                  disabled={createVfs.isPending || updateVfs.isPending}
                >
                  {createVfs.isPending || updateVfs.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update VFS'
                      : 'Create VFS'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

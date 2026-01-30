'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonTextInput from '../core/CommonTextInput';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonSelect from '../core/CommonSelect';
import { TRANSACTION_PURPOSES } from '../../lib/constants/transaction';
import { useCreateTransaction, useUpdateTransaction } from '@/lib/queries/transaction.mutation';
import { transactionSchema, TransactionSchema } from '@/lib/validations/transaction';
import { ITransaction } from '@/types/transaction';

export function TransactionForm({
  className,
  customers,
  transactionDetails,
  ...props
}: React.ComponentProps<'div'> & {
  customers: { value: string; label: string }[];
  transactionDetails?: ITransaction;
}) {
  const router = useRouter();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  const isEditing = !!transactionDetails;

  const { control, handleSubmit } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transactionDetails
      ? {
          name: transactionDetails.name,
          customerId: transactionDetails.customerId,
          remarks: transactionDetails.remarks,
        }
      : {
          name: '',
          customerId: '',
          remarks: '',
        },
  });

  const onSubmit = (values: TransactionSchema) => {
    if (isEditing) {
      updateTransaction.mutate(
        { id: transactionDetails._id, data: values },
        {
          onSuccess: () => {
            successToast('Transaction updated successfully');
            router.push('/transaction/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createTransaction.mutate(values, {
        onSuccess: () => {
          successToast('Transaction created successfully');
          router.push('/transaction/list');
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
        <CardHeader className="text-start">
          <CardTitle className="text-xl">
            {isEditing ? 'Edit Transaction' : 'Create Transaction'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <div className="grid grid-cols-2 place-content-between gap-4">
                <div className="space-y-4">
                  <CommonSelect
                    control={control}
                    name="name"
                    label="Purpose"
                    options={TRANSACTION_PURPOSES || []}
                  />
                  <CommonSelect
                    control={control}
                    name="customerId"
                    label="Customer"
                    options={customers}
                  />
                  <CommonTextInput control={control} name="remarks" label="Remarks" />
                </div>
              </div>
              <div className="flex flex-between gap-2">
                <Button
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={createTransaction.isPending}
                >
                  {createTransaction.isPending ? 'Reseting...' : 'Reset'}
                </Button>
                <Button className="w-39" type="submit" disabled={createTransaction.isPending}>
                  {createTransaction.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Transaction'
                      : 'Create Transaction'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

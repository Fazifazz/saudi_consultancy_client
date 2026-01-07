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
import { useCreateTransaction } from '@/lib/queries/transaction.mutation';
import { transactionSchema, TransactionSchema } from '@/lib/validations/transaction';

export function TransactionForm({
  className,
  customers,
  ...props
}: React.ComponentProps<'div'> & { customers: { value: string; label: string }[] }) {
  const router = useRouter();
  const createTransaction = useCreateTransaction();

  const { control, handleSubmit } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: '',
      remarks: '',
      customerId: '',
    },
  });

  const onSubmit = (values: TransactionSchema) => {
    createTransaction.mutate(values, {
      onSuccess: () => {
        successToast('Transaction created successfully');
        router.push('/transaction/list');
      },
      onError: (error: any) => {
        destructiveToast(error?.response?.data?.message || 'Something went wrong');
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl">Create Transaction</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <div className="grid grid-cols-2 place-content-between gap-4">
                <div className="space-y-4">
                  <CommonTextInput control={control} name="name" label="Name" />
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
                  {createTransaction.isPending ? 'Saving...' : 'Create Transaction'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

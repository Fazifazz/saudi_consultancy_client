'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { agencyPaymentSchema, type AgencyPaymentSchema } from '@/lib/validations/agency-payment';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonSelect from '../core/CommonSelect';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import {
  useCreateAgencyPayment,
  useUpdateAgencyPayment,
} from '@/lib/queries/agency-payment.mutation';
import { AGENCIES } from '@/lib/constants/agency';
import { IAgencyPayment } from '@/types/agency-payment';
import { CommonListForSelect } from '@/types/common';
import CommonTextInput from '../core/CommonTextInput';
import { paymentModeOptions } from '@/lib/constants/payments';

export function AgencyPaymentForm({
  className,
  transactions,
  agencyPaymentDetails,
  id,
  ...props
}: React.ComponentProps<'div'> & {
  transactions: CommonListForSelect[];
  agencyPaymentDetails?: IAgencyPayment;
}) {
  const router = useRouter();
  const createAgencyPayment = useCreateAgencyPayment();
  const updateAgencyPayment = useUpdateAgencyPayment();

  const isEditing = !!id;

  const { control, handleSubmit } = useForm<AgencyPaymentSchema>({
    resolver: zodResolver(agencyPaymentSchema),
    defaultValues: agencyPaymentDetails
      ? {
          transactionId: agencyPaymentDetails.transactionId,
          date: agencyPaymentDetails.date ? new Date(agencyPaymentDetails.date) : new Date(),
          amount: agencyPaymentDetails.amount || 0,
          agency: agencyPaymentDetails.agency || '',
          paymentMode: agencyPaymentDetails.paymentMode || '',
          accountHolder: agencyPaymentDetails.accountHolder || '',
          remarks: agencyPaymentDetails.remarks || '',
        }
      : {
          date: new Date(),
          transactionId: '',
          amount: 0,
          agency: '',
          remarks: '',
        },
  });

  const onSubmit = (values: AgencyPaymentSchema) => {
    if (isEditing) {
      updateAgencyPayment.mutate(
        { id, ...values },
        {
          onSuccess: () => {
            successToast('Agency Payment updated successfully');
            router.push('/agency-payment/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createAgencyPayment.mutate(values, {
        onSuccess: () => {
          successToast('Agency Payment created successfully');
          router.push('/agency-payment/list');
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
          <CardTitle className="text-xl">{`${isEditing ? 'Edit' : 'Create'} Agency Payment`}</CardTitle>
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
                  <CommonDatePicker control={control} name="date" label="Date" />
                  <CommonSelect control={control} name="agency" label="Agency" options={AGENCIES} />
                  <CommonTextInput control={control} name="amount" label="Amount" type="number" />
                </div>
                <div className="space-y-4">
                  <CommonTextInput control={control} name="accountHolder" label="Account Holder" />
                  <CommonSelect
                    control={control}
                    name="paymentMode"
                    label="Payment Mode"
                    options={paymentModeOptions}
                  />
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
                  className="w-30 bg-red-400"
                  type="reset"
                  disabled={createAgencyPayment.isPending || updateAgencyPayment.isPending}
                >
                  {createAgencyPayment.isPending || updateAgencyPayment.isPending
                    ? 'Reseting...'
                    : 'Reset'}
                </Button>
                <Button
                  className="w-30"
                  type="submit"
                  disabled={createAgencyPayment.isPending || updateAgencyPayment.isPending}
                >
                  {createAgencyPayment.isPending || updateAgencyPayment.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update'
                      : 'Create'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

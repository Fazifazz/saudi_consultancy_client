'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { medicalPaymentSchema, type MedicalPaymentSchema } from '@/lib/validations/medical-payment';
import CommonTextInput from '../core/CommonTextInput';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonSelect from '../core/CommonSelect';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import {
  useCreateMedicalPayment,
  useUpdateMedicalPayment,
} from '@/lib/queries/medical-payment.mutation';
import { paymentModeOptions } from '@/lib/constants/payments';
import { IMedicalPayment } from '@/types/medical-payment';
import { CommonListForSelect } from '@/types/common';

export function MedicalPaymentForm({
  className,
  transactions,
  medicalPaymentDetails,
  id,
  ...props
}: React.ComponentProps<'div'> & {
  transactions: CommonListForSelect[];
  medicalPaymentDetails?: IMedicalPayment;
}) {
  const router = useRouter();
  const createMedicalPayment = useCreateMedicalPayment();
  const updateMedicalPayment = useUpdateMedicalPayment();

  const isEditing = !!id;

  const { control, handleSubmit } = useForm<MedicalPaymentSchema>({
    resolver: zodResolver(medicalPaymentSchema),
    defaultValues: medicalPaymentDetails
      ? {
          transactionId: medicalPaymentDetails.transactionId,
          date: medicalPaymentDetails.date ? new Date(medicalPaymentDetails.date) : new Date(),
          paymentMode: medicalPaymentDetails.paymentMode || '',
          amount: medicalPaymentDetails.amount || 0,
          remarks: medicalPaymentDetails.remarks || '',
        }
      : {
          date: new Date(),
          transactionId: '',
          paymentMode: '',
          amount: 0,
          remarks: '',
        },
  });

  const onSubmit = (values: MedicalPaymentSchema) => {
    if (isEditing) {
      updateMedicalPayment.mutate(
        { id, ...values },
        {
          onSuccess: () => {
            successToast('MedicalPayment updated successfully');
            router.push('/medical-payment/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createMedicalPayment.mutate(values, {
        onSuccess: () => {
          successToast('MedicalPayment created successfully');
          router.push('/medical-payment/list');
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
          <CardTitle className="text-xl">{`${isEditing ? 'Edit' : 'Create'} Medical Payment`}</CardTitle>
          <Button variant="outline" onClick={() => router.push('/medical-payment/list')}>
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
                  <CommonDatePicker control={control} name="date" label="Payment Date" />
                  <CommonTextInput control={control} name="amount" label="Amount" type="number" />
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
                  disabled={createMedicalPayment.isPending || updateMedicalPayment.isPending}
                >
                  {createMedicalPayment.isPending || updateMedicalPayment.isPending
                    ? 'Reseting...'
                    : 'Reset'}
                </Button>
                <Button
                  className="w-30"
                  type="submit"
                  disabled={createMedicalPayment.isPending || updateMedicalPayment.isPending}
                >
                  {createMedicalPayment.isPending || updateMedicalPayment.isPending
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

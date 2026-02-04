'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ksaStatusSchema, type KsaStatusSchema } from '@/lib/validations/ksa-status';
import CommonSelect from '../core/CommonSelect';
import { useCreateKsaStatus, useUpdateKsaStatus } from '@/lib/queries/ksa-status.mutation';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import CommonTextInput from '../core/CommonTextInput';
import { IKsaStatus } from '@/types/ksa-status';
import { IQAMA_VALIDITY, VISA_TRANSFER_STATUS } from '@/lib/constants/ksa-status';

export function KsaStatusForm({
  className,
  transactions,
  ksaStatusDetails,
  ...props
}: React.ComponentProps<'div'> & {
  transactions?: { value: string; label: string }[];
  ksaStatusDetails?: IKsaStatus;
}) {
  const router = useRouter();
  const create = useCreateKsaStatus();
  const update = useUpdateKsaStatus();

  const isEditing = !!ksaStatusDetails;

  const { control, handleSubmit } = useForm<KsaStatusSchema>({
    resolver: zodResolver(ksaStatusSchema as any),
    defaultValues: ksaStatusDetails
      ? {
          transactionId: ksaStatusDetails.transactionId,
          saudiArrivedDate: ksaStatusDetails.saudiArrivedDate
            ? new Date(ksaStatusDetails.saudiArrivedDate)
            : undefined,
          iqamaIssuedDate: ksaStatusDetails.iqamaIssuedDate
            ? new Date(ksaStatusDetails.iqamaIssuedDate)
            : undefined,
          iqamaValidity: ksaStatusDetails.iqamaValidity,
          visaTransferStatus: ksaStatusDetails.visaTransferStatus || '',
          customerPayment: ksaStatusDetails.customerPayment,
          customerPaymentDate: ksaStatusDetails.customerPaymentDate
            ? new Date(ksaStatusDetails.customerPaymentDate)
            : undefined,
          remarks: ksaStatusDetails.remarks || '',
        }
      : {
          transactionId: '',
          saudiArrivedDate: undefined,
          iqamaIssuedDate: undefined,
          iqamaValidity: undefined,
          visaTransferStatus: '',
          customerPayment: 0,
          customerPaymentDate: undefined,
          remarks: '',
        },
  });

  const onSubmit = (values: KsaStatusSchema) => {
    if (isEditing) {
      update.mutate(
        { id: ksaStatusDetails!._id, data: values },
        {
          onSuccess: () => {
            successToast('KSA status updated successfully');
            router.push('/ksa-status/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      create.mutate(values as any, {
        onSuccess: () => {
          successToast('KSA status created successfully');
          router.push('/ksa-status/list');
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
            {isEditing ? 'Edit KSA Status' : 'Create KSA Status'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <CommonSelect
                  control={control}
                  name="transactionId"
                  label="Transaction"
                  options={transactions || []}
                />

                <CommonDatePicker
                  control={control}
                  name="saudiArrivedDate"
                  label="Saudi Arrived Date"
                />

                <CommonDatePicker
                  control={control}
                  name="iqamaIssuedDate"
                  label="Iqama Issued Date"
                />

                <CommonSelect
                  control={control}
                  name="iqamaValidity"
                  label="Iqama Validity (months)"
                  type="number"
                  options={IQAMA_VALIDITY || []}
                />

                <CommonSelect
                  control={control}
                  name="visaTransferStatus"
                  label="Visa Transfer Status"
                  options={VISA_TRANSFER_STATUS || []}
                />

                <CommonTextInput
                  control={control}
                  name="customerPayment"
                  label="Customer Payment"
                  type="number"
                />

                <CommonDatePicker
                  control={control}
                  name="customerPaymentDate"
                  label="Customer Payment Date"
                />

                <CommonTextArea control={control} name="remarks" label="Remarks" />
              </div>

              <div className="flex flex-between gap-2">
                <Button
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={create.isPending || update.isPending}
                >
                  {create.isPending || update.isPending ? 'Reseting...' : 'Reset'}
                </Button>
                <Button
                  className="w-39"
                  type="submit"
                  disabled={create.isPending || update.isPending}
                >
                  {create.isPending || update.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update KSA Status'
                      : 'Create KSA Status'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default KsaStatusForm;

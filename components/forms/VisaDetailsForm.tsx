'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visaDetailsSchema, type VisaDetailsSchema } from '@/lib/validations/visa-details';
import CommonTextInput from '../core/CommonTextInput';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonSelect from '../core/CommonSelect';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import { useCreateVisaDetail, useUpdateVisaDetail } from '@/lib/queries/visa-details.mutation';
import { paymentModeOptions } from '@/lib/constants/payments';
import { AGENCIES } from '@/lib/constants/agency';
import { IVisaDetail } from '@/types/visa-details';
import { CommonListForSelect } from '@/types/common';
import { PROFESSIONS } from '@/lib/constants/proffessions';
import { VISA_TYPES } from '@/lib/constants/visa_types';

export function VisaDetailsForm({
  className,
  transactions,
  visaDetailDetails,
  id,
  ...props
}: React.ComponentProps<'div'> & {
  transactions: CommonListForSelect[];
  visaDetailDetails?: IVisaDetail;
}) {
  const router = useRouter();
  const createVisaDetail = useCreateVisaDetail();
  const updateVisaDetail = useUpdateVisaDetail();

  const isEditing = !!id;

  const { control, handleSubmit } = useForm<VisaDetailsSchema>({
    resolver: zodResolver(visaDetailsSchema),
    defaultValues: visaDetailDetails
      ? {
          transactionId: visaDetailDetails.transactionId,
          visaNumber: visaDetailDetails.visaNumber || 0,
          visaType: visaDetailDetails.visaType || '',
          stampingDate: visaDetailDetails.stampingDate
            ? new Date(visaDetailDetails.stampingDate)
            : new Date(),
          paymentMode: visaDetailDetails.paymentMode || '',
          profession: visaDetailDetails.profession || '',
          agency: visaDetailDetails.agency || '',
          remarks: visaDetailDetails.remarks || '',
        }
      : {
          stampingDate: new Date(),
          transactionId: '',
          visaNumber: 0,
          visaType: '',
          paymentMode: '',
          profession: '',
          agency: '',
          remarks: '',
        },
  });

  const onSubmit = (values: VisaDetailsSchema) => {
    if (isEditing) {
      updateVisaDetail.mutate(
        { id, ...values },
        {
          onSuccess: () => {
            successToast('Visa Detail updated successfully');
            router.push('/visa-details/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createVisaDetail.mutate(values, {
        onSuccess: () => {
          successToast('Visa Detail created successfully');
          router.push('/visa-details/list');
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
          <CardTitle className="text-xl">{`${isEditing ? 'Edit' : 'Create'} Visa Details`}</CardTitle>
          <Button variant="outline" onClick={() => router.push('/visa-details/list')}>
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
                  <CommonTextInput
                    control={control}
                    name="visaNumber"
                    label="Visa Number"
                    type="number"
                  />
                  <CommonSelect
                    control={control}
                    name="visaType"
                    label="Visa Type"
                    options={VISA_TYPES}
                  />
                  <CommonDatePicker control={control} name="stampingDate" label="Stamping Date" />
                  <CommonSelect
                    control={control}
                    name="paymentMode"
                    label="Payment Mode"
                    options={paymentModeOptions}
                  />
                </div>
                <div className="space-y-4">
                  <CommonSelect
                    control={control}
                    name="profession"
                    label="Profession"
                    options={PROFESSIONS}
                  />
                  <CommonSelect control={control} name="agency" label="Agency" options={AGENCIES} />
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
                  disabled={createVisaDetail.isPending || updateVisaDetail.isPending}
                >
                  {createVisaDetail.isPending || updateVisaDetail.isPending
                    ? 'Reseting...'
                    : 'Reset'}
                </Button>
                <Button
                  className="w-30"
                  type="submit"
                  disabled={createVisaDetail.isPending || updateVisaDetail.isPending}
                >
                  {createVisaDetail.isPending || updateVisaDetail.isPending
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

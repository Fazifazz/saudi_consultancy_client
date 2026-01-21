'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { medicalStatusSchema, type MedicalStatusSchema } from '@/lib/validations/medical-status';
import CommonSelect from '../core/CommonSelect';
import {
  useCreateMedicalStatus,
  useUpdateMedicalStatus,
} from '@/lib/queries/medical-status.mutation';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import { IMedicalStatus } from '@/types/medical-status';
import { MEDICAL_CENTERS, MEDICAL_STATUS } from '@/lib/constants/medical-status';

export function MedicalStatusForm({
  className,
  transactions,
  medicalStatusDetails,
  ...props
}: React.ComponentProps<'div'> & {
  transactions?: { value: string; label: string }[];
  medicalStatusDetails?: IMedicalStatus;
}) {
  const router = useRouter();
  const createMedicalStatus = useCreateMedicalStatus();
  const updateMedicalStatus = useUpdateMedicalStatus();

  const isEditing = !!medicalStatusDetails;

  const { control, handleSubmit } = useForm<MedicalStatusSchema>({
    resolver: zodResolver(medicalStatusSchema),
    defaultValues: medicalStatusDetails
      ? {
          transactionId: medicalStatusDetails.transactionId,
          center: medicalStatusDetails.center,
          slipDate: medicalStatusDetails.slipDate
            ? new Date(medicalStatusDetails.slipDate)
            : undefined,
          medicalDate: new Date(medicalStatusDetails.medicalDate),
          statusUpdateDate: new Date(medicalStatusDetails.statusUpdateDate),
          revisitDate: medicalStatusDetails.revisitDate
            ? new Date(medicalStatusDetails.revisitDate)
            : undefined,
          status: medicalStatusDetails.status,
          remarks: medicalStatusDetails.remarks || '',
        }
      : {
          transactionId: '',
          center: '',
          slipDate: undefined,
          medicalDate: new Date(),
          statusUpdateDate: new Date(),
          revisitDate: undefined,
          status: '',
          remarks: '',
        },
  });

  const onSubmit = (values: MedicalStatusSchema) => {
    if (isEditing) {
      updateMedicalStatus.mutate(
        { id: medicalStatusDetails._id, data: values },
        {
          onSuccess: () => {
            successToast('Medical status updated successfully');
            router.push('/medical-status/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createMedicalStatus.mutate(values, {
        onSuccess: () => {
          successToast('Medical status created successfully');
          router.push('/medical-status/list');
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
            {isEditing ? 'Edit Medical Status' : 'Create Medical Status'}
          </CardTitle>
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
                    options={MEDICAL_CENTERS || []}
                  />
                  <CommonDatePicker
                    control={control}
                    name="slipDate"
                    label="Slip Date"
                    placeholder="Select slip date"
                  />
                  <CommonDatePicker
                    control={control}
                    name="medicalDate"
                    label="Medical Date"
                    placeholder="Select medical date"
                  />
                </div>
                <div className="space-y-4">
                  <CommonDatePicker
                    control={control}
                    name="statusUpdateDate"
                    label="Status Update Date"
                    placeholder="Select status update date"
                  />
                  <CommonDatePicker
                    control={control}
                    name="revisitDate"
                    label="Revisit Date"
                    placeholder="Select revisit date"
                  />
                  <CommonSelect
                    control={control}
                    name="status"
                    label="Status"
                    options={MEDICAL_STATUS || []}
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
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={createMedicalStatus.isPending || updateMedicalStatus.isPending}
                >
                  {createMedicalStatus.isPending || updateMedicalStatus.isPending
                    ? 'Reseting...'
                    : 'Reset'}
                </Button>
                <Button
                  className="w-39"
                  type="submit"
                  disabled={createMedicalStatus.isPending || updateMedicalStatus.isPending}
                >
                  {createMedicalStatus.isPending || updateMedicalStatus.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Medical Status'
                      : 'Create Medical Status'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

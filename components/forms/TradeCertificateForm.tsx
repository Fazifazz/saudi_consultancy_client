'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tradeCertificateSchema,
  type TradeCertificateSchema,
} from '@/lib/validations/trade-certificate';
import CommonSelect from '../core/CommonSelect';
import {
  useCreateTradeCertificate,
  useUpdateTradeCertificate,
} from '@/lib/queries/trade-certificate.mutation';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonDatePicker from '../core/CommonDatePicker';
import CommonTextArea from '../core/CommonTextArea';
import CommonTextInput from '../core/CommonTextInput';
import { ITradeCertificate } from '@/types/trade-certificate';
import {
  TC_PAYMENT_MODES,
  TRADE_CERTIFICATE_CENTERS,
  TRADE_CERTIFICATE_STATUS,
} from '@/lib/constants/trade-certificate';
import { AGENCIES } from '@/lib/constants/agency';
import { paymentModeOptions } from '@/lib/constants/payments';

export function TradeCertificateForm({
  className,
  transactions,
  tradeCertificateDetails,
  ...props
}: React.ComponentProps<'div'> & {
  transactions?: { value: string; label: string }[];
  tradeCertificateDetails?: ITradeCertificate;
}) {
  const router = useRouter();
  const createTradeCertificate = useCreateTradeCertificate();
  const updateTradeCertificate = useUpdateTradeCertificate();

  const isEditing = !!tradeCertificateDetails;

  const { control, handleSubmit } = useForm<TradeCertificateSchema>({
    resolver: zodResolver(tradeCertificateSchema),
    defaultValues: tradeCertificateDetails
      ? {
          transactionId: tradeCertificateDetails.transactionId,
          issuedAgency: tradeCertificateDetails.issuedAgency,
          appointmentDate: tradeCertificateDetails.appointmentDate
            ? new Date(tradeCertificateDetails.appointmentDate)
            : undefined,
          appointMentPayment: tradeCertificateDetails.appointMentPayment,
          paymentMethod: tradeCertificateDetails.paymentMethod || '',
          center: tradeCertificateDetails.center,
          tcStatus: tradeCertificateDetails.tcStatus,

          // tcSettingAmount: tradeCertificateDetails.tcSettingAmount,
          // tcSettingAmountCenter: tradeCertificateDetails.tcSettingAmountCenter,
          // tcSettingAgency: tradeCertificateDetails.tcSettingAgency,
          // tcSettingDate: tradeCertificateDetails.tcSettingDate
          //   ? new Date(tradeCertificateDetails.tcSettingDate)
          //   : undefined,

          tcAppointmentAmount: tradeCertificateDetails.tcAppointmentAmount,
          tcAppointmentAmountCenter: tradeCertificateDetails.tcAppointmentAmountCenter,
          tcAppointmentAgency: tradeCertificateDetails.tcAppointmentAgency,
          tcAppointmentDate: tradeCertificateDetails.tcAppointmentDate
            ? new Date(tradeCertificateDetails.tcAppointmentDate)
            : undefined,
          remarks: tradeCertificateDetails.remarks || '',
        }
      : {
          transactionId: '',
          issuedAgency: '',
          appointmentDate: new Date(),
          appointMentPayment: undefined,
          paymentMethod: '',
          center: '',
          tcStatus: '',

          // tcSettingAmount: undefined,
          // tcSettingAmountCenter: '',
          // tcSettingAgency: '',
          // tcSettingDate: new Date(),

          tcAppointmentAmount: undefined,
          tcAppointmentAmountCenter: '',
          tcAppointmentAgency: '',
          tcAppointmentDate: new Date(),
          remarks: '',
        },
  });

  // const tcSettingCenter = useWatch({
  //   control,
  //   name: 'tcSettingAmountCenter',
  // });

  const tcAppointmentCenter = useWatch({
    control,
    name: 'tcAppointmentAmountCenter',
  });

  const onSubmit = (values: TradeCertificateSchema) => {
    if (isEditing) {
      updateTradeCertificate.mutate(
        { id: tradeCertificateDetails._id, data: values },
        {
          onSuccess: () => {
            successToast('Trade certificate updated successfully');
            router.push('/trade-certificate/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createTradeCertificate.mutate(values, {
        onSuccess: () => {
          successToast('Trade certificate created successfully');
          router.push('/trade-certificate/list');
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
          <CardTitle className="text-xl">
            {isEditing ? 'Edit Trade Certificate' : 'Create Trade Certificate'}
          </CardTitle>
          <Button variant="outline" onClick={() => router.push('/trade-certificate/list')}>
            List
          </Button>
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

                <CommonSelect
                  control={control}
                  name="issuedAgency"
                  label="Issued Agency"
                  options={AGENCIES || []}
                />

                <CommonDatePicker
                  control={control}
                  name="appointmentDate"
                  label="Appointment Date"
                  placeholder="Select appointment date"
                />

                <CommonTextInput
                  control={control}
                  name="appointMentPayment"
                  label="Appointment Payment"
                  type="number"
                  placeholder="Enter payment amount"
                />

                <CommonSelect
                  control={control}
                  name="paymentMethod"
                  label="Payment Method"
                  options={paymentModeOptions || []}
                />

                <CommonSelect
                  control={control}
                  name="center"
                  label="Center"
                  options={TRADE_CERTIFICATE_CENTERS || []}
                />

                {/* ============ TC SETTING SECTION ============
                <h3 className="col-span-2 mt-6 text-lg font-semibold text-gray-700">
                  TC Setting Details
                </h3>

                <CommonTextInput
                  control={control}
                  name="tcSettingAmount"
                  label="TC Setting Amount"
                  type="number"
                  placeholder="Enter TC Setting Amount"
                />

                <CommonSelect
                  control={control}
                  name="tcSettingAmountCenter"
                  label="TC Setting Amount Center"
                  options={TC_PAYMENT_MODES || []}
                />

                {tcSettingCenter === 'AGENCY' && (
                  <CommonSelect
                    control={control}
                    name="tcSettingAgency"
                    label="TC Setting Agency"
                    options={AGENCIES || []}
                  />
                )}

                <CommonDatePicker control={control} name="tcSettingDate" label="TC Setting Date" /> */}

                {/* ============ TC APPOINTMENT SECTION ============ */}
                <h3 className="col-span-2 mt-6 text-lg font-semibold text-gray-700">
                  TC Appointment Details
                </h3>

                <CommonTextInput
                  control={control}
                  name="tcAppointmentAmount"
                  label="TC Appointment Amount"
                  type="number"
                  placeholder="Enter TC Appointment Amount"
                />

                <CommonSelect
                  control={control}
                  name="tcAppointmentAmountCenter"
                  label="TC Appointment Amount Center"
                  options={TC_PAYMENT_MODES || []}
                />

                {tcAppointmentCenter === 'AGENCY' && (
                  <CommonSelect
                    control={control}
                    name="tcAppointmentAgency"
                    label="TC Appointment Agency"
                    options={AGENCIES || []}
                  />
                )}

                <CommonDatePicker
                  control={control}
                  name="tcAppointmentDate"
                  label="TC Appointment Date"
                />

                <h3 className="col-span-2 mt-6 text-lg font-semibold text-gray-700">TC Status</h3>

                <CommonSelect
                  control={control}
                  name="tcStatus"
                  label="TC Status"
                  options={TRADE_CERTIFICATE_STATUS || []}
                />

                <CommonTextArea control={control} name="remarks" label="Remarks" />
              </div>
              <div className="flex flex-between gap-2">
                <Button
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={createTradeCertificate.isPending || updateTradeCertificate.isPending}
                >
                  {createTradeCertificate.isPending || updateTradeCertificate.isPending
                    ? 'Reseting...'
                    : 'Reset'}
                </Button>
                <Button
                  className="w-39"
                  type="submit"
                  disabled={createTradeCertificate.isPending || updateTradeCertificate.isPending}
                >
                  {createTradeCertificate.isPending || updateTradeCertificate.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Trade Certificate'
                      : 'Create Trade Certificate'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

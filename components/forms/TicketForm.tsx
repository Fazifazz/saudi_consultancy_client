'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketSchema, type TicketSchema } from '@/lib/validations/ticket';
import CommonTextInput from '../core/CommonTextInput';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import CommonSelect from '../core/CommonSelect';
import CommonDatePicker from '../core/CommonDatePicker';
import { useCreateTicket, useUpdateTicket } from '@/lib/queries/ticket.mutation';
import { travelTypeOptions } from '@/lib/constants/travel';
import { paymentModeOptions } from '@/lib/constants/payments';
import { ITicket } from '@/types/ticket';

export function TicketForm({
  className,
  transactions,
  ticketDetails,
  ...props
}: React.ComponentProps<'div'> & {
  transactions?: { value: string; label: string }[];
  ticketDetails?: ITicket;
}) {
  const router = useRouter();
  const createTicket = useCreateTicket();
  const updateTicket = useUpdateTicket();

  const isEditing = !!ticketDetails;

  const { control, handleSubmit } = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: ticketDetails
      ? {
          transactionId: ticketDetails.transactionId,
          travelType: ticketDetails.travelType,
          bookingDate: new Date(ticketDetails.bookingDate),
          travellingDate: new Date(ticketDetails.travellingDate),
          airlineCompany: ticketDetails.airlineCompany,
          paymentMode: ticketDetails.paymentMode,
        }
      : {
          transactionId: '',
          travelType: '',
          bookingDate: new Date(),
          travellingDate: new Date(),
          airlineCompany: '',
          paymentMode: '',
        },
  });

  const onSubmit = (values: TicketSchema) => {
    if (isEditing) {
      updateTicket.mutate(
        { id: ticketDetails._id, data: values },
        {
          onSuccess: () => {
            successToast('Ticket updated successfully');
            router.push('/ticket/list');
          },
          onError: (error: any) => {
            destructiveToast(error?.response?.data?.message || 'Something went wrong');
          },
        }
      );
    } else {
      createTicket.mutate(values, {
        onSuccess: () => {
          successToast('Ticket created successfully');
          router.push('/ticket/list');
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
          <CardTitle className="text-xl">{isEditing ? 'Edit Ticket' : 'Create Ticket'}</CardTitle>
          <Button variant="outline" onClick={() => router.push('/ticket/list')}>
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
                    name="travelType"
                    label="Arrival/Departure"
                    options={travelTypeOptions}
                  />
                  <CommonTextInput
                    control={control}
                    name="airlineCompany"
                    label="Airline Company"
                  />
                </div>
                <div className="space-y-4">
                  <CommonDatePicker control={control} name="bookingDate" label="Booking Date" />
                  <CommonDatePicker
                    control={control}
                    name="travellingDate"
                    label="Travelling Date"
                  />
                  <CommonSelect
                    control={control}
                    name="paymentMode"
                    label="Payment Mode"
                    options={paymentModeOptions}
                  />
                </div>
              </div>
              <div className="flex flex-between gap-2">
                <Button
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={createTicket.isPending || updateTicket.isPending}
                >
                  {createTicket.isPending || updateTicket.isPending ? 'Reseting...' : 'Reset'}
                </Button>
                <Button
                  className="w-39"
                  type="submit"
                  disabled={createTicket.isPending || updateTicket.isPending}
                >
                  {createTicket.isPending || updateTicket.isPending
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Ticket'
                      : 'Create Ticket'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { useCreateTicket } from '@/lib/queries/ticket.mutation';
import { travelTypeOptions } from '@/lib/constants/travel';
import { paymentModeOptions } from '@/lib/constants/payments';

export function TicketForm({
  className,
  transactions,
  ...props
}: React.ComponentProps<'div'> & { transactions: { value: string; label: string }[] }) {
  const router = useRouter();
  const createTicket = useCreateTicket();

  const { control, handleSubmit } = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      travelType: '',
      bookingDate: new Date(),
      travellingDate: new Date(),
      airlineCompany: '',
      paymentMode: '',
    },
  });

  const onSubmit = (values: TicketSchema) => {
    // const newValues = refineInputValues();
    console.log('values submitting', values);
    createTicket.mutate(values, {
      onSuccess: () => {
        successToast('Ticket created successfully');
        router.push('/ticket/list');
      },
      onError: (error: any) => {
        destructiveToast(error?.response?.data?.message || 'Something went wrong');
      },
    });
  };

  // const refineInputValues = (values: TicketSchema) => {};
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl">Create Ticket</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <div className="grid grid-cols-2 place-content-between gap-4">
                <div className="space-y-4">
                  <CommonSelect
                    control={control}
                    name="customerId"
                    label="Ticket"
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
                </div>
                <div className="space-y-4">
                  <CommonSelect
                    control={control}
                    name="paymentMode"
                    label="Payment Mode"
                    options={paymentModeOptions}
                  />
                </div>
              </div>
              <div className="flex flex-between gap-2">
                <Button className="w-39 bg-red-400" type="reset" disabled={createTicket.isPending}>
                  {createTicket.isPending ? 'Reseting...' : 'Reset'}
                </Button>
                <Button className="w-39" type="submit" disabled={createTicket.isPending}>
                  {createTicket.isPending ? 'Saving...' : 'Create Ticket'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

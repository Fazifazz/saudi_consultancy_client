'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type CustomerSchema } from '@/lib/validations/customer';
import CommonTextInput from '../core/CommonTextInput';
import { useCreateCustomer, useUpdateCustomer } from '@/lib/queries/customer.mutation';
import { destructiveToast } from '../toast/DestructiveToast';
import { successToast } from '../toast/SuccessToast';
import { indianStatesOptions, keralaDistrictsOptions } from '@/lib/constants/locations';
import CommonSelect from '../core/CommonSelect';

type CustomerFormProps = {
  className?: string;
  id?: string;
  customer?: any;
};

export function CustomerForm({ className, id, customer, ...props }: CustomerFormProps) {
  const router = useRouter();
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();

  const isEdit = id !== undefined;

  const { control, handleSubmit } = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer?.name || '',
      passportNumber: customer?.passportNumber || '',
      address: customer?.address || '',
      postOffice: customer?.postOffice || '',
      state: customer?.state || 'Kerala',
      district: customer?.district || 'Malappuram',
      contactNumber1: customer?.contactNumber1 || '',
      contactNumber2: customer?.contactNumber2 || undefined,
    },
  });

  const onSubmit = (values: CustomerSchema) => {
    console.log('values submitting', values);
    if (isEdit) {
      updateCustomer.mutate(
        { id, ...values },
        {
          onSuccess: () => {
            successToast('Customer updated successfully');
            router.push('/customer/list');
          },
        }
      );
    } else {
      createCustomer.mutate(values, {
        onSuccess: () => {
          successToast('Customer created successfully');
          router.push('/customer/list');
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
          <CardTitle className="text-xl">{isEdit ? 'Edit Customer' : 'Create Customer'}</CardTitle>
          <Button variant="outline" onClick={() => router.push('/customer/list')}>
            List
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <div className="grid grid-cols-2 place-content-between gap-4">
                <div className="space-y-4">
                  <CommonTextInput control={control} name="name" label="Name" />
                  <CommonTextInput
                    control={control}
                    name="passportNumber"
                    label="Passport Number"
                  />
                  <CommonTextInput control={control} name="address" label="Address" />
                  <CommonTextInput control={control} name="postOffice" label="Post Office" />
                </div>
                <div className="space-y-4">
                  <CommonSelect
                    control={control}
                    name="state"
                    label="State"
                    options={indianStatesOptions}
                  />
                  <CommonSelect
                    control={control}
                    name="district"
                    label="District"
                    options={keralaDistrictsOptions}
                  />
                  <CommonTextInput
                    control={control}
                    name="contactNumber1"
                    label="Contact Number 1"
                  />
                  <CommonTextInput
                    control={control}
                    name="contactNumber2"
                    label="Contact Number 2"
                  />
                </div>
              </div>
              <div className="flex flex-between gap-2">
                <Button
                  className="w-39 bg-red-400"
                  type="reset"
                  disabled={createCustomer.isPending}
                >
                  {createCustomer.isPending ? 'Reseting...' : 'Reset'}
                </Button>
                <Button
                  className="w-39"
                  type="submit"
                  disabled={createCustomer.isPending || updateCustomer.isPending}
                >
                  {createCustomer.isPending || updateCustomer.isPending
                    ? 'Saving...'
                    : `${isEdit ? 'Update Customer' : 'Create Customer'}`}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

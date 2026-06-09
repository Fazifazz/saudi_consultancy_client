'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import CommonTextArea from '../core/CommonTextArea';
import CommonSelect from '../core/CommonSelect';
import { Label } from '../ui/label';
import CommonDatePicker from '../core/CommonDatePicker';
import { DELIVERY_MODES } from '@/lib/constants/delivery_modes';
import { Separator } from '../ui/separator';
import { CommonListForSelect } from '@/types/common';
import {
  STAMPING_STATUS,
  WORK_AGREEMENT_STATUS,
  WORK_AGREEMENT_STATUS_ENUM,
} from '@/lib/constants/status';
import {
  PassportPossessionSchema,
  passportPossessionSchema,
} from '@/lib/validations/passport-possession';
import {
  useCreatePassportPossession,
  useUpdatePassportPossession,
} from '@/lib/queries/passport-possession.mutations';
import { successToast } from '../toast/SuccessToast';
import { destructiveToast } from '../toast/DestructiveToast';
import { AxiosError } from 'axios';
import { AGENCIES } from '@/lib/constants/agency';
import { IPassportPossession, PassportPossessionByIdResponse } from '@/types/passportPossessions';
import { useRouter } from 'next/navigation';

interface PassportPossessionFormProps {
  id?: string | null;
  data?: Partial<IPassportPossession> | null;
  transactions: CommonListForSelect[];
}

const defaultValues = {
  transactionId: '',
  agency: '',
  agencyDeliveryMethod: '',
  agencyDeliveryDate: new Date(),
  workAgreementStatus: '',
  workAgreementOnProcessingInRiyadhDate: undefined,
  workAgreementRecievedInManjeriDate: undefined,
  stampingStatus: '',
  stampingDate: undefined,
  stampingRemarks: '',
  receivedInOfficeDate: undefined,
  receivedInOfficeDeliveryMethod: '',
  receivedToClientDate: undefined,
  receivedToClientDeliveryMethod: '',
} satisfies PassportPossessionSchema;

export function PassportPossessionForm({ transactions, id, data }: PassportPossessionFormProps) {
  const router = useRouter();
  // submit mutation
  const { mutate: createPassportPossession, isPending: createPending } =
    useCreatePassportPossession();
  const { mutate: updatePassportPossession, isPending: updatePending } =
    useUpdatePassportPossession();

  const isPending = createPending || updatePending;

  // create form with useFormHook
  const form = useForm<PassportPossessionSchema>({
    resolver: zodResolver(passportPossessionSchema) as any,
    defaultValues: (data ? data : defaultValues) as any,
  });

  const workAgreementStatus = form.watch('workAgreementStatus');
  const stampingStatus = form.watch('stampingStatus');

  function onSubmit(data: PassportPossessionSchema) {
    if (!id) {
      createPassportPossession(data, {
        onSuccess: () => {
          successToast('Passport Posission created successfully');
          form.reset(defaultValues);
        },
        onError: (error) => {
          const errorMessage =
            error instanceof AxiosError ? error?.response?.data?.message : error?.message;
          destructiveToast(errorMessage || 'Failed to create Passport Posission');
        },
      });
    } else {
      const updatePayload = { ...data, _id: id };
      updatePassportPossession(updatePayload, {
        onSuccess: () => {
          successToast('Passport Posission updated successfully');
          form.reset(defaultValues);
          router.push('/passport-possession/list');
        },
        onError: (error) => {
          const errorMessage =
            error instanceof AxiosError ? error?.response?.data?.message : error?.message;
          destructiveToast(errorMessage || 'Failed to update Passport Posission');
        },
      });
    }
  }

  const DISABLE_BEFORE_DATE = new Date(Date.now() - 1000 * 60 * 60 * 24);
  const CURRENT_STAMPING_STATUS =
    STAMPING_STATUS.find((status) => status.value === stampingStatus)?.label ?? 'Stamping';

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Passport Posission</CardTitle>
        <Button variant="outline" onClick={() => router.push('/passport-possession/list')}>
          List
        </Button>
      </CardHeader>
      <Separator />
      <CardContent>
        <form
          id="form-rhf-demo"
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CommonSelect
            control={form.control}
            name="transactionId"
            label="Transaction"
            placeholder="Transaction"
            options={transactions}
          />
          <FieldGroup>
            <Label className="bg-green-200 dark:bg-green-800 p-3 rounded">Agency</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <CommonSelect
                control={form.control}
                name="agency"
                label="Choose a Agency"
                placeholder="Select Agency"
                defaultValue={'manjeri'}
                options={AGENCIES}
              />
              <CommonSelect
                control={form.control}
                name="agencyDeliveryMethod"
                label="Choose a Delivery Mode"
                placeholder="Select Delivery Mode"
                options={DELIVERY_MODES}
              />
              <CommonDatePicker
                control={form.control}
                name="agencyDeliveryDate"
                label="Delivery Date"
                className="w-full"
                disableBefore={DISABLE_BEFORE_DATE}
              />
            </div>
          </FieldGroup>
          <FieldGroup>
            <Label className="bg-blue-200 dark:bg-blue-800 p-3 rounded">Work Agreement</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <CommonSelect
                control={form.control}
                name="workAgreementStatus"
                label="Choose a Status"
                placeholder="Select Status"
                options={WORK_AGREEMENT_STATUS}
              />
              {workAgreementStatus === WORK_AGREEMENT_STATUS_ENUM.ON_PROCESSING_AT_RIYADH ? (
                <CommonDatePicker
                  control={form.control}
                  name="workAgreementOnProcessingInRiyadhDate"
                  label="Work Agreement On Processing In Riyadh Date"
                  className="w-full"
                  disableBefore={DISABLE_BEFORE_DATE}
                />
              ) : workAgreementStatus === WORK_AGREEMENT_STATUS_ENUM.MANJERI ? (
                <CommonDatePicker
                  control={form.control}
                  name="workAgreementRecievedInManjeriDate"
                  label={`Work Agreement Recieved In Manjeri Date`}
                  className="w-full"
                  disableBefore={DISABLE_BEFORE_DATE}
                />
              ) : null}
            </div>
          </FieldGroup>
          <FieldGroup>
            <Label className="bg-amber-200 dark:bg-amber-800 p-3 rounded">Stamping</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <CommonSelect
                control={form.control}
                name="stampingStatus"
                label="Choose a Status"
                placeholder="Select Status"
                options={STAMPING_STATUS}
              />

              {stampingStatus && stampingStatus !== 'PENDING' && (
                <>
                  <CommonDatePicker
                    control={form.control}
                    name="stampingDate"
                    label={`${CURRENT_STAMPING_STATUS} Date`}
                    className="w-full"
                    disableBefore={DISABLE_BEFORE_DATE}
                  />
                  <CommonTextArea
                    control={form.control}
                    name="stampingRemarks"
                    label={`${CURRENT_STAMPING_STATUS} Remarks`}
                    placeholder={`${CURRENT_STAMPING_STATUS} Remarks...`}
                  />
                </>
              )}
            </div>
          </FieldGroup>
          <FieldGroup>
            <Label className="bg-red-200 dark:bg-red-800 p-3 rounded">PP Recieved at Office</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <CommonSelect
                control={form.control}
                name="receivedInOfficeDeliveryMethod"
                label="Choose a Delivery Mode"
                placeholder="Delivery Mode"
                options={DELIVERY_MODES}
              />
              <CommonDatePicker
                control={form.control}
                name="receivedInOfficeDate"
                label="Recieved In Office Date"
                className="w-full"
                disableBefore={DISABLE_BEFORE_DATE}
              />
            </div>
          </FieldGroup>
          <FieldGroup>
            <Label className="bg-purple-200 dark:bg-purple-800 p-3 rounded">PP Recieved To Client</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <CommonSelect
                control={form.control}
                name="receivedToClientDeliveryMethod"
                label="Choose a Delivery Mode"
                placeholder="Delivery Mode"
                options={DELIVERY_MODES}
              />
              <CommonDatePicker
                control={form.control}
                name="receivedToClientDate"
                label="Recieved To Client Date"
                className="w-full"
                disableBefore={DISABLE_BEFORE_DATE}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button disabled={isPending} type="submit" form="form-rhf-demo">
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

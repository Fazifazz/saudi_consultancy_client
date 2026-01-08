
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import CommonTextInput from '../core/CommonTextInput';
import CommonTextArea from '../core/CommonTextArea';
import CommonSelect from '../core/CommonSelect';
import CommonCheckBox from '../core/CommonCheckBox';
import { Label } from '../ui/label';
import CommonDatePicker from '../core/CommonDatePicker';
import { deliveryModes } from '@/lib/constants/delivery_modes';
import { Separator } from '../ui/separator';
import { List } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
    transactionId: z
        .string({ error: 'Customer is required' }).min(1, "Customer is required"),
    agency: z
        .string({ error: 'Agency is required' }).min(1, "Agency is required"),
    agencyDeliveryMethod: z
        .string({ error: 'Agency Delivery Mode is required' }).min(1, "Agency is required"),
    agencyDeliveryDate: z.date({ error: 'Agency Delivery Date is required' }),
    workAgreementStatus: z.string().nullable().optional(),
    workAgreementStatusDate: z.date().nullable().optional(),
    stampingStatus: z.string().nullable().optional(),
    stampingDate: z.date().nullable().optional(),
    stampingRemarks: z.string().nullable().optional(),
    receivedInOfficeDate: z.date().nullable().optional(),
    receivedInOfficeDeliveryMethod: z.string().nullable().optional(),
    receivedToClientDate: z.date().nullable().optional(),
    receivedToClientDeliveryMethod: z.string().nullable().optional(),
});

const defaultValues = {
    transactionId: '',
    agency: '',
    agencyDeliveryMethod: '',
    agencyDeliveryDate: new Date(),
    workAgreementStatus: '',
    workAgreementStatusDate: null,
    stampingStatus: '',
    stampingDate: null,
    stampingRemarks: '',
    receivedInOfficeDate: null,
    receivedInOfficeDeliveryMethod: '',
    receivedToClientDate: null,
    receivedToClientDeliveryMethod: '',
} satisfies z.infer<typeof formSchema>;

export function PassportPossessionForm() {
    // create form with useFormHook
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    React.useEffect(() => {
        if (Object.keys(form.formState.errors).length > 0) {
            console.log('RHF Errors:', form.formState.errors);
        }
    }, [form.formState.errors]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log('values: ', data);
        // api connection here
        toast('You submitted the following values:', {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: 'bottom-right',
            classNames: {
                content: 'flex flex-col gap-2',
            },
            style: {
                '--border-radius': 'calc(var(--radius)  + 4px)',
            } as React.CSSProperties,
        });
    }

    const agencyOptions = [
        { value: 'manjeri', label: 'Manjeri' },
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className='flex items-center justify-between'>Passport Possition
                    <Button variant={'outline'}><Link href={'/passport-possession/list'}>List</Link></Button>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <form id="form-rhf-demo" className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <CommonSelect
                        control={form.control}
                        name="transactionId"
                        label="Choose a Customer"
                        placeholder="Select Customer"
                        options={agencyOptions}
                    />
                    <FieldGroup>
                        <Label className='bg-green-200 dark:bg-green-800 p-3 rounded'>Agency</Label>
                        <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                            <CommonSelect
                                control={form.control}
                                name="agency"
                                label="Choose a Agency"
                                placeholder="Select Agency"
                                defaultValue={'manjeri'}
                                options={agencyOptions}
                            />
                            <CommonSelect
                                control={form.control}
                                name="agencyDeliveryMethod"
                                label="Choose a Delivery Mode"
                                placeholder="Select Delivery Mode"
                                options={deliveryModes}
                            />
                            <CommonDatePicker
                                control={form.control}
                                name="agencyDeliveryDate"
                                label="Delivery Date"
                                className="w-full"
                                disableBefore={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                            />
                        </div>
                    </FieldGroup>
                    <FieldGroup>
                        <Label className='bg-blue-200 dark:bg-blue-800 p-3 rounded'>Work Agreement</Label>
                        <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                            <CommonSelect
                                control={form.control}
                                name="workAgreementStatus"
                                label="Choose a Status"
                                placeholder="Select Status"
                                options={agencyOptions}
                            />
                            <CommonDatePicker
                                control={form.control}
                                name="workAgreementStatusDate"
                                label="Work Agreement Date"
                                className="w-full"
                                disableBefore={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                            />
                        </div>
                    </FieldGroup>
                    <FieldGroup>
                        <Label className='bg-amber-200 dark:bg-amber-800 p-3 rounded'>Stamping</Label>
                        <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                            <CommonSelect
                                control={form.control}
                                name="stampingStatus"
                                label="Choose a Status"
                                placeholder="Select Status"
                                options={agencyOptions}
                            />
                            <CommonTextArea
                                control={form.control}
                                name="stampingRemarks"
                                label="Stamping Remarks"
                                placeholder="Stamping Remarks..."
                            />
                            <CommonDatePicker
                                control={form.control}
                                name="stampingDate"
                                label="Stamping Date"
                                className="w-full"
                                disableBefore={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                            />
                        </div>
                    </FieldGroup>
                    <FieldGroup>
                        <Label className='bg-red-200 dark:bg-red-800 p-3 rounded'>In Office</Label>
                        <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                            <CommonSelect
                                control={form.control}
                                name="receivedInOfficeDeliveryMethod"
                                label="Choose a Delivery Mode"
                                placeholder="Delivery Mode"
                                options={deliveryModes}
                            />
                            <CommonDatePicker
                                control={form.control}
                                name="receivedInOfficeDate"
                                label="Recieved In Office Date"
                                className="w-full"
                                disableBefore={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                            />
                        </div>
                    </FieldGroup>
                    <FieldGroup>
                        <Label className='bg-purple-200 dark:bg-purple-800 p-3 rounded'>To Client</Label>
                        <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                            <CommonSelect
                                control={form.control}
                                name="receivedToClientDeliveryMethod"
                                label="Choose a Delivery Mode"
                                placeholder="Delivery Mode"
                                options={deliveryModes}
                            />
                            <CommonDatePicker
                                control={form.control}
                                name="receivedToClientDate"
                                label="Recieved To Client Date"
                                className="w-full"
                                disableBefore={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                            />
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="destructive" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

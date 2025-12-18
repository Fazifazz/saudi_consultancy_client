import React, { InputHTMLAttributes } from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '../ui/button';

interface CommonDatePickerProps<
  TFormValues extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<TFormValues>;
  control: UseFormReturn<TFormValues>['control'];
  disableBefore?: Date;
  triggerClassNames?: string;
}

const CommonDatePicker = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Pick a date',
  disableBefore,
  triggerClassNames,
}: CommonDatePickerProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Popover>
            <PopoverTrigger
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-[240px] pl-3 text-left font-normal flex items-center',
                !field.value && 'text-muted-foreground',
                triggerClassNames
              )}
            >
              <span>{field.value ? format(field.value, 'PPP') : placeholder}</span>
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disableBefore ? (date) => date < disableBefore : undefined}
              />
            </PopoverContent>
          </Popover>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CommonDatePicker;

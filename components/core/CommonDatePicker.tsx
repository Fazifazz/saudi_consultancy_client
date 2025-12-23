import React, { InputHTMLAttributes } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"
import { Button } from '../ui/button';

interface CommonDatePickerProps<TFormValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<TFormValues>;
  control: UseFormReturn<TFormValues>["control"];
  disableBefore?: Date;
}

const CommonDatePicker = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Pick a date",
  disableBefore,
}: CommonDatePickerProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? format(field.value, "PPP") : placeholder}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
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
  )
}

export default CommonDatePicker
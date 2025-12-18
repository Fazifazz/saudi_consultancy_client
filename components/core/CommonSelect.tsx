import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { InputHTMLAttributes } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CommonSelectProps<
  TFormValues extends FieldValues,
> extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: Path<TFormValues>;
  options: { value: string; label: string }[];
  control: UseFormReturn<TFormValues>['control'];
  onChangeCallback?: (value: string) => void;
}

const CommonSelect = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  options,
  onChangeCallback,
}: CommonSelectProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const onValueChange = (value: string) => {
          field.onChange(value);
          if (onChangeCallback) onChangeCallback(value);
        };
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <Select onValueChange={onValueChange as any} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default CommonSelect;

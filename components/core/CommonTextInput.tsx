import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { InputHTMLAttributes } from 'react';

interface CommonTextInputProps<
  TFormValues extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<TFormValues>;
  control: UseFormReturn<TFormValues>['control'];
}

const CommonTextInput = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CommonTextInputProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Input {...field} placeholder={placeholder} />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CommonTextInput;

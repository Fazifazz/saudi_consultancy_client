import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { InputHTMLAttributes } from 'react';
import { Textarea } from '../ui/textarea';

interface CommonTextAreaProps<
  TFormValues extends FieldValues,
> extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: Path<TFormValues>;
  control: UseFormReturn<TFormValues>['control'];
}

const CommonTextArea = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CommonTextAreaProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Textarea {...field} placeholder={placeholder} />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CommonTextArea;

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
  type,
  ...props
}: CommonTextInputProps<TFormValues>) => {
  // Determine if this is a number input
  const isNumberInput = type === 'number';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // For number inputs, handle conversion between string (input) and number (form state)
        if (isNumberInput) {
          // Convert number to string for display (handle undefined/null as empty string)
          const displayValue =
            field.value === undefined || field.value === null ? '' : String(field.value);

          // Handle onChange: convert string input to number
          const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;

            // Empty string becomes undefined (so validation can handle required/empty state)
            if (inputValue === '') {
              field.onChange(undefined);
              return;
            }

            // Try to parse as number
            const numValue = Number(inputValue);

            // Only update if it's a valid number
            if (!isNaN(numValue)) {
              field.onChange(numValue);
            }
            // If invalid number, don't update (prevents invalid states)
          };

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                {...props}
                type="number"
                value={displayValue}
                onChange={handleNumberChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                placeholder={placeholder}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        // For text inputs (default behavior)
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <Input {...field} {...props} type={type} placeholder={placeholder} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default CommonTextInput;

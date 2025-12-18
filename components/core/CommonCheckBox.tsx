import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';

interface CommonCheckBoxProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  showErrorOnEachItem?: boolean;
  option: { value: string; label: string };
  control: UseFormReturn<TFormValues>['control'];
}

const CommonCheckBox = <TFormValues extends FieldValues>({
  control,
  name,
  option,
  showErrorOnEachItem = false,
}: CommonCheckBoxProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Ensure value is always an array (important for edit mode)
        const value: string[] = Array.isArray(field.value) ? field.value : [];

        const isChecked = value.includes(option.value);

        const handleCheckedChange = (checked: boolean) => {
          if (checked) {
            field.onChange([...value, option.value]);
          } else {
            field.onChange(value.filter((v) => v !== option.value));
          }
        };

        return (
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={isChecked}
                onCheckedChange={handleCheckedChange}
                aria-invalid={!!fieldState.error}
              />
              <span>{option.label}</span>
            </label>

            {fieldState.error && showErrorOnEachItem && (
              <p className="text-sm text-destructive">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default CommonCheckBox;

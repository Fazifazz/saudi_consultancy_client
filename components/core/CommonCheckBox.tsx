import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import { Checkbox } from '../ui/checkbox';

interface CommonCheckBoxProps<
  TFormValues extends FieldValues,
> extends InputHTMLAttributes<HTMLSelectElement> {
  name: Path<TFormValues>;
  option: { value: string; label: string };
  control: UseFormReturn<TFormValues>['control'];
}

const CommonCheckBox = <TFormValues extends FieldValues>({
  control,
  name,
  option,
}: CommonCheckBoxProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isChecked = field.value?.includes(option.value);

        const toggle = () => {
          if (isChecked) {
            field.onChange(field.value?.filter((id: string) => id !== option.value));
          } else {
            field.onChange([...(field.value ?? []), option.value]);
          }
        };

        return (
          <label className="flex items-center gap-2">
            <Checkbox checked={isChecked} onCheckedChange={toggle} />
            {option.label}
          </label>
        );
      }}
    />
  );
};

export default CommonCheckBox;

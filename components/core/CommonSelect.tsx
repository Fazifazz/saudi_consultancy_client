import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { InputHTMLAttributes, useState, useMemo, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

interface CommonSelectProps<TFormValues extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'name' | 'control'> {
  label: string;
  name: Path<TFormValues>;
  options: { value: string; label: string }[];
  control: UseFormReturn<TFormValues>['control'];
  onChangeCallback?: (value: string) => void;
  isClearable?: boolean;
}

/**
 * Component to highlight the matching part of a text
 */
const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-primary/20 text-primary font-semibold rounded-xs">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const CommonSelect = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options = [],
  onChangeCallback,
  isClearable = true,
}: CommonSelectProps<TFormValues>) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

  // Match the width of the popover to the trigger button
  useEffect(() => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
      setActiveIndex(0); // Reset index on open
    }
  }, [open]);

  // Performance: Memoize filtered options to avoid recalculation on every render
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const lowerTerm = searchTerm.toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(lowerTerm));
  }, [options, searchTerm]);

  // Reset active index when filtered options change
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredOptions]);

  // Scroll active item into view
  useEffect(() => {
    if (open && listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        const onSelect = (value: string) => {
          field.onChange(value);
          if (onChangeCallback) onChangeCallback(value);
          setOpen(false);
          setSearchTerm('');
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (filteredOptions.length === 0) return;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
              break;
            case 'ArrowUp':
              e.preventDefault();
              setActiveIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
              break;
            case 'Enter':
              e.preventDefault();
              if (filteredOptions[activeIndex]) {
                onSelect(filteredOptions[activeIndex].value);
              }
              break;
            case 'Escape':
              setOpen(false);
              break;
          }
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  ref={triggerRef}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between font-normal dark:bg-input/30',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <span className="truncate">
                    {selectedOption ? selectedOption.label : (placeholder || `Select ${label}...`)}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {isClearable && field.value && (
                      <div
                        role="button"
                        tabIndex={0}
                        className="p-0.5 hover:bg-muted rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            onSelect('');
                          }
                        }}
                      >
                        <X className="h-3.5 w-3.5 opacity-50 hover:opacity-100" />
                      </div>
                    )}
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0"
                align="start"
                style={{ width: triggerWidth || 'auto' }}
              >
                <div className="flex items-center border-b px-3 py-2">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-8 border-none bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    autoFocus
                  />
                </div>
                <div
                  ref={listRef}
                  className="max-h-60 overflow-y-auto p-1 custom-scrollbar"
                  onKeyDown={handleKeyDown}
                >
                  {filteredOptions.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => (
                      <div
                        key={option.value}
                        className={cn(
                          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                          (field.value === option.value || activeIndex === index) && 'bg-accent/50'
                        )}
                        onClick={() => onSelect(option.value)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === option.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        <span className="truncate">
                          <HighlightedText text={option.label} highlight={searchTerm} />
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default CommonSelect;

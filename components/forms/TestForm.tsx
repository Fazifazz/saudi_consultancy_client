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

// schema for form (if large form add it to a seperate file named schema.ts inside that folder)
// replace the form schema name with the module name schem like EmployeeSchema
const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill.'),
  startDate: z.date({ error: 'Start date is required' }),
  color: z.string({ error: 'Please select a color.' }),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
});

const defaultValues = {
  title: '',
  description: '',
  skills: [],
  color: '',
  startDate: new Date(),
} satisfies z.infer<typeof formSchema>;

export function TestForm() {
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

  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
  ];

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>Help us improve by reporting bugs you encounter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CommonTextInput
              control={form.control}
              name="title"
              label="Bug Title"
              placeholder="Login button not working on mobile"
              autoComplete="off"
            />
            <CommonDatePicker
              name="startDate"
              label="Start Date"
              control={form.control}
              className="w-full"
              disableBefore={new Date()}
            />
            <CommonSelect
              control={form.control}
              name="color"
              label="Choose a color"
              placeholder="Select color"
              defaultValue={'blue'}
              options={options}
            />
            <CommonTextArea
              control={form.control}
              name="description"
              label="Description"
              placeholder="I'm having an issue with the login button on mobile."
              rows={6}
              className="min-h-24 resize-none"
            />

            {/* checkbox */}
            <FieldGroup>
              <Label>Skills</Label>
              <CommonCheckBox
                name="skills"
                control={form.control}
                option={{ value: 'react', label: 'React' }}
              />

              <CommonCheckBox
                name="skills"
                control={form.control}
                option={{ value: 'node', label: 'Node.js' }}
              />

              <CommonCheckBox
                name="skills"
                control={form.control}
                option={{ value: 'typescript', label: 'TypeScript' }}
              />

              {/* display error for checkbox here */}
              {/* checkboxes are of same name so common error only displayed once */}
              <FieldError>
                {form.formState.errors?.skills?.message && (
                  <span>{form.formState.errors?.skills?.message}</span>
                )}
              </FieldError>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
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

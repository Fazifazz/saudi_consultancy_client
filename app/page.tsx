import { LogoutButton } from '@/components/buttons/LogoutButton';
import { TestForm } from '@/components/forms/TestForm';

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-background">
      <h2 className="text-3xl">Exmaple Form</h2>
      <LogoutButton />
      <TestForm />
    </main>
  );
}

import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground p-6 text-center">
            <div className="relative mb-8 transition-transform duration-500 hover:scale-110">
                <div className="absolute inset-0 blur-3xl opacity-20 bg-primary rounded-full animate-pulse" />
                <FileQuestion className="w-32 h-32 text-primary relative z-10 mx-auto" strokeWidth={1} />
            </div>

            <div className="space-y-4 max-w-lg">
                <h1 className="text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/30 leading-none">
                    404
                </h1>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Page Not Found</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is
                    temporarily unavailable.
                </p>
            </div>

            <div className="mt-10">
                <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 font-medium shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                >
                    <Link href="/">Back to Dashboard</Link>
                </Button>
            </div>

            {/* Aesthetic decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}

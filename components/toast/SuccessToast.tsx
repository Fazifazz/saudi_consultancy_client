'use client';

import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function successToast(title: string, description?: React.ReactNode) {
    toast.success(title, {
        description: description ? <div className="text-sm">{description}</div> : undefined,
        style: {
            '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
        } as React.CSSProperties,
    });
}
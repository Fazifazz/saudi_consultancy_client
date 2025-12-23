'use client';

import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function destructiveToast(title: string, description?: React.ReactNode) {
    toast.error(title, {
        description: description ? <div className="text-sm">{description}</div> : undefined,
        style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)',
        } as React.CSSProperties,
    });
}
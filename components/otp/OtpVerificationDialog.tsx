'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Loader2, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateOtp, validateOtp, resendOtp } from '@/lib/api/otp';

interface OtpVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
  /** Title shown at top of the dialog */
  title?: string;
  /** Description / subtitle text */
  description?: string;
  /** OTP purpose sent to the backend, e.g. "EDIT_TRANSACTION" */
  purpose: string;
  /** Module identifier sent to the backend, e.g. "transaction" */
  module?: string;
  /** OTP TTL in seconds — defaults to 300 (5 min) */
  ttlSeconds?: number;
}

const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 60; // seconds

export function OtpVerificationDialog({
  open,
  onOpenChange,
  onVerified,
  title = 'Verify Your Identity',
  description = 'An OTP has been sent to your registered email. Please enter it below to proceed.',
  purpose,
  module,
  ttlSeconds = 300,
}: OtpVerificationDialogProps) {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  // Stored after generate/resend — required for validate and resend
  const [sessionId, setSessionId] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-generate OTP when dialog opens
  useEffect(() => {
    if (open && !otpSent) {
      handleGenerateOtp();
    }
    if (!open) {
      // Reset state on close
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      setOtpSent(false);
      setError(null);
      setCountdown(0);
      setSessionId(null);
    }
  }, [open]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleGenerateOtp = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await generateOtp({ purpose, module, ttlSeconds });
      setSessionId(res.data?.sessionId ?? null);
      setOtpSent(true);
      setCountdown(RESEND_COOLDOWN);
      toast.success('OTP sent to your registered email!');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to send OTP. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    setError(null);
    setOtpDigits(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    try {
      const res = await resendOtp({ purpose, module, ttlSeconds });
      // Backend returns a new sessionId, though we don't strictly use it for inputs anymore
      if (res.data?.sessionId) {
        setSessionId(res.data.sessionId);
      }
      setCountdown(RESEND_COOLDOWN);
      toast.success('OTP resent to your registered email!');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to resend OTP. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsResending(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setError(null);

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otpDigits[index]) {
        const newDigits = [...otpDigits];
        newDigits[index] = '';
        setOtpDigits(newDigits);
      } else if (index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newDigits = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => {
      newDigits[i] = char;
    });
    setOtpDigits(newDigits);
    const lastIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastIdx]?.focus();
  };

  const handleVerify = async () => {
    const otp = otpDigits.join('');
    if (otp.length < OTP_LENGTH) {
      setError('Please enter the complete 4-digit OTP.');
      return;
    }

    setIsValidating(true);
    setError(null);
    try {
      const result = await validateOtp({ purpose, module, otp });
      if (result?.verified || result?.success) {
        toast.success('OTP verified successfully!');
        onOpenChange(false);
        onVerified();
      } else {
        const msg = result?.message || 'Invalid OTP. Please try again.';
        setError(msg);
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Invalid OTP. Please try again.';
      setError(msg);
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsValidating(false);
    }
  };

  const isOtpComplete = otpDigits.every((d) => d !== '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
                disabled={!otpSent || isGenerating || isValidating}
                className={[
                  'h-12 w-11 rounded-lg border-2 bg-background text-center text-lg font-bold',
                  'transition-all duration-150 outline-none',
                  'focus:border-primary focus:ring-2 focus:ring-primary/30',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  error
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                    : digit
                      ? 'border-primary/60'
                      : 'border-border',
                ].join(' ')}
                aria-label={`OTP digit ${index + 1}`}
                id={`otp-digit-${index + 1}`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Generating state */}
          {isGenerating && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending OTP to your email...</span>
            </div>
          )}

          {/* Resend */}
          {otpSent && !isGenerating && (
            <div className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the OTP?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || isResending}
                className={[
                  'inline-flex items-center gap-1 font-medium transition-colors',
                  countdown > 0 || isResending
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer text-primary hover:text-primary/80 hover:underline',
                ].join(' ')}
                id="otp-resend-btn"
              >
                {isResending ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3" />
                    Resend OTP
                    {countdown > 0 && ` (${countdown}s)`}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isValidating}
            id="otp-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={!isOtpComplete || isValidating || !otpSent}
            className="min-w-[120px]"
            id="otp-verify-btn"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verify OTP
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

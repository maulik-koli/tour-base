"use client"
import React from 'react'
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { useRequestOtpStore } from '@/store';
import { useGenerateOtp } from '@modules/user-booking/api/mutation';
import { useToast } from '@/hooks/useToast';

interface ResendOtpProps {
    isPending: boolean;
    handleOtp: (otp: string) => void;
}


const ResendOtp: React.FC<ResendOtpProps> = ({ isPending, handleOtp }) => {
    const { 
        formState,
        requestType
    } = useRequestOtpStore((state) => state);
    const [resendTimer, setResendTimer] = React.useState(120);

    const { mutate, isPending: isResending } = useGenerateOtp();
    const toast = useToast();

    const handleResend = () => {
        if (isPending || isResending || resendTimer > 0) return;

        if (
            formState.phone === '' 
            || formState.travelDate === ''
            || requestType === null
        ) return;

        
        mutate({ ...formState, requestType }, {
            onSuccess: () => {
                toast.success('OTP resent successfully, check your WhatsApp messages.');
                handleOtp('');
                setResendTimer(120);
            }
        });
    }

    React.useEffect(() => {
        if (resendTimer <= 0) return;

        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);


    return (
        <div className='flex items-center justify-between'>
            <Button
                type='button'
                variant="link"
                onClick={handleResend}
                disabled={isPending || isResending || resendTimer > 0}
                className={cn(
                    'text-sm transition-colors',
                    resendTimer > 0 
                        ? 'text-muted-foreground cursor-not-allowed' 
                        : 'text-primary hover:underline'
                )}
            >
                {resendTimer > 0 
                    ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${String(resendTimer % 60).padStart(2, '0')}` 
                    : 'Resend OTP'
                }
            </Button>
        </div>
    )
}

export default ResendOtp

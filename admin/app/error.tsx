'use client';

import ErrorBlock from '@/components/error-block';
import { Button } from '@ui/button';
import { Typography } from '@/components/ui/typography';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="w-full h-full min-h-screen p-6 flex flex-col gap-4 items-center justify-center ">
            <ErrorBlock
                type="error"
                message="Something went wrong"
                description="An unexpected error occurred. Please try again."
                className='min-h-20'
            />

            <div className="flex gap-3 justify-center">
                <Button onClick={reset} className="w-full">
                    Try again
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = '/'}
                >
                    Go to Home
                </Button>
            </div>
            {/* process.env.NODE_ENV === 'development' */}
            {true && (
                <Typography className="mt-4 text-muted-foreground text-sm">
                    {error.message}
                </Typography>
            )}
        </div>
    );
}

'use client';

import { Button } from '@ui/button';
import ErrorBlock from '@/components/error-block';

export default function AdminError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="w-full h-full min-h-[50vh] p-6 flex flex-col items-center justify-center ">
            <ErrorBlock
                type="error"
                message="Admin page failed"
                description="Something went wrong while loading this section."
                className='min-h-20'
            />

            <div className="flex gap-3 justify-center">
                <Button onClick={reset}>
                    Retry
                </Button>

                <Button
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
}

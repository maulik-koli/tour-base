// hooks/useCashfree.ts
'use client';

import { useEffect, useState } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import type { Cashfree } from '@cashfreepayments/cashfree-js';

type CashfreeMode = 'sandbox' | 'production';

interface UseCashfreeReturn {
    cashfree: Cashfree | null;
    isLoaded: boolean;
    error: Error | null;
}

export function useCashfree(mode: CashfreeMode = 'sandbox'): UseCashfreeReturn {
    const [cashfree, setCashfree] = useState<Cashfree | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const initializeCashfree = async () => {
            try {
                const cf = await load({ mode });
                
                if (isMounted && cf) {
                    setCashfree(cf);
                    setIsLoaded(true);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error 
                        ? err 
                        : new Error('Failed to load Cashfree')
                    );
                }
            }
        };

        initializeCashfree();

        return () => {
            isMounted = false;
        };
    }, [mode]);

    return { cashfree, isLoaded, error };
}
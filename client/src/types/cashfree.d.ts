
declare module '@cashfreepayments/cashfree-js' {
    export interface CashfreeConfig {
        mode: 'sandbox' | 'production';
    }

    export interface ComponentStyle {
        base?: {
            fontSize?: string;
            color?: string;
            fontWeight?: string;
            fontFamily?: string;
        };
        invalid?: {
            color?: string;
        };
        placeholder?: {
            color?: string;
        };
    }

    export interface ComponentOptions {
        style?: ComponentStyle;
            placeholder?: {
            cardNumber?: string;
            cardHolder?: string;
            expiryDate?: string;
            cvv?: string;
        };
    }

    export interface CashfreeComponent {
        mount(selector: string): void;
        unmount(): void;
        on(event: 'ready' | 'change' | 'focus' | 'blur', callback: (data?: any) => void): void;
    }

    export interface CashfreeCardComponent extends CashfreeComponent {}
    export interface CashfreeUPIComponent extends CashfreeComponent {}

    export interface PaymentOptions {
        paymentMethod: CashfreeComponent;
        paymentSessionId: string;
        returnUrl?: string;
        redirectTarget?: '_self' | '_blank' | '_parent' | '_top';
    }

    export interface PaymentResult {
        error?: {
            code: string;
            message: string;
            type: string;
        };
        redirect?: boolean;
        paymentDetails?: any;
    }

    export interface Cashfree {
        create(
            type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'bnpl',
            options?: ComponentOptions
        ): CashfreeComponent;
        
        pay(options: PaymentOptions): Promise<PaymentResult>;
        
        checkout(options: {
            paymentSessionId: string;
            returnUrl?: string;
            redirectTarget?: '_self' | '_blank' | '_parent' | '_top';
        }): void;
    }

    export function load(config: CashfreeConfig): Promise<Cashfree | null>;
}

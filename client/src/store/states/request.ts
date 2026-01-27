import { create } from 'zustand';
import { UserRequestType } from '@modules/user-booking/api/types';
import { GenerateOtpFormType } from '@modules/user-booking/utils/schema';

export type Step = 'selection' | 'otp-sent' | 'verified';

type RequestOtpState = {
    sessionId: string;
    requestType: UserRequestType | null;
    step: Step;
    formState: GenerateOtpFormType;

    setSessionId: (sessionId: string) => void;
    setRequestType: (requestType: UserRequestType) => void;
    setStep: (step: Step) => void;
    clearState: () => void;
    setFormState: (formState: GenerateOtpFormType) => void;
}


export const useRequestOtpStore = create<RequestOtpState>((set) => ({
    sessionId: '',
    requestType: null,
    step: 'selection',
    formState: { phone: '', travelDate: '' },

    setSessionId: (sessionId: string) => set({ sessionId }),
    setRequestType: (requestType: UserRequestType) => set({ requestType }),
    setStep: (step: Step) => set({ step }),

    clearState: () => set({
        sessionId: '',
        requestType: null,
        step: 'selection',
        formState: { phone: '', travelDate: '' },
    }),

    setFormState: (formState: GenerateOtpFormType) => set({ formState: {
        phone: formState.phone,
        travelDate: formState.travelDate,
    }}),
}));

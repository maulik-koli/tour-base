import { create } from 'zustand';
import { UserRequestType } from '@modules/user-booking/api/types';

export type Step = 'selection' | 'otp-sent' | 'verified';

type RequestOtpState = {
    sessionId: string;
    requestType: UserRequestType | null;
    step: Step;

    setSessionId: (sessionId: string) => void;
    setRequestType: (requestType: UserRequestType) => void;
    setStep: (step: Step) => void;
}


export const useRequestOtpStore = create<RequestOtpState>((set) => ({
    sessionId: '',
    requestType: null,
    step: 'selection',

    setSessionId: (sessionId: string) => set({ sessionId }),
    setRequestType: (requestType: UserRequestType) => set({ requestType }),
    setStep: (step: Step) => set({ step }),
}));

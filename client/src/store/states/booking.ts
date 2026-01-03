import { CustomerDetailsFormType } from '@modules/booking/utils/schema';
import { create } from 'zustand';

type BookingState = {
    isFormSubmited: boolean,
    bookingForm: CustomerDetailsFormType | null;

    setBookingForm: (data: CustomerDetailsFormType) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    isFormSubmited: false,
    bookingForm: null,

    setBookingForm: (data: CustomerDetailsFormType) => set((state) => ({
        ...state,
        bookingForm: data,
    })),
}));
import { z } from 'zod';

const phoneNumberSchema = z.string()
    .trim()
    .refine((val) => /^\d{10}$/.test(val), {
        message: 'Phone number must be exactly 10 digits',
    });

export const customerDetailsSchema = z.object({
    fullName: z.string()
        .min(3, 'Full name must be at least 3 characters')
        .trim(),
    phone1: phoneNumberSchema,
    phone2: phoneNumberSchema,

    dateOfTravel: z.string(),
    members: z.array(z.object({
        fullName: z.string().min(3, 'Full name must be at least 3 characters').trim(),
        age: z.number().int().min(0, 'Age must be at least 0').max(120, 'Age must be at most 120'),
        gender: z.enum(["M", "F"]),
    })).min(1, 'At least one member is required'),
});

export type CustomerDetailsFormType = z.infer<typeof customerDetailsSchema>;



export const getDefaultCustomerDetails = (): CustomerDetailsFormType => ({
    fullName: '',
    phone1: '',
    phone2: '',
    dateOfTravel: (new Date()).toISOString(),
    members: [],
})


export const defaultMember = {
    fullName: '',
    age: 0,
    gender: 'M' as "M" | "F",
};
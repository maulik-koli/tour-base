import { z } from 'zod';
import { phoneNumberSchema } from '@/lib/zod/commonSchema';
import { resquestEnum } from '../api/types';

export const generateOtpSchema = z.object({
    phone: phoneNumberSchema,
    travelDate: z.string(),
    requestType: z.enum(resquestEnum),
});

export type GenerateOtpFormType = z.infer<typeof generateOtpSchema>;
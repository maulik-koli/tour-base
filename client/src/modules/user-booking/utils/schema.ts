import { z } from 'zod';
import { phoneNumberSchema } from '@/lib/zod/commonSchema';

export const generateOtpSchema = z.object({
    phone: phoneNumberSchema,
    travelDate: z.string(),
});

export type GenerateOtpFormType = z.infer<typeof generateOtpSchema>;
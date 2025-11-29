import { z } from "zod";

const emailSchema = z.email('Invalid email address').trim();

const passwordSchema = z.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

const phoneSchema = z
    .string()
    .regex(/^\d{10}$/, 'Phone must be exactly 10 digits');


export const adminLoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});


export const adminRegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').trim(),
    email: emailSchema,
    password: passwordSchema,
    phone: phoneSchema,
});


export const adminChangePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
}).refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from the current password",
});;


export type AdminLoginPayload = z.infer<typeof adminLoginSchema>;
export type AdminRegisterPayload = z.infer<typeof adminRegisterSchema>;
export type AdminChangePasswordPayload = z.infer<typeof adminChangePasswordSchema>;


export const loginFormDefaultValues: AdminLoginPayload = {
    email: "",
    password: "",
}
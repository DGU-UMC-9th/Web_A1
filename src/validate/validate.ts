import z from 'zod';

const emailSchema = z.email('Invalid email');
const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long');
const usernameSchema = z
    .string()
    .min(2, 'Username is required')
    .max(9, 'Username must be at most 9 characters long');
const checkboxSchema = z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
});

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    username: usernameSchema,
    checkbox: checkboxSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

import { z } from 'zod';

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const googleLoginSchema = z.object({
    clientId: z.string(),
    credential: z.string()
})
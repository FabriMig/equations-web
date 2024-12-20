import { z } from 'zod';

export const storeEquationSchema = z.object({
    name: z.string({
        required_error: "The equation name is required",
    }).max(30, "The quation name dont can exced 30 caracteres")
})

export const editEquationSchema = z.object({
    name: z.string({
        required_error: "The equation name is required",
    }).max(30, "The quation name dont can exced 30 caracteres"),
    equation: z.object({
        latex: z.string({ required_error: "The equation is required" }),
        string: z.string({ required_error: "The equation is required" })
    })
})
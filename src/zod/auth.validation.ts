// /* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";


export const registerUserValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(6, "Password must be at least 6 characters").max(100),
    confirmPassword: z.string().min(6, "Confirm password is required"),

    bio: z.string().optional(),

    age: z.preprocess((val) => (val === "" ? undefined : val),
        z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined)
    ),

    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    location: z.string().optional(), 

    budgetRange: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});



export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


// Change Password Schema
export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
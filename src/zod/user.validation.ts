import { z } from "zod";

export const createUserZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    contactNumber: z.string().min(1, "Contact number is required"),
});

export const updateMyProfileZodSchema = z.object({
    name: z.string().min(1),
    contactNumber: z.string().min(1),
    address: z.string().optional(),
});

export const updateUserStatusZodSchema = z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
});

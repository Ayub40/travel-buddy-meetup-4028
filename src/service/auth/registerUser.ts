/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            age: formData.get('age') ? formData.get('age') : undefined,
            gender: formData.get('gender') || undefined,
            country: formData.get('country') || undefined,
            location: formData.get('location') || undefined,
            bio: formData.get('bio') || undefined,
        };

        
        const validation = zodValidator(payload, registerUserValidationZodSchema);
        
        if (validation.success === false) {
            return validation;
        }

        const validatedPayload: any = validation.data;

        
        const registerData = {
            password: validatedPayload.password,
            user: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                age: validatedPayload.age, 
                gender: validatedPayload.gender,
                country: validatedPayload.country,
                location: validatedPayload.location, 
                bio: validatedPayload.bio,
            }
        };

        const newFormData = new FormData();
        
        newFormData.append("data", JSON.stringify(registerData));

        
        const file = formData.get("file");
        if (file && (file as File).size > 0) {
            newFormData.append("file", file as Blob);
        }

        
        const res = await serverFetch.post("/user/create-user", {
            body: newFormData,
        });

        const result = await res.json();

        
        if (result.success) {
            
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Registration Error:", error);
        return { 
            success: false, 
            message: process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again." 
        };
    }
}

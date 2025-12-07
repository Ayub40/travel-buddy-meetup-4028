/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateMyProfileZodSchema, updateUserStatusZodSchema } from "@/zod/user.validation";

/**
 * GET ALL USERS
 * API: GET /user?queryParams
 */
export async function getUsers(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user${queryString ? `?${queryString}` : ""}`);
        return await response.json();
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
        };
    }
}

/**
 * GET USER BY ID
 * API: GET /user/:id
 */
export async function getUserById(id: string) {
    try {
        const response = await serverFetch.get(`/user/${id}`);
        return await response.json();
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
        };
    }
}

/**
 * CREATE USER
 * API: POST /user/create-user
 */
// export async function createUser(_prevState: any, formData: FormData) {
//     const validationPayload = {
//         name: formData.get("name") as string,
//         email: formData.get("email") as string,
//         password: formData.get("password") as string,
//         contactNumber: formData.get("contactNumber") as string,
//         file: formData.get("file") as File,
//     };

//     const validated = zodValidator(validationPayload, createUserZodSchema);

//     if (!validated.success && validated.errors) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//             errors: validated.errors,
//         };
//     }

//     if (!validated.data) {
//         return {
//             success: false,
//             message: "Validation failed",
//         };
//     }

//     const backendPayload = {
//         user: {
//             name: validated.data.name,
//             email: validated.data.email,
//             password: validated.data.password,
//             contactNumber: validated.data.contactNumber,
//         },
//     };

//     const newFormData = new FormData();
//     newFormData.append("data", JSON.stringify(backendPayload));
//     newFormData.append("file", formData.get("file") as File);

//     try {
//         const response = await serverFetch.post("/user/create-user", {
//             body: newFormData,
//         });

//         return await response.json();
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: "Failed to create user",
//         };
//     }
// }

/**
 * UPDATE MY PROFILE  
 * API: PATCH /user/update-my-profile
 */
// export async function updateMyProfile(_prevState: any, formData: FormData) {
//     const validationPayload = {
//         name: formData.get("name") as string,
//         contactNumber: formData.get("contactNumber") as string,
//         address: formData.get("address") as string,
//         file: formData.get("file") as File | null,
//     };

//     const validated = zodValidator(validationPayload, updateMyProfileZodSchema);

//     if (!validated.success && validated.errors) {
//         return {
//             success: false,
//             message: "Validation failed",
//             errors: validated.errors,
//             formData: validationPayload,
//         };
//     }

//     const backendPayload = {
//         name: validated.data.name,
//         contactNumber: validated.data.contactNumber,
//         address: validated.data.address,
//     };

//     const newFormData = new FormData();
//     newFormData.append("data", JSON.stringify(backendPayload));
//     if (formData.get("file")) {
//         newFormData.append("file", formData.get("file") as File);
//     }

//     try {
//         const response = await serverFetch.patch(`/user/update-my-profile`, {
//             body: newFormData,
//         });

//         return await response.json();
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: "Failed to update profile",
//         };
//     }
// }

export async function updateUser(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
        address: formData.get("address") as string,
    };

    const validation = zodValidator(validationPayload, updateMyProfileZodSchema);
    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: [{ field: "unknown", message: "Invalid data" }],
        };
    }
    try {

        const response = await serverFetch.patch(`/user/update-my-profile/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update patient error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update patient',
            formData: validationPayload
        };
    }
}

/**
 * UPDATE USER STATUS  
 * API: PATCH /user/:id/status
 */
export async function updateUserStatus(id: string, status: string) {
    const validation = zodValidator({ status }, updateUserStatusZodSchema);

    if (!validation.success) {
        return {
            success: false,
            message: "Invalid status",
            errors: validation.errors,
        };
    }

    try {
        const response = await serverFetch.patch(`/user/${id}/status`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        return await response.json();
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: "Failed to update status",
        };
    }
}

/**
 * SOFT DELETE USER  
 * API: DELETE /user/soft/:id
 */
export async function softDeleteUser(id: string) {
    try {
        const response = await serverFetch.delete(`/user/soft/${id}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

/**
 * HARD DELETE USER  
 * API: DELETE /user/hard/:id
 */
export async function hardDeleteUser(id: string) {
    try {
        const response = await serverFetch.delete(`/user/hard/${id}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

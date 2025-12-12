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

// export async function updateUser(id: string, _prevState: any, formData: FormData) {
//     const validationPayload: any = {
//         name: formData.get("name") as string,
//         contactNumber: formData.get("contactNumber") as string,
//         address: formData.get("address") as string,
//     };

//     const validation = zodValidator(validationPayload, updateMyProfileZodSchema);
//     if (!validation.success && validation.errors) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//             errors: validation.errors,
//         };
//     }

//     if (!validation.data) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//             errors: [{ field: "unknown", message: "Invalid data" }],
//         };
//     }
//     try {

//         const response = await serverFetch.patch(`/user/update-my-profile/${id}`, {
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(validation.data),
//         });

//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.error("Update patient error:", error);
//         return {
//             success: false,
//             message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update patient',
//             formData: validationPayload
//         };
//     }
// }

/**
 * UPDATE ANY USER (ADMIN / SUPER_ADMIN)
 * API: PATCH /user/update-my-profile
 * Admin / SuperAdmin can update any user by id
 */
export async function updateAnyUser(id: string, _prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload: any = {
        name: formData.get("name") as string,
        bio: formData.get("bio") as string,
        currentLocation: formData.get("location") as string,
        interests: formData.get("interests") ? JSON.parse(formData.get("interests") as string) : [],
        visitedCountries: formData.get("visitedCountries") ? JSON.parse(formData.get("visitedCountries") as string) : [],
        profileImage: formData.get("file") || undefined,
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
        };
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validation.data));
    if (formData.get("file")) {
        newFormData.append("file", formData.get("file") as Blob);
    }

    try {
        const response = await serverFetch.patch(`/user/update-user-profile/${id}`, {
            body: newFormData,
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update user error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to update user",
            formData: validationPayload,
        };
    }
}

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
 * UPDATE USER STATUS  
 * API: PATCH /user/:id/status
 */

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

export async function getDashboardStats() {
    try {
        const response = await serverFetch.get("/user/dashboard");
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Dashboard fetch error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch dashboard data",
            data: {
                totalTravelPlans: 0,
                matchedCount: 0,
                totalJoinRequests: 0,
                upcomingTrips: [],
            },
        };
    }
}

/** ✅ Accept / Reject Request */
export async function updateJoinRequest(requestId: string, status: "ACCEPTED" | "REJECTED") {
    try {
        const response = await serverFetch.patch(`/user/join-request/${requestId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        return await response.json();
    } catch (error: any) {
        console.error("Failed to update request:", error);
        return {
            success: false,
            message: "Failed to update request"
        };
    }
}

/** ✅ Get My Join Requests */
export async function getMyJoinRequests() {
    try {
        const response = await serverFetch.get("/user/my-join-requests");
        return await response.json();
    } catch (error: any) {
        console.error("Failed to fetch join requests:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to fetch join requests",
        };
    }
}



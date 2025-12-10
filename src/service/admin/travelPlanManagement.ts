"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
/** ==================== ADMIN API FUNCTIONS ==================== */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelPlanZodSchema, TravelType, updateTravelPlanZodSchema } from "@/zod/travel.validation";
import { revalidateTag } from "next/cache";

// console.log("serverFetch:", serverFetch)


/** GET ALL TRAVEL PLANS (Admin view) */
export async function getAllTravelPlans(queryString?: string) {
    try {
        const response = await serverFetch.get(`/travel-plans${queryString ? `?${queryString}` : ""}`);
        return await response.json();
    } catch (error: any) {
        console.error("Get all travel plans error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch travel plans",
        };
    }
}

/** GET TRAVEL PLAN BY ID (Admin view) */
export async function getTravelPlanById(id: string) {
    try {
        const response = await serverFetch.get(`/travel-plans/${id}`);
        return await response.json();
    } catch (error: any) {
        console.error("Get travel plan by ID error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch travel plan",
        };
    }
}

/** CREATE TRAVEL PLAN */
export async function createTravelPlanAdmin(_prevState: any, formData: FormData) {
    // ১️⃣ Build validation payload
    const validationPayload = {
        title: formData.get("title") as string,
        destination: formData.get("destination") as string,
        country: formData.get("country") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        budget: formData.get("budget") ? Number(formData.get("budget")) : undefined,
        description: formData.get("description") as string,
        travelType: (formData.get("travelType") as string) || TravelType.SOLO,
        visibility: formData.get("visibility") === "true",
        photos: formData.getAll("photos") as File[],
    };

    // ২️⃣ Validate with Zod
    const validatedPayload = zodValidator(validationPayload, createTravelPlanZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    // ৩️⃣ Prepare backend payload
    // const backendPayload = {
    //     travelPlan: {
    //         title: validatedPayload.data.title,
    //         destination: validatedPayload.data.destination,
    //         country: validatedPayload.data.country,
    //         startDate: validatedPayload.data.startDate,
    //         endDate: validatedPayload.data.endDate,
    //         budget: validatedPayload.data.budget,
    //         description: validatedPayload.data.description,
    //         travelType: validatedPayload.data.travelType,
    //         visibility: validatedPayload.data.visibility,
    //     },
    // };

    // // ৪️⃣ FormData for files + JSON
    // const newFormData = new FormData();
    // newFormData.append("data", JSON.stringify(backendPayload));
    // newFormData.append("file", formData.get("file") as Blob)

    // ======================================================
    const backendPayload = {
        travelPlan: {
            title: formData.get("title") as string,
            destination: formData.get("destination") as string,
            country: formData.get("country") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            budget: formData.get("budget") ? Number(formData.get("budget")) : undefined,
            description: formData.get("description") as string,
            travelType: formData.get("travelType") as string,
            visibility: formData.get("visibility") === "true",
        }
    };

    const newFormData = new FormData();
    newFormData.append("travelPlan", JSON.stringify(backendPayload.travelPlan));


    const photos = formData.getAll("photos") as File[];
    photos.forEach(photo => newFormData.append("photos", photo));
    // ======================================================

    // ৫️⃣ Send to backend
    try {
        const response = await serverFetch.post("/travel-plans", {
            body: newFormData,
        });

        const result = await response.json();

        // ৬️⃣ Revalidate tags (optional)
        if (result.success) {
            revalidateTag("travel-plans-list", { expire: 0 });
            revalidateTag("travel-plans-dashboard", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error("Create travel plan error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to create travel plan",
            formData: validationPayload,
        };
    }
}

/** UPDATE TRAVEL PLAN */
export async function updateTravelPlanAdmin(
    id: string,
    _prevState: any,
    formData: FormData
) {
    const validationPayload = {
        title: formData.get("title") as string,
        destination: formData.get("destination") as string,
        country: formData.get("country") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        budget: formData.get("budget") ? Number(formData.get("budget")) : undefined,
        description: formData.get("description") as string,
        travelType: formData.get("travelType") as string,
        visibility: formData.get("visibility") === "true",
        photos: formData.getAll("photos") as File[],
    };

    // validate (optional for update)
    const validatedPayload = zodValidator(validationPayload, updateTravelPlanZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    // ✅ Backend payload
    const backendPayload = {
        travelPlan: {
            title: validationPayload.title,
            destination: validationPayload.destination,
            country: validationPayload.country,
            startDate: validationPayload.startDate,
            endDate: validationPayload.endDate,
            budget: validationPayload.budget,
            description: validationPayload.description,
            travelType: validationPayload.travelType,
            visibility: validationPayload.visibility,
        }
    };

    const newFormData = new FormData();
    newFormData.append("travelPlan", JSON.stringify(backendPayload.travelPlan));

    // ✅ photos append
    const photos = formData.getAll("photos") as File[];
    // photos.forEach(photo => newFormData.append("photos", photo));
    photos.forEach(photo => {
        if (photo instanceof File && photo.size > 0) {
            newFormData.append("photos", photo);
        }
    });


    try {
        const response = await serverFetch.patch(`/travel-plans/update-travelPlan/${id}`, {
            body: newFormData,
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("travel-plans-list", { expire: 0 });
            revalidateTag("travel-plans-dashboard", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error("Update travel plan error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to update travel plan",
            formData: validationPayload,
        };
    }
}


/** DELETE TRAVEL PLAN (Admin view) */
export async function deleteTravelPlan(id: string) {
    try {
        const response = await serverFetch.delete(`/travel-plans/${id}`);
        return await response.json();
    } catch (error: any) {
        console.error("Delete travel plan error:", error);
        return {
            success: false,
            message: "Failed to delete travel plan",
        };
    }
}

/** MATCH TRAVEL PLANS (Admin view) */
export async function matchTravelPlans(queryString?: string) {
    try {
        const response = await serverFetch.get(`/travel-plans/match${queryString ? `?${queryString}` : ""}`);
        return await response.json();
    } catch (error: any) {
        console.error("Match travel plans error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to match travel plans",
        };
    }
}

// For Login User Get Travel Plan
export async function getMyTravelPlans() {
    try {
        const response = await serverFetch.get("/travel-plans/my-travel-plan");
        return await response.json();
    } catch (error: any) {
        console.error("Get my travel plans error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch your travel plans",
            data: [],
        };
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** ==================== ADMIN API FUNCTIONS ==================== */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelPlanZodSchema, updateTravelPlanZodSchema } from "@/zod/travel.validation";

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

/** CREATE TRAVEL PLAN (Admin view) */
export async function createTravelPlan(formData: FormData) {
    const validationPayload: any = {
        title: formData.get("title") as string,
        destination: formData.get("destination") as string,
        country: formData.get("country") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        budget: formData.get("budget") ? Number(formData.get("budget")) : undefined,
        description: formData.get("description") as string,
        travelType: formData.get("travelType") as string,
        photos: formData.getAll("photos") as string[],
        visibility: formData.get("visibility") === "true",
    };

    const validation = zodValidator(validationPayload, createTravelPlanZodSchema);

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    try {
        const response = await serverFetch.post("/travel-plans", {
            body: JSON.stringify({ travelPlan: validation.data }),
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    } catch (error: any) {
        console.error("Create travel plan error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to create travel plan",
        };
    }
}

/** UPDATE TRAVEL PLAN (Admin view) */
export async function updateTravelPlan(id: string, formData: FormData) {
    const validationPayload: any = {
        title: formData.get("title") as string,
        destination: formData.get("destination") as string,
        country: formData.get("country") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        budget: formData.get("budget") ? Number(formData.get("budget")) : undefined,
        description: formData.get("description") as string,
        travelType: formData.get("travelType") as string,
        photos: formData.getAll("photos") as string[],
        visibility: formData.get("visibility") === "true",
    };

    const validation = zodValidator(validationPayload, updateTravelPlanZodSchema);

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    try {
        const response = await serverFetch.patch(`/travel-plans/${id}`, {
            body: JSON.stringify({ travelPlan: validation.data }),
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    } catch (error: any) {
        console.error("Update travel plan error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to update travel plan",
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
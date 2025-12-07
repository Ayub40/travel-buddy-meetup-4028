import z from "zod";

/** Frontend enum for TravelType */
export enum TravelType {
    SOLO = "SOLO",
    GROUP = "GROUP",
    BACKPACK = "BACKPACK",
}

/** Zod schemas for TravelPlan */
export const createTravelPlanZodSchema = z.object({
    title: z.string().min(1, "Title is required"),
    destination: z.string().min(1, "Destination is required"),
    country: z.string().min(1, "Country is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    budget: z.number().optional(),
    description: z.string().optional(),
    travelType: z.enum([TravelType.SOLO, TravelType.GROUP, TravelType.BACKPACK]),
    photos: z.array(z.string()).optional(),
    visibility: z.boolean().optional(),
});

export const updateTravelPlanZodSchema = z.object({
    title: z.string().optional(),
    destination: z.string().optional(),
    country: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    budget: z.number().optional(),
    description: z.string().optional(),
    travelType: z.enum([TravelType.SOLO, TravelType.GROUP, TravelType.BACKPACK]).optional(),
    photos: z.array(z.string()).optional(),
    visibility: z.boolean().optional(),
});
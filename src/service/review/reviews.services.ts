/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IReview, IReviewCreate } from "@/types/review.interface";
// import { IReviewFormData } from "@/types/review.interface";

/* -----------------------------------------
   ✅ 1) Get Reviews of a Travel Plan
------------------------------------------ */
export async function getReviewsByPlan(travelPlanId: string) {
    try {
        const response = await serverFetch.get(`/reviews/plan/${travelPlanId}`);
        const result = await response.json();

        return {
            success: true,
            data: result.data,
            meta: result.meta,
        };
    } catch (error: any) {
        console.error("Get reviews error:", error);
        return {
            success: false,
            message: error.message || "Failed to fetch reviews",
            data: null,
        };
    }
}

/* -----------------------------------------
   ✅ 2) Get My Reviews
------------------------------------------ */
export async function getMyReviews() {
    try {
        const response = await serverFetch.get(`/reviews/me`);
        const result = await response.json();

        return {
            success: true,
            data: result.data,
            meta: result.meta,
        };
    } catch (error: any) {
        console.error("Get My Reviews error:", error);
        return {
            success: false,
            message: "Failed to fetch user reviews",
            data: null,
        };
    }
}

/* -----------------------------------------
   ✅ 3) Create Review
------------------------------------------ */
export async function createReview(travelPlanId: string, data: IReviewCreate) {
    try {
        const response = await serverFetch.post(`/reviews/${travelPlanId}`, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error creating review:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create review",
        };
    }
}

/* -----------------------------------------
   ✅ 4) Update Review
------------------------------------------ */
export async function updateReview(reviewId: string, data: Partial<IReview>) {
    try {
        const response = await serverFetch.patch(`/reviews/${reviewId}`, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    } catch (error: any) {
        console.error("Error updating review:", error);
        return {
            success: false,
            message: error.message || "Failed to update review",
        };
    }
}

/* -----------------------------------------
   ✅ 5) Delete Review
------------------------------------------ */
export async function deleteReview(reviewId: string) {
    try {
        const response = await serverFetch.delete(`/review/${reviewId}`);
        return await response.json();
    } catch (error: any) {
        console.error("Error deleting review:", error);
        return {
            success: false,
            message: error.message || "Failed to delete review",
        };
    }
}

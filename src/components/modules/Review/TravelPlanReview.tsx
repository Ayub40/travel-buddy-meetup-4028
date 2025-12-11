/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { IReviewCreate } from "@/types/review.interface";
import { createReview, deleteReview, getReviewsByPlan, updateReview } from "@/service/review/reviews.services";

interface Props {
    travelPlanId: string;
    tripEnded: boolean;
}

export default function TravelPlanReview({ travelPlanId, tripEnded }: Props) {
    const [reviews, setReviews] = useState<any[]>([]);
    // const [averageRating, setAverageRating] = useState<number | null>(null);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [editingReview, setEditingReview] = useState<any | null>(null);
    const [formData, setFormData] = useState({ rating: 5, comment: "" });
    const [loading, setLoading] = useState(false);

    const fetchReviews = async () => {
        try {
            const result = await getReviewsByPlan(travelPlanId);
            if (result.success) {
                setReviews(result.data || []);
                setAverageRating(result.meta?.averageRating || 0);
            }
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    };
    // const fetchReviews = async () => {
    //     const result = await getReviewsByPlan(travelPlanId);
    //     if (result.success) {
    //         setReviews(result.data);
    //         setAverageRating(result.meta.averageRating);
    //     }
    // };

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getReviewsByPlan(travelPlanId);
                if (result?.success) {
                    setReviews(result?.data);
                    setAverageRating(result?.meta.averageRating);
                }
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            }
        };

        fetch();
    }, [travelPlanId]);

    const handleSubmit = async () => {
        setLoading(true);
        let result;
        if (editingReview) {
            result = await updateReview(editingReview.id, formData);
        } else {
            result = await createReview(travelPlanId, formData as IReviewCreate);
        }
        setLoading(false);

        if (result.success) {
            fetchReviews();
            setFormData({ rating: 5, comment: "" });
            setEditingReview(null);
        } else {
            alert(result.message || "Failed to save review");
        }
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const result = await deleteReview(reviewId);
        if (result.success) fetchReviews();
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Reviews</h2>
            {averageRating && <p className="mb-4">Average Rating: {averageRating.toFixed(1)} / 5</p>}

            <div className="space-y-2">
                {reviews?.length ? (
                    reviews?.map((r) => (
                        <div key={r.id} className="border p-3 rounded-md flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{r.user.name}</p>
                                <p>Rating: {r.rating} / 5</p>
                                {r.comment && <p>Comment: {r.comment}</p>}
                            </div>
                            {r.isOwn && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingReview(r);
                                            setFormData({ rating: r.rating, comment: r.comment || "" });
                                        }}
                                        className="px-2 py-1 bg-yellow-400 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(r.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {tripEnded && (
                <div className="mt-4 border-t pt-4">
                    <h3 className="font-bold mb-2">{editingReview ? "Edit Your Review" : "Give Review"}</h3>
                    <label className="block mb-2">
                        Rating:
                        <input
                            type="number"
                            min={1}
                            max={5}
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                            className="w-20 border p-1 rounded ml-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Comment:
                        <textarea
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                    </label>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Submit"}
                    </button>
                </div>
            )}
        </div>
    );
}

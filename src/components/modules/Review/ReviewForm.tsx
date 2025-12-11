"use client"; 

import { useState } from "react";
import { createReview } from "@/service/review/reviews.services";

interface ReviewFormProps {
    travelPlanId: string;
    onSuccess?: () => void;
}

export default function ReviewForm({ travelPlanId, onSuccess }: ReviewFormProps) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await createReview(travelPlanId, { rating, comment });

        setLoading(false);

        if (result.success) {
            alert("Review submitted successfully!");
            if (onSuccess) onSuccess(); // parent component update
            setComment("");
            setRating(1);
        } else {
            alert(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="font-semibold">Rating (1-5)</label>
                <input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <label className="font-semibold">Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-primary text-white rounded-lg font-semibold"
            >
                {loading ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
}

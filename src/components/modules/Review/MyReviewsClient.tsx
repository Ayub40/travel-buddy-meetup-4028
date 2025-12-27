/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { deleteReview, updateReview } from "@/service/review/reviews.services";
import { IReviewCreate } from "@/types/review.interface";
import { Star, Edit3, Trash2, MessageSquare, X, Save, User } from "lucide-react";

interface MyReviewsClientProps {
    initialReviews: any[];
}

export default function MyReviewsClient({ initialReviews }: MyReviewsClientProps) {
    const [reviews, setReviews] = useState(initialReviews);
    const [editingReview, setEditingReview] = useState<any | null>(null);
    const [formData, setFormData] = useState({ rating: 5, comment: "" });

    const handleEdit = (review: any) => {
        setEditingReview(review);
        setFormData({ rating: review.rating, comment: review.comment || "" });
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const result = await deleteReview(id);
        if (result.success) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleSubmit = async () => {
        if (!editingReview) return;
        const result = await updateReview(editingReview.id, formData as IReviewCreate);
        if (result.success) {
            setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, ...formData } : r));
            setEditingReview(null);
            setFormData({ rating: 5, comment: "" });
        } else {
            alert(result.message || "Failed to update review");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="text-blue-600" /> My Reviews
                    </h1>
                    <p className="text-gray-500 mt-1">Manage and edit your feedback for travel plans.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border text-sm font-medium">
                    Total: {reviews.length}
                </div>
            </header>

            {/* --- Edit Form Section --- */}
            {editingReview && (
                <div className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                            <Edit3 size={18} /> Edit Your Review
                        </h2>
                        <button onClick={() => setEditingReview(null)} className="text-blue-400 hover:text-blue-600">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-blue-800 mb-1">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="transition-transform active:scale-90"
                                    >
                                        <Star
                                            size={28}
                                            fill={star <= formData.rating ? "#EAB308" : "transparent"}
                                            className={star <= formData.rating ? "text-yellow-500" : "text-gray-300"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-blue-800 mb-1">Your Comment</label>
                            <textarea
                                value={formData.comment}
                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full border border-blue-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none min-h-[100px]"
                                placeholder="Share your experience..."
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                        >
                            <Save size={18} /> Update Review
                        </button>
                    </div>
                </div>
            )}

            {/* --- Reviews List --- */}
            {reviews.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
                    <MessageSquare size={48} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-gray-400">You haven't written any reviews yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {reviews.map(r => (
                        <div key={r.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                    <User className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 capitalize">{r.user?.name || "Anonymous User"}</h3>
                                    <div className="flex items-center gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                fill={i < r.rating ? "#EAB308" : "transparent"}
                                                className={i < r.rating ? "text-yellow-500" : "text-gray-200"}
                                            />
                                        ))}
                                        <span className="text-xs font-bold text-gray-400 ml-1">{r.rating}/5</span>
                                    </div>
                                    {r.comment && <p className="text-gray-600 text-sm mt-2 leading-relaxed italic">"{r.comment}"</p>}
                                </div>
                            </div>

                            {r.isOwn && (
                                <div className="flex sm:flex-col gap-2 shrink-0">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-lg hover:bg-yellow-500 hover:text-white transition-all text-sm font-medium"
                                        onClick={() => handleEdit(r)}
                                    >
                                        <Edit3 size={14} /> Edit
                                    </button>
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
                                        onClick={() => handleDelete(r.id)}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


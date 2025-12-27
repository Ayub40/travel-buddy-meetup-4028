/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllTravelPlans } from "@/service/admin/travelPlanManagement";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const bgColors = ["bg-blue-50", "bg-pink-50", "bg-green-50", "bg-yellow-50"];

const SkeletonCard = () => (
    <div className="rounded-[2.5rem] p-4 bg-gray-100 animate-pulse">
        <div className="h-72 w-full bg-gray-200 rounded-[2rem]"></div>
        <div className="mt-5 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
);

export default function PopularDestinations() {
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const fetchDestinations = async () => {
            try {
                const res = await getAllTravelPlans("limit=4");
                if (res.success) setDestinations(res.data);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    return (
        <section className="py-20 container mx-auto px-6">
            <div className="text-center mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
                <p className="text-gray-500 mt-2">Explore the most loved places by our community.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (

                    [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                ) : destinations.length > 0 ? (
                    destinations.map((dest, index) => {
                        const avgRating = dest.reviews?.length > 0
                            ? (dest.reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / dest.reviews.length).toFixed(1)
                            : "4.8";

                        return (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ y: -10 }}
                                className={`relative group rounded-[2.5rem] p-4 transition-all duration-500 ${bgColors[index % 4]} border border-transparent hover:border-white hover:shadow-2xl`}
                            >
                                <div className="relative h-72 w-full overflow-hidden rounded-[2rem]">
                                    <Image
                                        src={dest.photos?.[0] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"}
                                        alt={dest.title}
                                        fill
                                        priority={index < 2}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs font-bold">{avgRating}</span>
                                    </div>
                                </div>

                                <div className="mt-5 px-2 flex justify-between items-center">
                                    <div className="max-w-[70%]">
                                        <h3 className="text-xl font-bold text-gray-800 truncate">{dest.title}</h3>
                                        <p className="text-sm text-gray-500 truncate">{dest.destination}</p>
                                        <p className="text-blue-600 font-bold mt-1 text-sm">${dest.budget}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ rotate: 45 }}
                                        
                                        onClick={() => router.push(`/allTravelPlan/travelPlan/${dest.id}`)}
                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <p className="col-span-full text-center text-gray-400">No destinations found.</p>
                )}
            </div>
        </section>
    );
}

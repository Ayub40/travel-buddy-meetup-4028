/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/service/admin/userManagement";

const bgColors = ['bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50'];


const BuddySkeleton = () => (
    <div className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 animate-pulse">
        <div className="w-full h-64 bg-gray-200 rounded-4xl mb-6 shadow-sm" />
        <div className="flex flex-col items-center">
            <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 w-24 bg-gray-200 rounded-lg mb-6" />
            <div className="h-12 w-full bg-gray-200 rounded-2xl" />
        </div>
    </div>
);

export default function FeaturedTravelBuddies() {
    const [buddies, setBuddies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuddies = async () => {
            const res = await getUsers("limit=4");
            if (res?.success) {
                setBuddies(res.data?.data || res.data || []);
            }
            setLoading(false);
        };
        fetchBuddies();
    }, []);

    if (!loading && buddies.length === 0) return null;

    return (
        <section className="py-24 container mx-auto px-6">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Featured Travel Buddies
                </motion.h2>
                <p className="text-gray-500 mt-4 max-w-xl mx-auto font-medium">
                    Connect with verified travelers who are ready to explore the world with you.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {loading ? (

                    Array.from({ length: 4 }).map((_, i) => <BuddySkeleton key={i} />)
                ) : (
                    buddies.slice(0, 4).map((buddy, index) => (
                        <motion.div
                            key={buddy.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`${bgColors[index % 4]} p-6 rounded-[2.5rem] border border-transparent hover:border-white hover:shadow-xl transition-all duration-500 group`}
                        >
                            <div className="relative w-full h-64 rounded-4xl overflow-hidden mb-6 shadow-md bg-white/50">
                                <Image
                                    src={buddy.profileImage ? buddy.profileImage : "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop"}
                                    alt={buddy.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e: any) => {
                                        e.target.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop";
                                    }}
                                />

                                {buddy.status === "ACTIVE" && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/50">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Verified</span>
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-800 truncate">{buddy.name}</h3>
                                <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1 mb-4 font-medium">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span className="truncate">{buddy.currentLocation || "Explore Mode"}</span>
                                </div>

                                <Link href={`/profile/${buddy.id}`}>
                                    <button className="w-full py-3 bg-white hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95">
                                        View Profile <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}


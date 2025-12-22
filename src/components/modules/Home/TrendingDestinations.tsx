"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
    { name: "Sajek Valley", buddies: "120+", rating: 4.9, bg: "bg-green-50", color: "text-green-600" },
    { name: "Bandarban", buddies: "85+", rating: 4.8, bg: "bg-blue-50", color: "text-blue-600" },
    { name: "Sylhet", buddies: "200+", rating: 4.7, bg: "bg-orange-50", color: "text-orange-600" },
    { name: "Bali, Indonesia", buddies: "50+", rating: 4.9, bg: "bg-pink-50", color: "text-pink-600" },
];

export default function TrendingDestinations() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div className="text-center mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800">Trending Destinations</h2>
                        <p className="text-gray-500 mt-2">Explore the most popular spots where travelers are heading.</p>
                    </div>
                    <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                        View All <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${dest.bg} p-6 rounded-3xl border border-transparent hover:border-white shadow-sm transition-all`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-xl bg-white shadow-sm ${dest.color}`}>
                                    <Star size={20} fill="currentColor" />
                                </div>
                                <span className="text-sm font-semibold text-gray-400">{dest.rating}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{dest.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{dest.buddies} Travelers planning</p>
                            <Button size="sm" className="w-full bg-white text-gray-800 hover:bg-gray-50 shadow-sm border-none">
                                Find Buddy
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TravelCardProps {
    plan: any;
}

export default function TravelCard({ plan }: TravelCardProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group h-full flex flex-col">
                <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden">
                    <Image
                        src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop"}
                        alt={plan.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur-md border-none">
                            {plan.travelType}
                        </Badge>
                        {plan.budget && (
                            <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-md border-none">
                                ${plan.budget}
                            </Badge>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <CardContent className="p-5 flex-grow">
                    <div className="flex items-center gap-1 text-blue-600 mb-2">
                        <MapPin size={14} />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                            {plan.destination}, {plan.country}
                        </span>
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {plan.title}
                    </h3>

                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-4">
                        {plan.description || "Join this amazing journey and explore the hidden gems of this beautiful location with a verified buddy."}
                    </p>


                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-gray-600 text-xs border-t pt-4">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-blue-500" />
                            <span>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={14} className="text-blue-500" />
                            <span>{plan.joinRequests?.length || 0} Joined</span>
                        </div>
                    </div>
                </CardContent>

                {/* Footer Section */}
                <CardFooter className="p-5 pt-0">
                    <Link href={`/allTravelPlan/travelPlan/${plan.id}`} className="w-full">
                        <Button className="w-full text-sm sm:text-base bg-slate-900 hover:bg-blue-600 text-white transition-all duration-300 group-hover:gap-3">
                            View Details
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

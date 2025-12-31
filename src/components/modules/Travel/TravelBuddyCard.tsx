"use client";

import { formatDateTime } from "@/lib/formatters";
import { sendJoinRequest } from "@/service/admin/travelPlanManagement";
import { ITravelPlan } from "@/types/travel.interface";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Calendar,
    Wallet,
    User,
    Send,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Responsive Skeleton Component ---
export const TravelBuddySkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md overflow-hidden flex flex-col h-full animate-pulse">
        <div className="h-48 sm:h-64 w-full bg-gray-200 dark:bg-slate-800" />
        <div className="p-5 sm:p-7 space-y-4 sm:space-y-6">
            <div className="space-y-3">
                <div className="h-6 sm:h-7 bg-gray-200 dark:bg-slate-800 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-lg w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 sm:h-16 bg-gray-100 dark:bg-slate-800/50 rounded-xl sm:rounded-2xl" />
                ))}
            </div>
            <div className="h-12 sm:h-14 bg-gray-200 dark:bg-slate-800 rounded-xl sm:rounded-2xl w-full" />
        </div>
    </div>
);

interface TravelBuddyCardProps {
    plan: ITravelPlan;
}

export default function TravelBuddyCard({ plan }: TravelBuddyCardProps) {

    const handleSendRequest = async () => {
        if (!plan.id) {
            toast.error("Travel Plan not found!");
            return;
        }

        const res = await sendJoinRequest(plan.id);

        if (res.success) {
            toast.success("Join request sent successfully!");
        } else {
            toast.error(res.message || "Failed to send request");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
        >
            {/* --- Image Section --- */}
            <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                <Image
                    src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop"}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-wrap gap-2">
                    <Badge className="bg-blue-600/90 backdrop-blur-md border-none px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white">
                        {plan.travelType}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                        {plan.country}
                    </Badge>
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="p-5 sm:p-7 flex-grow flex flex-col">
                <div className="mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {plan.title}
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {plan.description || "Join this amazing journey and explore the hidden gems with a verified buddy."}
                    </p>
                </div>

                {/* Info Grid - Responsive layout for inner data */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-5 sm:mb-6">
                    {/* Destination */}
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-900/20 transition-colors hover:bg-blue-100/50">
                        <div className="p-1.5 sm:p-2 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl text-blue-600 shadow-sm shrink-0">
                            <MapPin size={14} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Place</p>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{plan.destination}</p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-green-50 dark:bg-green-900/20 transition-colors hover:bg-green-100/50">
                        <div className="p-1.5 sm:p-2 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl text-green-600 shadow-sm shrink-0">
                            <Wallet size={14} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] sm:text-[10px] font-bold text-green-400 uppercase tracking-tighter">Budget</p>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{plan.budget ? `৳${plan.budget}` : "Flexible"}</p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-pink-50 dark:bg-pink-900/20 transition-colors hover:bg-pink-100/50">
                        <div className="p-1.5 sm:p-2 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl text-pink-600 shadow-sm shrink-0">
                            <Calendar size={14} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] sm:text-[10px] font-bold text-pink-400 uppercase tracking-tighter">Date</p>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                                {plan.startDate ? formatDateTime(new Date(plan.startDate)) : "TBA"}
                            </p>
                        </div>
                    </div>

                    {/* Host */}
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-purple-50 dark:bg-purple-900/20 transition-colors hover:bg-purple-100/50">
                        <div className="p-1.5 sm:p-2 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl text-purple-600 shadow-sm shrink-0">
                            <User size={14} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] sm:text-[10px] font-bold text-purple-400 uppercase tracking-tighter">Host</p>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{plan.user?.name || "Member"}</p>
                        </div>
                    </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="mt-auto flex flex-col gap-2 sm:gap-3">
                    <Button
                        onClick={handleSendRequest}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 sm:py-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 group/btn text-sm sm:text-base"
                    >
                        <span>Send Join Request</span>
                        <Send size={16} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>

                    <Link href={`/allTravelPlan/travelPlan/${plan.id}`} className="w-full">
                        <Button variant="ghost" className="w-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 py-5 sm:py-6 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-xs sm:text-sm">
                            View Full Details
                            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}


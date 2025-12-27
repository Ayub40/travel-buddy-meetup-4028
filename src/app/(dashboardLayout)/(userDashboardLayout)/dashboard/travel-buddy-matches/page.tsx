"use client";

import { getDashboardStats } from "@/service/admin/userManagement";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Users, MapPin, Eye, XCircle, UserCircle } from "lucide-react";

// --- Skeleton Component ---
const TableRowSkeleton = () => (
    <>
        {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="animate-pulse border-b border-gray-100">
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-full" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                </td>
                <td className="p-4"><div className="h-4 w-40 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-8 w-16 bg-gray-200 rounded-lg" /></td>
            </tr>
        ))}
    </>
);

interface Match {
    id: string;
    user: {
        id: string;
        name: string;
        profileImage?: string;
    };
    travelPlan: {
        id: string;
        title: string;
        destination: string;
    };
}

export default function TravelBuddyMatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    useEffect(() => {
        const loadMatches = async () => {
            const res = await getDashboardStats();
            if (res.success) {
                setMatches(res.data.matches || []);
            }
            setLoading(false);
        };
        loadMatches();
    }, []);

    const handleUserClick = (userId: string) => {
        console.log("User profile action:", userId);
    };

    const handleViewMatch = (matchId: string) => {
        const match = matches.find(m => m.id === matchId) || null;
        setSelectedMatch(match);
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Users className="text-blue-600" size={32} /> Travel Buddy Matches
                </h1>
                <p className="text-gray-500 mt-1">Detailed view of confirmed travel partnerships.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">User</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Trip Title</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Destination</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <TableRowSkeleton />
                            ) : matches.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center text-gray-400 font-medium">
                                        No matches found yet.
                                    </td>
                                </tr>
                            ) : (
                                matches.map(match => (
                                    <tr key={match.id} className="hover:bg-blue-50/40 transition-colors group">
                                        <td className="p-4">
                                            <div
                                                className="flex items-center gap-3 cursor-pointer"
                                                onClick={() => handleUserClick(match.user.id)}
                                            >
                                                <Image
                                                    src={match.user.profileImage || "/default-profile.png"}
                                                    alt={match.user.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full border border-gray-200 object-cover"
                                                />
                                                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {match.user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600 font-medium">{match.travelPlan.title}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                <MapPin size={14} className="text-red-400" />
                                                {match.travelPlan.destination}
                                            </div>
                                        </td>
                                        <td className="p-4 text-left">
                                            <button
                                                className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium text-sm shadow-sm"
                                                onClick={() => handleViewMatch(match.id)}
                                            >
                                                <Eye size={16} /> View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* -------- Enhanced Modal -------- */}
            <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
                <DialogContent className="sm:max-w-md bg-white rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
                    <div className="bg-blue-600 p-6 text-white text-center relative">
                        <div className="mx-auto w-20 h-20 relative border-4 border-white/30 rounded-full overflow-hidden mb-3 shadow-lg">
                            <Image
                                src={selectedMatch?.user.profileImage || "/default-profile.png"}
                                alt={selectedMatch?.user.name || "User"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold">{selectedMatch?.user.name}</h3>
                        <p className="text-blue-100 text-sm">Matched Traveler</p>
                    </div>

                    <div className="p-6 space-y-4 bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-gray-800 text-lg flex items-center gap-2">
                                <UserCircle className="text-blue-600" /> Trip Information
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-sm">Title</span>
                                <span className="text-gray-900 font-semibold">{selectedMatch?.travelPlan.title}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-sm">Destination</span>
                                <div className="flex items-center gap-1 text-gray-900 font-semibold uppercase text-xs">
                                    <MapPin size={12} className="text-red-500" />
                                    {selectedMatch?.travelPlan.destination}
                                </div>
                            </div>
                        </div>

                        <DialogClose asChild>
                            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-xl hover:bg-black transition shadow-md font-semibold">
                                <XCircle size={18} /> Close Profile
                            </button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}


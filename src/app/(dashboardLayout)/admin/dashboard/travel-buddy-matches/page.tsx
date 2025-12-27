"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/service/admin/userManagement";
import Image from "next/image";
import { Users, MapPin, Briefcase } from "lucide-react";

// --- Skeleton Loader Component ---
const TableRowSkeleton = () => (
    <>
        {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="animate-pulse border-b border-gray-100">
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-full" />
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                    </div>
                </td>
                <td className="p-4"><div className="h-4 w-48 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
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

    useEffect(() => {
        const loadMatches = async () => {
            const res = await getDashboardStats();
            if (res.success) setMatches(res.data.matches || []);
            setLoading(false);
        };
        loadMatches();
    }, []);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Users className="text-blue-600" size={32} /> Travel Buddy Matches
                </h2>
                <p className="text-gray-500 mt-1">View all successful connections between travelers.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Matched User</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Trip Plan</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Destination</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <TableRowSkeleton />
                            ) : matches.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Briefcase size={48} className="mb-2 opacity-20" />
                                            <p className="text-lg">No matches found yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                matches.map(match => (
                                    <tr key={match.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-10 w-10 shrink-0">
                                                    <Image
                                                        src={match.user.profileImage || "/default-profile.png"}
                                                        alt={match.user.name}
                                                        fill
                                                        className="rounded-full object-cover border border-gray-100"
                                                    />
                                                </div>
                                                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {match.user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-700 font-medium">{match.travelPlan.title}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <MapPin size={16} className="text-red-400" />
                                                <span>{match.travelPlan.destination}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


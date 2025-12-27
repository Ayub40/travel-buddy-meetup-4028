"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/service/admin/userManagement";
import Image from "next/image";

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

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Travel Buddy Matches</h2>
            {matches.length === 0 ? (
                <p>No matches yet</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 border-b">User</th>
                                <th className="text-left p-3 border-b">Trip Title</th>
                                <th className="text-left p-3 border-b">Destination</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(match => (
                                <tr key={match.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b flex items-center gap-2">
                                        <Image
                                            src={match.user.profileImage || "/default-profile.png"}
                                            alt={match.user.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full object-cover"
                                        />
                                        {match.user.name}
                                    </td>
                                    <td className="p-3 border-b">{match.travelPlan.title}</td>
                                    <td className="p-3 border-b">{match.travelPlan.destination}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

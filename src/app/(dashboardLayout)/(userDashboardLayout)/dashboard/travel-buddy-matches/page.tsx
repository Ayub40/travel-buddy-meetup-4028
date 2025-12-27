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
        console.log("User clicked:", userId);
    };

    const handleViewMatch = (matchId: string) => {
        const match = matches.find(m => m.id === matchId) || null;
        setSelectedMatch(match);
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Travel Buddy Matches</h1>

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
                                <th className="text-left p-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(match => (
                                <tr key={match.id} className="hover:bg-gray-50">
                                    <td
                                        className="p-3 border-b flex items-center gap-2 cursor-pointer"
                                        onClick={() => handleUserClick(match.user.id)}
                                    >
                                        <Image
                                            src={
                                                match.user.profileImage
                                                    ? match.user.profileImage
                                                    : "/default-profile.png"
                                            }
                                            alt={match.user.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full object-cover"
                                        />
                                        {match.user.name}
                                    </td>

                                    <td className="p-3 border-b">
                                        {match.travelPlan.title}
                                    </td>

                                    <td className="p-3 border-b">
                                        {match.travelPlan.destination}
                                    </td>

                                    <td className="p-3 border-b">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                            onClick={() => handleViewMatch(match.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* -------- Modal -------- */}
            <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
                <DialogContent className="sm:max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedMatch?.travelPlan.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-2 space-y-2">
                        <p>
                            <strong>Destination:</strong>{" "}
                            {selectedMatch?.travelPlan.destination}
                        </p>
                        <p>
                            <strong>User:</strong> {selectedMatch?.user.name}
                        </p>

                        <div className="flex justify-center mt-3">
                            <Image
                                src={
                                    selectedMatch?.user.profileImage ||
                                    "/default-profile.png"
                                }
                                alt={selectedMatch?.user.name || "User"}
                                width={64}
                                height={64}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <DialogClose asChild>
                        <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
                            Close
                        </button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}

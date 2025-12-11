"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { getDashboardStats, updateJoinRequest } from "@/service/admin/userManagement";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface JoinRequest {
    id: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    user: {
        id: string;
        name: string;
        profileImage?: string;
    };
    travelPlan: {
        title: string,
        destination: string;
    };
}

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

interface UpcomingTrip {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    joinRequests: { status: "PENDING" | "ACCEPTED" | "REJECTED" }[];
}

interface DashboardStats {
    totalTravelPlans: number;
    matchedCount: number;
    totalJoinRequests: number;
    joinRequests: JoinRequest[];
    matches: Match[];
    upcomingTrips: UpcomingTrip[];
    userName: string;
}

export default function AdminDashboardHome() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const statsRes = await getDashboardStats();
            if (statsRes.success) setStats(statsRes.data);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAction = async (id: string, status: "ACCEPTED" | "REJECTED") => {
        const res = await updateJoinRequest(id, status);
        if (res.success && stats) {
            setStats({
                ...stats,
                joinRequests: stats.joinRequests.map(r =>
                    r.id === id ? { ...r, status } : r
                ),
                matches: status === "ACCEPTED" ? [...stats.matches, res.data] : stats.matches
            });
        }
    };

    const handleUserClick = (userId: string) => {
        // Modal or redirect to user details page
        console.log("Show user details for:", userId);
    };

    const handleViewMatch = (matchId: string) => {
        const match = stats?.matches.find(m => m.id === matchId) || null;
        setSelectedMatch(match);
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Hello 👋 {stats?.userName}</h1>

            {/* ---------------------- Cards ---------------------- */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <h2 className="text-gray-600 font-semibold">Your Total Travel Plans</h2>
                        <p className="text-3xl font-bold mt-2">{stats.totalTravelPlans}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <h2 className="text-gray-600 font-semibold">Travel Buddy Matches</h2>
                        <p className="text-3xl font-bold mt-2">{stats.matchedCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <h2 className="text-gray-600 font-semibold">Send Join Requests</h2>
                        <p className="text-3xl font-bold mt-2">{stats.totalJoinRequests}</p>
                    </div>
                </div>
            )}

            {/* ---------------------- Join Requests ---------------------- */}
            <h2 className="text-2xl font-bold mb-4">Join Requests</h2>
            {stats?.joinRequests.length === 0 ? (
                <p>No join requests found</p>
            ) : (
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 border-b">User</th>
                                <th className="text-left p-3 border-b">Title</th>
                                <th className="text-left p-3 border-b">Destination</th>
                                <th className="text-left p-3 border-b">Status</th>
                                <th className="text-left p-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.joinRequests.map(req => (
                                <tr key={req.id} className="hover:bg-gray-50">
                                    <td
                                        className="p-3 border-b flex items-center gap-2 cursor-pointer"
                                        onClick={() => handleUserClick(req.user.id)}
                                    >
                                        {req.user?.profileImage ? (
                                            <Image
                                                src={req.user.profileImage}
                                                alt={req.user.name || "Unknown User"}
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src="/default-profile.png"
                                                alt="Default User"
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover"
                                            />
                                        )}
                                        {req.user?.name || "Unknown User"}
                                    </td>
                                    <td className="p-3 border-b">{req.travelPlan.title}</td>
                                    <td className="p-3 border-b">{req.travelPlan.destination}</td>
                                    <td className="p-3 border-b">
                                        <span
                                            className={`px-3 py-1 rounded text-white text-sm ${req.status === "PENDING"
                                                ? "bg-yellow-500"
                                                : req.status === "ACCEPTED"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-3 border-b">
                                        {req.status === "PENDING" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleAction(req.id, "ACCEPTED")}
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req.id, "REJECTED")}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ---------------------- Travel Buddy Matches ---------------------- */}
            <h2 className="text-2xl font-bold mb-4">Travel Buddy Matches</h2>
            {stats?.matches.length === 0 ? (
                <p>No matches yet</p>
            ) : (
                <div className="overflow-x-auto mb-8">
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
                            {stats?.matches.map(match => (
                                <tr key={match.id} className="hover:bg-gray-50">
                                    <td
                                        className="p-3 border-b flex items-center gap-2 cursor-pointer"
                                        onClick={() => handleUserClick(match.user.id)}
                                    >
                                        {
                                            match.user.profileImage && (
                                                <Image
                                                    src={match.user.profileImage}
                                                    alt="Default User"
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full object-cover"
                                                />
                                            )
                                        }
                                    </td>
                                    <td className="p-3 border-b">{match.travelPlan.title}</td>
                                    <td className="p-3 border-b">{match.travelPlan.destination}</td>
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

            {/* ---------------------- Upcoming Trips ---------------------- */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Trips</h2>
            {stats?.upcomingTrips.length === 0 ? (
                <p>No upcoming trips</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 border-b">Title</th>
                                <th className="text-left p-3 border-b">Destination</th>
                                <th className="text-left p-3 border-b">Start Date</th>
                                <th className="text-left p-3 border-b">End Date</th>
                                <th className="text-left p-3 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.upcomingTrips.map(trip => (
                                <tr key={trip.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{trip.title}</td>
                                    <td className="p-3 border-b">{trip.destination}</td>
                                    <td className="p-3 border-b">{new Date(trip.startDate).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">{new Date(trip.endDate).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">
                                        {trip.joinRequests.length === 0 ? (
                                            <span className="px-3 py-1 rounded text-white text-sm bg-gray-400">No Requests</span>
                                        ) : (
                                            trip.joinRequests.map((r, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-3 py-1 rounded text-white text-sm mr-1 ${r.status === "PENDING"
                                                        ? "bg-yellow-500"
                                                        : r.status === "ACCEPTED"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                        }`}
                                                >
                                                    {r.status}
                                                </span>
                                            ))
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ---------------------- Modal for Selected Match ---------------------- */}
            <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
                <DialogContent className="sm:max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle>{selectedMatch?.travelPlan.title}</DialogTitle>
                    </DialogHeader>

                    <div className="mt-2 space-y-2">
                        <p><strong>Destination:</strong> {selectedMatch?.travelPlan.destination}</p>
                        <p><strong>User:</strong> {selectedMatch?.user.name}</p>
                        <div className="flex justify-center mt-2">
                            <Image
                                src={selectedMatch?.user.profileImage || "/default-profile.png"}
                                alt={selectedMatch?.user.name || "Default User"}
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
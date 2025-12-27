"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/service/admin/userManagement";

interface UpcomingTrip {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    joinRequests: { status: "PENDING" | "ACCEPTED" | "REJECTED" }[];
}

export default function UpcomingTripsPage() {
    const [trips, setTrips] = useState<UpcomingTrip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrips = async () => {
            const res = await getDashboardStats();
            if (res.success) setTrips(res.data.upcomingTrips || []);
            setLoading(false);
        };
        loadTrips();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Trips</h2>
            {trips.length === 0 ? (
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
                            {trips.map(trip => (
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
        </div>
    );
}

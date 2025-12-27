"use client";

import { getDashboardStats } from "@/service/admin/userManagement";
import { useEffect, useState } from "react";
import { Calendar, MapPin, PlaneTakeoff, Info } from "lucide-react";

// --- Skeleton Component for Table Rows ---
const TableRowSkeleton = () => (
    <>
        {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="animate-pulse border-b border-gray-100">
                <td className="p-4"><div className="h-4 w-48 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
            </tr>
        ))}
    </>
);

interface UpcomingTrip {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
}

export default function UpcomingTripsPage() {
    const [trips, setTrips] = useState<UpcomingTrip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrips = async () => {
            const res = await getDashboardStats();
            if (res.success) {
                setTrips(res.data.upcomingTrips || []);
            }
            setLoading(false);
        };
        loadTrips();
    }, []);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <PlaneTakeoff className="text-blue-600" size={32} /> Upcoming Trips
                </h2>
                <p className="text-gray-500 mt-1">Review all scheduled travel plans in the system.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Trip Title</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Destination</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Start Date</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">End Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <TableRowSkeleton />
                            ) : trips.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Info size={48} className="mb-2 opacity-20" />
                                            <p className="text-lg italic">No upcoming trips scheduled yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                trips.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-4">
                                            <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {trip.title}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <MapPin size={16} className="text-red-400" />
                                                <span>{trip.destination}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Calendar size={14} className="text-blue-400" />
                                                {new Date(trip.startDate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(trip.endDate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
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



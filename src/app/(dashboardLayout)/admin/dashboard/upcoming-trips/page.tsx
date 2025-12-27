"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/service/admin/userManagement";
import { Calendar, MapPin, PlaneTakeoff, Info } from "lucide-react";


const TableRowSkeleton = () => (
    <>
        {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="animate-pulse border-b border-gray-100">
                <td className="p-4"><div className="h-4 w-40 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                <td className="p-4"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
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

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <PlaneTakeoff className="text-blue-600" size={32} /> Upcoming Trips
                </h2>
                <p className="text-gray-500 mt-1">Monitor upcoming travel plans and their request status.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase">Trip Title</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase">Destination</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase">Start Date</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase">End Date</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase">Request Summary</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <TableRowSkeleton />
                            ) : trips.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-16 text-center text-gray-400">
                                        <Info className="mx-auto mb-2 opacity-20" size={48} />
                                        <p>No upcoming trips scheduled.</p>
                                    </td>
                                </tr>
                            ) : (
                                trips.map(trip => (
                                    <tr key={trip.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 font-medium text-gray-800">{trip.title}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <MapPin size={14} className="text-red-400" />
                                                {trip.destination}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                <Calendar size={14} />
                                                {new Date(trip.startDate).toLocaleDateString('en-GB')}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                <Calendar size={14} />
                                                {new Date(trip.endDate).toLocaleDateString('en-GB')}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {trip.joinRequests.length === 0 ? (
                                                    <span className="text-xs font-medium text-gray-400 italic">No Requests</span>
                                                ) : (
                                                    
                                                    trip.joinRequests.slice(0, 3).map((r, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter text-white ${r.status === "PENDING" ? "bg-yellow-500" :
                                                                    r.status === "ACCEPTED" ? "bg-green-500" : "bg-red-500"
                                                                }`}
                                                        >
                                                            {r.status[0]} 
                                                        </span>
                                                    ))
                                                )}
                                                {trip.joinRequests.length > 3 && (
                                                    <span className="text-[10px] text-gray-400">+{trip.joinRequests.length - 3}</span>
                                                )}
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



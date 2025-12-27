"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, updateJoinRequest } from "@/service/admin/userManagement";
import Image from "next/image";
import { Check, X, MapPin, Send } from "lucide-react";


const TableSkeleton = () => (
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
                <td className="p-4"><div className="h-6 w-16 bg-gray-200 rounded-full" /></td>
                <td className="p-4"><div className="h-8 w-32 bg-gray-200 rounded-lg mx-auto" /></td>
            </tr>
        ))}
    </>
);

interface JoinRequest {
    id: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    user: {
        id: string;
        name: string;
        profileImage?: string;
    };
    travelPlan: {
        title: string;
        destination: string;
    };
}

export default function JoinRequestsPage() {
    const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const res = await getDashboardStats();
            if (res.success) setJoinRequests(res.data.joinRequests || []);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAction = async (id: string, status: "ACCEPTED" | "REJECTED") => {
        const res = await updateJoinRequest(id, status);
        if (res.success) {
            
            setJoinRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    <Send className="text-blue-600" size={28} /> Join Requests
                </h1>
                <p className="text-gray-500 mt-1">Review and manage travel buddy applications.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">User</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Trip Title</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Destination</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <TableSkeleton />
                            ) : joinRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400">
                                        No pending join requests found.
                                    </td>
                                </tr>
                            ) : (
                                joinRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={req.user.profileImage || "/default-profile.png"}
                                                    alt={req.user.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full border border-gray-100 object-cover"
                                                />
                                                <span className="font-medium text-gray-800">{req.user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600 font-medium">{req.travelPlan.title}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                <MapPin size={14} />
                                                {req.travelPlan.destination}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleAction(req.id, "ACCEPTED")}
                                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    title="Accept Request"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req.id, "REJECTED")}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                    title="Reject Request"
                                                >
                                                    <X size={18} />
                                                </button>
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


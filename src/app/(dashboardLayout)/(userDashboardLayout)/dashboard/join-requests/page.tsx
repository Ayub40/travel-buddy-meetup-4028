"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { updateJoinRequest } from "@/service/admin/userManagement";
import { getDashboardStats } from "@/service/admin/userManagement";

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
            if (res.success) {
                setJoinRequests(res.data.joinRequests || []);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAction = async (
        id: string,
        status: "ACCEPTED" | "REJECTED"
    ) => {
        const res = await updateJoinRequest(id, status);
        if (res.success) {
            setJoinRequests(prev =>
                prev.filter(req => req.id !== id)
            );
        }
    };

    const handleUserClick = (userId: string) => {
        console.log("User profile:", userId);
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Join Requests</h1>

            {joinRequests.length === 0 ? (
                <p>No join requests found</p>
            ) : (
                <div className="overflow-x-auto">
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
                            {joinRequests.map(req => (
                                <tr key={req.id} className="hover:bg-gray-50">
                                    <td
                                        className="p-3 border-b flex items-center gap-2 cursor-pointer"
                                        onClick={() => handleUserClick(req.user.id)}
                                    >
                                        <Image
                                            src={
                                                req.user.profileImage ||
                                                "/default-profile.png"
                                            }
                                            alt={req.user.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full object-cover"
                                        />
                                        {req.user.name}
                                    </td>

                                    <td className="p-3 border-b">
                                        {req.travelPlan.title}
                                    </td>

                                    <td className="p-3 border-b">
                                        {req.travelPlan.destination}
                                    </td>

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
                                                    onClick={() =>
                                                        handleAction(req.id, "ACCEPTED")
                                                    }
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAction(req.id, "REJECTED")
                                                    }
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
        </div>
    );
}

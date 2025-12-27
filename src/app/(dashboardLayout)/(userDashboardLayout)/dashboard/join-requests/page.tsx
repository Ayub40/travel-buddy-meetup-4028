"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { updateJoinRequest, getDashboardStats } from "@/service/admin/userManagement";
import { Check, X, User as UserIcon, MapPin, Inbox } from "lucide-react";


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
                <td className="p-4"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
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
            if (res.success) {
                setJoinRequests(res.data.joinRequests || []);
            }
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

    const handleUserClick = (userId: string) => {
        console.log("Navigating to user profile:", userId);

    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Inbox className="text-blue-600" size={32} /> Join Requests
                </h1>
                <p className="text-gray-500 mt-1">Review and manage travel partnership requests.</p>
            </header>

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
                                <TableRowSkeleton />
                            ) : joinRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-16 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Inbox size={48} className="opacity-20" />
                                            <p className="text-lg">No pending requests found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                joinRequests.map(req => (
                                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div
                                                className="flex items-center gap-3 cursor-pointer group w-fit"
                                                onClick={() => handleUserClick(req.user.id)}
                                            >
                                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100 shadow-sm">
                                                    <Image
                                                        src={req.user.profileImage || "/default-profile.png"}
                                                        alt={req.user.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {req.user.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-gray-600 font-medium italic">
                                            "{req.travelPlan.title}"
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                <MapPin size={14} className="text-red-400" />
                                                {req.travelPlan.destination}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                                                ${req.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                                    req.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                                                        "bg-red-100 text-red-700"}`}>
                                                {req.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {req.status === "PENDING" && (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAction(req.id, "ACCEPTED")}
                                                        className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all shadow-sm text-sm font-medium"
                                                    >
                                                        <Check size={16} /> Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, "REJECTED")}
                                                        className="flex items-center gap-1 bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all text-sm font-medium"
                                                    >
                                                        <X size={16} /> Reject
                                                    </button>
                                                </div>
                                            )}
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





// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { updateJoinRequest } from "@/service/admin/userManagement";
// import { getDashboardStats } from "@/service/admin/userManagement";

// interface JoinRequest {
//     id: string;
//     status: "PENDING" | "ACCEPTED" | "REJECTED";
//     user: {
//         id: string;
//         name: string;
//         profileImage?: string;
//     };
//     travelPlan: {
//         title: string;
//         destination: string;
//     };
// }

// export default function JoinRequestsPage() {
//     const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadData = async () => {
//             const res = await getDashboardStats();
//             if (res.success) {
//                 setJoinRequests(res.data.joinRequests || []);
//             }
//             setLoading(false);
//         };
//         loadData();
//     }, []);

//     const handleAction = async (
//         id: string,
//         status: "ACCEPTED" | "REJECTED"
//     ) => {
//         const res = await updateJoinRequest(id, status);
//         if (res.success) {
//             setJoinRequests(prev =>
//                 prev.filter(req => req.id !== id)
//             );
//         }
//     };

//     const handleUserClick = (userId: string) => {
//         console.log("User profile:", userId);
//     };

//     if (loading) {
//         return <p className="text-center mt-10">Loading...</p>;
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-6">Join Requests</h1>

//             {joinRequests.length === 0 ? (
//                 <p>No join requests found</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="text-left p-3 border-b">User</th>
//                                 <th className="text-left p-3 border-b">Title</th>
//                                 <th className="text-left p-3 border-b">Destination</th>
//                                 <th className="text-left p-3 border-b">Status</th>
//                                 <th className="text-left p-3 border-b">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {joinRequests.map(req => (
//                                 <tr key={req.id} className="hover:bg-gray-50">
//                                     <td
//                                         className="p-3 border-b flex items-center gap-2 cursor-pointer"
//                                         onClick={() => handleUserClick(req.user.id)}
//                                     >
//                                         <Image
//                                             src={
//                                                 req.user.profileImage ||
//                                                 "/default-profile.png"
//                                             }
//                                             alt={req.user.name}
//                                             width={32}
//                                             height={32}
//                                             className="rounded-full object-cover"
//                                         />
//                                         {req.user.name}
//                                     </td>

//                                     <td className="p-3 border-b">
//                                         {req.travelPlan.title}
//                                     </td>

//                                     <td className="p-3 border-b">
//                                         {req.travelPlan.destination}
//                                     </td>

//                                     <td className="p-3 border-b">
//                                         <span
//                                             className={`px-3 py-1 rounded text-white text-sm ${req.status === "PENDING"
//                                                     ? "bg-yellow-500"
//                                                     : req.status === "ACCEPTED"
//                                                         ? "bg-green-500"
//                                                         : "bg-red-500"
//                                                 }`}
//                                         >
//                                             {req.status}
//                                         </span>
//                                     </td>

//                                     <td className="p-3 border-b">
//                                         {req.status === "PENDING" && (
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() =>
//                                                         handleAction(req.id, "ACCEPTED")
//                                                     }
//                                                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
//                                                 >
//                                                     Accept
//                                                 </button>
//                                                 <button
//                                                     onClick={() =>
//                                                         handleAction(req.id, "REJECTED")
//                                                     }
//                                                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                                                 >
//                                                     Reject
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

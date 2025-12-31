"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travel.interface";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plane } from "lucide-react";

export const travelPlanColumns: Column<ITravelPlan>[] = [
    {
        header: "Traveler",
        accessor: (plan) => (
            <UserInfoCell
                name={plan.user?.name}
                email={plan.user?.email || "no-email@example.com"}
                photo={plan.user?.profileImage || null}
            />
        ),
        sortKey: "user.name",
    },
    {
        header: "Trip Details",
        accessor: (plan) => (
            <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 leading-tight">{plan.title}</span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-500 mt-1 uppercase tracking-tighter">
                    <Plane size={12} /> {plan.travelType}
                </div>
            </div>
        ),
        sortKey: "title",
    },
    {
        header: "Location",
        accessor: (plan) => (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                    <MapPin size={14} className="text-rose-500" />
                    {plan.destination}
                </div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest pl-5">{plan.country}</span>
            </div>
        ),
        sortKey: "destination",
    },
    {
        header: "Budget",
        accessor: (plan) => (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 font-black px-3 py-0.5 rounded-full shadow-none border">
                {plan.budget ? `৳ ${plan.budget.toLocaleString()}` : "Flexible"}
            </Badge>
        ),
        sortKey: "budget",
    },
    {
        header: "Creation Date",
        accessor: (plan) => (
            <div className="opacity-80 font-medium">
                <DateCell date={plan.createdAt || ""} />
            </div>
        ),
        sortKey: "createdAt",
    },
];













// "use client";

// import { DateCell } from "@/components/shared/cell/DateCell";
// import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
// import { Column } from "@/components/shared/ManagementTable";
// import { ITravelPlan } from "@/types/travel.interface";

// export const travelPlanColumns: Column<ITravelPlan>[] = [
//     {
//         header: "Traveler",
//         accessor: (plan) => (
//             <UserInfoCell
//                 name={plan.user?.name}
//                 email={plan.user?.email || "no-email@example.com"}
//                 photo={plan.user?.profileImage || null}
//             />
//         ),
//         sortKey: "user.name",
//     },
//     {
//         header: "Title",
//         accessor: (plan) => (
//             <span className="text-sm font-medium">{plan.title}</span>
//         ),
//         sortKey: "title",
//     },
//     {
//         header: "Destination",
//         accessor: (plan) => (
//             // <span className="text-sm">{plan.destination}, {plan.country}</span>
//             <span className="text-sm">{plan.destination}</span>
//         ),
//         sortKey: "destination",
//     },
//     {
//         header: "Country",
//         accessor: (plan) => (
//             // <span className="text-sm">{plan.destination}, {plan.country}</span>
//             <span className="text-sm">{plan.country}</span>
//         ),
//         sortKey: "country",
//     },
//     {
//         header: "Travel Type",
//         accessor: (plan) => (
//             <span className="text-sm">{plan.travelType}</span>
//         ),
//         sortKey: "travelType",
//     },
//     {
//         header: "Budget",
//         accessor: (plan) => (
//             <span className="text-sm">{plan.budget ? `৳${plan.budget}` : "-"}</span>
//         ),
//         sortKey: "budget",
//     },
//     {
//         header: "Created At",
//         accessor: (plan) => <DateCell date={plan.createdAt || ""} />,
//         sortKey: "createdAt",
//     },
// ];


"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travel.interface";

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
        header: "Title",
        accessor: (plan) => (
            <span className="text-sm font-medium">{plan.title}</span>
        ),
        sortKey: "title",
    },
    {
        header: "Destination",
        accessor: (plan) => (
            <span className="text-sm">{plan.destination}, {plan.country}</span>
        ),
        sortKey: "destination",
    },
    {
        header: "Travel Type",
        accessor: (plan) => (
            <span className="text-sm">{plan.travelType}</span>
        ),
        sortKey: "travelType",
    },
    {
        header: "Budget",
        accessor: (plan) => (
            <span className="text-sm">{plan.budget ? `৳${plan.budget}` : "-"}</span>
        ),
        sortKey: "budget",
    },
    {
        header: "Visibility",
        accessor: (plan) => <StatusBadgeCell isDeleted={!plan.visibility} />,
        sortKey: "visibility",
    },
    {
        header: "Created At",
        accessor: (plan) => <DateCell date={plan.createdAt || ""} />, // default empty string
        sortKey: "createdAt",
    },
];


"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";

export const usersColumns: Column<UserInfo>[] = [
    {
        header: "User",
        accessor: (user) => (
            <UserInfoCell
                name={user?.name}
                email={user?.email || "no-email@example.com"}
                photo={user?.profileImage || null}
            />
        ),
        sortKey: "name",
    },
    {
        header: "Address",
        accessor: (user) => (
            <span className="text-sm">{user.user?.address || "N/A"}</span>
        ),
    },
    {
        header: "Role",
        accessor: (user) => (
            <span className="text-sm capitalize">{user.role?.toLowerCase() || "N/A"}</span>
        ),
        sortKey: "role",
    },
    {
        header: "Status",
        accessor: (user) => <StatusBadgeCell isDeleted={user.status === "DELETED"} />,
        sortKey: "status",
    },
    {
        header: "Joined",
        accessor: (user) => <DateCell date={user.createdAt || ""} />,
        sortKey: "createdAt",
    },
];
















// "use client";

// import { DateCell } from "@/components/shared/cell/DateCell";
// import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
// import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
// import { Column } from "@/components/shared/ManagementTable";
// import { UserInfo } from "@/types/user.interface";

// export const usersColumns: Column<UserInfo>[] = [
//     {
//         header: "User",
//         accessor: (user) => (
//             <UserInfoCell
//                 name={user?.name}
//                 email={user?.email}
//                 photo={user?.profileImage}
//             />
//         ),
//         sortKey: "name",
//     },
//     {
//         header: "Address",
//         accessor: (user) => (
//             <span className="text-sm">{user.user?.address || "N/A"}</span>
//         ),
//     },
//     {
//         header: "Gender",
//         accessor: (user) => (
//             <span className="text-sm capitalize">{user.role?.toLowerCase() || "N/A"}</span>
//         ),
//     },
//     {
//         header: "Status",
//         accessor: (user) => <StatusBadgeCell isDeleted={user.status === "DELETED"} />,
//     },
//     {
//         header: "Joined",
//         accessor: (user) => <DateCell date={user.createdAt} />,
//         sortKey: "createdAt",
//     },
// ];

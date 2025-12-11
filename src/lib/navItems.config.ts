import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
                },
            ],
        },
        // {
        //     title: "Settings",
        //     items: [
        //         {
        //             title: "Change Password",
        //             href: "/change-password",
        //             icon: "Settings",
        //             roles: ["USER", "ADMIN", "SUPER_ADMIN"],
        //         },
        //     ],
        // },
    ];
};

/* -------------------------------------------------------------------------- */
/*                                 USER NAV                                   */
/* -------------------------------------------------------------------------- */

export const userNavItems: NavSection[] = [
    {
        title: "Travel Plans",
        items: [
            {
                title: "My Travel Plans",
                href: "/dashboard/my-travel-plan",
                icon: "Calendar",
                roles: ["USER"],
            },
            // {
            //     title: "Create New Plan",
            //     href: "/dashboard/travel-plans/add",
            //     icon: "PlusCircle",
            //     roles: ["USER"],
            // },
        ],
    },
    {
        title: "Explore",
        items: [
            {
                title: "Find Travelers",
                href: "/explore",
                icon: "Search",
                roles: ["USER"],
            },
            {
                title: "Matches",
                href: "/dashboard/matches",
                icon: "Users",
                roles: ["USER"],
            },
        ],
    },
    {
        title: "Reviews",
        items: [
            {
                title: "My Reviews",
                href: "/dashboard/reviews",
                icon: "Star",
                roles: ["USER"],
            },
        ],
    },
    {
        title: "Subscription",
        items: [
            {
                title: "Upgrade Plan",
                href: "/pricing",
                icon: "CreditCard",
                roles: ["USER"],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                 ADMIN NAV                                  */
/* -------------------------------------------------------------------------- */

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/user-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "All Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Travel Plan Management",
        items: [
            {
                title: "All Travel Plans",
                href: "/admin/dashboard/travel-management",
                icon: "MapPin",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Payments",
        items: [
            {
                title: "Payment History",
                href: "/admin/dashboard/payments",
                icon: "Receipt",
                roles: ["ADMIN"],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                 SUPER ADMIN NAV                                  */
/* -------------------------------------------------------------------------- */

export const superAdminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/users",
                icon: "Users",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Travel Plan Management",
        items: [
            {
                title: "All Travel Plans",
                href: "/admin/dashboard/travel-plans",
                icon: "MapPin",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Payments",
        items: [
            {
                title: "Payment History",
                href: "/admin/dashboard/payments",
                icon: "Receipt",
                roles: ["ADMIN"],
            },
        ],
    },
];


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        case "SUPER_ADMIN":
            return [...commonNavItems, ...superAdminNavItems];
        default:
            return [];
    }
};

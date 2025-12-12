"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/service/auth/logoutUser";
// import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
    userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
    };

    const handleProfileClick = () => {
        if (userInfo.role === "ADMIN" || userInfo.role === "SUPER_ADMIN") {
            router.push("/admin/dashboard/admin-profile");
        } else {
            router.push("/my-profile");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <span className="text-sm font-semibold">
                        {userInfo.name?.charAt(0).toUpperCase()}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{userInfo.name}</p>
                        <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                        <p className="text-xs text-primary capitalize">
                            {userInfo.role.toLowerCase()}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem asChild>
                    <Link href={"/my-profile"} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem
                    onClick={handleProfileClick} // ✅ use router.push
                    className="cursor-pointer flex items-center gap-2"
                >
                    <User className="h-4 w-4" />
                    Profile
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem asChild>
                    <Link href={"/change-password"} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Change Password
                    </Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                >
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;

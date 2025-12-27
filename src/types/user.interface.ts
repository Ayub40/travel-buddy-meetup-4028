import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";

export interface IUser {
    id: string;
    name?: string;
    // email?: string;
    // profilePhoto?: string;
    profileImage?: string;
    // contactNumber?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
}


export interface UserInfo {
    id: string;
    name?: string;
    email: string;
    role: UserRole;
    needPasswordChange: boolean;
    status: "ACTIVE" | "BLOCKED" | "DELETED";

    profileImage?: string;
    profilePhoto?: string;
    contactNumber?: string;


    bio?: string;
    age?: number;
    gender?: "MALE" | "FEMALE" | "OTHER";

    country?: string;
    city?: string;
    currentLocation?: string;

    interests: string[];
    visitedCountries: string[];
    budgetRange?: "LOW" | "MEDIUM" | "HIGH";

    isVerified: boolean;

    createdAt: string;
    updatedAt: string;

    admin?: IAdmin;
    user?: IUser;
}

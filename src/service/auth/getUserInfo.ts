/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.user?.name || result.data.name || "Unknown User",
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "USER",
        };
    }

}

export const fetchUserProfile = async (): Promise<UserInfo | any> => {
    try {
  
        const response = await serverFetch.get("/user/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] },
        });
        const result = await response.json();

        if (!result.success) throw new Error("User Not Found");


        const accessToken = await getCookie("accessToken");
        if (!accessToken) throw new Error("No access token found");

        const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

        let userInfo: any = {
            email: verifiedToken.email,
            role: verifiedToken.role || "USER",
        };


        if (verifiedToken.role === "SUPER_ADMIN" || verifiedToken.role === "ADMIN") {
            userInfo = {
                ...userInfo,
                id: result.data.admin?.id || "",
                name: result.data.admin?.name || "Unknown User",
                profilePhoto: result.data.admin?.profilePhoto || "",
                contactNumber: result.data.admin?.contactNumber || "",
                isDeleted: result.data.admin?.isDeleted || false,
                createdAt: result.data.admin?.createdAt || null,
                updatedAt: result.data.admin?.updatedAt || null,
            };
        } else if (verifiedToken.role === "USER") {
            userInfo = {
                ...userInfo,
                id: result.data.user?.id || "",
                name: result.data.user?.name || "Unknown User",
                profilePhoto: result.data.user?.profilePhoto || "",
                contactNumber: result.data.user?.contactNumber || "",
                createdAt: result.data.user?.createdAt || null,
                updatedAt: result.data.user?.updatedAt || null,
            };
        }

        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "USER",
        };
    }
};
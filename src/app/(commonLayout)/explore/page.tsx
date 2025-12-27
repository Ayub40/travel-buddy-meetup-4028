import { Suspense } from "react";
import TravelFilters from "@/components/modules/Explore/TravelFilters";
import TravelList from "@/components/modules/Explore/TravelList";
import EmptyState from "@/components/modules/Explore/EmptyState";
import Pagination from "@/components/modules/Explore/Pagination";
import { serverFetch } from "@/lib/server-fetch";

export const dynamic = "force-dynamic";

interface TravelPlan {
    id: string;
    title: string;
    destination: string;
    country: string;
    city?: string;
    travelType: string;
    interests?: string[];
    isVerified?: boolean;
    photos?: string[];
    user?: {
        name: string;
        profileImage?: string;
        country?: string;
        city?: string;
        interests?: string[];
        isVerified?: boolean;
    };
}

async function ExploreContent({
    searchParams,
}: {
    searchParams?: Promise<{
        destination?: string;
        travelType?: string;
        fromDate?: string;
        toDate?: string;
        city?: string;
        country?: string;
        interests?: string;
        page?: string;
        limit?: string;
    }>;
}) {
    const params = (await searchParams) || {};
    const page = Number(params.page || 1);
    const limit = Number(params.limit || 10);

    const filters = {
        destination: params.destination || "",
        travelType: params.travelType || "",
        fromDate: params.fromDate || "",
        toDate: params.toDate || "",
        city: params.city || "",
        country: params.country || "",
        interests: params.interests || "",
    };

    let travelers: TravelPlan[] = [];
    let totalPages = 1;

    try {
        const queryParams = new URLSearchParams({
            ...filters,
            page: page.toString(),
            limit: limit.toString(),
            searchTerm: filters.destination,
        }).toString();

        const response = await serverFetch.get(`/users?${queryParams}`);
        const data = await response.json();

        travelers = data.data || [];
        totalPages = data.meta?.total ? Math.ceil(data.meta.total / limit) : 1;
    } catch (err) {
        console.error("Error fetching travelers:", err);
        travelers = [];
        totalPages = 1;
    }

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Explore Travelers</h2>

            <TravelFilters filters={filters} onChange={() => { }} />

            {travelers.length === 0 ? (
                <EmptyState
                    onReset={() => {
                        /* reset logic if needed */
                    }}
                />
            ) : (
                <>
                    <TravelList travelers={travelers} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={() => { }} />
                </>
            )}
        </div>
    );
}

const ExplorePage = async ({
    searchParams,
}: {
    searchParams?: Promise<Record<string, string>>;
}) => {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading travelers...</div>}>
            <ExploreContent searchParams={searchParams} />
        </Suspense>
    );
};

export default ExplorePage;

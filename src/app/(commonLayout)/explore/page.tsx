/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { serverFetch } from "@/lib/server-fetch";
import TravelFilters from "@/components/modules/Explore/TravelFilters";
import EmptyState from "@/components/modules/Explore/EmptyState";
import TravelList from "@/components/modules/Explore/TravelList";
import Pagination from "@/components/modules/Explore/Pagination";

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

const ExplorePage = () => {
    const [filters, setFilters] = useState({
        destination: "",
        travelType: "",
        fromDate: "",
        toDate: "",
        interests: "",
        city: "",
        country: "",
    });
    const [travelers, setTravelers] = useState<TravelPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    ...filters,
                    page: page.toString(),
                    limit: limit.toString(),
                    searchTerm: filters.destination,
                }).toString();

                const response = await serverFetch.get(`/users?${queryParams}`);
                const data = await response.json();

                setTravelers(data.data || []);
                setTotalPages(data.meta?.total ? Math.ceil(data.meta.total / limit) : 1);
            } catch (err) {
                console.error("Error fetching travelers:", err);
                setTravelers([]);
                setTotalPages(1);
            }
            setLoading(false);
        };

        fetchData();
    }, [filters, page, limit]);

    const handleFiltersChange = (newFilters: any) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page on filter change
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Explore Travelers</h2>

            <TravelFilters filters={filters} onChange={handleFiltersChange} />

            {loading ? (
                <div className="text-center py-20">Loading...</div>
            ) : travelers.length === 0 ? (
                <EmptyState
                    onReset={() =>
                        setFilters({
                            destination: "",
                            travelType: "",
                            fromDate: "",
                            toDate: "",
                            interests: "",
                            city: "",
                            country: "",
                        })
                    }
                />
            ) : (
                <>
                    <TravelList travelers={travelers} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default ExplorePage;

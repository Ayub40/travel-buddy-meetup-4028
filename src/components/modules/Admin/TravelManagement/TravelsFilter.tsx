"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TravelType } from "@/types/travel.interface";
import { useSearchParams, useRouter } from "next/navigation";

const TravelPlansFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleTravelTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            // params.set("travelType", value);
            params.delete("travelType")
        } else {
            // params.delete("travelType");
            params.set("travelType", value);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="space-y-3">
            {/* Row 1: Search and Refresh */}
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search travel plans..." />
                <RefreshButton />
            </div>

            {/* Row 2: Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Destination Filter */}
                <SearchFilter paramName="destination" placeholder="Destination" />

                {/* Country Filter */}
                <SearchFilter paramName="country" placeholder="Country" />

                {/* Travel Type Filter */}
                <Select
                    value={searchParams.get("travelType") || ""}
                    onValueChange={handleTravelTypeChange}
                >
                    <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="Travel Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value={TravelType.SOLO}>Solo</SelectItem>
                        <SelectItem value={TravelType.FAMILY}>FAMILY</SelectItem>
                        <SelectItem value={TravelType.FRIENDS}>FRIENDS</SelectItem>
                    </SelectContent>
                </Select>

                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default TravelPlansFilter;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TravelCard from "@/components/modules/Travel/TravelCard";

interface Props {
    travelers: any[];
}

const TravelList = ({ travelers }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
            {travelers.map((traveler) => (
                <TravelCard key={traveler.id} plan={traveler} />
            ))}
        </div>
    );
};

export default TravelList;

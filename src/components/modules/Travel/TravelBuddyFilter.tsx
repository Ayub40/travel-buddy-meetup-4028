"use client";

import { Dispatch, SetStateAction } from "react";

interface TravelBuddyFilterProps {
    // email: string;
    // setEmail: Dispatch<SetStateAction<string>>;
    destination: string;
    setDestination: Dispatch<SetStateAction<string>>;
    country: string;
    setCountry: Dispatch<SetStateAction<string>>;
    travelType: string;
    setTravelType: Dispatch<SetStateAction<string>>;
    fromDate: string;
    setFromDate: Dispatch<SetStateAction<string>>;
    toDate: string;
    setToDate: Dispatch<SetStateAction<string>>;
    onClear: () => void;
}

const TravelBuddyFilter = ({
    destination, setDestination,
    country, setCountry,
    travelType, setTravelType,
    fromDate, setFromDate,
    // toDate, setToDate,
    onClear,
}: TravelBuddyFilterProps) => {
    return (
        <div className="flex flex-wrap gap-3 mb-4">
            <input
                type="text"
                placeholder="Destination"
                className="border rounded px-2 py-1"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <input
                type="text"
                placeholder="Country"
                className="border rounded px-2 py-1"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <select
                className="border rounded px-2 py-1"
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
            >
                <option value="">All Travel Types</option>
                <option value="SOLO">Solo</option>
                <option value="FAMILY">Family</option>
                <option value="FRIENDS">Friends</option>
            </select>
            <input
                type="date"
                className="border rounded px-2 py-1"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="From date"
            />
            {/* <input
                type="date"
                className="border rounded px-2 py-1"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="To date"
            /> */}
            <button
                className="bg-gray-200 px-3 rounded hover:bg-gray-300"
                onClick={onClear}
            >
                Clear Filters
            </button>
        </div>
    );
};

export default TravelBuddyFilter;

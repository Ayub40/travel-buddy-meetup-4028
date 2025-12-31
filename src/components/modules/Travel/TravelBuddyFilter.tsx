"use client";

import { Dispatch, SetStateAction } from "react";
import { Search, Map, Globe, Plane, Calendar, XCircle } from "lucide-react";

interface TravelBuddyFilterProps {
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
    onClear,
}: TravelBuddyFilterProps) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl shadow-md border border-gray-100 dark:border-slate-800 mb-8 mt-6">
            <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Search size={20} />
                <h3 className="font-bold uppercase tracking-widest text-sm">Search Your Buddy</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Destination */}
                <div className="relative group">
                    <Map size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Destination (Place)"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-blue-50/50 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>

                {/* Country */}
                <div className="relative group">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Country"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-pink-50/50 border-none focus:ring-2 focus:ring-pink-500 transition-all outline-none text-sm font-medium"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                {/* Travel Type */}
                <div className="relative group">
                    <Plane size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors pointer-events-none" />
                    <select
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-purple-50/50 border-none focus:ring-2 focus:ring-purple-500 transition-all outline-none text-sm font-medium appearance-none"
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="SOLO">Solo</option>
                        <option value="FAMILY">Family</option>
                        <option value="FRIENDS">Friends</option>
                    </select>
                </div>

                {/* From Date */}
                <div className="relative group">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-green-50/50 border-none focus:ring-2 focus:ring-green-500 transition-all outline-none text-sm font-medium"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                {/* Clear Button */}
                <button
                    onClick={onClear}
                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-red-200 active:scale-95"
                >
                    <XCircle size={18} />
                    <span className="text-sm">Reset</span>
                </button>
            </div>
        </div>
    );
};

export default TravelBuddyFilter;

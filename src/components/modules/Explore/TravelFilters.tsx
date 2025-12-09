/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Props {
    filters: any;
    onChange: (filters: any) => void;
}

const TravelFilters = ({ filters, onChange }: Props) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={filters.destination}
                onChange={handleInputChange}
                className="input input-bordered w-full"
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={filters.city}
                onChange={handleInputChange}
                className="input input-bordered w-full"
            />
            <input
                type="text"
                name="country"
                placeholder="Country"
                value={filters.country}
                onChange={handleInputChange}
                className="input input-bordered w-full"
            />
            <select
                name="travelType"
                value={filters.travelType}
                onChange={handleInputChange}
                className="input input-bordered w-full"
            >
                <option value="">All Travel Types</option>
                <option value="SOLO">Solo</option>
                <option value="FAMILY">Family</option>
                <option value="FRIENDS">Friends</option>
            </select>
            <input
                type="text"
                name="interests"
                placeholder="Interests"
                value={filters.interests}
                onChange={handleInputChange}
                className="input input-bordered w-full col-span-2"
            />
            <button
                className="btn btn-primary"
                onClick={() => onChange(filters)}
            >
                Search / Find Buddy
            </button>
        </div>
    );
};

export default TravelFilters;

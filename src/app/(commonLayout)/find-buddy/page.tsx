"use client";

import { useCallback, useEffect, useState } from "react";
import { ITravelPlan } from "@/types/travel.interface";
import { matchTravelPlans } from "@/service/admin/travelPlanManagement";
import TablePagination from "@/components/shared/TablePagination";
import { useSearchParams } from "next/navigation";
import TravelBuddyFilter from "@/components/modules/Travel/TravelBuddyFilter";
import TravelBuddyCard from "@/components/modules/Travel/TravelBuddyCard";

const FindTravelBuddy = () => {
    const searchParams = useSearchParams();
    const currentPageParam = Number(searchParams.get("page") || 1);
    const limitParam = Number(searchParams.get("limit") || 5);

    const [travelPlans, setTravelPlans] = useState<ITravelPlan[]>([]);
    const [loading, setLoading] = useState(true);

    // const [email, setEmail] = useState("");
    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [travelType, setTravelType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [totalPages, setTotalPages] = useState(1);

    const fetchPlans = useCallback(async () => {
        setLoading(true);

        const queryParams = new URLSearchParams();
        // if (email) queryParams.set("email", email);
        if (destination) queryParams.set("destination", destination);
        if (country) queryParams.set("country", country);
        if (travelType) queryParams.set("travelType", travelType);
        if (fromDate) queryParams.set("startDate", fromDate);
        if (toDate) queryParams.set("endDate", toDate);
        queryParams.set("page", currentPageParam.toString());
        queryParams.set("limit", limitParam.toString());

        const result = await matchTravelPlans(queryParams.toString());

        if (result.success) {
            setTravelPlans(result.data.data);
            const total = result.data.meta?.total || 1;
            const limit = result.data.meta?.limit || 5;
            setTotalPages(Math.ceil(total / limit));
        } else {
            setTravelPlans([]);
            setTotalPages(1);
            console.error(result.message);
        }

        setLoading(false);
    }, [destination, country, travelType, fromDate, toDate, currentPageParam, limitParam]);

    // useEffect(() => {
    //     fetchPlans();
    // }, [fetchPlans]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPlans();
        }, 0);

        return () => clearTimeout(timer);
    }, [fetchPlans]);

    return (
        <div className="space-y-4 container mx-auto mt-5">
            <TravelBuddyFilter
                // email={email} setEmail={setEmail}
                destination={destination} setDestination={setDestination}
                country={country} setCountry={setCountry}
                travelType={travelType} setTravelType={setTravelType}
                fromDate={fromDate} setFromDate={setFromDate}
                toDate={toDate} setToDate={setToDate}
                onClear={() => {
                    setDestination(""); setCountry(""); setTravelType("");
                    setFromDate(""); setToDate("");
                }}
            />

            {loading ? (
                <p>Loading...</p>
            ) : travelPlans.length === 0 ? (
                <p>No travel buddies found.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto mb-5">
                        {travelPlans?.map(plan => (
                            <TravelBuddyCard key={plan.id} plan={plan} />
                        ))}
                    </div>

                    <TablePagination
                        currentPage={currentPageParam}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
};

export default FindTravelBuddy;







// "use client";

// import { useCallback, useEffect, useState } from "react";
// // import { matchTravelPlans } from "@/service/travelPlans";
// import { ITravelPlan } from "@/types/travel.interface";
// import { formatDateTime } from "@/lib/formatters";
// import { matchTravelPlans } from "@/service/admin/travelPlanManagement";
// // import { format } from "date-fns";

// interface TravelBuddyCardProps {
//     plan: ITravelPlan;
// }

// const TravelBuddyCard = ({ plan }: TravelBuddyCardProps) => {
//     const handleJoinRequest = () => {
//         alert(`Join request sent to ${plan.user?.name}`);
//     };

//     return (
//         <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col gap-2 mt-5">
//             <h2 className="font-semibold text-lg">{plan.title}</h2>
//             <p>
//                 {/* <strong>Destination:</strong> {plan.destination}, {plan.country} */}
//                 <strong>Destination:</strong> {plan.destination}
//             </p>
//             <p>
//                 <strong>Country:</strong> {plan.country}
//             </p>
//             <p>
//                 <strong>Date:</strong>{" "}
//                 {/* {plan.startDate ? formatDateTime(new Date(plan.startDate), "dd MMM yyyy") : "-"} */}
//                 {plan.startDate ? formatDateTime(new Date(plan.startDate)) : "-"}
//             </p>
//             <p>
//                 <strong>Budget:</strong> {plan.budget ? `৳${plan.budget}` : "-"}
//             </p>
//             <p>
//                 <strong>Traveler:</strong> {plan.user?.name}
//             </p>
//             <p>
//                 <strong>Traveler Type:</strong> {plan.travelType}
//             </p>
//             <button
//                 onClick={handleJoinRequest}
//                 className="mt-2 bg-primary text-white py-1 px-3 rounded hover:bg-primary/80"
//             >
//                 Send Join Request
//             </button>
//         </div>
//     );
// };

// const FindTravelBuddy = () => {
//     const [travelPlans, setTravelPlans] = useState<ITravelPlan[]>([]);
//     const [loading, setLoading] = useState(true);

//     const [destination, setDestination] = useState("");
//     const [country, setCountry] = useState("");
//     const [travelType, setTravelType] = useState("");
//     // const [startDate, setStartDate] = useState("");

//     // New code
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");



//     const fetchPlans = useCallback(async () => {
//         setLoading(true);

//         const queryParams = new URLSearchParams();
//         if (destination) queryParams.set("destination", destination);
//         if (country) queryParams.set("country", country);
//         if (travelType) queryParams.set("travelType", travelType);
//         // if (startDate) queryParams.set("startDate", startDate);
//         if (fromDate) queryParams.set("startDate", fromDate); // <-- backend name
//         if (toDate) queryParams.set("endDate", toDate);       // <-- backend name


//         const result = await matchTravelPlans(queryParams.toString());

//         if (result.success) {
//             setTravelPlans(result.data.data);
//         } else {
//             setTravelPlans([]);
//             console.error(result.message);
//         }

//         setLoading(false);
//         // }, [destination, country, travelType, startDate]);
//     }, [destination, country, travelType, fromDate, toDate]);


//     useEffect(() => {
//         const timer = setTimeout(() => {
//             fetchPlans();
//         }, 0);

//         return () => clearTimeout(timer);
//     }, [fetchPlans]);



//     // useEffect(() => {
//     //     fetchPlans();
//     // }, [destination, country, travelType, startDate]);

//     return (
//         <div className="space-y-4 container mx-auto mt-5">
//             {/* Filters */}
//             <div className="flex flex-wrap gap-3">
//                 <input
//                     type="text"
//                     placeholder="Destination"
//                     className="border rounded px-2 py-1"
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Country"
//                     className="border rounded px-2 py-1"
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                 />
//                 <select
//                     className="border rounded px-2 py-1"
//                     value={travelType}
//                     onChange={(e) => setTravelType(e.target.value)}
//                 >
//                     <option value="">All Travel Types</option>
//                     <option value="SOLO">Solo</option>
//                     <option value="FAMILY">Family</option>
//                     <option value="FRIENDS">Friends</option>
//                 </select>
//                 {/* <input
//                     type="date"
//                     className="border rounded px-2 py-1"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                 /> */}
//                 <input
//                     type="date"
//                     className="border rounded px-2 py-1"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     placeholder="From date"
//                 />

//                 <input
//                     type="date"
//                     className="border rounded px-2 py-1"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                     placeholder="To date"
//                 />

//                 <button
//                     className="bg-gray-200 px-3 rounded hover:bg-gray-300"
//                     onClick={() => {
//                         setDestination("");
//                         setCountry("");
//                         setTravelType("");
//                         // setStartDate("");
//                         setFromDate("");
//                         setToDate("");

//                     }}
//                 >
//                     Clear Filters
//                 </button>
//             </div>

//             {/* Travel Plans */}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : travelPlans.length === 0 ? (
//                 <p>No travel buddies found.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto">
//                     {travelPlans.map((plan) => (
//                         <TravelBuddyCard key={plan.id} plan={plan} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FindTravelBuddy;

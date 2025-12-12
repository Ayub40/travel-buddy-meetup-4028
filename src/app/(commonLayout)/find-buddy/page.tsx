// import TravelBuddyFilter from "@/components/modules/Travel/TravelBuddyFilter";
// import TravelBuddyCard from "@/components/modules/Travel/TravelBuddyCard";
// import TablePagination from "@/components/shared/TablePagination";
// import { matchTravelPlans } from "@/service/admin/travelPlanManagement";
// import { Suspense } from "react";
// import { ITravelPlan } from "@/types/travel.interface";

// export const dynamic = "force-dynamic";

// async function TravelBuddyContent({ searchParams }: { searchParams?: { page?: string; limit?: string } }) {
//     const params = searchParams || {};
//     const currentPage = Number(params.page || 1);
//     const limit = Number(params.limit || 5);

//     // initial fetch
//     const queryParams = new URLSearchParams();
//     queryParams.set("page", currentPage.toString());
//     queryParams.set("limit", limit.toString());

//     const result = await matchTravelPlans(queryParams.toString());
//     const travelPlans: ITravelPlan[] = result.success ? result.data.data : [];
//     const total = result.data?.meta?.total || 1;
//     const totalPages = Math.ceil(total / (result.data?.meta?.limit || limit));

//     return (
//         <div className="space-y-4 container mx-auto mt-5">
//             {/* Filters */}
//             <TravelBuddyFilter
//                 destination="" setDestination={() => { }}
//                 country="" setCountry={() => { }}
//                 travelType="" setTravelType={() => { }}
//                 fromDate="" setFromDate={() => { }}
//                 toDate="" setToDate={() => { }}
//                 onClear={() => { }}
//             />

//             {travelPlans.length === 0 ? (
//                 <p>No travel buddies found.</p>
//             ) : (
//                 <div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto mb-5">
//                         {travelPlans.map(plan => (
//                             <TravelBuddyCard key={plan.id} plan={plan} />
//                         ))}
//                     </div>
//                     <TablePagination currentPage={currentPage} totalPages={totalPages} />
//                 </div>
//             )}
//         </div>
//     );
// }

// const FindBuddyPage = async ({ searchParams }: { searchParams?: Promise<{ page?: string; limit?: string }> }) => {
//     const params = (await searchParams) || {};
//     return (
//         <div>
//             <Suspense fallback={<p>Loading travel buddies...</p>}>
//                 <TravelBuddyContent searchParams={params} />
//             </Suspense>
//         </div>
//     );
// };

// export default FindBuddyPage;














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

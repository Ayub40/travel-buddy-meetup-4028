import { getMyTravelPlans } from "@/service/admin/travelPlanManagement";
import TravelPlansTable from "@/components/modules/Admin/TravelManagement/TravelsTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Suspense } from "react";
import TravelPlanManagementHeader from "@/components/modules/Admin/TravelManagement/TravelsManagementHeader";

const MyTravelPlansPage = async () => {
    const travelPlansResult = await getMyTravelPlans();

    return (
        <div className="space-y-6">
            <TravelPlanManagementHeader />
            <h1 className="text-2xl font-bold">My Travel Plans</h1>

            <Suspense fallback={<TableSkeleton columns={7} rows={5} />}>
                <TravelPlansTable travelPlans={travelPlansResult?.data || []} />
            </Suspense>
        </div>
    );
};

export default MyTravelPlansPage;


// <div className="space-y-6">
//     {/* Header */}
//     <TravelPlanManagementHeader />

//     {/* Filters */}
//     <TravelPlansFilter />

//     {/* Table + Pagination */}
//     <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
//         <TravelPlansTable travelPlans={travelPlansResult?.data || []} />
//         <TablePagination
//             currentPage={travelPlansResult?.meta?.page || 1}
//             totalPages={totalPages || 1}
//         />
//     </Suspense>
// </div>

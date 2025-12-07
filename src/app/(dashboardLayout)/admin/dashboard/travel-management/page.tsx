import TravelPlansFilter from "@/components/modules/Admin/TravelManagement/TravelsFilter";
import TravelPlanManagementHeader from "@/components/modules/Admin/TravelManagement/TravelsManagementHeader";
import TravelPlansTable from "@/components/modules/Admin/TravelManagement/TravelsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTravelPlans } from "@/service/admin/travelPlanManagement";
import { Suspense } from "react";

const TravelPlanManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const travelPlansResult = await getAllTravelPlans(queryString);
    console.log(travelPlansResult);

    const totalPages = Math.ceil(
        (travelPlansResult?.meta?.total || 1) /
        (travelPlansResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <TravelPlanManagementHeader />

            {/* Filters */}
            <TravelPlansFilter />

            {/* Table + Pagination */}
            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <TravelPlansTable travelPlans={travelPlansResult?.data?.data || []} />
                <TablePagination
                    currentPage={travelPlansResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TravelPlanManagementPage;

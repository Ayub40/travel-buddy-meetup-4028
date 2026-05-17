import { Suspense } from "react";
import TravelPlansFilter from "@/components/modules/Admin/TravelManagement/TravelsFilter";
import TravelPlanManagementHeader from "@/components/modules/Admin/TravelManagement/TravelsManagementHeader";
import TravelPlansTable from "@/components/modules/Admin/TravelManagement/TravelsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTravelPlans } from "@/service/admin/travelPlanManagement";

export const dynamic = "force-dynamic";

async function TravelPlanManagementContent({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = (await searchParams) || {};
    const queryString = queryStringFormatter(params);

    const travelPlansResult = await getAllTravelPlans(queryString);

    const totalPages = Math.ceil(
        (travelPlansResult?.meta?.total || 1) /
        (travelPlansResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
          
            <TravelPlanManagementHeader />

        
            <TravelPlansFilter />

           
            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <TravelPlansTable travelPlans={travelPlansResult?.data || []} />
                <TablePagination
                    currentPage={travelPlansResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
}

const TravelPlanManagementPage = async ({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    return <TravelPlanManagementContent searchParams={searchParams} />;
};

export default TravelPlanManagementPage;

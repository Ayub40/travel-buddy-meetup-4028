/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTravelPlans } from "@/service/admin/travelPlanManagement";
import { queryStringFormatter } from "@/lib/formatters";
import TravelCard from "@/components/modules/Travel/TravelCard";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import TablePagination from "@/components/shared/TablePagination";


export const dynamic = "force-dynamic";

async function PlansContent({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const queryString = queryStringFormatter(resolvedParams);
    const travelPlansResult = await getAllTravelPlans(queryString);
    const travelPlans = travelPlansResult?.data || [];

    const totalPages = Math.ceil(
        (travelPlansResult?.meta?.total || 1) / (travelPlansResult?.meta?.limit || 1)
    );

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Explore All Travel Plans
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-5">
                {travelPlans.map((plan: any) => (
                    <TravelCard key={plan.id} plan={plan} />
                ))}
            </div>

            {/* Table + Pagination */}
            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <TablePagination
                    currentPage={travelPlansResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
}

export default function PlansPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    return <PlansContent searchParams={props.searchParams} />;
}

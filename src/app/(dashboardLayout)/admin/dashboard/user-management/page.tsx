import UsersFilter from "@/components/modules/Admin/UsersManagement/UsersFilter";
import UsersTable from "@/components/modules/Admin/UsersManagement/UsersTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getUsers } from "@/service/admin/userManagement";
// import { getUsers } from "@/services/admin/usersManagement";
import { Suspense } from "react";

const AdminUsersManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const usersResult = await getUsers(queryString);

    const totalPages = Math.ceil(
        (usersResult?.meta?.total || 1) / (usersResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <ManagementPageHeader
                title="Users Management"
                description="Manage users information and details"
            />

            {/* Search, Filters */}
            <UsersFilter />

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <UsersTable users={usersResult?.data || []} />
                <TablePagination
                    currentPage={usersResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminUsersManagementPage;

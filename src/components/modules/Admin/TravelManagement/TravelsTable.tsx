"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteTravelPlan } from "@/service/admin/travelPlanManagement";
import { ITravelPlan } from "@/types/travel.interface";
// import {
//     deleteTravelPlan,
// } from "@/service/travelPlan/travelPlanManagement";
// import { ITravelPlan } from "@/types/travelPlan.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { travelPlanColumns } from "./travelsColumn";
import TravelPlanFormDialog from "./TravelFormDialog";
import TravelPlanViewDialog from "./TravelViewDetailDialog";

// import { travelPlanColumns } from "./travelPlanColumns";
// import TravelPlanFormDialog from "./TravelPlanFormDialog";
// import TravelPlanViewDialog from "./TravelPlanViewDialog";

interface TravelPlansTableProps {
    travelPlans: ITravelPlan[];
}

const TravelPlansTable = ({ travelPlans }: TravelPlansTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [deletingPlan, setDeletingPlan] = useState<ITravelPlan | null>(null);
    const [viewingPlan, setViewingPlan] = useState<ITravelPlan | null>(null);
    const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    /** Refresh table */
    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    /** View travel plan */
    const handleView = (plan: ITravelPlan) => {
        setViewingPlan(plan);
    };

    /** Edit travel plan */
    const handleEdit = (plan: ITravelPlan) => {
        setEditingPlan(plan);
    };

    /** Delete travel plan */
    const handleDelete = (plan: ITravelPlan) => {
        setDeletingPlan(plan);
    };

    /** Confirm delete action */
    const confirmDelete = async () => {
        if (!deletingPlan) return;

        setIsDeleting(true);
        const result = await deleteTravelPlan(deletingPlan.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Travel plan deleted successfully");
            setDeletingPlan(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete travel plan");
        }
    };

    return (
        <>
            <ManagementTable
                data={travelPlans}
                columns={travelPlanColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(plan) => plan.id!}
                emptyMessage="No travel plans found"
            />

            {/* Edit Form Dialog */}
            <TravelPlanFormDialog
                open={!!editingPlan}
                onClose={() => setEditingPlan(null)}
                travelPlan={editingPlan!}
                onSuccess={() => {
                    setEditingPlan(null);
                    handleRefresh();
                }}
            />

            {/* View Detail Dialog */}
            <TravelPlanViewDialog
                open={!!viewingPlan}
                onClose={() => setViewingPlan(null)}
                travelPlan={viewingPlan}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingPlan}
                onOpenChange={(open) => !open && setDeletingPlan(null)}
                onConfirm={confirmDelete}
                title="Delete Travel Plan"
                description={`Are you sure you want to delete "${deletingPlan?.title}"? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default TravelPlansTable;

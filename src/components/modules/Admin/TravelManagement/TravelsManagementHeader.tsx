"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import TravelPlanFormDialog from "./TravelFormDialog";
// import TravelPlanFormDialog from "./TravelPlanFormDialog";

const TravelPlanManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Refresh page after create/update success
    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    // Force re-mount for resetting form state
    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            {/* Create/Update TravelPlan Dialog */}
            <TravelPlanFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            {/* Header */}
            <ManagementPageHeader
                title="Travel Plan Management"
                description="Manage all travel plans, visibility and details"
                action={{
                    label: "Add Travel Plan",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default TravelPlanManagementHeader;

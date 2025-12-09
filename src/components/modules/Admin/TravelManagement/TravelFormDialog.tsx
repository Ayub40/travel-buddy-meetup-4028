"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTravelPlanAdmin, updateTravelPlanAdmin } from "@/service/admin/travelPlanManagement";
import { ITravelPlan, TravelType } from "@/types/travel.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";


interface ITravelPlanFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    travelPlan?: ITravelPlan;
}

const TravelPlanFormDialog = ({ open, onClose, onSuccess, travelPlan }: ITravelPlanFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!travelPlan?.id;
    // console.log(travelPlan);

    const [state, formAction, isPending] = useActionState(
        isEdit ? updateTravelPlanAdmin.bind(null, travelPlan?.id as string) : createTravelPlanAdmin,
        null
    );

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setSelectedFiles(files);
    };


    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Operation successful");
            if (formRef.current) formRef.current.reset();
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);

            // Restore selected files after error
            if (selectedFiles.length && fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                selectedFiles.forEach(file => dataTransfer.items.add(file));
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    }, [state, onSuccess, onClose, selectedFiles]);

    const handleClose = () => {
        setSelectedFiles([]);
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Edit Travel Plan" : "Add New Travel Plan"}</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Trip to Cox's Bazar"
                                defaultValue={state?.formData?.title || travelPlan?.title || ""}
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Destination */}
                        <Field>
                            <FieldLabel htmlFor="destination">Destination</FieldLabel>
                            <Input
                                id="destination"
                                name="destination"
                                placeholder="Cox's Bazar"
                                defaultValue={state?.formData?.destination || travelPlan?.destination || ""}
                            />
                            <InputFieldError field="destination" state={state} />
                        </Field>

                        {/* Country */}
                        <Field>
                            <FieldLabel htmlFor="country">Country</FieldLabel>
                            <Input
                                id="country"
                                name="country"
                                placeholder="Bangladesh"
                                defaultValue={state?.formData?.country || travelPlan?.country || ""}
                            />
                            <InputFieldError field="country" state={state} />
                        </Field>

                        {/* Start Date */}
                        <Field>
                            <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                defaultValue={state?.formData?.startDate || travelPlan?.startDate || ""}
                            />
                            <InputFieldError field="startDate" state={state} />
                        </Field>

                        {/* End Date */}
                        <Field>
                            <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                            <Input
                                id="endDate"
                                name="endDate"
                                type="date"
                                defaultValue={state?.formData?.endDate || travelPlan?.endDate || ""}
                            />
                            <InputFieldError field="endDate" state={state} />
                        </Field>

                        {/* Budget */}
                        <Field>
                            <FieldLabel htmlFor="budget">Budget</FieldLabel>
                            <Input
                                id="budget"
                                name="budget"
                                type="number"
                                placeholder="15000"
                                defaultValue={state?.formData?.budget || travelPlan?.budget || ""}
                            />
                            <InputFieldError field="budget" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Trip description"
                                defaultValue={state?.formData?.description || travelPlan?.description || ""}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Travel Type */}
                        <Field>
                            <FieldLabel htmlFor="travelType">Travel Type</FieldLabel>
                            <Select
                                name="travelType"
                                defaultValue={state?.formData?.travelType || travelPlan?.travelType || TravelType.SOLO}
                            >
                                <SelectTrigger className="w-full h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(TravelType).map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputFieldError field="travelType" state={state} />
                        </Field>

                        {/* Visibility */}
                        <Field>
                            <FieldLabel htmlFor="visibility">Visibility</FieldLabel>
                            <Select
                                name="visibility"
                                defaultValue={(travelPlan?.visibility ?? true).toString()}
                            >
                                <SelectTrigger className="w-full h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Visible</SelectItem>
                                    <SelectItem value="false">Hidden</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputFieldError field="visibility" state={state} />
                        </Field>

                        {/* Photos */}
                        <Field>
                            <FieldLabel htmlFor="photos">Photos</FieldLabel>
                            {selectedFiles.length > 0 && (
                                <div className="flex gap-2 mb-2">
                                    {selectedFiles.map((file, idx) => (
                                        <Image
                                            key={idx}
                                            src={URL.createObjectURL(file)}
                                            alt={`Photo Preview ${idx}`}
                                            width={50}
                                            height={50}
                                            className="rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                            <Input
                                ref={fileInputRef}
                                id="photos"
                                name="photos"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                            <InputFieldError field="photos" state={state} />
                        </Field>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Saving..."
                                : isEdit
                                    ? "Update Travel Plan"
                                    : "Create Travel Plan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TravelPlanFormDialog;

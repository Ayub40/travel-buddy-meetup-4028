"use client";

import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { ITravelPlan } from "@/types/travel.interface";
// import { ITravelPlan } from "@/types/travelPlan.interface";
import { Calendar, MapPin, Globe2, Camera, User, DollarSign } from "lucide-react";
import Image from "next/image";

interface ITravelPlanViewDialogProps {
    open: boolean;
    onClose: () => void;
    travelPlan: ITravelPlan | null;
}

const TravelPlanViewDialog = ({
    open,
    onClose,
    travelPlan,
}: ITravelPlanViewDialogProps) => {
    if (!travelPlan) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Travel Plan Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">

                    {/* Header: Plan Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage
                                src={travelPlan?.photos?.[0] || ""}
                                alt={travelPlan?.title}
                            />
                            <AvatarFallback className="text-2xl">
                                <Camera className="h-6 w-6" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">{travelPlan?.title}</h2>

                            <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                                <MapPin className="h-4 w-4" />
                                {travelPlan.destination}, {travelPlan.country}
                            </p>

                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <Badge className="text-sm">{travelPlan.travelType}</Badge>

                                <Badge
                                    variant={travelPlan.visibility ? "default" : "secondary"}
                                    className="text-sm"
                                >
                                    {travelPlan.visibility ? "Public" : "Private"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* Basic Travel Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Globe2 className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Travel Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Start Date"
                                        value={formatDateTime(travelPlan?.startDate)}
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="End Date"
                                        value={formatDateTime(travelPlan?.endDate)}
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Budget"
                                        value={
                                            travelPlan?.budget
                                                ? `$${travelPlan.budget}`
                                                : "Not provided"
                                        }
                                    />
                                </div>

                                {/* <div className="flex items-start gap-3">
                                    <Camera className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Photos"
                                        value={`${travelPlan?.photos?.length || 0} photos`}
                                    />
                                </div> */}

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start gap-3">
                                        <Camera className="h-4 w-4 mt-1 text-muted-foreground" />
                                        <InfoRow
                                            label="Photos"
                                            value={`${travelPlan?.photos?.length || 0} photos`}
                                        />
                                    </div>

                                    {/* Photos preview */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {travelPlan?.photos?.map((photoUrl, idx) => (
                                            <div key={idx} className="relative h-20 w-20">
                                                <Image
                                                    src={photoUrl}
                                                    alt={`Photo ${idx + 1}`}
                                                    fill
                                                    className="object-cover rounded-md border"
                                                    sizes="80px"
                                                    priority={idx === 0}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Separator />

                        {/* User Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg">Created By</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="User Name"
                                        value={travelPlan?.user?.name || "Unknown User"}
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Email"
                                        value={travelPlan?.user?.email || "Unknown Email"}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Description Section */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Description</h3>
                            <p className="bg-muted/50 p-4 rounded-lg leading-relaxed">
                                {travelPlan?.description || "No description provided"}
                            </p>
                        </div>

                        <Separator />

                        {/* Meta / Timestamps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow
                                label="Created At"
                                value={formatDateTime(travelPlan?.createdAt || "")}
                            />

                            <InfoRow
                                label="Plan ID"
                                value={travelPlan?.id || "Unknown"}
                            />
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TravelPlanViewDialog;

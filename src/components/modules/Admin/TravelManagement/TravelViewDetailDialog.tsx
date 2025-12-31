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
import { formatDateTime } from "@/lib/formatters";
import { ITravelPlan } from "@/types/travel.interface";
import { Calendar, MapPin, Globe2, Camera, User, ShieldCheck, Info } from "lucide-react";
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
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl">

                <DialogHeader className="px-8 pt-8 pb-4 bg-white border-b">
                    <DialogTitle className="text-2xl font-black text-slate-800 flex items-center gap-2">
                        <Globe2 className="h-6 w-6 text-indigo-600" />
                        Detailed Travel Itinerary
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 mt-4">

                    {/* --- Hero Section: Plan Main Info --- */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-linear-to-br from-indigo-50/50 to-purple-50/50 rounded-[2.5rem] border border-indigo-100/50">
                        <div className="relative h-40 w-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                            <Image
                                src={travelPlan?.photos?.[0] || ""}
                                alt={travelPlan?.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 leading-tight">{travelPlan?.title}</h2>
                                <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                                    <MapPin className="h-4 w-4 text-rose-500" />
                                    {travelPlan.destination}, {travelPlan.country || "Global"}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <Badge className="bg-white text-indigo-700 hover:bg-white border border-indigo-100 px-4 py-1 rounded-full font-bold shadow-sm">
                                    {travelPlan.travelType}
                                </Badge>
                                {travelPlan.budget && (
                                    <Badge className="bg-emerald-500 text-white px-4 py-1 rounded-full font-bold">
                                        Budget: ${travelPlan.budget}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- Content Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Travel Info Card */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 px-2">
                                <Calendar className="h-5 w-5 text-indigo-600" />
                                <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">Timeline & Cost</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                                <InfoRow
                                    label="Start Date"
                                    value={formatDateTime(travelPlan?.startDate)}
                                />
                                <Separator className="bg-slate-100" />
                                <InfoRow
                                    label="End Date"
                                    value={formatDateTime(travelPlan?.endDate)}
                                />
                                <Separator className="bg-slate-100" />
                                <InfoRow
                                    label="Estimated Budget"
                                    value={travelPlan?.budget ? `$${travelPlan.budget}` : "Flexible"}
                                />
                            </div>
                        </div>

                        {/* Organizer Info Card */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 px-2">
                                <User className="h-5 w-5 text-emerald-600" />
                                <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">Organizer Details</h3>
                            </div>

                            <div className="flex flex-col gap-4 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                                <div className="flex items-center gap-4 mb-2">
                                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                        <AvatarImage src={travelPlan?.user?.profileImage} />
                                        <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold">
                                            {travelPlan?.user?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-black text-slate-900 leading-none">{travelPlan?.user?.name || "Member"}</p>
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 mt-1">
                                            <ShieldCheck size={12} /> Verified Traveler
                                        </span>
                                    </div>
                                </div>
                                <Separator className="bg-slate-100" />
                                <InfoRow label="Email Address" value={travelPlan?.user?.email || "N/A"} />
                            </div>
                        </div>
                    </div>

                    {/* --- Description --- */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-2">
                            <Info className="h-5 w-5 text-amber-500" />
                            <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">Plan Description</h3>
                        </div>
                        <div className="bg-slate-900 text-slate-100 p-8 rounded-[2rem] shadow-inner leading-relaxed italic font-medium">
                            "{travelPlan?.description || "No description provided for this trip."}"
                        </div>
                    </div>

                    {/* --- Photos Gallery --- */}
                    {travelPlan?.photos && travelPlan.photos.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-2">
                                <Camera className="h-5 w-5 text-rose-500" />
                                <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">Gallery</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {travelPlan?.photos?.map((photoUrl, idx) => (
                                    <div key={idx} className="relative h-28 w-full group overflow-hidden rounded-2xl border-2 border-slate-100 shadow-sm transition-all hover:border-indigo-400">
                                        <Image
                                            src={photoUrl}
                                            alt={`Trip photo ${idx + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Metadata Footer --- */}
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <span>Created: {formatDateTime(travelPlan?.createdAt || "")}</span>
                        <span>Trip ID: {travelPlan?.id?.slice(-8)}</span>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TravelPlanViewDialog;











// "use client";

// import InfoRow from "@/components/shared/InoRow";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { formatDateTime, getInitials } from "@/lib/formatters";
// import { ITravelPlan } from "@/types/travel.interface";
// import { Calendar, MapPin, Globe2, Camera, User, DollarSign } from "lucide-react";
// import Image from "next/image";

// interface ITravelPlanViewDialogProps {
//     open: boolean;
//     onClose: () => void;
//     travelPlan: ITravelPlan | null;
// }

// const TravelPlanViewDialog = ({
//     open,
//     onClose,
//     travelPlan,
// }: ITravelPlanViewDialogProps) => {
//     if (!travelPlan) return null;

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
//                 <DialogHeader className="px-6 pt-6 pb-4">
//                     <DialogTitle>Travel Plan Details</DialogTitle>
//                 </DialogHeader>

//                 <div className="flex-1 overflow-y-auto px-6 pb-6">

//                     {/* Header: Plan Info */}
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
//                         <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
//                             <AvatarImage
//                                 src={travelPlan?.photos?.[0] || ""}
//                                 alt={travelPlan?.title}
//                             />
//                             <AvatarFallback className="text-2xl">
//                                 <Camera className="h-6 w-6" />
//                             </AvatarFallback>
//                         </Avatar>

//                         <div className="flex-1 text-center sm:text-left">
//                             <h2 className="text-3xl font-bold mb-1">{travelPlan?.title}</h2>

//                             <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
//                                 <MapPin className="h-4 w-4" />
//                                 {travelPlan.destination}, {travelPlan.country}
//                             </p>

//                             <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//                                 <Badge className="text-sm">{travelPlan.travelType}</Badge>

//                                 <Badge
//                                     variant={travelPlan.visibility ? "default" : "secondary"}
//                                     className="text-sm"
//                                 >
//                                     {travelPlan.visibility ? "Public" : "Private"}
//                                 </Badge>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-6">

//                         {/* Basic Travel Info */}
//                         <div>
//                             <div className="flex items-center gap-2 mb-4">
//                                 <Globe2 className="h-5 w-5 text-blue-600" />
//                                 <h3 className="font-semibold text-lg">Travel Information</h3>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
//                                 <div className="flex items-start gap-3">
//                                     <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
//                                     <InfoRow
//                                         label="Start Date"
//                                         value={formatDateTime(travelPlan?.startDate)}
//                                     />
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
//                                     <InfoRow
//                                         label="End Date"
//                                         value={formatDateTime(travelPlan?.endDate)}
//                                     />
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
//                                     <InfoRow
//                                         label="Budget"
//                                         value={
//                                             travelPlan?.budget
//                                                 ? `$${travelPlan.budget}`
//                                                 : "Not provided"
//                                         }
//                                     />
//                                 </div>

//                                 {/* <div className="flex items-start gap-3">
//                                     <Camera className="h-4 w-4 mt-1 text-muted-foreground" />
//                                     <InfoRow
//                                         label="Photos"
//                                         value={`${travelPlan?.photos?.length || 0} photos`}
//                                     />
//                                 </div> */}

//                                 <div className="flex flex-col gap-2">
//                                     <div className="flex items-start gap-3">
//                                         <Camera className="h-4 w-4 mt-1 text-muted-foreground" />
//                                         <InfoRow
//                                             label="Photos"
//                                             value={`${travelPlan?.photos?.length || 0} photos`}
//                                         />
//                                     </div>

//                                     {/* Photos preview */}
//                                     <div className="flex flex-wrap gap-2 mt-2">
//                                         {travelPlan?.photos?.map((photoUrl, idx) => (
//                                             <div key={idx} className="relative h-20 w-20">
//                                                 <Image
//                                                     src={photoUrl}
//                                                     alt={`Photo ${idx + 1}`}
//                                                     fill
//                                                     className="object-cover rounded-md border"
//                                                     sizes="80px"
//                                                     priority={idx === 0}
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>

//                         <Separator />

//                         {/* User Info */}
//                         <div>
//                             <div className="flex items-center gap-2 mb-4">
//                                 <User className="h-5 w-5 text-green-600" />
//                                 <h3 className="font-semibold text-lg">Created By</h3>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
//                                 <div className="flex items-start gap-3">
//                                     <User className="h-4 w-4 mt-1 text-muted-foreground" />
//                                     <InfoRow
//                                         label="User Name"
//                                         value={travelPlan?.user?.name || "Unknown User"}
//                                     />
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <User className="h-4 w-4 mt-1 text-muted-foreground" />
//                                     <InfoRow
//                                         label="Email"
//                                         value={travelPlan?.user?.email || "Unknown Email"}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         <Separator />

//                         {/* Description Section */}
//                         <div>
//                             <h3 className="font-semibold text-lg mb-2">Description</h3>
//                             <p className="bg-muted/50 p-4 rounded-lg leading-relaxed">
//                                 {travelPlan?.description || "No description provided"}
//                             </p>
//                         </div>

//                         <Separator />

//                         {/* Meta / Timestamps */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
//                             <InfoRow
//                                 label="Created At"
//                                 value={formatDateTime(travelPlan?.createdAt || "")}
//                             />

//                             <InfoRow
//                                 label="Plan ID"
//                                 value={travelPlan?.id || "Unknown"}
//                             />
//                         </div>

//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default TravelPlanViewDialog;

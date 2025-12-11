"use client";

import { formatDateTime } from "@/lib/formatters";
import { sendJoinRequest } from "@/service/admin/travelPlanManagement";
import { ITravelPlan } from "@/types/travel.interface";
import { toast } from "sonner";

export default function TravelBuddyCard({ plan }: { plan: ITravelPlan }) {

    const handleSendRequest = async () => {

        if (!plan.id) {
            toast.error("Do not Find Travel Plan!");
            return;
        }

        const res = await sendJoinRequest(plan.id);

        if (res.success) {
            toast.success("Join request sent successfully!");
        } else {
            toast.error(res.message || "Failed to send request");
        }
    };

    return (

        <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col gap-2 mt-5">
            <h2 className="font-semibold text-lg">{plan.title}</h2>
            <p><strong>Destination:</strong> {plan.destination}</p>
            <p><strong>Country:</strong> {plan.country}</p>
            <p><strong>Date:</strong> {plan.startDate ? formatDateTime(new Date(plan.startDate)) : "-"}</p>
            <p><strong>Budget:</strong> {plan.budget ? `৳${plan.budget}` : "-"}</p>
            <p><strong>Traveler:</strong> {plan.user?.name}</p>
            <p><strong>Email:</strong> {plan.user?.email}</p>
            <p><strong>Traveler Type:</strong> {plan.travelType}</p>
            <button
                onClick={handleSendRequest}
                className="mt-2 bg-primary text-white py-1 px-3 rounded hover:bg-primary/80"
            >
                Send Join Request
            </button>
        </div>
    );
}


// "use client";

// import { ITravelPlan } from "@/types/travel.interface";
// import { formatDateTime } from "@/lib/formatters";

// interface TravelBuddyCardProps {
//     plan: ITravelPlan;
// }

// const TravelBuddyCard = ({ plan }: TravelBuddyCardProps) => {

//     const handleJoinRequest = () => {
//         alert(`Join request sent to ${plan.user?.name}`);
//     };

//     return (
//         <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col gap-2 mt-5">
//             <h2 className="font-semibold text-lg">{plan.title}</h2>
//             <p><strong>Destination:</strong> {plan.destination}</p>
//             <p><strong>Country:</strong> {plan.country}</p>
//             <p><strong>Date:</strong> {plan.startDate ? formatDateTime(new Date(plan.startDate)) : "-"}</p>
//             <p><strong>Budget:</strong> {plan.budget ? `৳${plan.budget}` : "-"}</p>
//             <p><strong>Traveler:</strong> {plan.user?.name}</p>
//             <p><strong>Traveler Type:</strong> {plan.travelType}</p>
//             <button
//                 onClick={handleJoinRequest}
//                 className="mt-2 bg-primary text-white py-1 px-3 rounded hover:bg-primary/80"
//             >
//                 Send Join Request
//             </button>
//         </div>
//     );
// };

// export default TravelBuddyCard;

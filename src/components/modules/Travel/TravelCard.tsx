/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";
// import Link from "next/link";

// export default function TravelCard({ plan }: { plan: any }) {
//     return (
//         <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <div className="w-full h-40 relative mb-3 rounded overflow-hidden">
//                 <Image
//                     src={plan.photos?.[0] || "/placeholder.jpg"}
//                     alt={plan.title}
//                     fill
//                     className="object-cover"
//                 />
//             </div>

//             <h3 className="font-bold text-lg">{plan.title}</h3>
//             <p>{plan.destination}, {plan.country}</p>
//             <p>
//                 {new Date(plan.startDate).toLocaleDateString()} -{" "}
//                 {new Date(plan.endDate).toLocaleDateString()}
//             </p>
//             <Link
//                 href={`/allTravelPlan/travelPlan/${plan.id}`}
//                 className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//                 View Details
//             </Link>
//         </div>
//     );
// }


"use client";

import Image from "next/image";
import Link from "next/link";

interface TravelCardProps {
    plan: any;
}

export default function TravelCard({ plan }: TravelCardProps) {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
                <Image
                    src={plan.photos?.[0] || "/placeholder.jpg"}
                    alt={plan.title}
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="font-bold text-lg">{plan.title}</h3>
            <p>{plan.destination}, {plan.country}</p>
            <p>
                {new Date(plan.startDate).toLocaleDateString()} -{" "}
                {new Date(plan.endDate).toLocaleDateString()}
            </p>
            <Link
                href={`/allTravelPlan/travelPlan/${plan.id}`}
                className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                View Details
            </Link>
        </div>
    );
}

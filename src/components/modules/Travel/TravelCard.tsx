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












// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const TravelCard = ({ plan }: any) => {

//     return (
//         <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all rounded-xl">
//             <CardHeader className="p-0">
//                 <Image
//                     src={plan.photos?.[0] || "/placeholder.jpg"}
//                     alt={plan.title}
//                     width={600}
//                     height={300}
//                     className="w-full h-48 object-cover"
//                 />
//             </CardHeader>

//             <CardContent className="p-4 space-y-2">
//                 <CardTitle className="text-lg font-bold">{plan.title}</CardTitle>

//                 <p className="text-sm text-muted-foreground">
//                     Destination: <span className="font-semibold">{plan.destination}</span>
//                 </p>

//                 <p className="text-sm">
//                     Travel Type:{" "}
//                     <span className="font-semibold capitalize">{plan.travelType}</span>
//                 </p>

//                 <Link
//                     // href={`/plans/${plan.id}`}
//                     href={`/allTravelPlan/travelPlan/${plan.id}`}
//                     className="text-primary font-semibold text-sm hover:underline block mt-2"
//                 >
//                     View Details →
//                 </Link>
//             </CardContent>
//         </Card>
//     );
// };

// export default TravelCard;

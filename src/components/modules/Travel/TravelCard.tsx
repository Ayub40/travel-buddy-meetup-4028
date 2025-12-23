/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TravelCardProps {
    plan: any;
}

export default function TravelCard({ plan }: TravelCardProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group h-full flex flex-col">
                {/* Image Section */}
                <div className="relative w-full h-56 overflow-hidden">
                    <Image
                        src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop"}
                        alt={plan.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Badge for Travel Type */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur-md border-none">
                            {plan.travelType}
                        </Badge>
                        {plan.budget && (
                            <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-md border-none">
                                ${plan.budget}
                            </Badge>
                        )}
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <CardContent className="p-5 flex-grow">
                    <div className="flex items-center gap-1 text-blue-600 mb-2">
                        <MapPin size={14} />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                            {plan.destination}, {plan.country}
                        </span>
                    </div>

                    <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {plan.title}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {plan.description || "Join this amazing journey and explore the hidden gems of this beautiful location with a verified buddy."}
                    </p>

                    <div className="flex items-center justify-between text-gray-600 text-xs border-t pt-4">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-blue-500" />
                            <span>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={14} className="text-blue-500" />
                            <span>{plan.joinRequests?.length || 0} Joined</span>
                        </div>
                    </div>
                </CardContent>

                {/* Footer Section */}
                <CardFooter className="p-5 pt-0">
                    <Link href={`/allTravelPlan/travelPlan/${plan.id}`} className="w-full">
                        <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-all duration-300 group-hover:gap-3">
                            View Details
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}






// "use client";

// import Image from "next/image";
// import Link from "next/link";

// interface TravelCardProps {
//     plan: any;
// }

// export default function TravelCard({ plan }: TravelCardProps) {
//     return (
//         <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TravelCard = ({ plan }: any) => {

    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all rounded-xl">
            <CardHeader className="p-0">
                <Image
                    src={plan.photos?.[0] || "/placeholder.jpg"}
                    alt={plan.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                />
            </CardHeader>

            <CardContent className="p-4 space-y-2">
                <CardTitle className="text-lg font-bold">{plan.title}</CardTitle>

                <p className="text-sm text-muted-foreground">
                    Destination: <span className="font-semibold">{plan.destination}</span>
                </p>

                <p className="text-sm">
                    Travel Type:{" "}
                    <span className="font-semibold capitalize">{plan.travelType}</span>
                </p>

                <Link
                    // href={`/plans/${plan.id}`}
                    href={`/allTravelPlan/travelPlan/${plan.id}`}
                    className="text-primary font-semibold text-sm hover:underline block mt-2"
                >
                    View Details →
                </Link>
            </CardContent>
        </Card>
    );
};

export default TravelCard;

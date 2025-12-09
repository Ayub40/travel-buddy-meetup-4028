/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTravelPlanById } from "@/service/admin/travelPlanManagement";
import Image from "next/image";

const TravelPlanDetailsPage = async ({ params }: any) => {
    // ✅ params unwrap
    const resolvedParams = await params;
    const id = resolvedParams.id;

    console.log("Fetching travel plan ID:", id);

    const result = await getTravelPlanById(id);
    console.log("Travel plan fetch result:", result);

    const plan = result?.data;

    if (!plan) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Travel Plan Not Found
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Cover Image */}
            <div className="w-72 h-72 relative rounded-xl overflow-hidden shadow-lg">
                <Image
                    src={plan.coverImage || plan.photos?.[0] || "/placeholder.jpg"}
                    alt={plan.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Title + Info */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{plan.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <p><strong>Destination:</strong> {plan.destination}</p>
                    <p><strong>Travel Type:</strong> {plan.travelType}</p>
                    <p><strong>Start Date:</strong> {plan.startDate}</p>
                    <p><strong>End Date:</strong> {plan.endDate}</p>
                </div>
            </div>

            {/* Description */}
            <div>
                <h2 className="text-2xl font-semibold mb-2">Description</h2>
                <p className="leading-7 text-gray-800">{plan.description}</p>
            </div>

            {/* Created By */}
            <div className="p-5 border rounded-xl shadow-sm bg-gray-50">
                <h2 className="text-xl font-semibold mb-3">Created By</h2>
                <div className="flex items-center gap-4">
                    <Image
                        src={plan.user?.profileImage || "/avatar.png"}
                        alt={plan.user?.name || plan.user?.email}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                    />

                    <div>
                        <p className="font-bold text-lg">{plan.user?.name || "Unknown"}</p>
                        <p className="text-sm text-gray-500">{plan.user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                {plan.reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet.</p>
                ) : (
                    <div className="space-y-4">
                        {plan.reviews.map((review: any, index: number) => (
                            <div key={index} className="p-4 border rounded-lg shadow-sm">
                                <p className="font-semibold">{review.user?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    Rating: {review.rating}/5
                                </p>
                                <p className="mt-2">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelPlanDetailsPage;

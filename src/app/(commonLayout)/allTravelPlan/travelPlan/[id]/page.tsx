/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelPlanReview from "@/components/modules/Review/TravelPlanReview";
import { getTravelPlanById } from "@/service/admin/travelPlanManagement";
import Image from "next/image";
import {
    Calendar, MapPin, Tag, Quote, Star, ShieldCheck,
    Globe, Wallet, Camera, Info, Users
} from "lucide-react";
import JoinTripButton from "@/components/shared/Button/JoinTripButton";

const TravelPlanDetailsPage = async ({ params }: any) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const result = await getTravelPlanById(id);
    const plan = result?.data;

    if (!plan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center p-10 bg-red-50 rounded-[2.5rem] border border-red-100">
                    <h2 className="text-2xl font-bold text-red-600">Travel Plan Not Found</h2>
                    <p className="text-gray-500 mt-2">The journey you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const tripEnded = new Date() > new Date(plan.endDate);

    return (
        <div className="min-h-screen bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">

                {/* --- 1. Top Header Section --- */}
                <div className="relative bg-[#F8F9FE] rounded-xl p-8 md:p-16 mb-16 overflow-hidden border border-purple-50">
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-pink-100/30 rounded-xl blur-3xl" />

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                        <div className="relative w-full lg:w-[450px] h-[450px] rounded-xl overflow-hidden shadow-2xl border-[10px] border-white flex-shrink-0">
                            <Image
                                src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"}
                                alt={plan.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-xl text-xs font-black text-purple-600 uppercase tracking-widest shadow-sm border border-purple-100">
                                <Tag size={14} /> {plan.travelType}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                {plan.title}
                            </h1>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
                                    <MapPin size={20} className="text-pink-500" />
                                    {plan.destination}
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
                                    <Calendar size={20} className="text-teal-500" />
                                    {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
                                    <Wallet size={20} className="text-amber-500" />
                                    Budget: ${plan.budget || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* --- Left Column --- */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* 2. Photo Gallery */}
                        {plan.photos && plan.photos.length > 1 && (
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                                    <Camera size={24} className="text-purple-600" /> Journey Moments
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {plan.photos.slice(1).map((photo: string, i: number) => (
                                        <div key={i} className="relative h-48 rounded-[2rem] overflow-hidden group">
                                            <Image src={photo} alt={`Trip ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. The Story/Description */}
                        <section className="bg-orange-50/40 p-10 md:p-14 rounded-[3rem] border border-orange-100/50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-orange-100 rounded-2xl text-orange-600">
                                    <Quote size={28} />
                                </div>
                                <h3 className="text-3xl font-black text-gray-800">The Story</h3>
                            </div>
                            <p className="text-gray-700 leading-[1.8] text-xl italic font-medium">
                                "{plan.description}"
                            </p>
                        </section>

                        {/* 4. Additional Info/Itinerary */}
                        <section className="bg-blue-50/30 p-10 rounded-[3rem] border border-blue-100/50">
                            <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                <Info size={24} className="text-blue-600" /> Travel Itinerary
                            </h3>
                            <div className="prose prose-blue max-w-none text-gray-600">
                                {/* If you have a specific field for itinerary, use it here */}
                                {plan.itinerary || "Plan your activities and explore the beauty of this destination with our verified guide."}
                            </div>
                        </section>

                        {/* 5. Reviews */}
                        <section className="space-y-10">
                            <h3 className="text-3xl font-black text-gray-800 flex items-center gap-3 px-4">
                                Experience Reviews
                                <span className="text-lg font-bold bg-gray-100 px-3 py-1 rounded-lg text-gray-500">
                                    {plan.reviews?.length || 0}
                                </span>
                            </h3>

                            {plan.reviews?.length === 0 ? (
                                <div className="p-16 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
                                    <p className="text-gray-400 text-lg font-bold">Be the first to share an experience!</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {plan.reviews?.map((review: any, index: number) => (
                                        <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
                                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-purple-100">
                                                <Image
                                                    src={review.user?.profileImage || "https://ui-avatars.com/api/?name=" + review.user?.name}
                                                    alt={review.user?.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="space-y-2 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-black text-gray-800 text-lg">{review.user?.name || "Traveler"}</p>
                                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-yellow-600">
                                                        <Star size={14} fill="currentColor" />
                                                        <span className="text-xs font-black">{review.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-lg leading-relaxed">{review.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="bg-[#F3F0FF] p-10 rounded-[3rem] border border-purple-100">
                                <TravelPlanReview travelPlanId={plan.id} tripEnded={tripEnded} />
                            </div>
                        </section>
                    </div>

                    {/* --- Right Column --- */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Organizer Card */}
                        <div className="bg-teal-50/60 rounded-[3rem] p-10 border border-teal-100 relative overflow-hidden group shadow-sm sticky top-24">
                            <h4 className="font-black text-gray-800 mb-8 text-xl tracking-tight uppercase">Trip Organizer</h4>
                            <div className="flex items-center gap-5 p-5 bg-white rounded-[2rem] shadow-sm border border-teal-50">
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                                    <Image
                                        src={plan.user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                                        alt={plan.user?.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-black text-gray-900 truncate text-lg">{plan.user?.name}</p>
                                    <div className="flex items-center gap-1.5 text-teal-600 text-[10px] font-black uppercase tracking-widest pt-1">
                                        <ShieldCheck size={14} strokeWidth={3} /> Verified Guide
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6 px-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Organizer Email</span>
                                    <span className="text-sm font-bold text-gray-700 truncate">{plan.user?.email}</span>
                                </div>
                                <div className="h-px bg-teal-100/50 w-full" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Travel Category</span>
                                    <span className="text-sm font-bold text-gray-700">{plan.travelType}</span>
                                </div>
                            </div>

                            <JoinTripButton planId={plan.id} isEnded={tripEnded} />
                        </div>

                        {/* Trip Quick Stats */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-50 space-y-6">
                            <h4 className="font-black text-gray-800 text-xl tracking-tight">Trip Summary</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                                    <div className="flex items-center gap-3 text-purple-700 font-bold">
                                        <Users size={18} /> Joined
                                    </div>
                                    <span className="font-black text-gray-800">{plan.joinRequests?.length || 0} People</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-pink-50 rounded-2xl">
                                    <div className="flex items-center gap-3 text-pink-700 font-bold">
                                        <Globe size={18} /> Status
                                    </div>
                                    <span className="font-black text-gray-800">{tripEnded ? 'Finished' : 'Open'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelPlanDetailsPage;
















// /* eslint-disable @typescript-eslint/no-explicit-any */

// import TravelPlanReview from "@/components/modules/Review/TravelPlanReview";
// import { getTravelPlanById } from "@/service/admin/travelPlanManagement";
// import Image from "next/image";
// import { Calendar, MapPin, Tag, Quote, Star, ArrowRight, ShieldCheck, Globe } from "lucide-react";
// import JoinTripButton from "@/components/shared/Button/JoinTripButton";

// const TravelPlanDetailsPage = async ({ params }: any) => {
//     const resolvedParams = await params;
//     const id = resolvedParams.id;

//     const result = await getTravelPlanById(id);
//     const plan = result?.data;

//     if (!plan) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-white">
//                 <div className="text-center p-10 bg-red-50 rounded-[2.5rem] border border-red-100">
//                     <h2 className="text-2xl font-bold text-red-600">Travel Plan Not Found</h2>
//                     <p className="text-gray-500 mt-2">The journey you're looking for doesn't exist.</p>
//                 </div>
//             </div>
//         );
//     }

//     const tripEnded = new Date() > new Date(plan.endDate);

//     return (
//         <div className="min-h-screen bg-white py-16 md:py-24">
//             <div className="container mx-auto px-6 ">

//                 {/* --- Top Header Section --- */}
//                 <div className="relative bg-[#F8F9FE] rounded-[3.5rem] p-8 md:p-16 mb-16 overflow-hidden border border-purple-50">
//                     <div className="absolute -top-24 -right-24 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl" />
//                     <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl" />

//                     <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
//                         <div className="relative w-full lg:w-[400px] h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white ring-4 ring-purple-100/30 flex-shrink-0">
//                             <Image
//                                 src={plan.coverImage || plan.photos?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"}
//                                 alt={plan.title}
//                                 fill
//                                 className="object-cover"
//                                 priority
//                             />
//                         </div>

//                         <div className="flex-1 text-center lg:text-left space-y-6">
//                             <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full text-xs font-black text-purple-600 uppercase tracking-[0.15em] shadow-sm border border-purple-100/50">
//                                 <Tag size={14} /> {plan.travelType || "Adventure"}
//                             </div>
//                             <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
//                                 {plan.title}
//                             </h1>
//                             <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
//                                 <div className="flex items-center gap-2 text-gray-700 font-bold bg-white/80 px-5 py-2.5 rounded-2xl border border-white shadow-sm">
//                                     <MapPin size={20} className="text-pink-500" />
//                                     {plan.destination}
//                                 </div>
//                                 <div className="flex items-center gap-2 text-gray-700 font-bold bg-white/80 px-5 py-2.5 rounded-2xl border border-white shadow-sm">
//                                     <Calendar size={20} className="text-teal-500" />
//                                     {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
//                                 </div>
//                             </div>
//                             <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
//                                 <span className={`px-6 py-2.5 rounded-2xl text-sm font-black uppercase tracking-wider shadow-sm ${tripEnded ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
//                                     {tripEnded ? '• Trip Ended' : '• Registration Open'}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid lg:grid-cols-12 gap-12">
//                     {/* Left Column */}
//                     <div className="lg:col-span-8 space-y-12">
//                         <section className="bg-orange-50/40 p-10 md:p-14 rounded-[3rem] border border-orange-100/50">
//                             <div className="flex items-center gap-4 mb-8">
//                                 <div className="p-4 bg-orange-100 rounded-2xl text-orange-600 shadow-sm">
//                                     <Quote size={28} />
//                                 </div>
//                                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">The Story</h3>
//                             </div>
//                             <p className="text-gray-700 leading-[1.8] text-xl italic font-medium">
//                                 "{plan.description}"
//                             </p>
//                         </section>

//                         {/* Reviews Section - Updated Here */}
//                         <section className="space-y-10">
//                             <h3 className="text-3xl font-black text-gray-800 flex items-center gap-3 px-4">
//                                 Experience Reviews
//                                 <span className="text-lg font-bold bg-gray-100 px-3 py-1 rounded-lg text-gray-500">
//                                     {plan.reviews?.length || 0}
//                                 </span>
//                             </h3>

//                             {plan.reviews?.length === 0 ? (
//                                 <div className="p-16 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
//                                     <p className="text-gray-400 text-lg font-bold">Be the first to share an experience!</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid gap-6">
//                                     {plan.reviews?.map((review: any, index: number) => (
//                                         <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
//                                             {/* User Image or Name Placeholder */}
//                                             <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-purple-100">
//                                                 {review.user?.profileImage ? (
//                                                     <Image
//                                                         src={review.user.profileImage}
//                                                         alt={review.user.name}
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                 ) : (
//                                                     <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600 font-black text-xl uppercase">
//                                                         {review.user?.name?.charAt(0) || "U"}
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             <div className="space-y-2 flex-1">
//                                                 <div className="flex items-center justify-between gap-3">
//                                                     <p className="font-black text-gray-800 text-lg">{review.user?.name || "Traveler"}</p>
//                                                     <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-yellow-600">
//                                                         <Star size={14} fill="currentColor" />
//                                                         <span className="text-xs font-black">{review.rating}</span>
//                                                     </div>
//                                                 </div>
//                                                 <p className="text-gray-600 text-lg leading-relaxed font-medium">{review.comment}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             <div className="bg-[#F3F0FF] p-10 rounded-[3rem] border border-purple-100">
//                                 <TravelPlanReview travelPlanId={plan.id} tripEnded={tripEnded} />
//                             </div>
//                         </section>
//                     </div>

//                     {/* Right Column */}
//                     <div className="lg:col-span-4 space-y-8">
//                         {/* Organizer Card */}
//                         <div className="bg-teal-50/60 rounded-[3rem] p-10 border border-teal-100 relative overflow-hidden group shadow-sm">
//                             <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:scale-110 transition-transform">
//                                 <Globe size={150} />
//                             </div>
//                             <h4 className="font-black text-gray-800 mb-8 text-xl tracking-tight uppercase">Trip Organizer</h4>
//                             <div className="flex items-center gap-5 relative z-10 p-5 bg-white rounded-[2rem] shadow-sm border border-teal-50">
//                                 <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
//                                     <Image
//                                         src={plan.user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
//                                         alt={plan.user?.name || "Organizer"}
//                                         fill
//                                         className="object-cover"
//                                     />
//                                 </div>
//                                 <div className="overflow-hidden">
//                                     <p className="font-black text-gray-900 truncate text-lg">{plan.user?.name || "Anonymous User"}</p>
//                                     <div className="flex items-center gap-1.5 text-teal-600 text-[10px] font-black uppercase tracking-widest pt-1">
//                                         <ShieldCheck size={14} strokeWidth={3} /> Verified Guide
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-8 space-y-6 relative z-10 px-2">
//                                 <div className="flex flex-col gap-1">
//                                     <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Contact Email</span>
//                                     <span className="text-sm font-bold text-gray-700 truncate">{plan.user?.email || "Email hidden"}</span>
//                                 </div>
//                                 <div className="h-px bg-teal-100/50 w-full" />
//                                 <div className="flex flex-col gap-1">
//                                     <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Travel Category</span>
//                                     <span className="text-sm font-bold text-gray-700">{plan.travelType}</span>
//                                 </div>
//                             </div>
//                             <JoinTripButton planId={plan.id} isEnded={tripEnded} />
//                             {/* <button className="w-full mt-10 bg-[#9810FA] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-purple-200 hover:bg-[#820ed5] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
//                                 Join This Trip <ArrowRight size={22} />
//                             </button> */}
//                         </div>

//                         {/* Trip Statistics */}
//                         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-50 space-y-6">
//                             <h4 className="font-black text-gray-800 text-xl tracking-tight">Trip Statistics</h4>
//                             <div className="grid grid-cols-2 gap-5 text-center">
//                                 <div className="p-5 bg-pink-50 rounded-[2rem] border border-pink-100/50">
//                                     <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Status</p>
//                                     <p className="font-black text-gray-800 text-lg">{tripEnded ? 'Finished' : 'Open'}</p>
//                                 </div>
//                                 <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100/50">
//                                     <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Reviews</p>
//                                     <p className="font-black text-gray-800 text-lg">{plan.reviews?.length || 0}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TravelPlanDetailsPage;


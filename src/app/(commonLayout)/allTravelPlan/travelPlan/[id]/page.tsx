/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelPlanReview from "@/components/modules/Review/TravelPlanReview";
import { getTravelPlanById } from "@/service/admin/travelPlanManagement";
import Image from "next/image";
import {
    Calendar, MapPin, Quote, Star, ShieldCheck,
    Globe, Camera, Info, Users, DollarSign, Clock, ArrowRight
} from "lucide-react";
import JoinTripButton from "@/components/shared/Button/JoinTripButton";

const TravelPlanDetailsPage = async ({ params }: any) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const result = await getTravelPlanById(id);
    const plan = result?.data;

    if (!plan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="text-center p-8 md:p-12 bg-white rounded-2xl shadow-2xl max-w-lg border border-slate-100">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info className="text-red-500" size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Plan Not Found</h2>
                    <p className="text-slate-500 mt-3 text-base md:text-lg">The travel plan you are looking for might have been removed or is unavailable.</p>
                </div>
            </div>
        );
    }

    const tripEnded = new Date() > new Date(plan.endDate);

    return (
        <div className="min-h-screen bg-[#FAFBFC]">
            {/* --- Hero Section --- */}
            <section className="relative pt-6 md:pt-10 pb-12 md:pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[300px] md:h-[500px] bg-slate-900 -z-10">
                    <Image
                        src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"}
                        alt="Background" fill className="object-cover opacity-40 blur-[2px]"
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center lg:items-end">
                        {/* Main Image Container */}
                        <div className="w-full lg:w-7/12 group">
                            <div className="relative aspect-video lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 md:border-[6px] border-white/10 backdrop-blur-md">
                                <Image
                                    src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"}
                                    alt={plan.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 right-4">
                                    <span className="px-3 py-1 bg-indigo-500 text-white rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4 inline-block">
                                        {plan.travelType}
                                    </span>
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                                        {plan.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="w-full lg:w-5/12 grid grid-cols-2 gap-3 md:gap-4">
                            {[
                                { icon: <MapPin className="text-indigo-600" />, label: "Location", value: plan.destination },
                                { icon: <Calendar className="text-emerald-500" />, label: "Duration", value: "Fixed Dates" },
                                { icon: <DollarSign className="text-amber-500" />, label: "Budget", value: `$${plan.budget}` },
                                { icon: <Users className="text-indigo-100" />, label: "Requests", value: `${plan.joinRequests?.length || 0} People`, dark: true }
                            ].map((stat, idx) => (
                                <div key={idx} className={`p-4 md:p-6 rounded-2xl border transition-all hover:translate-y-[-2px] ${stat.dark ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-200' : 'bg-white/90 backdrop-blur-xl border-white shadow-sm'}`}>
                                    <div className="mb-3 md:mb-4">{stat.icon}</div>
                                    <p className={`text-[10px] font-bold uppercase ${stat.dark ? 'text-indigo-200' : 'text-slate-400'}`}>{stat.label}</p>
                                    <p className={`text-sm md:text-lg font-bold truncate ${stat.dark ? 'text-white' : 'text-slate-800'}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 pb-24">
                <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
                    {/* --- Left Content --- */}
                    <div className="lg:col-span-8 space-y-12 md:space-y-20">
                        {/* Description */}
                        <section>
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <div className="h-px flex-1 bg-slate-200" />
                                <h3 className="text-sm md:text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">The Journey</h3>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>
                            <div className="relative px-4 md:px-0">
                                <Quote className="absolute -top-4 -left-2 md:-top-6 md:-left-6 text-slate-100 h-12 w-12 md:h-20 md:w-20 -z-10" />
                                <p className="text-lg md:text-2xl leading-relaxed text-slate-700 font-medium italic">
                                    "{plan.description}"
                                </p>
                            </div>
                        </section>

                        {/* Responsive Gallery */}
                        {plan.photos && plan.photos.length > 1 && (
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                                    <Camera className="text-indigo-600" size={28} /> Visual Story
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {plan.photos.slice(1).map((photo: string, i: number) => (
                                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                                            <Image src={photo} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Reviews Section */}
                        <section className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Guest Reviews</h3>
                                    <p className="text-slate-500 text-sm md:text-base mt-1">Experiences shared by the community</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                                    <Star className="text-amber-500 fill-amber-500" size={18} />
                                    <span className="font-bold text-slate-800 text-sm">4.9 / 5.0</span>
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {plan.reviews?.length > 0 ? (
                                    plan.reviews.map((review: any, index: number) => (
                                        <div key={index} className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-50 flex flex-col sm:flex-row gap-4 md:gap-6 hover:shadow-md transition-all">
                                            <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                                                <Image
                                                    src={review.user?.profileImage || `https://ui-avatars.com/api/?name=${review.user?.name}`}
                                                    alt="User" fill className="rounded-full sm:rounded-2xl object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h5 className="font-bold text-slate-900 text-sm md:text-base">{review.user?.name}</h5>
                                                    <ShieldCheck className="text-blue-500" size={14} />
                                                </div>
                                                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{review.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 md:py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-medium">No reviews yet. Be the first to join!</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 md:mt-10">
                                <TravelPlanReview travelPlanId={plan.id} tripEnded={tripEnded} />
                            </div>
                        </section>
                    </div>

                    {/* --- Right Sidebar --- */}
                    <div className="lg:col-span-4 space-y-6 md:space-y-8">
                        {/* Booking Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10 sticky top-24">
                            <div className="text-center mb-8">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Budget</p>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-2xl font-medium text-slate-400">$</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-slate-900">{plan.budget}</h2>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                    <span className="flex items-center gap-2 text-slate-500 font-semibold text-xs md:text-sm"><Clock size={16} /> Status</span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${tripEnded ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {tripEnded ? 'Closed' : 'Available'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                    <span className="flex items-center gap-2 text-slate-500 font-semibold text-xs md:text-sm"><Globe size={16} /> Destination</span>
                                    <span className="font-bold text-slate-900 text-xs md:text-sm">{plan.country}</span>
                                </div>
                            </div>

                            <JoinTripButton planId={plan.id} isEnded={tripEnded} />
                            <p className="text-center text-[10px] text-slate-400 mt-4 leading-tight uppercase">
                                Secure booking via verified host system
                            </p>
                        </div>

                        {/* Host Card */}
                        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 text-white/5 transform group-hover:scale-110 transition-transform">
                                <ShieldCheck size={140} />
                            </div>
                            <h4 className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8">Trip Organizer</h4>
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20">
                                    <Image src={plan.user?.profileImage} alt="Host" fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{plan.user?.name}</p>
                                    <p className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 uppercase">
                                        <ShieldCheck size={12} /> Verified Host
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <button className="w-full flex items-center justify-between text-sm hover:text-indigo-300 transition-colors">
                                    <span>Inquiry via Email</span>
                                    {/* <ArrowRight size={16} /> */}
                                </button>
                                <p className="text-slate-400 text-[10px] mt-2 font-mono break-all">{plan.user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelPlanDetailsPage;


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 

import { getUserById } from "@/service/admin/userManagement";
import Image from "next/image";
import { MapPin, Mail, Calendar, ShieldCheck, Globe, Camera, Heart, User as UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";

type TParams = Promise<{ id: string }>;

export default function SingleProfile({ params }: { params: TParams }) {
    const { id } = use(params); 
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    const interestColors = ['bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50', 'bg-teal-50'];

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserById(id);
            if (res?.success) setUser(res.data);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#9810FA]">Loading Adventure...</div>;
    if (!user) return notFound();

    // Backend data logic
    const displayInterests = user.interests && user.interests.length > 0 
        ? user.interests 
        : ["Hiking", "Photography", "Street Food", "Solo Travel"]; // Default interests

    const displayBio = user.bio || "This traveler hasn't shared their story yet, but their next adventure is just around the corner!";
    const displayLocation = user.currentLocation || user.country || "Exploring the world";
    const displayImage = user.profileImage || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7";

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
   
                    <div className="relative bg-purple-50 rounded-xl p-8 md:p-12 mb-10 overflow-hidden border border-purple-100/50 group">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors duration-700" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-100/50 rounded-full blur-3xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="relative w-56 h-56 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white ring-4 ring-purple-100"
                            >
                                <Image
                                    src={displayImage}
                                    alt={user.name || "User"}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <div className="text-center md:text-left space-y-4 flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-purple-600 uppercase tracking-widest shadow-sm">
                                    <Globe size={14} /> {user.role || "Traveler"}
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                                        {user.name || "Anonymous"}
                                    </h1>
                                    {user.status === "ACTIVE" && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                                            <ShieldCheck className="text-[#9810FA]" size={32} />
                                        </motion.div>
                                    )}
                                </div>
                                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 text-lg font-medium">
                                    <MapPin size={20} className="text-pink-500" /> 
                                    {displayLocation}
                                </p>
                                
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                                    <div className="px-6 py-2 bg-green-50 text-green-700 rounded-2xl text-sm font-bold flex items-center gap-2 border border-green-100">
                                        <Heart size={16} /> Verified Buddy
                                    </div>
                                    <div className="px-6 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-bold flex items-center gap-2 border border-blue-100">
                                        <Camera size={16} /> {user.gender || "Global"} Member
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-10">
                            {/* About Section */}
                            <section className="bg-orange-50/30 p-8 rounded-xl border border-orange-100/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                        <UserIcon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">Travel Story</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-xl italic">
                                    "{displayBio}"
                                </p>
                            </section>

                            {/* Interests (Dynamic from Backend) */}
                            <section>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    Interests & Passion
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {displayInterests.map((tag: string, i: number) => (
                                        <motion.span 
                                            key={i}
                                            whileHover={{ y: -5 }}
                                            className={`${interestColors[i % interestColors.length]} px-6 py-3 rounded-lg font-bold text-gray-700 shadow-sm border border-black/5 cursor-default hover:shadow-md transition-all`}
                                        >
                                            # {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-teal-50 rounded-xl p-8 border border-teal-100 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Globe size={80} />
                                </div>
                                <h4 className="font-bold text-gray-800 mb-8 text-xl">Travel Passport</h4>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="p-3 bg-white rounded-2xl text-[#9810FA] shadow-sm">
                                            <Mail size={20} />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs font-bold text-teal-600 uppercase">Email</span>
                                            <span className="text-sm font-medium text-gray-700 truncate">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-2xl text-pink-500 shadow-sm">
                                            <Calendar size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-teal-600 uppercase">Joined</span>
                                            <span className="text-sm font-medium text-gray-700">
                                                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-2xl text-yellow-600 shadow-sm">
                                            <MapPin size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-teal-600 uppercase">Age / Gender</span>
                                            <span className="text-sm font-medium text-gray-700">
                                                {user.age || "N/A"} • {user.gender || "Secret"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* <motion.button 
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full mt-10 bg-[#9810FA] text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-purple-200 hover:bg-[#7a0cc9] transition-all"
                                >
                                    Plan a Trip
                                </motion.button> */}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


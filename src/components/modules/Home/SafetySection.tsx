"use client";
import { ShieldCheck, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const safetyFeatures = [
    {
        title: "Verified Profiles",
        desc: "We manually check every single profile to ensure a real community.",
        icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />,
        bg: "bg-indigo-50",
    },
    {
        title: "Secure Messaging",
        desc: "End-to-end encrypted chat to keep your travel plans private.",
        icon: <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" />,
        bg: "bg-rose-50",
    },
    {
        title: "Verified Reviews",
        desc: "Only travelers who have met can leave feedback for each other.",
        icon: <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />,
        bg: "bg-amber-50",
    },
    {
        title: "Global Support",
        desc: "Our team is available 24/7 to help you anywhere in the world.",
        icon: <Users className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />,
        bg: "bg-emerald-50",
    },
];

export default function SafetySection() {
    return (
        <section className="py-14 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-2/5 text-center lg:text-left"
                    >
                        <h2 className="text-indigo-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">
                            Safety & Security
                        </h2>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 sm:mb-6 leading-tight">
                            Your safety is the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Heart of Travel Buddy
                            </span>
                        </h1>

                        <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                            We understand that meeting new people requires trust. That's why we've built the most secure platform for global travelers.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto bg-[#1447E6] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold shadow-lg shadow-slate-200"
                        >
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Learn Our Safety Policy
                            </Link>
                        </motion.button>
                    </motion.div>

                    <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {safetyFeatures.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="
                                    bg-white
                                    p-6 sm:p-8
                                    rounded-2xl sm:rounded-[2rem]
                                    border border-slate-100
                                    shadow-sm
                                    hover:shadow-xl hover:shadow-indigo-500/5
                                    transition-all
                                    group
                                "
                            >
                                <div
                                    className={`
                                        w-14 h-14 sm:w-16 sm:h-16
                                        ${item.bg}
                                        rounded-xl sm:rounded-2xl
                                        flex items-center justify-center
                                        mb-4 sm:mb-6
                                        group-hover:scale-110
                                        transition-transform
                                    `}
                                >
                                    {item.icon}
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

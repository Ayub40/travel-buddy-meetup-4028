"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
    ShieldCheck, Lock, FileText, ChevronRight,
    Scale, HelpCircle, Eye, Handshake, Mail, Info,
    ChevronDown
} from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PrivacyTermsPage = () => {
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(".bg-blob", {
            duration: 12,
            x: "random(-100, 100)",
            y: "random(-50, 50)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        const cards = cardsRef.current?.querySelectorAll(".legal-card");
        if (cards) {
            gsap.fromTo(cards,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, []);

    const policies = [
        {
            title: "Data Security",
            icon: <Lock size={28} className="text-pink-500" />,
            desc: "We use AES-256 encryption to store sensitive information. Your data is strictly used for trip coordination only."
        },
        {
            title: "User Conduct",
            icon: <Handshake size={28} className="text-[#D08700]" />,
            desc: "Respect and safety are our pillars. Harassment or misinformation will result in permanent account termination."
        },
        {
            title: "Refund & Cancellation",
            icon: <Scale size={28} className="text-teal-500" />,
            desc: "Cancellation rules are set by trip organizers. We facilitate fair disputes if terms are not met."
        },
        {
            title: "Cookies & Tracking",
            icon: <Eye size={28} className="text-orange-500" />,
            desc: "We use minimal cookies to enhance your experience and remember your preferences across sessions."
        }
    ];



    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How can I delete my data?",
            answer: "You can request data deletion through your account settings or by contacting our support team directly. We will process your request within 30 days and permanently remove your personal records."
        },
        {
            question: "What happens if a trip is cancelled?",
            answer: "If an organizer cancels a trip, all joiners are entitled to a full refund. If a joiner cancels, the refund amount depends on the specific timeframe mentioned in the trip's cancellation policy."
        },
        {
            question: "Is my payment information stored?",
            answer: "No, we do not store your credit card or sensitive payment details on our servers. All transactions are handled securely by industry-leading payment processors like Stripe or SSLCommerz."
        },
        {
            question: "How do you verify trip organizers?",
            answer: "Every organizer must complete a multi-step verification process, including phone number authentication and identity checks. We also maintain a community rating system to ensure only trusted hosts can create and lead trips."
        }
    ];

    return (
        <div className="relative min-h-screen bg-white overflow-hidden font-sans">

            <div className="bg-blob absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px]" />
            <div className="bg-blob absolute bottom-0 -right-20 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[120px]" />

            <section className="relative pt-2 pb-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#F8F9FE] rounded-xl p-12 md:p-20 border border-purple-50 text-center relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <span className="bg-white px-6 py-2 rounded-xl text-[#9810FA] text-xs font-black tracking-widest uppercase shadow-sm border border-purple-100 mb-8 inline-block">
                                Trust & Transparency
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9810FA] to-pink-500">Legal</span> Center
                            </h1>
                            <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                                Everything you need to know about how we protect your data and ensure a safe travel community.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-5 p-8 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <div className="p-4 bg-teal-50 rounded-2xl text-teal-600"><ShieldCheck size={32} /></div>
                            <div><h4 className="font-black text-gray-800">100% Secure</h4><p className="text-sm text-gray-500">Encrypted Transactions</p></div>
                        </div>
                        <div className="flex items-center gap-5 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="p-4 bg-pink-50 rounded-2xl text-pink-600"><Info size={32} /></div>
                            <div><h4 className="font-black text-gray-800">Clear Terms</h4><p className="text-sm text-gray-500">No Hidden Clauses</p></div>
                        </div>
                        <div className="flex items-center gap-5 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="p-4 bg-purple-50 rounded-2xl text-[#9810FA]"><Mail size={32} /></div>
                            <div><h4 className="font-black text-gray-800">24/7 Support</h4><p className="text-sm text-gray-500">Legal Assistance</p></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#fcfcff]">
                <div className="container mx-auto px-6">

                    <div className="flex flex-col items-center text-center mb-16 gap-4">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Privacy Framework
                            </h2>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed">
                                Detailed breakdown of our operational standards and security protocols.
                            </p>
                        </div>
                    </div>

                    <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
                        {policies.map((item, idx) => (
                            <div
                                key={idx}
                                className="legal-card group bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-purple-100/40 transition-all duration-500 cursor-default"
                            >
                                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">

                                    <div className="w-16 h-16 bg-[#F8F9FE] rounded-2xl flex items-center justify-center 
                                        text-[#9810FA] group-hover:bg-[#9810FA] group-hover:text-white 
                                        transition-all duration-500 shadow-sm">
                                        {item.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-[#9810FA] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">

                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-500 text-lg font-medium">
                            Quick answers to common legal and privacy concerns.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl border-12 border-white ring-1 ring-gray-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974"
                                    alt="Support and Legal"
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#9810FA]/20 to-transparent" />
                            </div>
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -right-6 bg-white p-6 rounded-xl shadow-xl border border-purple-50 hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-800">Verified Policy</p>
                                        <p className="text-xs text-gray-500 font-bold">Updated 2024</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <div className="lg:col-span-7 space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className={`rounded-xl border transition-all duration-300 ${openIndex === i
                                        ? 'bg-[#F8F9FE] border-purple-100 shadow-lg shadow-purple-100/20'
                                        : 'bg-white border-gray-100 hover:border-purple-200 shadow-sm'
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="w-full p-7 md:p-9 flex items-center justify-between text-left group"
                                    >
                                        <div className="flex items-center gap-5 text-gray-800 text-lg md:text-xl font-black">
                                            <div className={`p-3 rounded-2xl transition-all duration-300 ${openIndex === i ? 'bg-[#9810FA] text-white scale-110 shadow-lg shadow-purple-200' : 'bg-teal-50 text-teal-600'
                                                }`}>
                                                <HelpCircle size={24} />
                                            </div>
                                            <span className="leading-tight">{faq.question}</span>
                                        </div>

                                        <motion.div
                                            animate={{ rotate: openIndex === i ? 180 : 0 }}
                                            className={`${openIndex === i ? 'text-[#9810FA]' : 'text-gray-300'}`}
                                        >
                                            <ChevronDown size={28} strokeWidth={3} />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "circOut" }}
                                            >
                                                <div className="px-9 pb-9 pt-0">
                                                    <div className="h-px bg-purple-100/50 mb-6" />
                                                    <p className="text-gray-600 text-lg leading-relaxed font-medium pl-1 md:pl-16">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyTermsPage;
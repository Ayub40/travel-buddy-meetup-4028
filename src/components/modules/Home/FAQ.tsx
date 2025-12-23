"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import Image from "next/image";

const faqs = [
    { q: "How do I find a buddy?", a: "Simply search by destination and filter by interests.", color: "bg-blue-50" },
    { q: "Is it safe to travel?", a: "We provide verified badges and reviews to ensure safety.", color: "bg-pink-50" },
    { q: "Can I host a trip?", a: "Yes! Create a travel plan and wait for others to join.", color: "bg-green-50" },
    { q: "Is there a mobile app?", a: "Our platform is fully responsive and works on all devices.", color: "bg-yellow-50" },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-24 container mx-auto px-6 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Accordion */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-10 text-left">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Have Questions?</h2>
                        <p className="text-gray-500 text-lg">We have answered some of the most common questions for you.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                className={`${faq.color} rounded-2xl border border-white shadow-sm overflow-hidden`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left transition-all"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <HelpCircle className="text-gray-600" size={20} />
                                        </div>
                                        <span className="font-bold text-gray-800">{faq.q}</span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                        className="text-gray-500"
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-16 pb-6 text-gray-600 text-sm leading-relaxed">
                                                <div className="pt-2 border-t border-gray-200/50">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side: Visual Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    {/* Decorative Background Shapes */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />

                    <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100">
                        <Image
                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800"
                            alt="FAQ Travel"
                            width={600}
                            height={500}
                            className="rounded-xl w-full h-[500px] object-cover"
                        />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4"
                        >
                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Support 24/7</p>
                                <p className="text-xs text-gray-500">Always here to help</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

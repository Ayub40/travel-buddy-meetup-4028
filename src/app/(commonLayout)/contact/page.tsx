"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, ShieldCheck, Globe, HelpCircle, FileText } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-8 lg:p-16 rounded-3xl shadow-2xl border border-gray-100">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-6 italic">Get In Touch</h2>
                        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                            Have a question or need support? Our team is here to help you find the
                            perfect travel buddy and ensure your safety.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: "Email Us", val: "support@tripmates.com", color: "bg-blue-50", iconColor: "text-blue-600" },
                                { icon: Phone, label: "Call Us", val: "+880 1688871098", color: "bg-pink-50", iconColor: "text-pink-600" },
                                { icon: MapPin, label: "Our Office", val: "Banani, Dhaka, Bangladesh", color: "bg-green-50", iconColor: "text-green-600" },
                                { icon: MessageCircle, label: "Social Media", val: "@travelbuddy_official", color: "bg-yellow-50", iconColor: "text-yellow-600" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className={`${item.color} p-4 rounded-2xl ${item.iconColor} transition-transform group-hover:scale-110 shadow-sm`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-lg font-bold text-gray-800">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { 
                                icon: ShieldCheck, 
                                title: "Safety Guide", 
                                desc: "Learn how we keep you safe.", 
                                color: "bg-purple-50", 
                                iconColor: "text-purple-600" 
                            },
                            { 
                                icon: Globe, 
                                title: "Community", 
                                desc: "Connect with global travelers.", 
                                color: "bg-orange-50", 
                                iconColor: "text-orange-600" 
                            },
                            { 
                                icon: HelpCircle, 
                                title: "Help Center", 
                                desc: "Find answers to common questions.", 
                                color: "bg-teal-50", 
                                iconColor: "text-teal-600" 
                            },
                            { 
                                icon: FileText, 
                                title: "Privacy Policy", 
                                desc: "How we handle your data.", 
                                color: "bg-red-50", 
                                iconColor: "text-red-600" 
                            }
                        ].map((card, idx) => (
                            <div 
                                key={idx} 
                                className={`${card.color} p-6 rounded-3xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm ${card.iconColor}`}>
                                    <card.icon size={24} className="group-hover:rotate-12 transition-transform" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1">{card.title}</h3>
                                <p className="text-sm text-gray-500 leading-snug">{card.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

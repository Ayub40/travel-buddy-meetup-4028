"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
    {
        name: "Rahat Kabir",
        role: "Solo Traveler",
        text: "Found an amazing buddy for my Sajek trip! The matching system is so accurate.",
        color: "bg-blue-50",
        img: "https://i.pravatar.cc/150?u=1"
    },
    {
        name: "Sara Islam",
        role: "Foodie Explorer",
        text: "Planning became so easy. We shared costs and had the best food tour in Old Dhaka!",
        color: "bg-purple-50",
        img: "https://i.pravatar.cc/150?u=2"
    },
    {
        name: "Arif Ahmed",
        role: "Photographer",
        text: "Secure and reliable. Met like-minded photographers for a Nepal expedition.",
        color: "bg-green-50",
        img: "https://i.pravatar.cc/150?u=3"
    },
    {
        name: "Rafiq Ahmed",
        role: "Traveler",
        text: "Secure and reliable. Met like-minded photographers for a Nepal expedition.",
        color: "bg-orange-50", 
        img: "https://i.pravatar.cc/150?u=4"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 container mx-auto px-4 overflow-hidden">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-800"
                >
                    Traveler Stories
                </motion.h2>
                <p className="text-gray-500 mt-2">Real experiences from our community</p>
            </div>

          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        // whileInView={{ y: 0, opacity: 1 }} 
                        whileInView={{ y: 0, opacity: 1 }}
                        // viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        
                        className={`${review.color} p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between`}
                    >
                        <div>
                            <Quote className="absolute top-4 right-4 text-gray-200 w-10 h-10" />
                            <p className="text-gray-700 italic mb-6 text-sm leading-relaxed">
                                {"\""}{review.text}{"\""}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                <Image
                                    src={review.img}
                                    alt={review.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-gray-800 text-sm truncate">{review.name}</h4>
                                <p className="text-xs text-gray-500 truncate">{review.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
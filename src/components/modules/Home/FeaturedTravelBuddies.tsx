"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const buddies = [
    { name: "Alex", country: "Germany", destination: "Bali" },
    { name: "Sara", country: "UK", destination: "Sylhet" },
    { name: "Rahim", country: "Bangladesh", destination: "Bandarban" },
];

export default function FeaturedTravelBuddies() {
    return (
        <section className="py-16 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10">Popular Travel Buddies</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-6">
                {buddies.map((b, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className="bg-white p-6 rounded-3xl shadow-sm text-center"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4" />
                        <h3 className="font-bold text-lg">{b.name}</h3>
                        <p className="text-sm text-gray-500">{b.country}</p>
                        <p className="mt-2 text-sm">Next: <b>{b.destination}</b></p>
                        <Button size="sm" className="mt-4 w-full">Connect</Button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

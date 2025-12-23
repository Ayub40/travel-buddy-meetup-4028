"use client";

import { motion } from "framer-motion";
import { Mountain, Palmtree, Tent, Coffee } from "lucide-react";

const categories = [
    { name: "Adventure", icon: Mountain, color: "bg-blue-50", text: "text-blue-600" },
    { name: "Relaxation", icon: Palmtree, color: "bg-teal-50", text: "text-teal-600" },
    { name: "Camping", icon: Tent, color: "bg-orange-50", text: "text-orange-600" },
    { name: "City Life", icon: Coffee, color: "bg-purple-50", text: "text-purple-600" },
];

export default function Categories() {
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Explore by Category</h2>
                <p className="text-gray-500 mt-2">Find travel buddies based on your preferred environment</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`${cat.color} p-8 rounded-3xl text-center cursor-pointer shadow-sm`}
                    >
                        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <cat.icon className={cat.text} size={30} />
                        </div>
                        <h3 className="font-bold text-gray-800">{cat.name}</h3>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

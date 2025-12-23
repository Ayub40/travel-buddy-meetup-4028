"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
    { label: "Active Users", value: 25000, color: "bg-teal-50", text: "text-teal-600" },
    { label: "Destinations", value: 500, color: "bg-pink-50", text: "text-pink-600" },
    { label: "Groups Formed", value: 12000, color: "bg-yellow-50", text: "text-yellow-600" },
    { label: "Countries", value: 45, color: "bg-red-50", text: "text-red-600" },
];

export default function Statistics() {
    return (
        <section className="py-20  container mx-auto rounded-3xl my-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <CounterCard {...stat} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CounterCard({ label, value, color, text }: { label: string; value: number; color: string; text: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; 
        const frameRate = 1000 / 60; 
        const totalFrames = Math.round(duration / frameRate);
        const increment = value / totalFrames;

        const interval = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, frameRate);

        return () => clearInterval(interval);
    }, [value]);

    return (
        <Card className={`${color} border-none rounded-3xl text-center shadow-sm hover:shadow-md transition-all h-full`}>
            <CardContent className="p-10">
                <p className={`text-4xl font-extrabold ${text} mb-2`}>
                    {count.toLocaleString()}{value > 100 ? "+" : ""}
                </p>
                <p className="text-gray-600 font-medium uppercase text-sm tracking-wider">
                    {label}
                </p>
            </CardContent>
        </Card>
    );
}







// "use client";
// import { motion } from "framer-motion";

// const stats = [
//     { label: "Active Users", value: "25K+", color: "bg-teal-50", text: "text-teal-600" },
//     { label: "Destinations", value: "500+", color: "bg-pink-50", text: "text-pink-600" },
//     { label: "Groups Formed", value: "12K+", color: "bg-yellow-50", text: "text-yellow-600" },
//     { label: "Countries", value: "45+", color: "bg-red-50", text: "text-red-600" },
// ];

// export default function Statistics() {
//     return (
//         <section className="py-20 bg-gray-50 container mx-auto">
//             <div className="container mx-auto px-4">
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//                     {stats.map((stat, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.2 }}
//                             className={`${stat.color} p-10 rounded-3xl text-center shadow-sm`}
//                         >
//                             <motion.h3
//                                 initial={{ scale: 0.5 }}
//                                 whileInView={{ scale: 1 }}
//                                 className={`text-4xl font-extrabold ${stat.text} mb-2`}
//                             >
//                                 {stat.value}
//                             </motion.h3>
//                             <p className="text-gray-600 font-medium">{stat.label}</p>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
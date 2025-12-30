/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function CounterCard({ label, value, color, text, index }: any) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const interval = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(interval);
    }, [value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <Card
                className={`
                    ${color}
                    border-none
                    rounded-xl
                    text-center
                    shadow-sm
                    h-full
                `}
            >
                <CardContent className="p-6 sm:p-8 lg:p-10">
                    <p
                        className={`
                            font-extrabold
                            ${text}
                            text-2xl sm:text-3xl lg:text-4xl
                            mb-2
                        `}
                    >
                        {value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}
                        {value > 100 ? "+" : ""}
                    </p>

                    <p className="text-gray-600 font-medium uppercase text-xs sm:text-sm">
                        {label}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

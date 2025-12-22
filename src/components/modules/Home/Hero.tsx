"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Hero() {
  return (
    <div className="relative w-full bg-linear-to-b from-blue-50 to-white container mx-auto mt-0.5 rounded">
      {/* Background Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/travel-bg.svg')] bg-cover bg-center"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 py-16 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border px-4 py-2 rounded-full shadow-sm"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Travel Buddy Platform
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold leading-tight text-gray-800"
            >
              Find Your Perfect <br />
              Travel Partner & Explore The World Together
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-600 text-lg"
            >
              Connect with people traveling to the same destination, plan together, and enjoy a safe travel experience.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-4"
            >
              {/* <Button className="px-8 py-6 rounded-xl text-base bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button variant="outline" className="px-8 py-6 rounded-xl text-base">
                Learn More
              </Button> */}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "10K+", label: "Travelers Joined" },
                { value: "1500+", label: "Successful Trips" },
                { value: "4.8", label: "Average Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i }}
                  className="space-y-1"
                >
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl bg-white p-8 shadow-xl border"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Search Travel Buddy
            </h2>

            <form className="space-y-5">

              <div className="space-y-2">
                <Label>Destination</Label>
                <Input placeholder="e.g., Cox's Bazar, Sylhet, Nepal" />
              </div>


              <div className="space-y-2">
                <Label>Travel Date</Label>
                <Input type="date" />
              </div>


              <div className="space-y-2">
                <Label>Who are you traveling with?</Label>
                <Input placeholder="Solo / Friends / Family" />
              </div>

              <Button className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700">
                <Search className="w-5 h-5 mr-2" />
                Find Buddy
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

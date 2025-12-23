"use client";
import { motion } from "framer-motion";
import { Send, MailOpen } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="py-20 container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-blue-50 rounded-xl p-10 md:p-16 text-center relative overflow-hidden border border-blue-100 shadow-sm"
            >
                {/* Decorative background shapes using your colors */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-50 rounded-full -translate-x-16 -translate-y-16 opacity-60" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-50 rounded-full translate-x-16 translate-y-16 opacity-60" />
                <div className="absolute top-1/2 left-10 w-6 h-6 bg-yellow-100 rounded-full blur-sm" />
                <div className="absolute bottom-1/2 right-12 w-8 h-8 bg-purple-100 rounded-full blur-sm" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    {/* Icon with colored background */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-blue-600"
                    >
                        <MailOpen size={30} />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                        Get Travel Tips in Your Inbox
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join <span className="text-blue-600 font-bold">10,000+</span> travelers and get the latest destination guides and buddy requests.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full shadow-lg border border-blue-100/50 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 text-gray-800 outline-none rounded-full bg-transparent"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white transition-all px-8 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg">
                            Subscribe <Send size={18} />
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-gray-400">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}







// "use client";
// import { motion } from "framer-motion";
// import { Send } from "lucide-react";

// export default function Newsletter() {
//   return (
//     <section className="py-20 container mx-auto px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="bg-blue-600 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden"
//       >
//         <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
//         <div className="relative z-10 max-w-2xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Travel Tips in Your Inbox</h2>
//           <p className="text-blue-100 mb-8 text-lg">Join 10,000+ travelers and get the latest destination guides and buddy requests.</p>
//           <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-3 text-gray-800 outline-none rounded-full"
//             />
//             <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-8 py-3 rounded-full flex items-center justify-center gap-2 font-bold">
//               Subscribe <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }
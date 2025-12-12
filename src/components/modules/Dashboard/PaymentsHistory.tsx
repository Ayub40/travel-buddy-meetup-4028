// "use client";
// import { PaymentService } from "@/service/payment/paymentManagement";
// import { useEffect, useState } from "react";
// // import { PaymentService } from "@/service/payment/paymentService";

// type Payment = {
//     id: string;
//     planType: string;
//     paymentFor: string;
//     amount: number;
//     currency: string;
//     status: string;
//     createdAt: string;
// };

// export default function PaymentsHistory() {
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const data = await PaymentService.getMyPayments();
//                 setPayments(data);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPayments();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (!payments.length) return <p>No payments found</p>;

//     return (
//         <div className="p-4 border rounded-lg shadow mt-4">
//             <h2 className="text-xl font-bold mb-4">Payment History</h2>
//             <table className="w-full text-left border-collapse">
//                 <thead>
//                     <tr className="border-b">
//                         <th className="p-2">Plan</th>
//                         <th className="p-2">Amount</th>
//                         <th className="p-2">Status</th>
//                         <th className="p-2">Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map((p) => (
//                         <tr key={p.id} className="border-b">
//                             <td className="p-2">{p.planType || p.paymentFor}</td>
//                             <td className="p-2">{p.amount} {p.currency}</td>
//                             <td className={`p-2 font-semibold ${p.status === "SUCCESS" ? "text-green-600" : "text-red-600"}`}>{p.status}</td>
//                             <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

import Stripe from "stripe";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { serverFetch } from "@/lib/server-fetch";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = async () => {
    const user = await getUserInfo();
    if (!user) throw new Error("Not logged in");

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: user.email,
        line_items: [
            {
                price_data: {
                    currency: "bdt",
                    product_data: {
                        name: "Premium Subscription",
                    },
                    unit_amount: 500 * 100, // 500 BDT
                },
                quantity: 1,
            },
        ],
        // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing-success`,
        // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
        success_url: "http://localhost:3000/pricing-success",
        cancel_url: "http://localhost:3000/dashboard/pricing-page",
        metadata: {
            userId: user.id,
            paymentFor: "subscription",
        },
    });

    return session.url;
};

// export const PaymentService = {
//     getMyPayments: async () => {
//         const res = await serverFetch.get("/payments/me");
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch payments");
//         return data.data; // returns array of payments
//     }
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCheckoutSession } from "@/service/payment/paymentManagement";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const url = await createCheckoutSession();
        return NextResponse.json({ url });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

"use client";

export default function PricingPage() {
    const handleUpgrade = async () => {
        const res = await fetch("/api/stripe/create-checkout-session", { method: "POST" });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url; 
        }
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>

            <div className="p-6 border rounded-lg shadow">
                <h2 className="text-xl font-semibold">Premium Plan</h2>
                <p className="mt-2">Unlock Verified Badge & Boosted Visibility</p>
                <p className="mt-2 font-bold">৳ 500 / month</p>

                <form action="/api/stripe/create-checkout-session" method="POST">
                    <button onClick={handleUpgrade} className="mt-4 px-4 py-2 bg-primary text-white rounded">
                        Upgrade Now
                    </button>
                </form>
            </div>
        </div>
    );
}

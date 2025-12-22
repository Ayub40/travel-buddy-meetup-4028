import Hero from "@/components/modules/Home/Hero";
import Steps from "@/components/modules/Home/Steps";
import TrendingDestinations from "@/components/modules/Home/TrendingDestinations";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel Buddy & Meetup - Find Your Perfect Travel Partner</title>
        <meta
          name="description"
          content="Find compatible travel buddies, explore destinations, share travel plans, and join global meetups. Connect with travelers worldwide and plan unforgettable journeys together."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <Hero />
        <Steps />
        <TrendingDestinations />



        {/* Popular Destinations */}
        {/* <TopDestinations /> */}

        {/* How It Works */}
        {/* <HowItWorks /> */}

        {/* Featured Travelers */}
        {/* <FeaturedTravelers /> */}

        {/* Travel Categories */}
        {/* <ExploreCategories /> */}

        {/* Testimonials */}
        {/* <Testimonials /> */}
      </main>
    </>
  );
}

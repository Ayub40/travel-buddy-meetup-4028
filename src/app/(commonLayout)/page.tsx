import FAQ from "@/components/modules/Home/FAQ";
import FeaturedTravelBuddies from "@/components/modules/Home/FeaturedTravelBuddies";
import Hero from "@/components/modules/Home/Hero";
import PopularDestinations from "@/components/modules/Home/PopularDestinations";
import SafetySection from "@/components/modules/Home/SafetySection";
import Statistics from "@/components/modules/Home/Statistics/Statistics";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getAppStatistics } from "@/service/dashboard/dashboardManagement";
import Head from "next/head";

export default async function Home() {
  const statsData = await getAppStatistics();

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
        <Hero statsResponse={statsData} />
        <Statistics />
        <Steps />
        <PopularDestinations />
        <FeaturedTravelBuddies />
        <SafetySection />
        <FAQ />
        <Testimonials />

        <ScrollToTop />
      </main>
    </>
  );
}

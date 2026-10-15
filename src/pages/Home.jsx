import Hero from "@/sections/Hero.jsx";
import Stock from "@/sections/Stock.jsx";
import TradeIn from "@/sections/TradeIn.jsx";
import WhyUs from "@/sections/WhyUs.jsx";
import Reviews from "@/sections/Reviews.jsx";
import Stats from "@/sections/Stats.jsx";
import Social from "@/sections/Social.jsx";
import Location from "@/sections/Location.jsx";
import Contact from "@/sections/Contact.jsx";

/** Home — ensambla todas las secciones. */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stock />
      <TradeIn />
      <WhyUs />
      <Reviews />
      <Stats />
      <Social />
      <Location />
      <Contact />
    </main>
  );
}

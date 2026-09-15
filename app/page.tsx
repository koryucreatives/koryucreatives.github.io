import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Bridge from "@/components/sections/Bridge";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import WhyKoryu from "@/components/sections/WhyKoryu";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Marquee from "@/components/ui/Marquee";

const SERVICE_TAGS = [
  "Website Design",
  "Content Creation",
  "Video Editing",
  "Paid Ad Management",
  "Brand Consistency",
  "Digital Presence",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee items={SERVICE_TAGS} />
        <Story />
        <Bridge />
        <Services />
        <Work />
        <Process />
        <WhyKoryu />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

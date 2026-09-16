import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Bridge from "@/components/sections/Bridge";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import WhyKoryu from "@/components/sections/WhyKoryu";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Marquee from "@/components/ui/Marquee";

const SERVICE_TAGS = [
  "Website Design",
  "Photo Editing",
  "Video Editing",
  "Ad Marketing",
  "Digital Presence",
  "Branding",
  "Social Media Management",
  "SEO & Local Growth",
  "Automation & AI",
  "E-commerce",
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
        <Process />
        <WhyKoryu />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

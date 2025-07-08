import "./globals.css";
import Publications from "@/components/publications";
import { Home } from "@/components/home";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Activities } from "@/components/activities";
import Collaborators from "@/components/collaborators";
import Resources from "@/components/resources";
import Waves from "@/blocks/Backgrounds/Waves/Waves";
import { Culture } from "@/components/culture";

export default function Landing() {
  return (
    <div>
      {/* Home Section */}
      {/* Another Version */}
      {/* <section id="home" className="relative scroll-mt-26 py-18 px-6 text-center bg-gradient-to-b from-stone-200 to-pink-500"> */}
      <section
        id="home"
        className="relative scroll-mt-26 py-4 lg:py-18 px-6 text-center bg-black min-h-dvh landscape:min-h-[480px] lg:min-h-[480px] lg:h-dvh"
      >
        <div className="absolute inset-0 z-0 h-full">
          <Waves
            lineColor="rgba(255, 255, 255, 0.2)"
            backgroundColor="transparent"
            className="pointer-events-none"
          />
        </div>
        <div className="min-h-dvh landscape:min-h-[480px] p-8 lg:block lg:h-full lg:z-10 relative items-center">
          <div className="flex justify-center self-center my-auto mx-auto">
            <Home />
          </div>
        </div>
      </section>

      {/* <div className="px-4 py-4 sm:px-8 sm:py-8"> */}
      <div className="px-4 py-4 md:px-14 md:py-14 lg:px-8 lg:py-8">
        {/* People Section */}
        <section
          id="people"
          className="lg:scroll-mt-16 py-8 bg-gray-50 text-center rounded-lg"
        >
          <Testimonials />
        </section>

        <div className="py-2 md:py-7 lg:py-4 bg-white"/>

        {/* Publications Section */}
        <section
          id="publications"
          className="lg:scroll-mt-16 py-8 bg-pink-100 rounded-lg"
        >
          <Publications />
        </section>

        <div className="py-2 md:py-7 lg:py-4 bg-white"/>

        {/* Collaborators Section */}
        <section
          id="collaborators"
          className="lg:scroll-mt-16 py-8 bg-gray-50 rounded-lg"
        >
          <Collaborators />
        </section>

        <div className="py-2 md:py-7 lg:py-4 bg-white"/>

        {/* Activity Section */}
        <section
          id="activities"
          className="lg:scroll-mt-16 py-8 bg-pink-100 text-center rounded-lg"
        >
          <Activities />
        </section>

        <div className="py-2 md:py-7 lg:py-4 bg-white"/>

        {/* Resources Section */}
        <section
          id="resources"
          className="lg:scroll-mt-16 py-8 bg-gray-50 rounded-lg"
        >
          <Resources />
        </section>

        <div className="py-2 md:py-7 lg:py-4 bg-white"/>

        {/* Culture Section */}
        <section
          id="culture"
          className="lg:scroll-mt-16 py-8 bg-pink-100 rounded-lg"
        >
          <Culture />
        </section>

        <div className="py-2 md:py-7 lg:py-4 bg-white"/>

        {/* Contact Section */}
        <section id="contact" className="py-8 bg-gray-50 rounded-lg">
          <Contact />
        </section>
      </div>
    </div>
  );
}

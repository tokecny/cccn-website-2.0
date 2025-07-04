import "./globals.css";
import Publications from "@/components/publications";
import { Home } from "@/components/home";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Activities } from "@/components/activities";
import Collaborators from "@/components/collaborators";
import Resources from "@/components/resources";
import Waves from "@/blocks/Backgrounds/Waves/Waves";

export default function Landing() {
  return (
    <div>
      {/* Home Section */}
      <section id="home" className="relative scroll-mt-26 py-16 px-6 text-center bg-gradient-to-b from-stone-200 to-pink-500">
        <div className="absolute inset-0 z-0">
          <Waves
            lineColor="rgba(255, 255, 255, 0.2)"
            backgroundColor="transparent"
            className="pointer-events-none"
          />
        </div>

        <div className="relative z-10">
          <Home />
        </div>
      </section>

      <div className="py-6 bg-white" />

      {/* People Section */}
      <section id="people" className="scroll-mt-16 py-8 bg-gray-50 text-center">
        <Testimonials />
      </section>

      <div className="py-6 bg-white" />

      {/* Publications Section */}
      <section id="publications" className="scroll-mt-16 py-8 bg-pink-100">
        <Publications />
      </section>

      <div className="py-6 bg-white" />

      {/* Collaborators Section */}
      <section id="collaborators" className="scroll-mt-16 py-8 bg-gray-50">
        <Collaborators />
      </section>

      <div className="py-6 bg-white" />

      {/* Activity Section */}
      <section id="activity" className="scroll-mt-16 py-8 bg-pink-100 text-center">
        <Activities />
      </section>

      <div className="py-6 bg-white" />

      {/* Resources Section */}
      <section id="resources" className="scroll-mt-16 py-8 bg-gray-50">
        <Resources />
      </section>

      <div className="py-6 bg-white" />

      {/* Contact Section */}
      <section id="contact" className="py-8 bg-pink-100">
        <Contact />
      </section>
    </div>
  );
}

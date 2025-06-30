import './globals.css' 
import  Publications from '@/components/publications';
import { Home } from '@/components/home';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';
import { Activities } from '@/components/activities';

export default function Landing() {
  return (
    <div>
      {/* Home Section */}
      <section id="home" className="py-16 px-6 text-center bg-gradient-to-b from-stone-200 to-pink-500">
          <Home />
      </section>

      <div className="py-6 bg-white" />

      {/* People Section */}
      <section id="people" className="py-16 bg-gray-50 text-center">
        <Testimonials />
      </section>

      <div className="py-6 bg-white" />

      {/* Publications Section */}
      <section id="publications" className="py-16 bg-pink-100">
        <Publications /> 
      </section>

      <div className="py-6 bg-white" />

      {/* Collaborators Section */}
      <section id="collaborators" className="py-16 bg-gray-50">
        
      </section>

      <div className="py-6 bg-white" />

      {/* Activity Section */}
      <section id="activity" className="py-16 bg-pink-100 text-center">
        <Activities />
      </section>

      <div className="py-6 bg-white" />

      {/* Resources Section */}
      <section id="resources" className="py-16 bg-gray-50">
        
      </section>

      <div className="py-6 bg-white" />

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-pink-100">
        <Contact />
      </section>
    </div>
  );
}

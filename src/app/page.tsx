import './globals.css' 
import Publications from '@/components/publications';
import { Testimonials } from '@/components/testimonials';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="py-18 px-6 text-center bg-gradient-to-b from-white to-pink-50">
        <h1 className="text-6xl font-bold mb-4 leading-tight">
          COGNITIVE <br />
          CLINICAL & <br />
          COMPUTATIONAL <br />
          NEUROSCIENCE
        </h1>
        <div className="py-6 text-md text-gray-600 max-w-2xl mx-auto">
          <p className="italic">"Curiosity. Critical Thinking. Creativity. Nerds!"</p>
          <p className="mt-2 text-sm ">– Chunharas C., 2025 –</p>
        </div>
      </section>

      {/* People Section */}
      <section id="people" className="py-24 bg-white text-center">
        <Testimonials />
        <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Meet our principal investigators, researchers, and students who drive our mission forward.
        </p>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24 bg-gray-50">
        <Publications /> 
      </section>

      {/* Collaborators Section */}
      <section id="collaborators" className="py-24 bg-white">
        
      </section>

      {/* Activity Section */}
      <section id="activity" className="py-24 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Lab Activities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          We host workshops, attend international conferences, and collaborate across disciplines.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-pink-100 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🧠 Brain Awareness Week</h3>
            <p className="text-sm text-gray-700">Engaging public events promoting neuroscience awareness.</p>
          </div>
          <div className="bg-pink-100 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🎤 VSS Conference</h3>
            <p className="text-sm text-gray-700">Annual presentation of our latest cognitive research.</p>
          </div>
          <div className="bg-pink-100 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🤝 Collaborations</h3>
            <p className="text-sm text-gray-700">Working with labs worldwide to advance brain science.</p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-white">
        
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-4">cccn.lab@gmail.com <br></br> (+66)-2-256-4000 ext.71108</p>
        <p className="text-gray-600 mb-2">Sor Thor Building, Chula Neuroscience Center</p>
        <p className="text-sm text-gray-500">1873 Rama IV Rd, Pathum Wan, Bangkok, 10330</p>
      </section>
    </div>
  );
}

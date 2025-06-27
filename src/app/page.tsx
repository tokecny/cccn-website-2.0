import './globals.css' 
import Publications from '@/components/publications';
import { Testimonials } from '@/components/testimonials';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="py-24 text-center bg-gradient-to-b from-white to-pink-50">
        <h1 className="text-5xl font-bold mb-4">Welcome to CCCN Lab</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We study human cognition, perception, and the brain through experimental psychology and neuroscience.
        </p>
      </section>

      {/* People Section */}
      <Testimonials />
      <section id="people" className="py-24 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Meet our principal investigators, researchers, and students who drive our mission forward.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-40 h-40 bg-gray-100 rounded-full"></div>
          <div className="w-40 h-40 bg-gray-100 rounded-full"></div>
          <div className="w-40 h-40 bg-gray-100 rounded-full"></div>
        </div>
      </section>

      {/* Publications Section */}
      <Publications /> 
      <section id="publications" className="py-24 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-6">Recent Publications</h2>
        <ul className="text-left max-w-2xl mx-auto space-y-4 text-gray-700">
          <li>📄 Yang & Beck (2023). *Familiarity influences visual detection.* <i>Atten Percept Psychophys</i>.</li>
          <li>📄 Chunharas et al. (2022). *Frequency Over Time Matters: Temporal Exposure Shapes Implicit Familiarity.*</li>
          <li>📄 Smith & Jones (2021). *Cognitive control in visual search tasks.*</li>
        </ul>
        <div className="mt-6">
          <a href="#" className="text-pink-500 hover:underline">See all publications →</a>
        </div>
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-4">cccn.lab@email.com</p>
        <p className="text-gray-600 mb-2">Faculty of Psychology, University of Somewhere</p>
        <p className="text-sm text-gray-500">123 Neuroscience Ave, Bangkok, Thailand</p>
      </section>
    </div>
  );
}

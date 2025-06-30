'use client'

export function Contact() {
  return (
    <section id="contact" className="">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-pink-600 mb-4">Contact Us</h2>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1041.437982519937!2d100.5370975686862!3d13.73392455276756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f621d051795%3A0x66bffe068bf3a36c!2sSor%20Thor%20Building!5e0!3m2!1sen!2sth!4v1751246405881!5m2!1sen!2sth"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sor Thor Building Map"
          />
        </div>

        <div className="text-left text-gray-700">
          <p className="mb-4 text-lg font-semibold">Email</p>
          <p className="mb-6">cccn.lab@gmail.com</p>

          <p className="mb-4 text-lg font-semibold">Phone</p>
          <p className="mb-6">(+66)-2-256-4000 ext.71108</p>

          <p className="mb-4 text-lg font-semibold">Location</p>
          <p className="mb-1">Sor Thor Building, Chula Neuroscience Center</p>
          <p className="text-sm text-gray-500">1873 Ratchadamri Rd, Pathum Wan, Bangkok, 10330</p>
        </div>
      </div>
    </section>
  )
}

"use client";

export function Contact() {
  return (
    <section id="contact" className="">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-pink-500 mb-8">Contact</h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          <p className="mb-2 lg:mb-4 text-sm lg:text-base">
            We’re always excited to welcome new minds passionate about science
            and collaboration.<br></br>
            <a
              className="text-pink-500 hover:underline transition"
              href="/cccn-lab-joining-details.pdf"
              download
            >
              Read through the details
            </a>{" "}
            — then drop us an email!
          </p>

          <p className="text-base lg:text-lg font-semibold">Email</p>
          <p className="mb-2 lg:mb-4 text-sm lg:text-base">
            <a
              href={`mailto:cccn.lab@gmail.com?subject=Join%20CCCN%20Lab&body=Hi%20CCCN%20Lab%2C%0A%0AMy%20name%20is%20[Your%20Name]%20and%20I%E2%80%99m%20interested%20in%20joining%20the%20lab.%0A%0APlease%20find%20attached%20my%20CV%2C%20one-page%20summary%2C%20and%20certificate.%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C%0A[Your%20Name]`}
              className="hover:text-pink-500 hover:underline transition"
            >
              cccn.lab@gmail.com
            </a>
          </p>

          <p className="text-base lg:text-lg font-semibold">Phone</p>
          <p className="mb-2 lg:mb-4 text-sm lg:text-base">
            (+66)-2-256-4000 ext.71108
          </p>

          <p className="text-base lg:text-lg font-semibold">Location</p>
          <p className="mb-1 lg:mb-2 text-sm lg:text-base">
            Sor Thor Building, Floor 11, Chula Neuroscience Center
          </p>
          <p className="text-sm text-gray-500">
            1873 Ratchadamri Rd, Pathum Wan, Bangkok, 10330
          </p>
        </div>
      </div>
    </section>
  );
}

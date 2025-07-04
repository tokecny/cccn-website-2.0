import Image from "next/image";

const collaborators = [
  {
    img: "/collaborators/pcl.png",
    name: "Serences Lab",
    url: "https://serenceslab.ucsd.edu/",
  },
  {
    img: "/collaborators/vml.png",
    name: "The Vision & Memory Lab",
    url: "https://bradylab.ucsd.edu/",
  },
  {
    img: "/collaborators/pam.png",
    name: "BrainSt\u00F6rmer Lab",
    url: "https://sites.dartmouth.edu/stoermerlab/",
  },
  {
    img: "/collaborators/rmk.png",
    name: "Rademaker Lab",
    url: "https://www.rademakerlab.com/",
  },
  {
    img: "/collaborators/cbc.png",
    name: "Center for Brain and Cognition",
    url: "https://psychology.ucsd.edu/people/profiles/vramachandran.html",
  },
  {
    img: "/collaborators/chics.png",
    name: "Chula Intelligent and Complex Systems",
    url: "https://www.facebook.com/people/Chula-Intelligent-and-Complex-Systems-CHICS/100057245717550/#",
  },
  {
    img: "/collaborators/nx.png",
    name: "Neuroscience Center for Research and Innovation @KMUTT",
    url: "https://nx.kmutt.ac.th/",
  },
];

export default function Collaborators() {
  return (
    <section className="" id="collaborators">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-pink-500 relative inline-block">
          Collaborators
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center px-4 sm:px-0">
        {collaborators.map((collab, i) => (
        <a
            key={collab.name}
            href={collab.url}
            target="_blank"
            rel="noopener noreferrer"
            title={collab.name}
            className="flex flex-col items-center group animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
        >
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-gray-200 shadow-md group-hover:shadow-xl transform group-hover:scale-105 transition duration-300 ease-in-out">
            <Image
                src={collab.img}
                alt={collab.name}
                width={176}
                height={176}
                className="object-cover w-full h-full"
            />
            </div>
            <p className="text-sm sm:text-base text-center mt-4 text-gray-500 group-hover:text-pink-500 font-medium transition-colors duration-300 leading-snug max-w-[10rem] sm:max-w-[12rem]">
            {collab.name}
            </p>
        </a>
        ))}
      </div>
    </section>
  );
}

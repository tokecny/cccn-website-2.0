export function Activities() {
  return (
    <>
      <h2
        id="activities"
        className="text-3xl font-semibold tracking-tight 
            text-pink-500 mb-8 scroll-mt-8 
              lg:scroll-mt-24"
      >
        Activities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl aspect-auto w-full sm:min-h-[550px] rounded-2xl overflow-hidden shadow-lg col-span-1 md:col-span-2">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=9043de76e2f595533cbd71bd7c2f092e3fccb19784b5dfb82021bb11792e8820%40group.calendar.google.com&ctz=Asia%2FBangkok"
            className="w-full h-auto min-h-full aspect-square"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CCCN Lab Activity Calendar"
          />
        </div>
        <div className="mx-auto h-full w-full aspect-1 col-span-1 flex flex-col items-center justify-around bg-white/50 rounded-2xl shadow-2xl p-8 space-y-4">
          <h1 className="text-balck text-xl font-semibold">
            <span className="text-pink-300">Co</span>
            <span className="text-blue-300">R</span>
            <span className="text-blue-400">N</span>2025
          </h1>
          <h2 className="text-gray-700 text-base font-medium">
            Exploring Consciousness through Frontier Research & Theories
          </h2>
          <h3 className="text-gray-600 text-sm">6–8 August 2025</h3>
          <p className="text-gray-500 text-sm">
            <a href="https://g.co/kgs/wo2QYQ3">
              King Chulalongkorn Memorial Hospital, Bangkok, Thailand
            </a>
          </p>
          <div>
            <img
              className="flex w-1/2 rounded-lg mx-auto h-auto"
              src="corn2025/NimitrSight_ Book_v1_s1000.png"
            />
            <a
              href="https://www.conresnet.org/corn-2025.html"
              className="text-pink-500 text-base text-center"
            >
              <span className="underline underline-offset-4">@CoRN2025</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

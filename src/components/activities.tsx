export function Activities() {
  return (
    <section  className="px-6">
      <h2 id="activities" className="text-3xl font-semibold tracking-tight text-pink-500 mb-8 scroll-mt-24">
        Activities
      </h2>
      <div className="mx-auto max-w-5xl aspect-[4/3] sm:h-[550px] sm:w-[700px] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=9043de76e2f595533cbd71bd7c2f092e3fccb19784b5dfb82021bb11792e8820%40group.calendar.google.com&ctz=Asia%2FBangkok"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CCCN Lab Calendar"
        />
      </div>
    </section>
  );
}

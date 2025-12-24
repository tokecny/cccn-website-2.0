export function Calendar() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg h-[360px] sm:h-[400px] md:h-[440px] lg:h-[550px]">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=9043de76e2f595533cbd71bd7c2f092e3fccb19784b5dfb82021bb11792e8820%40group.calendar.google.com&ctz=Asia%2FBangkok"
        className="h-full w-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="CCCN Lab Calendar"
      />
    </div>
  );
}
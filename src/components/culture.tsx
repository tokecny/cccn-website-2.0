"use client";

export function Culture() {
  return (
    <section id="culture" className="">
       <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <div>
            <h2 className="text-3xl font-semibold text-pink-500">
            Culture
            </h2>
            <p className="mb-8 text-pink-500">
            (And Things We Value)
            </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-10 hover:shadow-lg transition-all">
            <ul className="text-gray-800 text-left space-y-6 max-w-2xl mx-auto">
            <li>
                <strong className="text-pink-500 text-sm sm:text-base">Regular lab meetings (every 1–2 times per week):</strong> 
                <p className="text-sm">for sharing ideas, progress, and cool brain-related stuff.</p>
            </li>
            <li> 
                <strong className="text-pink-500 text-sm sm:text-base">Team learning spirit:</strong> 
                <p className="text-sm">We value learning how to learn – independently and together.</p> 
            </li>
            <li>
                <strong className="text-pink-500 text-sm sm:text-base">Supportive atmosphere:</strong> 
                <p className="text-sm">If something unexpected happens, just let us know. We care.</p>
            </li>
            <li>
                <strong className="text-pink-500 text-sm sm:text-base">Flexible working style:</strong> 
                <p className="text-sm">Work when/where suits you – but we love spending time together in the lab (there might be snacks).</p>
            </li>
            <li> 
                <strong className="text-pink-500 text-sm sm:text-base">Respect for work-life balance:</strong> 
                <p className="text-sm">No pressure to respond outside office hours.</p>
            </li>
            <li>
                <strong className="text-pink-500 text-sm sm:text-base">Diversity is our strength:</strong> 
                <p className="text-sm">We cherish diverse backgrounds – cultural, academic, personal. Respect and empathy are non-negotiable.</p>
            </li>
            </ul>
        </div>
    </div>
    </section>
  );
}

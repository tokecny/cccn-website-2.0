"use client";

import * as Headless from "@headlessui/react";
import { RefreshCw} from "lucide-react"; // เพิ่ม icon
import { clsx } from "clsx";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { Container } from "./container";
import { Link } from "./link";
import { Badge } from "./ui/badge";
// import { Heading, Subheading } from './text'

const testimonials = [
  {
    img: "/testimonials/Gig.jpg",
    name: "Chaipat Chunharas",
    title: "Clinician-Scientist",
    quote: `"HAIL SCIENCE"`,
    isAlumni: false,
    info: `Chaipat is equally interested in how normal brain and brain disorders affect human behaviors. \n\nHe received his internal medicine training from Khon Kaen University (TH), neurology training from Chulalongkorn University (TH), and later went to pursue his Ph.D. in experimental psychology at the University of California San Diego. \n\nDuring his time at UCSD, he studied how humans misperceived current information or misremembered past information in interesting ways under the guidance of wonderful mentors; Dr. John Serences, Dr. Timothy Brady, Dr. Rossane Rademaker, Dr. Viola St\u00F6rmer, Dr. Eric Halgren, and Dr. VS Ramachandran. \n\nHis current works focus on bringing psychology and neuroscience perspective to clinical neurology and vice versa using psychophysical methods with various neuro-imaging (MRI, fMRI, DTI, EEG). Whenever possible, he will try to tell people around him how excited brain science is (not always succeed though). \n\nWhen he is not a researcher nor a doctor, he enjoy being a silly dad and reading some good books.`,
  },
  {
    img: "/testimonials/Pete.jpg",
    name: "Sedthapong Chunamchai",
    title: "Clinician-Scientist",
    quote: `"I'm the right one."`,
    isAlumni: false,
    info: `Sedthapong is a neurologist with a keen interest in cognitive and behavioral neurology. After graduated, he fortunately has a chance to experience lots of interesting issues in the CCCN lab. \n\nHe tries to learn and practice in this new world. His focus is on the effect of sleep on cognition, how our brain works during sleep and language.`,
  },
  {
    img: "/testimonials/Pim.png",
    name: "Anthipa Choksuwattanasakul",
    title: "Clinician-Scientist",
    quote: `"I’m the only sane one in the lab."`,
    isAlumni: false,
    info: `Anthipa is a neurologist with research interests in cognitive neurology and brain structural changes in aging and neurodegenerative conditions. \n\nHer work focuses on how hypoxia, sleep disorders, and neurological diseases affect cortical thickness, white matter integrity and cognitive performance.`,
  },
  {
    img: "/testimonials/Joe.jpg",
    name: "Setthanan Jarukasemkit",
    title: "Clinician-Scientist",
    quote: `"Wherever I go, I pose."`,
    isAlumni: false,
    info: `Setthanan is a medical graduate from the Faculty of Medicine at Ramathibodi Hospital, Mahidol University (Class of 2023), with a vision of becoming a neuropsychiatrist before the age of thirty. \n\nHis interests extend beyond clinical medicine to the realm of complex systems science—especially brain networks, human cognition, and social behavior. His current research focuses on the human connectome and aims to develop connectomic fingerprints (via fMRI, DTI, EEG) as predictive biomarkers for neuropsychiatric disorders. He is passionate about bridging the gap between the patient’s brain, mind, and behavior through interdisciplinary research. \n\nOutside the lab, Joe is a wine enthusiast, scuba diver, and avid reader who’s always eager to exchange ideas over thoughtful dialogue.`,
  },
  {
    img: "/testimonials/Arp.jpg",
    name: "Arp-Arpa Kasemsantitham",
    title: "Clinician-Scientist",
    quote: `"Post-rock for peace, \njazz for the madness."`,
    isAlumni: false,
    info: `Arp-Arpa graduated from New York University (NYU) and previously worked as a research assistant under Dr. Marjorie Rhodes at the Conceptual Development and Social Cognition (CDSC) Lab, before joining the CCCN Lab as a medical student. \n\nRecently, she completed her CU-MEDi program and spent a year interning in Boston, further expanding her academic and clinical experience. Now back in Thailand and awaiting her government service placement, she continues to contribute to the CCCN Lab, engaging in exciting projects with the team. \n\nInspired by those around her, Arp-Arpa is interested in how affect, behaviors, and cognition intertwine particularly as studied through neuroimaging techniques, mapping the many (dis)connections between brain structure and function. \n\nOutside of research, she enjoys daydreaming, re-reading Camus, and organizing indie concerts at around the city.`,
  },
  {
    img: "/testimonials/Pun.jpg",
    name: "Chattarin Poungtubtim",
    title: "Clinician-Scientist",
    quote: `"My brain erased everything, \nexcept your face."`,
    isAlumni: false,
    info: `Chattarin recently completed his M.D., During his clinical clerkship, he was often described as lacking energy and motivation—especially in the operating room, where he now vows never to return. Fortunately, he found renewed purpose in the pursuit of neuroscience, mathematics, and computer science. \n\nDriven by fundamental questions such as how humans learn, think, and make causal inferences with limited data, Chattarin aspires to one day build machines that think and learn like humans. For now, his current research focuses on auditory perceptual learning, where his colleagues endure heart sound identification tasks, while he dreams of visualizing the murmur associated cortex inside the cardiologist’s brain. \n\nWhen he’s not obsessing over work, you might catch him at a cool jazz bar, deep into music—or out on the streets capturing odd, candid moments through his lens. Talk to him about books or philosophy, and you’ll find someone as deeply curious as he is unconventional. \n\nHe has recently been admitted to the Ph.D. program at UC San Diego, where he will study under Professor Tim Brady.`,
  },
  {
    img: "/testimonials/Bank.jpg",
    name: "Nithit Singtokum",
    title: "Clinician-Scientist",
    quote: `"Why fall in love \nwhen you can fall asleep?."`,
    isAlumni: false,
    info: `Nithit recently completed his M.D. at Chulalongkorn University, having fulfilled his government service commitment. Now, he's ready to return to the lab with full energy and dedication. \n\nHis primary passion lies in caring for patients with cognitive impairment, and he is equally drawn to cognitive neuroscience, especially in the realms of visual perception, imagery and working memory. His recent research focused on mental imagery, aiming to deepen our understanding of the difference in the ability to create mental images among individuals. He is eager to expand this line of research and collaborate on future projects that bridge clinical practice with cognitive science. \n\nOutside the lab, He enjoys listening to 90s music, watching movies and series, and discovering great dining spots a balance of nostalgia and novelty that reflects his approach to both life and science.`,
  },
  {
    img: "/testimonials/Tan.jpg",
    name: "Kanathip Jongmekwamsuk",
    title: "Clinician-Scientist",
    quote: `"Be happy, not sappy"`,
    isAlumni: false,
    info: `Kanathip is a medical student with a deep fascination for the cognitive neuroscience of language and learning. He was enrolled in the dual MD/MSc program at Chulalongkorn University, where he developed a strong interest in the interplay between cognition, language, and culture especially in the context of metacognition and meta-learning. \n\nHis current work explores language-related cognitive impairments and strategies for manipulating learning processes. His long-term vision is what he calls “The Map of Everything” a comprehensive mapping of his entire brain. \n\nKanathip spent a year as a research intern at the Rademaker Lab, an experience that significantly shaped his academic and scientific perspective. He is now utilizing the grant he previously earned, while looking for the right opportunity to return and continue his work with the lab. \n\nOutside of his scientific life, Kanathip is drawn to the aesthetics of taste and scent. He can often be found roaming the city in search of memorable food, fine wine, and fragrant perfume.`,
  },
  {
    img: "/testimonials/Prin.jpg",
    name: "Naphapa Panyanirun",
    title: "Clinician-Scientist",
    quote: `"Don't forget to place your teeth \nbeneath the pillow tight."`,
    isAlumni: false,
    info: `Naphapa is a recent medical graduate from Chulalongkorn University, currently fulfilling her post-graduate service obligation. \n\nHer academic interests lie in the field of Cognitive and Behavioral Neuroscience, particularly the influence of visual experience on chest X-ray (CXR) interpretation. \n\nWith a growing curiosity in computer programming, she is actively working to sharpen her coding skills alongside her clinical training. Beyond the lab, Naphapa has been an engaged member of the medical student community and continues to bring that same energy to her current roles. \n\nOutside of science and medicine, she enjoys reading, playing guitar, spending meaningful time with people and above all else, she lives for coffee.`,
  },
  {
    img: "/testimonials/James.png",
    name: "Sasin Treeratana",
    title: "Clinician-Scientist",
    quote: `"I'm Bond, James Bond."`,
    isAlumni: false,
    info: `Sasin graduated with his M.D. from Siriraj Hospital in 2025. \n\nDuring his medical training, he developed a deep curiosity for neuropsychiatric disorders often labeled as “non-localizable,” challenging the traditional frameworks used to understand them. \n\nBelieving that our conventional brain atlas no longer captures the true complexity of the mind, he is now focusing on fMRI-based analyses to identify large scale brain network disruptions, shifting away from the idea that symptoms arise from discrete lesions alone. His work aims to update how we localize, map, and interpret brain dysfunction one network at a time.`,
  },
  {
    img: "/testimonials/Mos.jpg",
    name: "Waragon Phusuwan",
    title: "Graduate Student",
    quote: `"I find problems \nto every solutions"`,
    isAlumni: false,
    info: `Waragon is a Thai-born academic mischief-maker who proudly graduated from the Department of Physics at Chulalongkorn University, only to dive headfirst into the neural murk as a PhD student under Dr. Chaipat Chunharas. Now entrenched in the world of cognitive and computational neuroscience, He doesn’t just solve problems he finds problems to every solution, poking at the cracks where others see solid ground.\n\nHis research dances through the cerebral folds of representational geometry, topographic organization, and the beautiful mess of invariance in neural codes. Whether it’s questioning the shaky assumptions behind hippocampal replay analysis or dissecting the hidden biases in data pipelines, he thrives on challenging the default. If a method seems too clean, he’s already suspicious.\n\nOutside the lab (or sometimes secretly in it), he moonlights as a cybersecurity and web development enthusiast. He sees networks biological or digital as systems just waiting to be poked, prodded, and occasionally pentested. Building neural models by day and breaking web apps by night, he treats code and cognition with the same level of irreverent precision.\n\nHe isn’t just a student he’s a professional thorn in the side of assumptions, a debugger of ideas, and a full-time explorer of where theory, computation, and chaos collide.`,
  },
  {
    img: "/testimonials/Vicky.png",
    name: "Payachana Victoria Chareunsouk",
    title: "Graduate Student",
    quote: `"Skip the coaster thrills, \nride with Vicky on wheels!"`,
    isAlumni: false,
    info: `Payachana or simply Vicky, is a Ph.D. student with a strong interest in neuropsychological testing in the aging population and working memory. She holds double master’s degrees in Microbiology & Immunology and Behavior, bringing a unique interdisciplinary perspective to her work.\n\nBefore her current academic journey, Vicky had hands-on experience in behavioral therapy for autistic children, which helped solidify her passion for clinical and cognitive research. When she’s not in the lab, Vicky is often out rock climbing or enjoying the outdoors, where she finds balance and energy to support both body and mind.`,
  },
  {
    img: "/testimonials/Ben.png",
    name: "Benjamin Conan",
    title: "Graduate Student",
    quote: `"Mind if I chime in?"`,
    isAlumni: false,
    info: `Benjamin is graduate with a master's degree, soon to pursue a Ph.D. at the Faculty of Medicine, Chulalongkorn University. Driven by a long-standing fascination with the nature of emotion, he is currently immersed in collecting EEG data his latest attempt to decode and validate the elusive forces that move us.\n\nAround the lab, Ben is known for his charming mischief, bringing a spark of unpredictability to even the most ordinary days. Outside of research, he embraces life in full French flair part hopeless romantic, part lovable rogue, always a little bit of both.`,
  },
  {
    img: "/testimonials/Oat.jpg",
    name: "Kitnipat Boonyadhammaku",
    title: "Researcher",
    quote: `"Born to blaze in a blazer."`,
    isAlumni: false,
    info: `Kitnipat is widely regarded as the most experienced EEG data collector in the lab. His mastery extends beyond technical precision he has a remarkable ability to build rapport with elderly participants, making them feel as if they were among family. His warmth and patience have become a cornerstone of the lab’s neuropsychological data collection process. \n\nBeyond his research skills, Kitnipat is unmistakable in style. Rarely seen without a sharp blazer, he channels the energy of a British gentleman on hospital rounds. His vibrant and consistent wardrobe has become a quiet legend in the corridors of the clinic.`,
  },
  {
    img: "/testimonials/Nan.jpg",
    name: "Kanokwanwijit Wongsook",
    title: "Researcher",
    quote: `"Took me a lifetime \nto learn how to drive."`,
    isAlumni: false,
    info: `Kanokwanwijit graduated with a degree in Physics before stepping into the world of neuroscience as a research assistant, focusing on EEG data collection from human participants for over a year. She is currently working on designing new cognitive tasks, laying the groundwork for her aspiration to pursue graduate studies abroad.\n\nHer current obsession? Time to contact a concept that fascinates her deeply, and might just be the key to unlocking her next academic journey.`,
  },
  {
    img: "/testimonials/Phu.jpg",
    name: "Phutanik Setasartit",
    title: "Research Assistant",
    quote: `"I'm a zebra on Jeep"`,
    isAlumni: false,
    info: `Phutanik began his journey in the lab as a part time psychologist, assisting with data collection. Over time, he gradually developed both his expertise and a deep fascination with neuroscience. His dedication and curiosity eventually led to a full time position in the lab, where he now plays a pivotal role in various projects. \n\nHe is currently exploring side projects with the goal of presenting his work on international stages. With quiet determination, he is preparing for the next big step pursuing a Ph.D. in the near future.`,
  },
  {
    img: "/testimonials/Nat.jpg",
    name: "Neeranuch Kittikiatkumjorn",
    title: "Research Assistant",
    quote: `"Read hard before you ask."`,
    isAlumni: false,
    info: `Neeranuch is a research assistant with a sweet spot for ice cream and a deepening interest in Cognitive Psychology. Her current research focuses on understanding how risk taking behaviors in young adults relate to cognitive functioning and resting state brain networks.\n\nHer academic interests revolve around perception and learning, and she’s steadily building her expertise in how the mind adapts and makes decisions. While her research questions are serious, her cheerful demeanor and love of frozen desserts keep the lab a little cooler and a lot brighter.`,
  },
  {
    img: "/testimonials/Tae.jpg",
    name: "Kittkorn Rattanakorn",
    title: "Undergraduate Researcher",
    quote: `"You're the sun \nI’d blind myself for."`,
    isAlumni: false,
    info: `Kittikorn is a medical student currently immersed in his clinical training. His journey with the lab began with occasional visits, but soon grew into a genuine interest. Since then, he has been working on a personal project, driven by curiosity and self initiative.\n\nThough currently focused on his medical rotations, he has expressed a desire to return once he completes his degree. The lab community continues to eagerly cheer him, awaiting his return with great anticipation.`,
  },
  {
    img: "/testimonials/Punt.jpg",
    name: "Punyawish Patumhirunruksa",
    title: "Undergraduate Researcher",
    quote: `"The Sun never \nbothers me anyway."`,
    isAlumni: false,
    info: `Punyawish is the youngest medical student in the lab, yet already recognized as one of its rising stars. Balancing a rigorous medical curriculum with research, he currently works under the supervision of Viola Störmer, where his exceptional coding skills have made him a key contributor to several projects.\n\nHis dedication, curiosity, and technical expertise make it clear that the question is not whether he’ll pursue a Ph.D. but rather when he’ll earn it.`,
  },
  {
    img: "/testimonials/Phare.jpg",
    name: "Pharewa Kaewmanee",
    title: "Psychologist",
    quote: `"Official full-time \nbabysitter of Punyawish."`,
    isAlumni: false,
    info: `Pharewa is a psychologist who graduated from Kasetsart University. After completing an internship at King Chulalongkorn Memorial Hospital, she joined the clinical team full time and quickly became a central figure in the lab’s clinical operations. Currently, she serves as the clinical team lead, overseeing data collection and coordinating fieldwork for multiple research projects whenever and wherever her supervisor requires.\n\nShe is in the process of preparing for the Thai psychology licensing exam, specifically the legal knowledge component, and hopes to obtain full licensure soon. The lab looks forward to having her remain its clinical commander for many years to come.\n\nOutside of work, Pharewa has a soft spot for Stitch, the mischievous little blue alien who’s won her heart.`,
  },
  {
    img: "/testimonials/Tok.png",
    name: "Thiti Chainiyom",
    title: "Chaipat's Sidekick",
    quote: `"Cactus needs a drop, they said. tested the theory - now it’s dead."`,
    isAlumni: false,
    info: `Thiti began with collecting cognitive data from older adults just before Thailand’s second wave of the COVID-19 outbreak. Then came a bold idea from his boss: build a website that puts cognitive tasks online, gamifies the experience with scoring, and lets older adults participate from home. The job? Fell to him. \n\nAfter that website surprisingly succeeded, he shifted toward managing the lab’s long to-do list: coordinating logistics, handling paperwork, finance, even buying tissue paper for the team. Nothing was too small. \n\nFollowing a visit to VSS2024, he became intrigued by the idea of pursuing a Ph.D., though the timing isn’t quite right yet. For now, he’s learning gradually, aiming to submit side projects to future VSS meetings. One step at a time. He does want to go back to the U.S. for Jai Alai. \n\nThis website? He built it. Thanks go to his boss, who introduced him (against his will) to the world of code he once considered digital torture and to Waragon, his fiercely strict programming mentor. This is their work too, for as long as this domain breathes.`,
  },
  {
    img: "/testimonials/Preaw.jpg",
    name: "Anantaporn Sena",
    title: "Researcher (2020 - 2025)",
    quote: `"Two cones are better than one."`,
    isAlumni: true,
    info: `Anantaporn is a clinical psychologist who graduated from Thammasart University with a Bachelor of Liberal Arts degree in Psychology. Her academic passion lies in experimental psychology, particularly in the realm of psychophysics. \n\nUnexpectedly drawn into the world of data during her time in the lab, she took on the role of a data visualization engineer and found herself increasingly immersed in data science. She has since continued to expand her skills in this field with intention and focus. Her recent work involved analyzing brain structural and cognitive developmental changes in children living with HIV. \n\nCurrently, Praew is working at the Data Center of King Chulalongkorn Memorial Hospital, where she analyzes complex clinical datasets and helps improve workflows for both clinics and hospital operations. \n\nOutside of work, she’s a cat person at heart, often found enjoying good food, fine tea, music, and making people around her feel at ease.`,
  },
  {
    img: "/testimonials/Gann.jpg",
    name: "Gann Boonyaprapatsara",
    title: "Clinical Psychologist (2020 - 2024)",
    quote: `"Drip coffee by morning, \npour wine by night."`,
    isAlumni: true,
    info: `Gann was the most senior member of the legendary “Psycho5” the first group of five psychologists who laid the clinical foundation of the lab. As the longest serving clinical psychologist in the team, Gann had a remarkable ability to navigate every aspect of psychological assessments, regardless of patient type or testing complexity. Calm under pressure and exceptionally thorough, Gann earned a reputation as the lab’s most dependable clinical expert.\n\nAfter leaving the lab, Gann transitioned into the clinical aging sector, taking on the role of Business Development. It was a natural progression for someone with both clinical insight and strategic thinking. With a deep understanding of geriatric care and unwavering commitment, Gann continues to shape the landscape of eldercare services now not just from the front lines, but from behind the scenes as well.`,
  },
  {
    img: "/testimonials/Kate.jpg",
    name: "Thitisa Sudayuworn",
    title: "Psychologist (2020 - 2023)",
    quote: `"Carving patterns on ice, \nlounging lazy in bed."`,
    isAlumni: true,
    info: `Thitisa earned her Bachelor of Science in Psychology from the University of California, Davis. During her time at the lab, she developed a growing interest in clinical psychology, optogenetics, and neuroscience. She continuously honed her skills in data computation and statistical analysis, working with tools like Python and R Studio.\n\nShe has since moved on to a new chapter at Kasikorn Bank (KBank) in a role that may not be fully known to us but what’s certain is that, just like before, she’s doing brilliantly and remains deeply appreciated by everyone around her, exactly as we once were.`,
  },
  {
    img: "/testimonials/Guy.jpg",
    name: "Pattarathorn Jongjarearnsuntikul",
    title: "Psychologist (2020 - 2023)",
    quote: `"Behind every bright smile, \na silent flame."`,
    isAlumni: true,
    info: `Pattarathorn graduated from the Faculty of Social Sciences, Department of Psychology at Kasetsart University. Her core interest lies in neuropsychology, and during his time with the CCCN lab, she worked on developing a web application for MCI (Mild Cognitive Impairment) screening in older adults. \n\nShe later pursued further education in clinical psychology, successfully completing his professional training and earning his clinical psychologist license. Since then, she has been gathering valuable clinical experience across various hospital settings, steadily building her expertise.`,
  },
  {
    img: "/testimonials/Kratai.jpg",
    name: "Natrada Rattanapong",
    title: "Psychologist (2022 - 2024)",
    quote: `"I wish I could drink cocktails instead of water."`,
    isAlumni: true,
    info: `Natrada graduated with a Bachelor’s degree in Clinical Psychology from Kasetsart University. She began her journey in research as a psychology research assistant at CCCN, where she had the opportunity to practice and deepen her skills in neuropsychology, especially in areas she’s most passionate about memory, attention, and language.\n\nAfter gaining hands-on experience in the lab, she has now transitioned into her new role as a counseling psychologist in a clinic, continuing her commitment to supporting mental health. Outside of work, she maintains her beloved daily ritual of seeking out a perfect cup of coffee.`,
  },
  {
    img: "/testimonials/Fah.jpg",
    name: "Pornnapat Chernprateep",
    title: "Psychologist (2022 - 2023)",
    quote: `"Looks like honey, \ntastes like lime."`,
    isAlumni: true,
    info: `Pornnapat once joined the lab as a research intern, where she expressed a strong interest in Clinical Neuropsychology. With a candid sense of humor, she often remarked that she could be “passionately committed to her work as long as there's an incredible amount of knowledge and money ready for her.” \n\nSince leaving the lab, she has moved into the private sector, likely outside the traditional path of clinical psychology. But for anyone who has worked with her, there’s no doubt she’s doing great, wherever she is.`,
  },
  {
    img: "/testimonials/Ning.jpeg",
    name: "Pinvasa Sae-chiew",
    title: "UX/UI Designer (2022 - 2023)",
    quote: `"I think I misplaced\nmy brain today..."`,
    isAlumni: true,
    info: `Pinvasa is a UX/UI designer with a background in psychology. During her time at the lab, she worked on designing an application to support hearing related use cases. Her passion for art and user-centric design made her role uniquely impactful—blending creativity with a deep understanding of user behavior. \n\nWith a calm demeanor and endearing absentmindedness, Ning brought a refreshing vibe to the team. She believed that her psychology degree gave her valuable insight into user experience, helping her craft interfaces that truly connect with people.\n\nAfter leaving the lab, she moved on to the private sector. While the lab surely misses having someone with her charming blend of brilliance and gentle chaos`,
  },
  {
    img: "/testimonials/Tung.png",
    name: "Tanupat Boonchalermvichien",
    title: "Researcher (2020 - 2022)",
    quote: `"Mouth like a sailor, \nface like a model."`,
    isAlumni: true,
    info: `Tanupat is a general practitioner who graduated from the Faculty of Medicine, Chulalongkorn University. His background includes experience in field epidemiology and computational biology, equipping him with a multidisciplinary foundation for tackling real world health data challenges. \n\nCurrently, he focuses on signal processing, with ongoing projects involving patient voice data. His academic and technical interests span across causal inference, network science, machine learning, and natural language processing (NLP). \n\nAfter completing his master’s degree in the United States, he returned to Thailand and became one of the co-founders of the data center at King Chulalongkorn Memorial Hospital`,
  },
  {
    img: "/testimonials/Yuki.jpeg",
    name: "Kanokphorn Boonlert",
    title: "Research Assistant (2020 - 2022)",
    quote: `"Yoko, move aside. \nIt’s my turn now."`,
    isAlumni: true,
    info: `Kanokphorn is a research assistant who graduated with a Bachelor's degree in Psychology from Chulalongkorn University. \n\nHer academic interests include clinical psychology, neuropsychological assessment, and age-related cognitive decline. At CCCN, she was involved in a mind wandering research project utilizing eye tracking technology to explore the drifting mind. \n\nThough her current professional pursuits are unknown, one thing is certain she has found her own John Lennon. She has since crossed skies, married him, and is likely now living a rock-and-roll life somewhere amidst strawberry fields,`,
  },
  {
    img: "/testimonials/Ik.jpeg",
    name: "Kanyarat Benjasupawan",
    title: "Research Assistant (2021 - 2023)",
    quote: `"People disappoint. \nDogs don’t."`,
    isAlumni: true,
    info: `Kanyarat has always been intrigued by the question: “What makes us human?” a curiosity that led her to pursue a path in neuroscience. She holds an MRes in Translational Neuroscience from University College London, and a BSc in Neuroscience from the University of Edinburgh, United Kingdom. \n\nHer academic work focused on visual attention and its decline with age and other cognitive factors, using EEG combined with neural decoding models. Beyond her research, she is passionate about science communication and actively advocates for reducing the stigma surrounding mental health. \n\nKanyarat has since moved on to join an external organization, where she now works in the realm of data systems and analytics, contributing her skills to improve healthcare and clinical workflows. Still true to her British training, she can often be found enjoying a quiet moment with tea and scones.`,
  },
];

function TestimonialCard({
  name,
  title,
  img,
  children,
  bounds,
  scrollX,
  isAlumni,
  info = "",
  isOpen,
  onToggle,
  ...props
}: {
  img: string;
  name: string;
  title: string;
  children: React.ReactNode;
  bounds: DOMRectReadOnly;
  scrollX: MotionValue<number>;
  isAlumni?: boolean;
  info?: string;
  isOpen: boolean;
  onToggle: () => void;
} & HTMLMotionProps<"div">) {
  const [showInfo, setShowInfo] = useState(false);
  let ref = useRef<HTMLDivElement | null>(null);

  let computeOpacity = useCallback(() => {
    let element = ref.current;
    if (!element || bounds.width === 0) return 1;

    let rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left;
      let percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right;
      let percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else {
      return 1;
    }
  }, [ref, bounds.width, bounds.left, bounds.right]);

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  useMotionValueEvent(scrollX, "change", () => {
    opacity.set(computeOpacity());
  });

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className={clsx(
        "relative flex aspect-[2/3] sm:aspect-3/4 w-72 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl sm:aspect-3/4 sm:w-96",
        isAlumni && "opacity-80 grayscale-[30%]"
      )}
    >
      {/* Alumni Badge */}
      {isAlumni && !isOpen && (
        <Badge className="absolute top-3 right-3 z-10 bg-pink-500 text-pink-100 text-xs font-semibold">
          Alumni
        </Badge>
      )}

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="cursor-help absolute bottom-3 right-3 z-10 bg-pink-500/70 text-white/60 p-1 rounded-full shadow hover:bg-white hover:text-black hover:shadow-gray-600 transition hover:scale-110"
        aria-label="Show info"
      >
        <RefreshCw className={`w-4 h-4 transition-all ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      <div
        className={`absolute bottom-3 right-3 w-6 h-6 z-5 bg-pink-500/40 rounded-full transition ${
          isOpen ? "" : "animate-ping hover:animate-none"
        }`}
      />

      {/* Flip wrapper */}
      <motion.div
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full [transform-style:preserve-3d] [perspective:1000px]"
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden">
          <img
            alt=""
            src={img}
            className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
          />
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-gray-950/10 ring-inset sm:from-25%"
            aria-hidden="true"
          />
          <figure className="relative p-6 sm:p-10 h-full flex flex-col justify-end">
            <blockquote className="mb-4">
              <p className="text-sm leading-snug sm:text-base md:text-lg text-center whitespace-pre-wrap text-white">
                {typeof children === "string"
                  ? children.split("\n").map((line, idx) => (
                      <span key={idx} className="block" style={{ lineHeight: "1.4" }}>
                        {line}
                      </span>
                    ))
                  : children}
              </p>
            </blockquote>
            <figcaption className="border-t pt-4 border-white/20 text-center text-white text-md">
              <p className="font-medium">{name}</p>
              <p className="text-pink-300 font-medium">{title}</p>
            </figcaption>
          </figure>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden rounded-3xl bg-white">
          <div className="flex flex-col justify-between h-full p-6 sm:p-10">
            <div className="overflow-y-auto max-h-[24rem] text-gray-800 text-[12px] text-justify max-w-[42ch] leading-relaxed whitespace-pre-line mx-auto">
              {info}
            </div>
            <figcaption className="mt-4 pt-4 border-t border-gray-300 text-center text-md text-gray-600">
              <p className="font-medium">{name}</p>
              <p className="text-pink-500 font-medium">{title}</p>
            </figcaption>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CallToAction() {
  return (
    <div>
      {/* UNUSED Text */}
      <p className="max-w-sm text-sm/6 text-gray-600">
        {/* Join the best sellers in the business and start using Radiant to hit
        your targets today. */}
      </p>
      <div className="mt-2">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
        >
          {/* Get started */}
          {/* <ArrowLongRightIcon className="size-5" /> */}
        </Link>
      </div>
    </div>
  );
}

export function Testimonials() {
  let scrollRef = useRef<HTMLDivElement | null>(null);
  let { scrollX } = useScroll({ container: scrollRef });
  let [setReferenceWindowRef, bounds] = useMeasure();
  let [activeIndex, setActiveIndex] = useState(0);
  const [activeInfoIndex, setActiveInfoIndex] = useState<number | null>(null);

  useMotionValueEvent(scrollX, "change", (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth));
  });

  function scrollTo(index: number) {
    let gap = 32;
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth;
    scrollRef.current!.scrollTo({ left: (width + gap) * index });
  }

  return (
    <div className="overflow-hidden">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight text-pink-500 mb-8">
          People
        </h2>
        <div ref={setReferenceWindowRef}>
          {/* UNUSED Heading */}
          {/* <Subheading>What everyone is saying</Subheading>
          <Heading as="h3" className="mt-2">
            Trusted by professionals.
          </Heading> */}
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          "max-w-6xl mx-auto",
          "flex gap-8 px-(--scroll-padding)",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
          "[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]",
        ])}
      >
        {testimonials.map(
          ({ img, name, title, quote, isAlumni, info }, testimonialIndex) => (
            <TestimonialCard
              key={testimonialIndex}
              name={name}
              title={title}
              img={img}
              bounds={bounds as unknown as DOMRectReadOnly}
              scrollX={scrollX}
              isAlumni={isAlumni}
              info={info}
              isOpen={activeInfoIndex === testimonialIndex}
              onToggle={() =>
                setActiveInfoIndex((prev) =>
                  prev === testimonialIndex ? null : testimonialIndex,
                )
              }
              onClick={() => scrollTo(testimonialIndex)}
            >
              {quote}
            </TestimonialCard>
          ),
        )}
        <div className="w-2xl shrink-0 sm:w-216" />
      </div>
      <Container className="mt-4 sm:mt-16">
        <div className="flex justify-center">
          <CallToAction />
          <div className="hidden sm:flex sm:gap-2">
            {testimonials.map(({ name }, testimonialIndex) => (
              <Headless.Button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                data-active={
                  activeIndex === testimonialIndex ? true : undefined
                }
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  "size-2.5 rounded-full border border-transparent bg-gray-300 transition",
                  "data-active:bg-pink-400 data-hover:bg-pink-400",
                  "forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

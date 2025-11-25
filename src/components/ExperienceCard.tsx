import React, { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  Code2,
  Calendar,
} from "lucide-react";
import { Experience } from "../types";

const experiences: Experience[] = [
  {
    id: "stamina",
    company: "Stamina",
    role: "Founding Engineer",
    period: "08/2024 - Present",
    logoInitials: "ST",
    techStack: [
      "TypeScript",
      "NestJS",
      "React",
      "Axios",
      "TanStack",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "Kafka",
      "Docker",
    ],
    achievements: [
      "Defined authorization with secure cookies and global Axios client/interceptors.",
      "Improved perceived performance using Lazy loading, Suspense, and TanStack Router prefetching.",
      "Designed a flexible CRM entities model and deals/pipeline view.",
      "Validated CRM experience contributing to ~8% lift in sales for beta cohort.",
    ],
  },
  {
    id: "hivepro",
    company: "Hive Pro",
    role: "Sr. Software Engineer",
    period: "04/2023 - 08/2024",
    logoInitials: "HP",
    techStack: [
      "React",
      "Redux",
      "Saga",
      "Cypress",
      "Material UI",
      "Vue.js",
      "VueX",
      "Strapi",
      "Tailwind CSS",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "RabbitMQ",
      "Spring Batch",
      "Docker",
      "Gitlab",
      "CI/CD",
    ],
    achievements: [
      "Managed deployments across dev, staging, production achieving 100% test coverage and zero rollbacks.",
      "Migrated frontend from React v16 to v18 and integrated Cypress code-coverage.",
      "Reduced QA cycle from 3 weeks to 1 week; eliminated 20% dead code.",
      "Delivered HivePro Lab marketing website using Vue.js with Strapi CMS.",
    ],
  },
  {
    id: "born",
    company: "Born Group",
    role: "Software Engineer",
    period: "04/2022 - 06/2023",
    logoInitials: "BG",
    techStack: [
      "Javascript",
      "TypeScript",
      "React",
      "Python",
      "Poetry",
      "Beautiful Soup",
      "Git",
    ],
    achievements: [
      "Engineered high-speed scraping tool extracting 1000 keywords in under 20s.",
      "Lead Engineer for Walmart’s California eCommerce site (scaled to 300 pages/month).",
      "Developed custom price distribution tool using MERN stack with OTP validation.",
      "Conducted detailed merge request reviews ensuring optimal UI practices.",
    ],
  },
  {
    id: "insolutions",
    company: "In Solutions Global",
    role: "Jr. Software Engineer",
    period: "08/2019 - 12/2021",
    logoInitials: "NS",
    techStack: ["Java", "Spring Boot", "Hibernate", "JPQL"],
    achievements: [
      "Achieved 99.9% accuracy in multi-currency transactions via optimized JPQL queries.",
      "Built RESTful APIs cutting backend defects by 25%.",
      "Refactored legacy services improving API response times by 40%.",
      "Reduced average ticket resolution time by 30% in agile sprints.",
    ],
  },
];

// Helper to create the infinite scroll effect
const TechMarquee: React.FC<{ techStack: string[] }> = ({ techStack }) => {
  // We duplicate the array enough times to ensure it covers the width and loops seamlessly
  const items = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden group/marquee rounded-md bg-zinc-100 dark:bg-neutral-800/50 p-1">
      {/* Gradient Masks for fading effect */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-zinc-100 to-transparent dark:from-neutral-800/50 z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-zinc-100 to-transparent dark:from-neutral-800/50 z-10 pointer-events-none"></div>

      {/* Changed duration from 30s to 50s for slower animation */}
      <div className="flex w-max animate-[marquee_70s_linear_infinite] group-hover/marquee:[animation-play-state:paused] hover:cursor-grab active:cursor-grabbing">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-[0.65rem] tracking-wider font-semibold mx-1 text-gray-500 dark:text-gray-400 bg-white dark:bg-neutral-900/80 px-2 py-1 rounded-md border border-gray-100 dark:border-neutral-500 whitespace-nowrap shrink-0 shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const ExperienceCard: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // 'visible' = steady state, 'exiting' = fading out, 'entering' = fading in
  const [animState, setAnimState] = useState<
    "visible" | "exiting" | "entering"
  >("visible");

  const activeExp = experiences.find((e) => e.id === selectedId);

  const handleSelect = (id: string) => {
    if (selectedId === id) return;
    // 1. Start Exit
    setAnimState("exiting");

    // 2. Wait for exit animation to finish, then swap data
    setTimeout(() => {
      setSelectedId(id);
      setAnimState("entering");

      // 3. Trigger Enter animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState("visible");
        });
      });
    }, 300);
  };

  const handleBack = () => {
    setAnimState("exiting");
    setTimeout(() => {
      setSelectedId(null);
      setAnimState("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState("visible");
        });
      });
    }, 300);
  };

  // Dynamic CSS classes for the transition container
  const getTransitionClass = () => {
    switch (animState) {
      case "visible":
        return "opacity-100 translate-y-0 scale-100 filter-none";
      case "exiting":
        return "opacity-0 -translate-y-4 scale-95 blur-sm";
      case "entering":
        return "opacity-0 translate-y-4 scale-95 blur-sm";
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="h-full w-full bg-white dark:bg-neutral-900 p-6 flex flex-col relative overflow-hidden">
        {/* Header - Sticky */}
        <div
          className={`flex items-center justify-between mb-4 shrink-0 transition-all duration-300 ${
            selectedId
              ? "border-b border-dashed border-gray-200 dark:border-neutral-800 pb-4"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Experience
            </h2>
          </div>

          {selectedId && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors px-3 py-1.5 rounded-full hover:bg-orange-50 dark:hover:bg-neutral-800"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          )}
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* Main Content Area with Transition Support */}
        <div
          className={`flex-grow relative overflow-y-auto no-scrollbar transition-all duration-300 ease-out ${getTransitionClass()}`}
        >
          {/* LIST VIEW */}
          {!selectedId ? (
            <div className="pl-1">
              {experiences.map((exp, index) => {
                const isLast = index === experiences.length - 1;

                return (
                  <div
                    key={exp.id}
                    onClick={() => handleSelect(exp.id)}
                    className="group flex gap-4 mt-1 relative cursor-pointer"
                  >
                    {/* Timeline Column */}
                    <div className="flex flex-col items-center w-8 shrink-0 relative">
                      {/* The Vertical Dashed Line: connecting till end, stops at dot for last item */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed border-gray-200 dark:border-neutral-800 ${
                          isLast ? "top-0 h-3.5" : "top-0 bottom-0"
                        }`}
                      ></div>

                      {/* The Dot */}
                      <div className="relative z-10 mt-2 w-3 h-3 rounded-full bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 group-hover:border-orange-500 transition-colors duration-300 flex items-center justify-center shadow-sm">
                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600 group-hover:bg-orange-500 transition-colors duration-300"></div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`grow ${
                        !isLast ? "pb-8" : "pb-2"
                      } overflow-hidden`}
                    >
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-transparent hover:border-orange-200 dark:hover:border-orange-800/50 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-md dark:hover:shadow-none transition-all duration-300">
                        {/* Row 1: Role and Date */}
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {exp.role}
                          </h3>
                          <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-gray-500 dark:text-gray-400 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded-md border border-gray-100 dark:border-neutral-800">
                            <Calendar className="w-3 h-3 hidden md:inline" />
                            <span className="text-center">
                              {exp.period.split(" - ").map((part, i, arr) => (
                                <React.Fragment key={i}>
                                  {part}
                                  {i < arr.length - 1 && (
                                    <>
                                      <br className="md:hidden" />
                                      <span className="hidden md:inline">
                                        {" "}
                                        -{" "}
                                      </span>
                                    </>
                                  )}
                                </React.Fragment>
                              ))}
                            </span>
                          </span>
                        </div>

                        {/* Row 2: Company */}
                        <div className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {exp.company}
                        </div>

                        {/* Row 3: Tech Stack Marquee */}
                        <div className="w-full">
                          <TechMarquee techStack={exp.techStack} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* DETAIL VIEW */
            <div className="h-full flex flex-col">
              <div className="mb-6 flex items-center justify-between border-b border-dashed border-gray-200 dark:border-neutral-800 pb-3">
                {/* Company Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20 shrink-0">
                    {activeExp?.logoInitials}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {activeExp?.company}
                  </h2>
                </div>

                {/* Role & Date Line - Justify End */}
                <div className="flex flex-col justify-end items-end gap-1 mb-4">
                  <h3 className="text-md font-medium text-orange-600 dark:text-stone-100">
                    {activeExp?.role}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-[10px] md:text-xs font-mono border border-orange-100 dark:border-orange-800/30">
                    <Calendar className="w-3 h-3 hidden md:inline" />
                    <span className="text-center">
                      {activeExp?.period.split(" - ").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <>
                              <br className="md:hidden" />{" "}
                              <span className="hidden md:inline"> - </span>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements First */}
              <div className="space-y-3 pb-6 border-b border-dashed border-gray-200 dark:border-neutral-800 mb-6">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                  Key Achievements
                </h4>
                {activeExp?.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies Second */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Code2 className="w-3 h-3" /> Technologies
                </h4>
                <div className="flex flex-wrap gap-1">
                  {activeExp?.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;

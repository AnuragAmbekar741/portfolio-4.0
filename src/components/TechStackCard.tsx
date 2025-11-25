import React from "react";
import { Database, Layout, Settings, Cpu, Server } from "lucide-react";

const TechStackCard: React.FC = () => {
  const categories = [
    {
      title: "Frontend",
      icon: <Layout className="w-3.5 h-3.5" />,
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Vue.js",
        "TanStack Query",
        "Axios",
      ],
    },
    {
      title: "Backend",
      icon: <Server className="w-3.5 h-3.5" />,
      skills: [
        "Node.js",
        "Java",
        "Spring Boot",
        "Python",
        "PostgreSQL",
        "GraphQL",
        "Rest API",
      ],
    },
    {
      title: "Tools & DevOps",
      icon: <Settings className="w-3.5 h-3.5" />,
      skills: ["AWS", "Docker", "Git", "Cypress", "Figma", "Jest", "CI/CD"],
    },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#F5F5F0] to-[#E6E4DD] dark:from-neutral-900 dark:to-neutral-900/50 p-6 flex flex-col relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 dark:bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-white dark:bg-indigo-900/30 rounded-xl shadow-sm">
          <Cpu className="w-5 h-5 text-gray-800 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Tech Stack
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 relative z-10">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
              {cat.icon}
              <span>{cat.title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-neutral-900 dark:text-gray-200 shadow-sm transition-all hover:scale-105 cursor-default hover:border-gray-400 dark:hover:border-indigo-700 hover:shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackCard;

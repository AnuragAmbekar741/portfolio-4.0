import React, { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import ExperienceCard from "./components/ExperienceCard";
import EducationCard from "./components/EducationCard";
import TechStackCard from "./components/TechStackCard";
import FunFactsCard from "./components/FunFactsCard";
import { Theme } from "./types";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [aiQuery, setAiQuery] = useState<string>("");

  // Initialize theme based on system preference
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme(Theme.DARK);
    }
  }, []);

  // Update DOM class when theme changes
  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  // Common styles for the dashed partition lines
  const dashedBorder = "border-dashed border-gray-200 dark:border-neutral-800";

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center transition-colors duration-300 selection:bg-accent-200 dark:selection:bg-accent-900 bg-gray-50 dark:bg-neutral-950">
      {/* Main Grid Container - Outer Solid Border */}
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-0 border border-solid border-gray-200 dark:border-neutral-800 rounded-none bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
        {/* Profile Section: Row 1, Col 1-2. Needs Right (desktop) & Bottom dashed */}
        <div
          className={`col-span-1 md:col-span-2 row-span-1 min-h-[260px] border-b ${dashedBorder} md:border-r`}
        >
          <ProfileCard />
        </div>

        {/* Experience Section: Row 1-2, Col 3-4. Needs Bottom dashed */}
        <div
          className={`col-span-1 md:col-span-2 row-span-2 min-h-[500px] border-b ${dashedBorder}`}
        >
          <ExperienceCard />
        </div>

        {/* Tech Stack: Row 2, Col 1-2. Needs Right (desktop) & Bottom dashed */}
        <div
          className={`col-span-1 md:col-span-2 row-span-1 min-h-[220px] border-b ${dashedBorder} md:border-r`}
        >
          <TechStackCard />
        </div>

        {/* Education Section: Row 3, Col 1-2. Needs Right (desktop). Mobile needs Bottom (since FunFacts is last) */}
        <div
          className={`col-span-1 md:col-span-2 row-span-1 min-h-[220px] border-b md:border-b-0 md:border-r ${dashedBorder}`}
        >
          <EducationCard />
        </div>

        {/* Fun Facts: Row 3, Col 3-4. Last item, no internal borders needed */}
        <div className="col-span-1 md:col-span-2 row-span-1 min-h-[220px]">
          <FunFactsCard />
        </div>
      </main>
    </div>
  );
};

export default App;

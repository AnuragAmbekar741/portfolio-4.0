import React, { useState, useEffect } from "react";
import { FolderGit } from "lucide-react";

const TechStackCard: React.FC = () => {
  const [dots, setDots] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Dot animation
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    // Step animation loop
    const stepInterval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="h-full w-full bg-white dark:bg-neutral-900 p-6 flex flex-col relative overflow-hidden">
      {/* Background Decoration - Blue */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 dark:bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10 shrink-0">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <FolderGit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
      </div>

      {/* Git Push Micro-interaction */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        <div className="w-full h-full bg-[#1e1e1e] rounded-xl p-5 font-mono text-sm shadow-2xl border border-gray-800 flex flex-col overflow-hidden">
          {/* Terminal Controls */}
          <div className="flex gap-2 mb-4 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>

          {/* Terminal Content */}
          <div className="space-y-3 overflow-hidden text-gray-300">
            {/* Git Add */}
            <div
              className={`transition-opacity duration-300 ${
                step >= 0 ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-blue-400">~/projects</span>
                <span className="text-white">git add .</span>
              </div>
            </div>

            {/* Git Commit */}
            <div
              className={`transition-all duration-300 ${
                step >= 1
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-blue-400">~/projects</span>
                <span className="text-white">
                  git commit -m "feat: new stuff"
                </span>
              </div>
              <div className="pl-4 text-gray-500 text-xs mt-1">
                [main 8a2b1c] feat: new stuff
                <br />3 files changed, 142 insertions(+)
              </div>
            </div>

            {/* Git Push */}
            <div
              className={`transition-all duration-300 ${
                step >= 2
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-blue-400">~/projects</span>
                <span className="text-white">git push origin main</span>
              </div>
            </div>

            {/* Pushing Animation */}
            <div
              className={`transition-all duration-300 ${
                step >= 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-yellow-400 pl-4">
                Uploading objects: 100% (3/3), done.{dots}
              </div>
              <div className="text-green-400 pl-4 mt-1">
                To github.com:user/repo.git
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackCard;

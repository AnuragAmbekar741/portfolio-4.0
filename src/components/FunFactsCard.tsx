import React from "react";
import { Smile } from "lucide-react";

const FunFactsCard: React.FC = () => {
  const facts = [
    { text: "Just like this theme I like my coffee black", emoji: "☕" },
    {
      text: "The way Itachi served Leaf Village I could serve you, just find me my purpose.",
      emoji: "🍥",
    },
    {
      text: "I am founder of abbreviation SLAP (Sound Like A Plan)",
      emoji: "🤝",
    },
    {
      text: "Big time Arsenal fan, once a Gooner always a Gooner",
      emoji: "⚽",
    },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-neutral-900 p-6 flex flex-col relative overflow-hidden">
      {/* Background Decor - consistent with other cards */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 dark:bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Standard Header Layout */}
      <div className="flex items-center gap-3 mb-4 relative z-10 shrink-0">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
          <Smile className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Know me better
        </h2>
      </div>

      {/* Content Area with standard scrolling */}
      <div className="relative flex-grow overflow-hidden mask-fade">
        <style>{`
            @keyframes vertical-scroll {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
            }
            .animate-vertical-scroll {
                animation: vertical-scroll 20s linear infinite;
            }
            .mask-fade {
                mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
                -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
            }
         `}</style>

        <div className="animate-vertical-scroll absolute top-0 left-0 right-0 w-full hover:[animation-play-state:paused]">
          {/* List 1 */}
          <div className="flex flex-col gap-3 pb-3">
            {facts.map((fact, i) => (
              <FactItem key={`a-${i}`} text={fact.text} emoji={fact.emoji} />
            ))}
          </div>

          {/* List 2 (Duplicate for loop) */}
          <div className="flex flex-col gap-3 pb-3">
            {facts.map((fact, i) => (
              <FactItem key={`b-${i}`} text={fact.text} emoji={fact.emoji} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FactItem = ({ text, emoji }: { text: string; emoji: string }) => (
  <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-800 flex items-start gap-3 transition-all hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm hover:border-gray-200 dark:hover:border-neutral-700 cursor-default">
    <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
      {text}
    </p>
  </div>
);

export default FunFactsCard;

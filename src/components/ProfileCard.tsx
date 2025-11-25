import React from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const ProfileCard: React.FC = () => {
  return (
    <div className="h-full w-full bg-white dark:bg-neutral-900 p-6 md:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-10 group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 dark:bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>

      {/* Mobile & Large Layout: Avatar & Badges (Left Side) */}
      <div className="relative shrink-0 hidden lg:block">
        <div className="w-32 h-32 md:w-36 md:h-36 lg:w-32 lg:h-32 rounded-full border-4 border-white dark:border-neutral-800 shadow-xl bg-gray-200 overflow-hidden relative z-10">
          <img
            src="https://picsum.photos/200/200"
            alt="Anurag Ambekar"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Badges: Positioned on the avatar perimeter */}
        <div className="absolute -top-2 -right-4 z-20">
          <Badge text="Product" />
        </div>
        <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-20">
          <Badge text="Software" />
        </div>
        <div className="absolute -bottom-2 -right-2 z-20">
          <Badge text="Growth" />
        </div>
      </div>

      {/* Medium Layout (768px - 1023px): Photo + Title Row */}
      <div className="w-full md:flex lg:hidden items-center gap-4 mb-4">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800 shadow-xl bg-gray-200 overflow-hidden relative z-10">
            <img
              src="https://picsum.photos/200/200"
              alt="Anurag Ambekar"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Badges for medium layout */}
          <div className="absolute -top-1 -right-3 z-20">
            <Badge text="Product" />
          </div>
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-20">
            <Badge text="Software" />
          </div>
          <div className="absolute -bottom-1 -right-1 z-20">
            <Badge text="Growth" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-1">
            Anurag Ambekar
          </h1>
          <h2 className="text-base font-bold text-yellow-600 dark:text-yellow-500">
            Founding Engineer
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left flex-1 w-full lg:w-auto">
        {/* Mobile: Name & Title */}
        <div className="lg:hidden mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-1">
            Anurag Ambekar
          </h1>
          <h2 className="text-base md:text-lg font-bold text-yellow-600 dark:text-yellow-500 mb-4">
            Founding Engineer
          </h2>
        </div>

        {/* Large: Name & Title */}
        <div className="hidden lg:block">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-1">
            Anurag Ambekar
          </h1>
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-yellow-600 dark:text-yellow-500 mb-4">
            Founding Engineer
          </h2>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-6 max-w-sm">
          I love to work at the intersection of product, growth, and software.
          Want to make each bit of my code count towards business impact.
        </p>

        {/* Social Icons - Centered for medium, left for large */}
        <div className="flex gap-2 md:gap-3 justify-center lg:justify-start">
          <SocialLink
            icon={<Github className="w-4 h-4 md:w-5 md:h-5" />}
            href="https://github.com/AnuragAmbekar741"
            label="Github"
            target="_blank"
          />
          <SocialLink
            icon={<Linkedin className="w-4 h-4 md:w-5 md:h-5" />}
            href="https://www.linkedin.com/in/anurag-ambekar-a80b12217/"
            label="LinkedIn"
            target="_blank"
          />
          <SocialLink
            icon={<Mail className="w-4 h-4 md:w-5 md:h-5" />}
            href="mailto:anuragambekar1997@gmail.com"
            label="Email"
            target="_blank"
          />
          <SocialLink
            icon={<FileText className="w-4 h-4 md:w-5 md:h-5" />}
            href="/AnuragAmbekar.pdf"
            label="Resume"
            target="_blank"
            download="Anurag_Ambekar_Resume.pdf"
          />
        </div>
      </div>
    </div>
  );
};

const Badge = ({ text }: { text: string }) => (
  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default select-none">
    {text}
  </span>
);

const SocialLink = ({
  icon,
  href,
  label,
  target,
  download,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
  target?: string;
  download?: string;
}) => (
  <a
    href={href}
    target={target}
    download={download}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
    className="p-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 transition-all duration-200 flex items-center justify-center hover:shadow-sm hover:-translate-y-1"
    title={label}
    aria-label={label}
  >
    {icon}
  </a>
);

export default ProfileCard;

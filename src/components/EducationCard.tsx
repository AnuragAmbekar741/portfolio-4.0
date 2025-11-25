import React, { useState } from 'react';
import { GraduationCap, ArrowLeft, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { Education } from '../types';

const educationData: Education[] = [
  {
    id: 'masters',
    degree: 'M.S. Computer Science',
    institution: 'Central Michigan University',
    year: '08/2024 - 12/2025',
    details: 'Mount Pleasant, MI. Advanced studies focused on scalable systems and intelligent algorithms.',
    type: 'master',
    courses: ['Distributed Systems', 'Cloud Computing', 'Machine Learning', 'Advanced Algorithms', 'Network Security']
  },
  {
    id: 'bachelors',
    degree: 'B.E. Information Technology',
    institution: 'Sinhgad Institute of Technology',
    year: '06/2015 - 07/2019',
    details: 'Pune, India. Comprehensive foundation in computer science engineering and software development life cycle.',
    type: 'bachelor',
    courses: ['Data Structures', 'Object Oriented Programming', 'DBMS', 'Operating Systems', 'Computer Networks', 'Web Technology']
  }
];

const EducationCard: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [animState, setAnimState] = useState<'visible' | 'exiting' | 'entering'>('visible');

  const activeEdu = educationData.find(e => e.id === selectedId);

  const handleSelect = (id: string) => {
    if (selectedId === id) return;
    setAnimState('exiting');
    setTimeout(() => {
      setSelectedId(id);
      setAnimState('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('visible');
        });
      });
    }, 300);
  };

  const handleBack = () => {
    setAnimState('exiting');
    setTimeout(() => {
      setSelectedId(null);
      setAnimState('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('visible');
        });
      });
    }, 300);
  };

  const getTransitionClass = () => {
    switch (animState) {
      case 'visible': 
        return 'opacity-100 translate-y-0 scale-100 filter-none';
      case 'exiting': 
        return 'opacity-0 -translate-y-4 scale-95 blur-sm';
      case 'entering': 
        return 'opacity-0 translate-y-4 scale-95 blur-sm';
    }
  };

  return (
    <div className="h-full w-full bg-white dark:bg-neutral-900 p-6 flex flex-col relative overflow-hidden">
       
       {/* Header */}
       <div className={`flex items-center justify-between mb-4 shrink-0 transition-all duration-300 ${selectedId ? 'border-b border-gray-100 dark:border-neutral-800 pb-4' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
            <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Education</h2>
        </div>
        
        {selectedId && (
           <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-neutral-800"
           >
              <ArrowLeft className="w-3 h-3" /> Back
           </button>
        )}
      </div>

      {/* Content Area */}
      <div className={`flex-grow relative overflow-y-auto no-scrollbar transition-all duration-300 ease-out ${getTransitionClass()}`}>
        
        {!selectedId ? (
          /* LIST VIEW */
          <div className="pl-1 pt-2">
            {educationData.map((edu, index) => {
              const isFirst = index === 0;
              const isLast = index === educationData.length - 1;

              return (
                <div
                  key={edu.id}
                  onClick={() => handleSelect(edu.id)}
                  className="group flex gap-4 relative cursor-pointer"
                >
                  {/* Timeline Column */}
                  <div className="flex flex-col items-center w-8 shrink-0 relative">
                     {/* Line */}
                     <div className={`absolute w-[2px] bg-gray-200 dark:bg-neutral-800 left-1/2 -translate-x-1/2
                       ${isFirst ? 'top-[28px] bottom-0' : ''}
                       ${isLast ? 'top-0 h-[28px]' : ''}
                       ${!isFirst && !isLast ? 'top-0 bottom-0' : ''}
                     `}></div>

                     {/* Dot */}
                     <div className="relative z-10 mt-5 w-4 h-4 rounded-full bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 group-hover:border-emerald-500 transition-colors duration-300 flex items-center justify-center shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-neutral-600 group-hover:bg-emerald-500 transition-colors duration-300"></div>
                     </div>
                  </div>

                  {/* Content Column */}
                  <div className={`grow ${!isLast ? 'pb-8' : 'pb-2'}`}>
                     <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-md dark:hover:shadow-none transition-all duration-300 group-hover:-translate-y-1">
                          <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {edu.degree}
                                </h3>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                                    {edu.institution}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                                    {edu.type}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                                    <Calendar className="w-3 h-3" /> {edu.year}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-300 dark:text-neutral-600 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
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
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {activeEdu?.degree}
                </h2>
                <h3 className="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                    {activeEdu?.institution}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono border border-emerald-100 dark:border-emerald-800/30">
                    <Calendar className="w-3 h-3" /> {activeEdu?.year}
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-800/30 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-neutral-800/50">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {activeEdu?.details}
                </p>
            </div>

            <div>
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Key Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                    {activeEdu?.courses.map((course, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors cursor-default">
                        {course}
                    </span>
                    ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
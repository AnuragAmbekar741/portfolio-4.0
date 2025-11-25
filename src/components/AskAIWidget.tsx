import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AskAIWidgetProps {
  onAsk: (query: string) => void;
}

const AskAIWidget: React.FC<AskAIWidgetProps> = ({ onAsk }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAsk(input);
      setInput('');
    }
  };

  return (
    <div className="h-full w-full bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 flex flex-col justify-between relative overflow-hidden group">
      
      {/* Background Decor - Subtle Indigo Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity group-hover:opacity-100 opacity-50"></div>

      <div className="relative z-10">
         <div className="flex items-center gap-3 mb-3">
           <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl transition-transform group-hover:scale-110 duration-300">
             <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
           </div>
           <h3 className="font-bold text-gray-900 dark:text-white text-lg">Ask Gemini AI</h3>
         </div>
         <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
           Have a question about my background? Type it below and get an instant answer.
         </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
           <div className="relative group/input">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="e.g. What is your tech stack?"
               className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white text-sm rounded-xl px-4 py-3 pr-11 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
             />
             <button 
               type="submit"
               disabled={!input.trim()}
               className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all disabled:opacity-0 disabled:scale-90 shadow-sm hover:shadow-md"
             >
               <ArrowRight className="w-4 h-4" />
             </button>
           </div>
      </form>
    </div>
  );
};

export default AskAIWidget;
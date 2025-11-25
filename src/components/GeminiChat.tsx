import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface GeminiChatProps {
  externalQuery?: string;
  onQueryHandled?: () => void;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ externalQuery, onQueryHandled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'model', text: "Hi! I'm an AI assistant trained on this portfolio. Ask me anything about the candidate's work experience at HivePro, technical skills, or education!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // State to hold the chat instance so we maintain context
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatInstance && process.env.API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are a professional portfolio assistant for a Senior Frontend Engineer. 
            The candidate has 6+ years of experience.
            Key Companies: Stamina HivePro (Senior Eng, 2021-Present), Borngroup (Frontend Dev, 2019-2021), In Solutions Global (Software Eng, 2017-2019).
            Tech Stack: React, TypeScript, Next.js, Tailwind, Node.js.
            Education: Masters in CS (Tech University), Bachelors in Tech (State Engineering College).
            
            Tone: Professional, concise, enthusiastic, and helpful. 
            If asked about contact info, suggest emailing hello@example.com.
            Keep answers short (under 50 words) unless asked for elaboration.`,
          },
        });
        setChatInstance(newChat);
      } catch (error) {
        console.error("Failed to init Gemini", error);
      }
    }
  }, [isOpen, chatInstance]);

  // Handle external queries
  useEffect(() => {
    if (externalQuery) {
      if (!isOpen) setIsOpen(true);
    }
  }, [externalQuery]);

  // Send external query once chat is ready
  useEffect(() => {
    if (externalQuery && isOpen && chatInstance && !isLoading) {
       // Check if we haven't already processed this exact query recently to avoid duplicates
       // (Simple check: last message wasn't this query)
       const lastUserMsg = messages.filter(m => m.role === 'user').pop();
       if (lastUserMsg?.text !== externalQuery) {
         handleSend(externalQuery);
         if (onQueryHandled) onQueryHandled();
       } else if (onQueryHandled) {
         // Already processed
         onQueryHandled();
       }
    }
  }, [externalQuery, isOpen, chatInstance]);

  const handleSend = async (textOverride?: string) => {
    if (!process.env.API_KEY) return;
    
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      if (!chatInstance) {
          // If called before chat is ready, this might fail, but effects should handle synchronization
           throw new Error("Chat not initialized");
      }

      const result = await chatInstance.sendMessage({ message: userMsg.text });
      const responseText = result.text || "I'm sorry, I couldn't generate a response.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!process.env.API_KEY) return null; // Don't show if no key configured

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-accent-500 hover:bg-accent-600 text-white shadow-xl transition-all duration-300 z-40 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-neutral-800 z-50 transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`} style={{ maxHeight: '600px', height: '500px' }}>
        
        {/* Header */}
        <div className="p-4 bg-accent-500 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-sm">Ask Gemini AI</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-accent-600 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-neutral-950/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-accent-500 text-white rounded-br-none' 
                  : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-bl-none border border-gray-100 dark:border-neutral-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-white dark:bg-neutral-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-neutral-700">
                 <div className="flex gap-1">
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my experience..."
              className="flex-1 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-full bg-accent-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeminiChat;
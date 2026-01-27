import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const KNOWLEDGE_BASE = {
  bio: "Züleyha Şen is a Computer Engineering graduate from Yeditepe University (2024). She is passionate about interactive web systems, game development, and AI integration.",
  skills: "Her technical skills include React, TypeScript, Node.js, Python, Unity, C#, SQL, and Git. She also has experience with OpenCV and AI algorithms.",
  projects: "Her key projects include a Hand Rehabilitation Game (Graduation Project), a Library Automation System, and an ERP System Design. She also built a Strategic Move AI Game.",
  contact: "You can contact her via email at enzuleyha@gmail.com or connect on LinkedIn/GitHub.",
  default: "I can only answer questions about Züleyha Şen's professional background, skills, and projects. Please ask something related to her work!"
};

export default function AI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I am Züleyha's AI Assistant. Ask me anything about her projects, skills, or background.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const responseText = generateResponse(userMessage.text);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('who') || lowerQuery.includes('bio') || lowerQuery.includes('about')) return KNOWLEDGE_BASE.bio;
    if (lowerQuery.includes('skill') || lowerQuery.includes('stack') || lowerQuery.includes('tech')) return KNOWLEDGE_BASE.skills;
    if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built')) return KNOWLEDGE_BASE.projects;
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) return KNOWLEDGE_BASE.contact;
    
    return KNOWLEDGE_BASE.default;
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl h-[75vh] mb-20 glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/10">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 text-primary shadow-[0_0_10px_rgba(176,38,255,0.3)]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-white">AI Assistant</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">ONLINE // SYSTEM_READY</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'ai' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'
              }`}>
                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.sender === 'ai' 
                  ? 'bg-white/5 border border-white/10 text-white rounded-tl-none' 
                  : 'bg-primary text-white rounded-tr-none shadow-[0_0_15px_rgba(176,38,255,0.2)]'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <span className="text-[10px] opacity-50 mt-2 block font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about projects, skills, or experience..."
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_10px_rgba(176,38,255,0.3)]"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex justify-center gap-4">
            <SuggestionChip text="What are your skills?" onClick={() => setInput("What are your skills?")} />
            <SuggestionChip text="Tell me about your projects" onClick={() => setInput("Tell me about your projects")} />
            <SuggestionChip text="How can I contact you?" onClick={() => setInput("How can I contact you?")} />
          </div>
        </div>

      </div>
    </div>
  );
}

function SuggestionChip({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
    >
      <Sparkles size={10} />
      {text}
    </button>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

/* =======================
   TYPES
======================= */
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

type Intent =
  | 'PROFILE'
  | 'SKILLS'
  | 'PROJECTS'
  | 'EXPERIENCE'
  | 'EDUCATION'
  | 'CONTACT'
  | 'HIRING'
  | 'UNKNOWN';

/* =======================
   KNOWLEDGE BASE (CV DATA)
======================= */
const KNOWLEDGE_BASE = {
  profile: {
    name: 'Züleyha Şen',
    title: 'Computer Engineer',
    summary:
      'Computer Engineering graduate specializing in full-stack development, AI-powered systems, and game-based rehabilitation technologies.',
  },

  skills: {
    frontend: ['React', 'TypeScript', 'React Native'],
    backend: ['.NET MVC', 'Node.js', 'PHP', 'Python'],
    gameAI: ['Unity', 'C#', 'OpenCV'],
    systems: ['C', 'SQL Server'],
  },

  projects: [
    {
      name: 'Hand Rehabilitation Game',
      year: 2024,
      description:
        'Camera-based gamified hand rehabilitation system developed using Unity and OpenCV. Published in an academic journal as a graduation project.',
      tech: ['Unity', 'OpenCV', 'AI', 'Game Design'],
      highlight: true,
    },
    {
      name: 'Library Automation System',
      year: 2023,
      description:
        'MVC-based library management system with Admin, User, and Staff panels developed during a full-stack internship.',
      tech: ['.NET MVC', 'SQL Server'],
    },
    {
      name: 'Strategic Move AI Game',
      year: 2023,
      description:
        'AI-powered strategy board game implementing Minimax algorithm with Alpha-Beta Pruning.',
      tech: ['C', 'AI', 'Algorithms'],
    },
    {
      name: 'Python-to-C Translator',
      year: 2023,
      description:
        'A simple compiler translating a Python-like indentation-based language into C using Lex and Yacc.',
      tech: ['C', 'Lex', 'Yacc', 'Compiler Design'],
    },
  ],

  experience: [
    {
      role: 'Operations and Analytics Intern',
      company: 'Patika.dev',
      period: 'Apr 2025 – Jul 2025',
      description:
        'Tracked student progress, supported technical assessments, and handled operational analytics.',
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'GNC Proses Otomasyon',
      period: 'Jun 2023 – Jul 2023',
      description:
        'Developed a library automation system using .NET MVC architecture.',
    },
  ],

  education: {
    degree: 'B.Sc. in Computer Engineering',
    university: 'Yeditepe University',
    period: '2019 – 2024',
  },

  contact: {
    email: 'enzuleyha@gmail.com',
  },
};

/* =======================
   INTENT DETECTION
======================= */
function detectIntent(query: string): Intent {
  const q = query.toLowerCase();
  if (
    q.includes('should we hire') ||
    q.includes('good fit') ||
    q.includes('hire') ||
    q.includes('choice')
  ) {
    return 'HIRING';
  }

  // 🔹 ÖNCE spesifikler
  if (
    q.includes('project') ||
    q.includes('projects') ||
    q.includes('portfolio') ||
    q.includes('work') ||
    q.includes('built')
  ) {
    return 'PROJECTS';
  }

  if (q.includes('skill') || q.includes('tech')) {
    return 'SKILLS';
  }

  if (q.includes('experience') || q.includes('intern')) {
    return 'EXPERIENCE';
  }

  if (q.includes('education') || q.includes('university')) {
    return 'EDUCATION';
  }

  if (q.includes('contact') || q.includes('email')) {
    return 'CONTACT';
  }

  // 🔹 EN GENEL EN SONA
  if (q.includes('who') || q.includes('about')) {
    return 'PROFILE';
  }

  return 'UNKNOWN';
}


/* =======================
   RESPONSE GENERATOR
======================= */
function generateResponse(query: string): string {
  const intent = detectIntent(query);

  switch (intent) {
    case 'PROFILE':
      return `${KNOWLEDGE_BASE.profile.name} is a ${KNOWLEDGE_BASE.profile.title}. ${KNOWLEDGE_BASE.profile.summary}`;

    case 'SKILLS':
      return `
Frontend: ${KNOWLEDGE_BASE.skills.frontend.join(', ')}
Backend: ${KNOWLEDGE_BASE.skills.backend.join(', ')}
Game & AI: ${KNOWLEDGE_BASE.skills.gameAI.join(', ')}
Systems: ${KNOWLEDGE_BASE.skills.systems.join(', ')}
      `.trim();

    case 'PROJECTS':
      return KNOWLEDGE_BASE.projects
        .map(
          (p) =>
            `• ${p.name} (${p.year})\n${p.description}\nTech: ${p.tech.join(
              ', '
            )}`
        )
        .join('\n\n');

    case 'EXPERIENCE':
      return KNOWLEDGE_BASE.experience
        .map(
          (e) =>
            `${e.role} @ ${e.company} (${e.period})\n${e.description}`
        )
        .join('\n\n');

    case 'EDUCATION':
      return `${KNOWLEDGE_BASE.education.degree}\n${KNOWLEDGE_BASE.education.university} (${KNOWLEDGE_BASE.education.period})`;

    case 'CONTACT':
      return `You can reach Züleyha via email: ${KNOWLEDGE_BASE.contact.email}`;

    default:
      return 'I am a portfolio AI assistant. You can ask about projects, skills, education, or professional experience.';
    case 'HIRING':
      return `
Yes — Züleyha Şen would be a very strong hiring choice:))
She is not only technically capable, but also adaptable, research-oriented, and product-minded. For teams looking for a junior-to-mid level engineer with growth potential and strong fundamentals, hiring her would be a very smart decision:))
  `.trim();

  }

}

/* =======================
   MAIN COMPONENT
======================= */
export default function AI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Züleyha’s AI Assistant. Ask me anything about her CV, projects, or experience.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: response,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="h-full w-full flex justify-center p-4">
      <div className="w-full max-w-4xl h-[70vh] glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10">

        {/* HEADER */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Bot className="text-primary" />
          <div>
            <h2 className="font-bold">AI Portfolio Assistant</h2>
            <p className="text-xs opacity-60">ONLINE</p>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="max-w-[80%] p-4 rounded-xl bg-white/5">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.text}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="text-xs opacity-50">AI is typing…</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10">
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about skills, projects, experience..."
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-2 p-2 bg-primary rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="flex gap-4 mt-4 justify-center text-xs opacity-70">
            <Suggestion text="What are your skills?" setInput={setInput} />
            <Suggestion text="Tell me about your projects" setInput={setInput} />
            <Suggestion text="How can I contact you?" setInput={setInput} />
            <Suggestion text="Should we hire her?" setInput={setInput} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Suggestion({
  text,
  setInput,
}: {
  text: string;
  setInput: (v: string) => void;
}) {
  return (
    <button
      onClick={() => setInput(text)}
      className="flex items-center gap-1 hover:text-primary"
    >
      <Sparkles size={10} />
      {text}
    </button>
  );
}

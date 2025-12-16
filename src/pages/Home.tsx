import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      
      {/* Central Hero Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 relative"
        >
          <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse" />
          <img 
            src="/images/me.jpg" 
            alt="Züleyha Şen" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/20 shadow-[0_0_30px_rgba(176,38,255,0.3)] relative z-10"
          />
          <div className="absolute -bottom-2 -right-2 bg-background border border-white/10 p-2 rounded-full z-20">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          Züleyha Şen
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-wider shadow-[0_0_10px_rgba(176,38,255,0.2)]">
            COMPUTER ENGINEER
          </span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-mono tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            CREATIVE DEVELOPER
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Building immersive digital experiences at the intersection of <span className="text-white font-medium">engineering</span> and <span className="text-white font-medium">design</span>. 
          Specializing in interactive web systems, game development, and AI integration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/projects">
            <button className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
          
          <Link href="/about">
            <button className="px-8 py-3 glass-button rounded-full text-white font-medium hover:bg-white/10 transition-all hover:scale-105">
              About Me
            </button>
          </Link>
        </motion.div>

      </div>

      {/* Floating Holographic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingCard 
          icon={<Code size={24} />} 
          title="Developer" 
          delay={1.2} 
          x="10%" 
          y="20%" 
          color="text-blue-400"
        />
        <FloatingCard 
          icon={<Cpu size={24} />} 
          title="AI Integration" 
          delay={1.4} 
          x="85%" 
          y="30%" 
          color="text-purple-400"
        />
        <FloatingCard 
          icon={<Globe size={24} />} 
          title="Networking" 
          delay={1.6} 
          x="15%" 
          y="70%" 
          color="text-cyan-400"
        />
      </div>

    </div>
  );
}

function FloatingCard({ icon, title, delay, x, y, color }: { icon: React.ReactNode, title: string, delay: number, x: string, y: string, color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      className="absolute hidden md:flex items-center gap-3 px-4 py-3 glass-panel rounded-xl border border-white/5 shadow-lg"
      style={{ left: x, top: y }}
    >
      <div className={`p-2 rounded-lg bg-white/5 ${color} shadow-[0_0_10px_currentColor]`}>
        {icon}
      </div>
      <span className="font-mono text-sm text-white/80 tracking-wide">{title}</span>
    </motion.div>
  );
}

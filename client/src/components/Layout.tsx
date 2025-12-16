import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Gamepad2, User, Cpu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ambient Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(176, 38, 255, ${p.opacity})`; // Neon Purple tint
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', icon: <Terminal size={20} />, label: 'Hub' },
    { path: '/projects', icon: <Code size={20} />, label: 'Projects' },
    { path: '/about', icon: <User size={20} />, label: 'About' },
    { path: '/game', icon: <Gamepad2 size={20} />, label: 'Playground' },
    { path: '/ai', icon: <Cpu size={20} />, label: 'AI Assistant' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col h-screen">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 glass-panel border-b border-white/5 mx-4 mt-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="ml-4 font-mono text-sm text-muted-foreground tracking-wider">ZULEYHA_SEN_SYSTEM_V1.0</span>
          </div>
          <div className="flex items-center gap-4">
             <a href="https://github.com/zuleyhasen" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">GITHUB_LINK_ESTABLISHED</a>
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-hidden relative p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Dock */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <nav className="glass-panel px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl border border-white/10">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div className="relative group cursor-pointer">
                    <div
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(176,38,255,0.4)] scale-110'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      {item.icon}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-black/80 backdrop-blur-md text-xs font-mono py-1 px-2 rounded border border-white/10 whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </main>
    </div>
  );
}

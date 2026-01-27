import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game State Refs (to avoid re-renders during game loop)
  const gameState = useRef({
    player: { x: 0, y: 0, size: 20, speed: 5 },
    skills: [] as { x: number; y: number; size: number; text: string; color: string }[],
    particles: [] as { x: number; y: number; size: number; speedX: number; speedY: number; life: number; color: string }[],
    keys: { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false },
    animationId: 0,
    lastSpawn: 0
  });

  const skillPool = ["React", "TypeScript", "Node.js", "Python", "Unity", "C#", "SQL", "Git", "UI/UX", "AI"];
  const colors = ["#B026FF", "#00F0FF", "#00FF41", "#FF5F00", "#FF00CC"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.current.keys.hasOwnProperty(e.key)) {
        gameState.current.keys[e.key as keyof typeof gameState.current.keys] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameState.current.keys.hasOwnProperty(e.key)) {
        gameState.current.keys[e.key as keyof typeof gameState.current.keys] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(gameState.current.animationId);
    };
  }, []);

  const startGame = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    gameState.current.player = { x: canvas.width / 2, y: canvas.height / 2, size: 20, speed: 5 };
    gameState.current.skills = [];
    gameState.current.particles = [];
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    
    gameLoop();
  };

  const gameLoop = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameState.current;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move Player
    if (state.keys.w || state.keys.ArrowUp) state.player.y -= state.player.speed;
    if (state.keys.s || state.keys.ArrowDown) state.player.y += state.player.speed;
    if (state.keys.a || state.keys.ArrowLeft) state.player.x -= state.player.speed;
    if (state.keys.d || state.keys.ArrowRight) state.player.x += state.player.speed;

    // Boundary Check
    state.player.x = Math.max(state.player.size, Math.min(canvas.width - state.player.size, state.player.x));
    state.player.y = Math.max(state.player.size, Math.min(canvas.height - state.player.size, state.player.y));

    // Draw Player
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00F0FF";
    ctx.fillStyle = "#00F0FF";
    ctx.beginPath();
    ctx.arc(state.player.x, state.player.y, state.player.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Spawn Skills
    if (Date.now() - state.lastSpawn > 1000) {
      const text = skillPool[Math.floor(Math.random() * skillPool.length)];
      state.skills.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        size: 15,
        text,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
      state.lastSpawn = Date.now();
    }

    // Update & Draw Skills
    for (let i = state.skills.length - 1; i >= 0; i--) {
      const skill = state.skills[i];
      
      // Draw Skill
      ctx.shadowBlur = 10;
      ctx.shadowColor = skill.color;
      ctx.fillStyle = skill.color;
      ctx.beginPath();
      ctx.arc(skill.x, skill.y, skill.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "white";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(skill.text, skill.x, skill.y + 25);

      // Collision Detection
      const dx = state.player.x - skill.x;
      const dy = state.player.y - skill.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < state.player.size + skill.size) {
        // Collect Skill
        setScore(prev => prev + 10);
        
        // Create Particles
        for (let j = 0; j < 10; j++) {
          state.particles.push({
            x: skill.x,
            y: skill.y,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 5,
            speedY: (Math.random() - 0.5) * 5,
            life: 1,
            color: skill.color
          });
        }
        
        state.skills.splice(i, 1);
      }
    }

    // Update & Draw Particles
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const p = state.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 0.05;

      if (p.life <= 0) {
        state.particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    state.animationId = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mb-20 aspect-video bg-black/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* UI Overlay */}
        <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
          <span className="text-primary font-mono font-bold text-xl">SCORE: {score}</span>
        </div>

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-4 neon-text">SKILL COLLECTOR</h2>
            <p className="text-muted-foreground mb-8 font-mono">Use WASD or Arrow Keys to collect skills</p>
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_var(--color-primary)]"
            >
              <Play size={20} /> START GAME
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-4">GAME OVER</h2>
            <p className="text-2xl text-primary font-mono mb-8">Final Score: {score}</p>
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            >
              <RotateCcw size={20} /> PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  demo: string | null;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Corporate Website for Construction Company",
    description: "A corporate, SEO-optimized website developed for a construction company to present its services, completed projects, and brand identity. The website focuses on performance, responsive design, and search engine visibility to improve the company’s online presence.",
    technologies: ["React", "TypeScript"],
    link: null,
    demo: "/images/ozcelik.webm",
    image: "/images/ozcelik.webp",
    category: "Web Development / Frontend Development"
  },
    {
    id: 2,
    title: "Hand Rehabilitation Game",
    description: "Developed an interactive rehabilitation game controlled via hand gestures using a camera-based input system using OpenCV. Published the research findings in the International Journal of Digital Waste Engineering (IJDWE).",
    technologies: ["Python", "Unity", "OpenCV", "Research"],
    link: "https://github.com/zuleyhasen/Hand-Rehabilitation-Game",
    demo: "/images/hand-rehab-demo.webm",
    image: "/images/game.webp",
    category: "OpenAI/Unity"
  },
  {
    id: 3,
    title: "Library Automation System",
    description: "Developed a library management system during an internship using the MVC architecture and .NET technologies, gaining hands-on experience in back-end development and system management.",
    technologies: [".NET", "MVC", "SQL Server"],
    link: null,
    demo: null,
    image: "/images/gnc-library.webp",
    category: "Full Stack"
  },
  {
    id: 4,
    title: "ERP System Design",
    description: "Collaborated with a team to design and develop an ERP application for Senna Design. The system aimed to digitize business processes and enhance operational efficiency.",
    technologies: ["React Native", "PHP", "Android Studio"],
    link: "https://github.com/zuleyhasen/ReactNative-ERP-Mobile-App",
    demo: "/images/sennaERP.webm",
    image: "/images/senna.webp",
    category: "Mobile"
  },
  {
    id: 5,
    title: "Pizza Order System",
    description: "Designed a Pizza Order System using Python as part of Akbank Python Bootcamp, implementing object-oriented principles and decorators.",
    technologies: ["Python", "OOP"],
    link: "https://github.com/zuleyhasen/PizzaOrderSystem",
    demo: null,
    image: "/images/pizza.webp",
    category: "Backend"
  },
  {
    id: 6,
    title: "Strategic Move AI Game",
    description: "AI-powered strategy board game developed in C. The computer's decisions are guided by the Minimax algorithm with Alpha-Beta Pruning.",
    technologies: ["C", "AI", "Algorithms"],
    link: "https://github.com/zuleyhasen/Strategic-Move-AI-Game",
    demo: null,
    image: "/images/searching.webp",
    category: "AI"
  },
  {
    id: 7,
    title: "Python-to-C Translator",
    description: "A simple compiler that translates a Python-like indentation-based language into C code using Lex and Yacc.",
    technologies: ["Lex", "Yacc", "C"],
    link: "https://github.com/zuleyhasen/python_to_c_compiler",
    demo: null,
    image: "/images/Generated.webp",
    category: "System"
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Project Archives
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of technical projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedId(project.id)}
              className="group relative cursor-pointer"
            >
              <div className="glass-panel rounded-xl overflow-hidden h-full hover:border-primary/50 transition-colors duration-300">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2 py-1 text-xs font-mono bg-black/50 backdrop-blur-md border border-white/10 rounded text-white/80">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-white/60 border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-white/60 border border-white/5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full max-w-4xl bg-[#0A0A1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Left Side - Media */}
                <div className="w-full md:w-1/2 bg-black relative">
                  {selectedProject.demo ? (
                    <video 
                      src={selectedProject.demo} 
                      controls 
                      className="w-full h-full object-cover"
                      poster={selectedProject.image}
                    />
                  ) : (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Right Side - Details */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                  <div className="mb-6">
                    <span className="text-primary font-mono text-sm tracking-wider mb-2 block">
                      PROJECT_ID: {selectedProject.id.toString().padStart(3, '0')}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors"
                      >
                        <Github size={18} />
                        View Code
                      </a>
                    )}

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

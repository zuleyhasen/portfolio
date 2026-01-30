import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, Github, Award, Briefcase, GraduationCap } from 'lucide-react';



export default function About() {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8 pb-24">
      <div className="max-w-5xl mx-auto mb-20">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/3"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative glass-panel p-6 rounded-2xl flex flex-col items-center text-center">
                <img
                  src="/images/me.webp"
                  alt="Züleyha Şen"
                  className="w-32 h-32 rounded-full object-cover border-2 border-white/10 mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-bold text-white mb-1">Züleyha Şen</h1>
                <p className="text-primary font-mono text-sm mb-4">Computer Engineer</p>

                <div className="flex gap-3 mb-6">
                  <SocialLink href="mailto:enzuleyha@gmail.com" icon={<Mail size={18} />} />
                  <SocialLink href="https://www.linkedin.com/in/zuleyhasen" icon={<Linkedin size={18} />} />
                  <SocialLink href="https://www.github.com/zuleyhasen" icon={<Github size={18} />} />
                </div>

                <a
                  href="/zuleyha-sen-cv.pdf"
                  download
                  className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                >
                  <Download size={16} />
                  Download Resume
                </a>

              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Professional Summary
            </h2>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary">
              <p className="text-muted-foreground leading-relaxed text-lg">
                A recent Computer Engineering graduate eager to embark on a professional journey in the tech industry.
                With a strong foundation in programming, problem-solving, and teamwork, I am passionate about applying
                my academic knowledge to real-world challenges. Known for my enthusiasm, quick adaptability, and
                dedication to continuous learning.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Briefcase className="text-primary" size={24} />
              Experience
            </h3>
            <div className="space-y-6">
              <TimelineItem
                title="Operations and Analytics Intern"
                org="Patika.dev"
                date="April 2025 - July 2025"
                desc="Tracking student progress, technical assessment, and operational support."
              />
              <TimelineItem
                title="Summer Research Intern"
                org="Yeditepe University"
                date="July 2023 - Sept 2023"
                desc="Designed ERP system for textile company. Developed mobile app using React Native."
              />
              <TimelineItem
                title="Full Stack Developer Intern"
                org="GNC Proses Otomasyon"
                date="June 2023 - July 2023"
                desc="Developed library automation system using .NET MVC architecture."
              />
            </div>
            {/* Projects */}
            <h3 className="text-xl font-bold mb-6 mt-10 flex items-center gap-2 text-white">
              <Award className="text-accent" size={24} />
              Projects
            </h3>

            <div className="space-y-6">
              <TimelineItem
                title="Hand Rehabilitation Game (Graduation Project)"
                org="Unity · OpenAI · Academic Publication"
                date="2024"
                desc="Camera-based, gamified hand rehabilitation system developed with Unity and OpenAI. Published in an academic journal and awarded as a graduation project."
              />

              <TimelineItem
                title="Library Automation System"
                org="GNC Proses Otomasyon"
                date="2023"
                desc="MVC-based library automation system with three panels (Admin, User, Staff) developed during full-stack internship."
              />

              <TimelineItem
                title="Mobile App for Textile Company"
                org="Yeditepe University · Summer Project"
                date="2023"
                desc="Mobile application developed for a textile company under academic supervision during summer project course."
              />
            </div>

          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <GraduationCap className="text-secondary" size={24} />
              Education
            </h3>
            <div className="space-y-6">
              <TimelineItem
                title="Computer Engineering"
                org="Yeditepe University"
                date="2019 - 2024"
                desc="Bachelor's Degree"
              />
              <TimelineItem
                title="High School"
                org="Bahçeşehir Atatürk Anadolu Lisesi"
                date="2015 - 2019"
                desc="Secondary Education"
              />
            </div>

            <h3 className="text-xl font-bold mb-6 mt-10 flex items-center gap-2 text-white">
              <Award className="text-accent" size={24} />
              Certifications
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <CertItem title="Geleceği Yazan Kadınlar Yapay Zeka Programı Eğitim Serisi" issuer="Turkcell Geleceği Yazanlar" date="Feb 2025" />
              <CertItem title="Let's Transform with AI - Participation Certificate" issuer="Kodluyoruz" date="Jan 2025" />
              <CertItem title="Machine Learning 101" issuer="Turkcell Geleceği Yazanlar" date="Dec 2024" />
              <CertItem title="Python Programming 101" issuer="Turkcell Geleceği Yazanlar" date="Dec 2024" />
              <CertItem title="Python Programming 201" issuer="Turkcell Geleceği Yazanlar" date="Dec 2024" />
              <CertItem title="Python Programming 301" issuer="Turkcell Geleceği Yazanlar" date="Dec 2024" />
              <CertItem title="Python Programming 401" issuer="Turkcell Geleceği Yazanlar" date="Dec 2024" />
              <CertItem title="Introduction to Data Science and AI 101" issuer="Turkcell Geleceği Yazanlar" date="Dec 2024" />
              <CertItem title="Basic Node.js Training" issuer="techcareer.net" date="Nov 2024" />
              <CertItem title="Summer Project" issuer="Yeditepe University" date="Dec 2023" />
              <CertItem title="Unity Game Development" issuer="Oyun ve Uygulama Akademisi" date="Aug 2023" />
              <CertItem title="Technology Entrepreneurship" issuer="Oyun ve Uygulama Akademisi" date="Aug 2023" />
              <CertItem title="English for Developers" issuer="Oyun ve Uygulama Akademisi" date="Aug 2023" />
              <CertItem title="Project Execution: Bringing the Project to Life" issuer="Coursera" date="May 2023" />
              <CertItem title="Project Planning: Bringing It All Together" issuer="Coursera" date="Apr 2023" />
              <CertItem title="Akbank Python Bootcamp" issuer="Global AI Hub" date="Mar 2023" />
              <CertItem title="Initiating the Project: Stepping into the Project Successfully" issuer="Coursera" date="Mar 2023" />
              <CertItem title="Boğaziçi DataCamp 22 Data Science Summit" issuer="Compec - Boğaziçi University Informatics Club" date="Mar 2023" />
              <CertItem title="Version Controls: Git and GitHub" issuer="BTK Academy" date="May 2023" />

            </div>
          </motion.div>

        </div>
      </div>
    </div >
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all border border-white/5 hover:border-primary/50"
    >
      {icon}
    </a>
  );
}

function TimelineItem({ title, org, date, desc }: { title: string, org: string, date: string, desc: string }) {
  return (
    <div className="relative pl-6 border-l border-white/10 hover:border-primary/50 transition-colors group">
      <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_10px_var(--color-primary)]" />
      <span className="text-xs font-mono text-primary/80 mb-1 block">{date}</span>
      <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-sm font-medium text-white/60 mb-2">{org}</p>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function CertItem({ title, issuer, date }: { title: string, issuer: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-muted-foreground">{issuer}</p>
      </div>
      <span className="text-xs font-mono text-white/40">{date}</span>
    </div>
  );
}

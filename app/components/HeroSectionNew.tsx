'use client';

import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import ParallaxElement from './ParallaxElement';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/euaell', color: 'hover:text-gray-300' },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/euael-eshete/',
    color: 'hover:text-blue-400',
  },
  { name: 'Email', icon: Mail, href: 'mailto:euaelmeko@gmail.com', color: 'hover:text-red-400' },
];

const skills = ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'AI/ML'];

const stats = [
  { label: 'Projects', value: '50+' },
  { label: 'Experience', value: '4+ Years' },
  { label: 'Technologies', value: '25+' },
];

export default function HeroSectionNew() {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${
              50 + mousePosition.y
            }%, #3b82f6 0%, transparent 50%),
                         radial-gradient(circle at ${50 - mousePosition.x}% ${
                           50 - mousePosition.y
                         }%, #8b5cf6 0%, transparent 50%),
                         radial-gradient(circle at 50% 50%, #d946ef 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Greeting Badge */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="glass px-6 py-3 rounded-full border border-white/20"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                👋 Available for opportunities
              </span>
            </motion.div>
          </div>

          {/* Name & Title */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: 'spring',
                stiffness: 100,
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
            >
              <motion.span
                className="gradient-text block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Euael
              </motion.span>
              <motion.span
                className="gradient-text block"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                M. Eshete
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-2xl md:text-4xl lg:text-5xl font-light text-white/80 mb-4"
            >
              <span>Full Stack Developer </span>
              <motion.span
                key={currentSkill}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="inline-block gradient-text-primary font-semibold"
              >
                {skills[currentSkill]}
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
            >
              Crafting exceptional digital experiences with modern technologies and innovative
              solutions
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <ParallaxElement key={stat.label} speed={0.15 * (index + 1)}>
                <TiltCard className="h-full" glowColor="rgba(59, 130, 246, 0.3)">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      delay: 1.1 + index * 0.1,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-card rounded-2xl p-6 text-center h-full"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-white/60">{stat.label}</div>
                  </motion.div>
                </TiltCard>
              </ParallaxElement>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <MagneticButton
              onClick={() => scrollToSection('work')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
              strength={0.25}
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-full glass border-2 border-white/20 text-white font-semibold text-lg hover:border-white/40 transition-all"
              strength={0.25}
            >
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <MagneticButton
                key={social.name}
                href={social.href}
                className="p-4 glass rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                strength={0.2}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    delay: 1.7 + index * 0.1,
                  }}
                >
                  <social.icon size={24} />
                </motion.div>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors group"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
                <motion.div
                  className="w-1 h-2 bg-current rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <ParallaxElement speed={0.4} className="absolute top-20 left-10 hidden lg:block">
        <TiltCard glowColor="rgba(139, 92, 246, 0.4)">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 200, delay: 2.2 }}
            className="w-24 h-24 glass-card rounded-3xl flex items-center justify-center"
          >
            <span className="text-4xl">⚡</span>
          </motion.div>
        </TiltCard>
      </ParallaxElement>

      <ParallaxElement speed={-0.3} className="absolute top-40 right-10 hidden lg:block">
        <TiltCard glowColor="rgba(236, 72, 153, 0.4)">
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: -360 }}
            transition={{ type: 'spring', stiffness: 200, delay: 2.4 }}
            className="w-20 h-20 glass-card rounded-3xl flex items-center justify-center"
          >
            <span className="text-3xl">🚀</span>
          </motion.div>
        </TiltCard>
      </ParallaxElement>

      <ParallaxElement speed={0.5} className="absolute bottom-32 left-20 hidden lg:block">
        <TiltCard glowColor="rgba(34, 211, 238, 0.4)">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, delay: 2.6 }}
            className="w-16 h-16 glass-card rounded-3xl flex items-center justify-center"
          >
            <span className="text-2xl">💡</span>
          </motion.div>
        </TiltCard>
      </ParallaxElement>
    </section>
  );
}

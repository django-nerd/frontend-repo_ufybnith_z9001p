import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, Cpu, Brain, Mail } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef(null);
  // Foreground parallax following pointer
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 80, damping: 15, mass: 0.4 });
  const ySpring = useSpring(y, { stiffness: 80, damping: 15, mass: 0.4 });
  const rotateX = useTransform(ySpring, [ -50, 50 ], [ 8, -8 ]);
  const rotateY = useTransform(xSpring, [ -50, 50 ], [ -8, 8 ]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(Math.min(relX / 12, 50), -50));
    y.set(Math.max(Math.min(relY / 12, 50), -50));
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[72vh] min-h-[560px] w-full overflow-hidden bg-[#070814] text-white"
    >
      {/* 3D Background - Loading animation theme */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays must not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]" style={{
        backgroundImage:
          'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 25%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 30%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0) 28%)'
      }} />

      {/* Foreground content with parallax */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <motion.div
          style={{ rotateX, rotateY }}
          className="w-full"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-md ring-1 ring-white/10">
            <Rocket className="h-4 w-4 text-fuchsia-400" />
            <span className="text-xs font-medium text-white/90">Backend & ML Engineering</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Gustavo Dutra
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
            I design robust APIs, production ML pipelines, and tools that make data-driven products shine.
            Explore a live, interactive risk-scoring demo below.
          </p>

          <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-fuchsia-500/20 p-2 ring-1 ring-fuchsia-400/30">
                  <Cpu className="h-5 w-5 text-fuchsia-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">APIs</p>
                  <p className="text-xs text-white/70">Fast, typed, reliable</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/20 p-2 ring-1 ring-cyan-400/30">
                  <Brain className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">ML</p>
                  <p className="text-xs text-white/70">Deterministic demos</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-500/20 p-2 ring-1 ring-violet-400/30">
                  <Mail className="h-5 w-5 text-violet-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Available</p>
                  <p className="text-xs text-white/70">Let’s collaborate</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

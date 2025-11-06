import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#070814]/80 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-xs text-white/60">© {new Date().getFullYear()} Gustavo Dutra. Built with FastAPI, React, and a live ML demo.</p>
        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

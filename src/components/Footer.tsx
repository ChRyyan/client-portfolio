import React from 'react';
import { FileCheck2, ArrowUp, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/90 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#162036] to-[#0B1020] border border-[#4F9CF9]/40 flex items-center justify-center text-white font-bold text-base shadow-[0_0_15px_rgba(79,156,249,0.25)]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#67E8F9]">
                  {PERSONAL_INFO.initials}
                </span>
              </div>
              <div>
                <span className="block text-base font-bold text-white">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-xs text-slate-400">
                  {PERSONAL_INFO.headline}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              &ldquo;{PERSONAL_INFO.tagline}&rdquo; Bridging mathematical statistics, structured data handling, and organizational reporting.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-[#4F9CF9] text-xs font-semibold text-[#67E8F9] hover:text-white transition-all cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#4F9CF9]" />
                <span>Inspect Verified CV Document</span>
              </button>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#67E8F9] mb-4">
              Portfolio Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home & 3D Universe
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About & Background
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors cursor-pointer">
                  Skill Competencies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('showcase')} className="hover:text-white transition-colors cursor-pointer">
                  Analytical Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('education')} className="hover:text-white transition-colors cursor-pointer">
                  Education & Punjab University
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experience')} className="hover:text-white transition-colors cursor-pointer">
                  Professional Experience
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('certifications')} className="hover:text-white transition-colors cursor-pointer">
                  Certifications & Training
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Verification (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#67E8F9] mb-4">
              Verified Contact Coordinates
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4F9CF9] shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="hover:underline">
                  {PERSONAL_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#67E8F9] shrink-0" />
                <a href={`tel:${PERSONAL_INFO.contact.phone}`} className="hover:underline font-mono">
                  {PERSONAL_INFO.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>{PERSONAL_INFO.contact.location}</span>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              Authenticated directly against Hifza Tahir&apos;s Curriculum Vitae.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Hifza Tahir. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Crafted for Statistics & Data Storytelling</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

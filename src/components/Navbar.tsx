import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FileCheck2, 
  Sparkles, 
  BarChart3, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Mail, 
  User,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCV: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Showcase', href: '#showcase', id: 'showcase' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1020]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#4F9CF9] rounded-lg p-1 min-w-0 max-w-[calc(100%-56px)] sm:max-w-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#162036] to-[#0B1020] border border-[#4F9CF9]/40 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-[0_0_15px_rgba(79,156,249,0.25)] group-hover:border-[#67E8F9] group-hover:scale-105 transition-all shrink-0">
            <span className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-[#67E8F9]">
              {PERSONAL_INFO.initials}
            </span>
          </div>
          <div className="min-w-0">
            <span className="block text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-[#67E8F9] transition-colors truncate">
              {PERSONAL_INFO.name}
            </span>
            <span className="block text-[10px] sm:text-[11px] font-medium text-slate-400 truncate">
              BS Statistics • Analytics
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-[#4F9CF9] text-slate-950 font-bold shadow-[0_0_12px_rgba(79,156,249,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA / CV Modal trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenCV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#162036] hover:bg-[#1E2C4A] border border-[#4F9CF9]/30 hover:border-[#67E8F9] text-xs font-bold text-[#67E8F9] hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#4F9CF9]" />
            <span>Curriculum Vitae</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#4F9CF9] hover:bg-[#38BDF8] text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile Hamburger Button (Accessible 44x44px Touch Target) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none cursor-pointer shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with scroll safety */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 max-h-[calc(100vh-76px)] overflow-y-auto">
          <nav className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4F9CF9]/20 text-[#67E8F9] font-bold border-l-2 border-[#4F9CF9]'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCV();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#162036] border border-[#4F9CF9]/40 text-xs font-bold text-[#67E8F9]"
            >
              <FileCheck2 className="w-4 h-4 text-[#4F9CF9]" />
              <span>View Curriculum Vitae</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#4F9CF9] text-slate-950 font-bold text-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Hifza Tahir</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

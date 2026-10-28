/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { DataVisualizations } from './components/DataVisualizations';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { InterestsLanguages } from './components/InterestsLanguages';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section for navbar highlighting
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'showcase', 'education', 'experience', 'certifications', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.4) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-slate-100 flex flex-col font-sans selection:bg-[#4F9CF9]/30 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onOpenCV={() => setIsCVModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Interactive 3D Data Universe */}
        <Hero3D
          onOpenCV={() => setIsCVModalOpen(true)}
          onExploreWork={() => scrollTo('showcase')}
          onConnect={() => scrollTo('contact')}
        />

        {/* 2. About Me Section */}
        <AboutSection onOpenCV={() => setIsCVModalOpen(true)} />

        {/* 3. Skills Constellation & Categorical Descriptors */}
        <SkillsSection />

        {/* 4. Data Visualization Showcase (3 Sample Interactive Projects) */}
        <DataVisualizations />

        {/* 5. Education Timeline */}
        <EducationSection />

        {/* 6. Professional Experience */}
        <ExperienceSection />

        {/* 7. Certifications & Training Platforms */}
        <CertificationsSection />

        {/* 8. Personal Interests & Linguistic Profile */}
        <InterestsLanguages />

        {/* 9. Direct Contact & Inquiry Composer */}
        <ContactSection onOpenCV={() => setIsCVModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenCV={() => setIsCVModalOpen(true)} />

      {/* Verified CV Lightbox Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      {/* Back to top scroll button */}
      <BackToTop />
    </div>
  );
}

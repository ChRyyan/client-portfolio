import React from 'react';
import { 
  FileCheck2, 
  GraduationCap, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  Languages, 
  MapPin, 
  Phone, 
  Mail,
  FileSpreadsheet,
  LineChart,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO, LANGUAGES_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCV: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCV }) => {
  return (
    <section id="about" className="py-24 relative bg-[#0B1020] border-t border-slate-800/80">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4F9CF9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
            <Target className="w-3.5 h-3.5" />
            Background & Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Hifza Tahir
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Academic grounding in statistical mathematics, practical experience with organizational documentation, and dedication to empirical problem-solving.
          </p>
        </div>

        {/* Main Grid: Biography + Verified Snapshot Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Authentic Bio & Professional Objective (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Bio Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <span className="w-2 h-6 bg-[#4F9CF9] rounded-full inline-block" />
                <span>Professional Summary</span>
              </h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800/90">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#67E8F9] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4F9CF9]" />
                  <span>Professional Objective (from CV)</span>
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed italic bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  &ldquo;{PERSONAL_INFO.professionalObjective}&rdquo;
                </p>
              </div>
            </div>

            {/* Core Values / Working Philosophy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel rounded-xl p-5 border border-slate-800/90">
                <div className="w-9 h-9 rounded-lg bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 flex items-center justify-center text-[#67E8F9] mb-3">
                  <LineChart className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5">Evidence-Based Thinking</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Approach problems with hypothesis-driven inquiry, validating observations through numerical metrics rather than intuition.
                </p>
              </div>

              <div className="glass-panel rounded-xl p-5 border border-slate-800/90">
                <div className="w-9 h-9 rounded-lg bg-[#67E8F9]/10 border border-[#67E8F9]/30 flex items-center justify-center text-[#67E8F9] mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5">Structured Office Execution</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Applying Microsoft Excel, Word, and PowerPoint for accurate data entry, executive reporting, and structured presentations.
                </p>
              </div>
            </div>

            {/* Spoken Languages */}
            <div className="glass-panel rounded-xl p-5 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-[#4F9CF9]">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Languages Spoken</h4>
                  <p className="text-slate-400 text-xs">Fluent communication across multilingual settings</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {LANGUAGES_DATA.map((lang) => (
                  <span
                    key={lang}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified CV Snapshot & Key Stats Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Verified CV Showcase Card */}
            <div className="glass-panel rounded-2xl p-6 border border-[#4F9CF9]/30 relative overflow-hidden group shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#4F9CF9]" />
                  <h3 className="text-white font-bold text-base">Curriculum Vitae Document</h3>
                </div>
                <span className="text-[11px] font-semibold text-[#67E8F9] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                  Source of Truth
                </span>
              </div>

              {/* CV Image Thumbnail Preview with Lightbox Trigger */}
              <div 
                onClick={onOpenCV}
                className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950/80 aspect-[3/4] max-h-72 cursor-pointer group/thumb"
              >
                <img
                  src={PERSONAL_INFO.cvAssetPath}
                  alt="Hifza Tahir Curriculum Vitae"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105 opacity-90 group-hover/thumb:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
                  <div className="w-full flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-[#67E8F9] flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Click to inspect full document
                    </span>
                    <span className="text-[11px] text-slate-400">Rawalpindi, Pakistan</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={onOpenCV}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#4F9CF9] hover:bg-[#38BDF8] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>View Curriculum Vitae in Lightbox</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black text-[#4F9CF9]">3.27</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">CGPA Achieved</div>
                <div className="text-[11px] text-slate-500">Punjab University (BS)</div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black text-[#67E8F9]">76.71%</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Overall Marks (OPM)</div>
                <div className="text-[11px] text-slate-500">Quantitative Rigor</div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black text-white">5</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Credentials</div>
                <div className="text-[11px] text-slate-500">Coursera & DigiSkills</div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black text-emerald-400">Active</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Internship</div>
                <div className="text-[11px] text-slate-500">Al-Khidmat Foundation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

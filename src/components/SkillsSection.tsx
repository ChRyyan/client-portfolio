import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Presentation, 
  LineChart, 
  MessageSquare, 
  Clock, 
  Layers, 
  CheckCircle, 
  ArrowUpRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Office Productivity', 'Analysis & Research', 'Core Competencies'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-6 h-6 text-[#4F9CF9]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#67E8F9]" />;
      case 'Presentation':
        return <Presentation className="w-6 h-6 text-[#38BDF8]" />;
      case 'LineChart':
        return <LineChart className="w-6 h-6 text-[#818CF8]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#4F9CF9]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#67E8F9]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#4F9CF9]" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#0B1020]/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              Verified Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills & Methodologies
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
              Practical competencies grounded in academic statistical coursework, administrative internship execution, and tutoring communication.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4F9CF9] text-slate-950 shadow-[0_0_12px_rgba(79,156,249,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid (Authentic categorical descriptors, strictly NO fabricated percentages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const isSelected = activeSkill?.id === skill.id;
            return (
              <div
                key={skill.id}
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                className={`glass-panel glass-panel-hover rounded-2xl p-6 border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#4F9CF9] bg-slate-900/90 shadow-[0_0_25px_rgba(79,156,249,0.2)]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-center shadow-inner">
                      {getIcon(skill.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill Title & Descriptive Context */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#67E8F9] transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Practical Application Points */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#67E8F9] mb-2 flex items-center justify-between">
                    <span>Applied Areas:</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {isSelected ? 'Click to minimize' : 'Click to inspect'}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {skill.applications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#4F9CF9] shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Note / Recruiter Integrity Guarantee */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F9CF9]" />
            <span>
              <strong>Professional Standard:</strong> Skills are represented via factual practical application descriptions in adherence with Hifza Tahir&apos;s verified CV, avoiding arbitrary percentage ratings.
            </span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">Source: Verified CV</span>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Briefcase, Building, MapPin, CheckCircle, Clock } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-[#0B1020] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Applied Practice
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on organizational support and instructional communication experience, as verified in Hifza Tahir&apos;s CV.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EXPERIENCE_DATA.map((exp) => (
            <div
              key={exp.id}
              className={`glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border transition-all flex flex-col justify-between ${
                exp.isCurrent
                  ? 'border-[#4F9CF9]/40 bg-slate-900/80 shadow-[0_0_20px_rgba(79,156,249,0.15)]'
                  : 'border-slate-800'
              }`}
            >
              <div>
                {/* Header: Role, Status, and Organization */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[#4F9CF9]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <div className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#67E8F9]" />
                        <span>{exp.organization}</span>
                      </div>
                    </div>
                  </div>

                  {exp.isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Present (Active)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium self-start sm:self-auto">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {exp.period}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{exp.location}</span>
                </div>

                {/* Verified Responsibilities from CV */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#67E8F9]">
                    Key Responsibilities:
                  </div>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-[#4F9CF9] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom footer note */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="italic">Verifiable on CV</span>
                <span className="text-[#67E8F9] font-medium">{exp.location}, Pakistan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

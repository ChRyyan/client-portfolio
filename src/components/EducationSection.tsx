import React from 'react';
import { GraduationCap, Calendar, Award, Building2, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-[#0B1020]/90 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formal Education
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Rigorous mathematical and statistical coursework at Punjab University paired with foundational education under the Federal Board.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-2 sm:ml-8 pl-4 sm:pl-10 space-y-10 sm:space-y-12">
          {EDUCATION_DATA.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[25px] sm:-left-[47px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 border-2 border-[#4F9CF9] flex items-center justify-center shadow-[0_0_12px_rgba(79,156,249,0.5)] group-hover:scale-110 group-hover:border-[#67E8F9] transition-all">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#67E8F9]" />
              </div>

              {/* Education Card */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-8 border border-slate-800 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#67E8F9] transition-colors">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-300 text-sm mt-1">
                      <Building2 className="w-4 h-4 text-[#4F9CF9]" />
                      <span>{item.institution}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-[#67E8F9] self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Grade Metrics (if available, e.g. BS Statistics) */}
                {item.metrics && (
                  <div className="flex flex-wrap items-center gap-3 my-4">
                    {item.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="px-4 py-2 rounded-xl bg-slate-900/90 border border-[#4F9CF9]/40 flex items-center gap-2.5 shadow-sm"
                      >
                        <Award className="w-4 h-4 text-[#4F9CF9]" />
                        <span className="text-xs text-slate-400">{m.label}:</span>
                        <span className="text-sm font-bold text-white">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Academic Highlights */}
                <div className="pt-4 border-t border-slate-800/80">
                  <ul className="space-y-2">
                    {item.details.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#4F9CF9] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

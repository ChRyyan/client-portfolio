import React from 'react';
import { Award, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { CERTIFICATIONS_DATA, PLATFORMS_DATA } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative bg-[#0B1020]/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            Certifications & Training
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Learning
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Certifications completed across DigiSkills.pk and Coursera as listed in the curriculum vitae.
          </p>
        </div>

        {/* 5 Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Issuer Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      cert.issuer === 'Coursera'
                        ? 'bg-blue-950/80 text-blue-400 border border-blue-800/70'
                        : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/70'
                    }`}
                  >
                    {cert.issuer}
                  </span>
                  <Award className="w-4 h-4 text-[#4F9CF9]" />
                </div>

                {/* Certification Title */}
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {cert.title}
                </h3>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mt-4">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4F9CF9]" />
                  <span>Completed Program</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Training Platforms Section */}
        <div className="mt-12 pt-12 border-t border-slate-800/80">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-bold text-white">
              Tools & Training Platforms
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Platforms and productivity tools documented in Hifza Tahir&apos;s CV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLATFORMS_DATA.map((plat, idx) => (
              <div key={idx} className="glass-panel rounded-xl p-5 border border-slate-800/90">
                <div className="text-xs font-bold uppercase tracking-wider text-[#67E8F9] mb-1">
                  {plat.category}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{plat.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {plat.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {plat.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

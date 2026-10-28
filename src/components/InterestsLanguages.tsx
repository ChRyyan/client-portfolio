import React from 'react';
import { Camera, BookOpen, Scissors, Palette, Heart, Languages, Check } from 'lucide-react';
import { INTERESTS_DATA, LANGUAGES_DATA } from '../data/portfolioData';

export const InterestsLanguages: React.FC = () => {
  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5 text-[#4F9CF9]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#67E8F9]" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-[#38BDF8]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#818CF8]" />;
      default:
        return <Heart className="w-5 h-5 text-[#4F9CF9]" />;
    }
  };

  return (
    <section className="py-20 relative bg-[#0B1020] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interests Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
              <Heart className="w-3.5 h-3.5" />
              Personal Interests
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Interests & Creative Activities
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Creative interests documented in Hifza Tahir&apos;s CV, reflecting visual observation and thoughtful composition.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INTERESTS_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover rounded-xl p-4 border border-slate-800 flex items-start gap-3.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0">
                    {getInterestIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#67E8F9]/10 border border-[#67E8F9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
              <Languages className="w-3.5 h-3.5" />
              Linguistic Abilities
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Languages
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Languages listed in the official CV for academic and professional communication.
            </p>

            <div className="space-y-3">
              {LANGUAGES_DATA.map((lang, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-xl p-4 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-[#4F9CF9]">
                      <Languages className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">{lang}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#67E8F9]" />
                    <span>Listed on CV</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

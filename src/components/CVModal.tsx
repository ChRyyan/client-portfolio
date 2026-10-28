import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  FileCheck2, 
  ExternalLink,
  Printer,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<'document' | 'summary'>('document');

  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Hifza Tahir - Curriculum Vitae</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; background: #fff; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${PERSONAL_INFO.cvAssetPath}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 flex items-center justify-center text-[#67E8F9] shrink-0">
              <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-lg font-bold text-white truncate">
                  Curriculum Vitae
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#67E8F9] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> CV Document
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hifza Tahir • Rawalpindi, Pakistan • Source of Truth
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-lg text-xs font-semibold mr-2">
              <button
                onClick={() => setActiveTab('document')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'document' ? 'bg-[#4F9CF9] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Original Document
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'summary' ? 'bg-[#4F9CF9] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Key Facts
              </button>
            </div>

            {/* Zoom Controls */}
            {activeTab === 'document' && (
              <div className="hidden md:flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded-lg border border-slate-700 text-slate-300">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.2))}
                  className="p-1 hover:text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
                  className="p-1 hover:text-white cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="text-[11px] text-slate-400 hover:text-white px-1 cursor-pointer"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>
            )}

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Print CV Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <a
              href={PERSONAL_INFO.cvAssetPath}
              download="Hifza_Tahir_CV.png"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Download Original Image"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors ml-2 cursor-pointer"
              aria-label="Close CV Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto bg-slate-950 p-4 flex items-center justify-center">
          {activeTab === 'document' ? (
            <div className="w-full h-full overflow-auto flex items-center justify-center">
              <div 
                className="transition-transform duration-200 max-w-full"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              >
                <img
                  src={PERSONAL_INFO.cvAssetPath}
                  alt="Hifza Tahir Original CV Document"
                  className="max-h-[80vh] w-auto rounded-lg shadow-2xl border border-slate-800 object-contain mx-auto"
                />
              </div>
            </div>
          ) : (
            /* Summary Verification Sheet */
            <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Qualifications Summary</h4>
                <p className="text-xs text-slate-400">
                  Every detail displayed on this website is authenticated against Hifza Tahir&apos;s CV document.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Full Name:</span>
                  <span className="font-bold text-white text-sm">Hifza Tahir</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Primary Degree:</span>
                  <span className="font-bold text-[#67E8F9] text-sm">BS Statistics (Punjab Univ.)</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">CGPA / OPM:</span>
                  <span className="font-bold text-white text-sm">3.27 / 76.71%</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Current Role:</span>
                  <span className="font-bold text-emerald-400 text-sm">Intern, Al-Khidmat Foundation</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Official Email:</span>
                  <span className="font-bold text-white text-sm">piec2881@gmail.com</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Phone Contact:</span>
                  <span className="font-bold text-white text-sm font-mono">03100057644</span>
                </div>
              </div>

              <div className="p-4 bg-[#4F9CF9]/10 border border-[#4F9CF9]/20 rounded-xl text-xs text-slate-300">
                <div className="font-bold text-[#67E8F9] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strict Portfolio Integrity Policy</span>
                </div>
                <span>
                  No certifications, job tenures, metrics, or technologies have been fabricated or embellished beyond the official resume.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Document file: public/assets/aistudio/Hifza_Tahir_CV-3_9f7a5a4c.png</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

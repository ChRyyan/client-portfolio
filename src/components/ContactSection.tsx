import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles,
  MessageSquare,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenCV: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCV }) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  
  // Client-side form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isComposed, setIsComposed] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = 'Please provide your name.';
    if (!formState.email.trim() || !formState.email.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formState.message.trim() || formState.message.length < 10) {
      errors.message = 'Please include a message with at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsComposed(true);
    // Build mailto URI
    const subject = encodeURIComponent(formState.subject || `Inquiry for Hifza Tahir from ${formState.name}`);
    const body = encodeURIComponent(
      `Hello Hifza,\n\n${formState.message}\n\nBest regards,\n${formState.name}\nContact Email: ${formState.email}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-[#0B1020] border-t border-slate-800/80">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F9CF9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            Let&apos;s Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch with Hifza
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in discussing data analytics opportunities, research collaboration, or professional roles? Reach out directly via email or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#4F9CF9]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.contact.email}`}
                      className="text-base font-bold text-white hover:text-[#67E8F9] transition-colors block break-all"
                    >
                      {PERSONAL_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.contact.email, 'email')}
                  className="p-2.5 min-w-[40px] min-h-[40px] rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Mailto Link</span>
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="text-[#4F9CF9] hover:underline font-semibold flex items-center gap-1"
                >
                  Open Mail App <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#67E8F9] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Telephone / WhatsApp
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.contact.phone}`}
                      className="text-base font-bold text-white hover:text-[#67E8F9] transition-colors block font-mono break-all"
                    >
                      {PERSONAL_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.contact.phone, 'phone')}
                  className="p-2.5 min-w-[40px] min-h-[40px] rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  title="Copy phone to clipboard"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Clickable Telephone Call</span>
                <a
                  href={`tel:${PERSONAL_INFO.contact.phone}`}
                  className="text-[#67E8F9] hover:underline font-semibold flex items-center gap-1"
                >
                  Call Now <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#38BDF8]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Residential Location
                </span>
                <div className="text-sm font-bold text-white">
                  {PERSONAL_INFO.contact.location}
                </div>
              </div>
            </div>

            {/* Quick CV Card */}
            <div className="glass-panel rounded-2xl p-5 border border-[#4F9CF9]/30 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-[#4F9CF9]" />
                <div>
                  <div className="text-xs font-bold text-white">Attached CV Document</div>
                  <div className="text-[11px] text-slate-400">Verified primary source of truth</div>
                </div>
              </div>
              <button
                onClick={onOpenCV}
                className="px-3 py-1.5 rounded-lg bg-[#4F9CF9] text-slate-950 text-xs font-bold hover:bg-[#38BDF8] transition-colors cursor-pointer"
              >
                Inspect
              </button>
            </div>
          </div>

          {/* Interactive Inquiry Composer (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Compose Direct Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Forms a verified draft directly to {PERSONAL_INFO.contact.email}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#67E8F9] bg-[#4F9CF9]/10 border border-[#4F9CF9]/20 px-2.5 py-1 rounded">
                  Client-Side Validated
                </span>
              </div>

              <form onSubmit={handleCompose} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full min-h-[44px] bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F9CF9] focus:ring-1 focus:ring-[#4F9CF9] transition-all"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-rose-400 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="sarah@organization.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full min-h-[44px] bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F9CF9] focus:ring-1 focus:ring-[#4F9CF9] transition-all"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Data Analytics Role / Quantitative Research Mentorship"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full min-h-[44px] bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F9CF9] focus:ring-1 focus:ring-[#4F9CF9] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Message Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Introduce yourself or share details about your team, vacancy, or research inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full min-h-[110px] bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F9CF9] focus:ring-1 focus:ring-[#4F9CF9] transition-all"
                  />
                  {formErrors.message && (
                    <p className="text-xs text-rose-400 mt-1">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 leading-tight">
                    <span className="text-emerald-400 font-semibold">Honest Client Dispatch:</span> Launches your email client with these details pre-filled.
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4F9CF9] hover:bg-[#38BDF8] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(79,156,249,0.3)] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </button>
                </div>
              </form>

              {isComposed && (
                <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Inquiry draft prepared! If your mail client did not open automatically, you can email <strong>{PERSONAL_INFO.contact.email}</strong> directly.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

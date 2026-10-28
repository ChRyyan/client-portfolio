import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  HelpCircle, 
  AlertCircle, 
  Table as TableIcon, 
  PieChart as PieIcon,
  Sparkles,
  Info,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { DEMO_PROJECTS } from '../data/portfolioData';

export const DataVisualizations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const currentProject = DEMO_PROJECTS[activeTab];

  // Custom Dark Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700/80 p-3 rounded-lg shadow-xl text-xs text-white">
          <p className="font-bold text-[#67E8F9] mb-1">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-slate-400 capitalize">{entry.name}:</span>
              <span className="font-semibold text-white">
                {typeof entry.value === 'number' && entry.value > 1000 
                  ? `$${entry.value.toLocaleString()}` 
                  : entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="showcase" className="py-24 relative bg-[#0B1020] border-t border-slate-800/80">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4F9CF9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            Analytical Capability Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Data Storytelling & Analytical Models
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Exploratory case studies illustrating statistical distributions, time-series forecasting, and survey research methodology.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-md">
            <Info className="w-3.5 h-3.5 text-[#4F9CF9] shrink-0" />
            <span>Curated models showcasing quantitative methodology and visualization design</span>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex overflow-x-auto sm:flex-wrap items-center gap-2 sm:gap-3 mb-8 border-b border-slate-800/90 pb-4">
          {DEMO_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveTab(idx);
                setViewMode('chart');
              }}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 sm:shrink whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-[#4F9CF9] text-slate-950 shadow-[0_0_15px_rgba(79,156,249,0.35)]'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{proj.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                activeTab === idx ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {proj.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Current Active Showcase Container */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {/* Top Bar: Title, Disclaimer Badge, View Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#67E8F9] uppercase tracking-wider">
                  {currentProject.badge}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono">
                  Analytical Case Study
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {currentProject.title}
              </h3>
            </div>

            {/* View Mode Toggle (Chart vs Data Table) */}
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800 self-start lg:self-auto">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'chart'
                    ? 'bg-slate-800 text-[#67E8F9] shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Visual Chart</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-slate-800 text-[#67E8F9] shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Data Table</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {currentProject.statsSummary.map((stat, idx) => (
              <div key={idx} className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Analytical Question & Method Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-[#67E8F9] block mb-1">Analytical Ingestion:</span>
              <p className="text-slate-300 leading-relaxed">{currentProject.analyticalQuestion}</p>
            </div>
            <div>
              <span className="font-bold text-[#4F9CF9] block mb-1">Methodology Applied:</span>
              <p className="text-slate-300 leading-relaxed">{currentProject.methodology}</p>
            </div>
          </div>

          {/* MAIN INTERACTIVE VISUALIZATION AREA */}
          {viewMode === 'chart' ? (
            <div className="space-y-8">
              {/* Project 0: Student Performance Analysis */}
              {activeTab === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Grade Distribution Bar Chart (7 cols) */}
                  <div className="lg:col-span-7 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                      <span>Cohort Grade Distribution (N=240)</span>
                      <span className="text-xs text-slate-400 font-normal">Relative Frequency (%)</span>
                    </h4>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={currentProject.gradeDistribution}
                          margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                          <XAxis 
                            dataKey="grade" 
                            stroke="#64748B" 
                            tick={{ fill: '#94A3B8', fontSize: 10 }}
                            interval={0}
                            angle={-15}
                            textAnchor="end"
                          />
                          <YAxis stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="percentage" name="Percentage of Cohort" radius={[6, 6, 0, 0]}>
                            {currentProject.gradeDistribution?.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right: Subject Pass Rates & Averages (5 cols) */}
                  <div className="lg:col-span-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-4">
                      Subject Mastery & Pass Thresholds
                    </h4>
                    <div className="space-y-4">
                      {currentProject.subjectScores?.map((sub, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200">{sub.subject}</span>
                            <span className="text-[#67E8F9] font-mono font-bold">
                              {sub.average}% avg ({sub.passRate}% pass)
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#4F9CF9] to-[#67E8F9] h-2 rounded-full"
                              style={{ width: `${sub.average}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Project 1: Sales Performance Dashboard */}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Monthly Trend Area Chart (8 cols) */}
                  <div className="lg:col-span-8 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                      <span>Monthly Revenue vs Budget Target</span>
                      <span className="text-xs text-[#67E8F9]">Annual Total: $507,500</span>
                    </h4>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={currentProject.monthlyTrends}
                          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4F9CF9" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#4F9CF9" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                          <XAxis dataKey="month" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                          <YAxis stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            name="Actual Revenue ($)" 
                            stroke="#4F9CF9" 
                            strokeWidth={2.5}
                            fillOpacity={1} 
                            fill="url(#colorRev)" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="target" 
                            name="Target Budget ($)" 
                            stroke="#67E8F9" 
                            strokeDasharray="4 4" 
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right: Category Distribution Donut Chart (4 cols) */}
                  <div className="lg:col-span-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-2">Segment Contribution</h4>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={currentProject.categoryBreakdown}
                            dataKey="value"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                            paddingAngle={4}
                          >
                            {currentProject.categoryBreakdown?.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-1.5 mt-2">
                      {currentProject.categoryBreakdown?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.fill }} />
                            <span className="text-slate-300">{item.category}</span>
                          </div>
                          <span className="font-semibold text-white">{item.share}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Project 2: Survey & Research Insights */}
              {activeTab === 2 && (
                <div className="bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span>5-Point Likert Scale Responses (%) (N=500 Respondents)</span>
                    <span className="text-xs text-emerald-400 font-semibold">Reliability α = 0.86</span>
                  </h4>
                  <div className="w-full overflow-x-auto pb-2">
                    <div className="h-80 min-w-[500px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={currentProject.likertResponses}
                          margin={{ top: 10, right: 20, left: 100, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                          <XAxis type="number" domain={[0, 100]} stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                          <YAxis 
                            type="category" 
                            dataKey="question" 
                            stroke="#64748B" 
                            width={180}
                            tick={{ fill: '#94A3B8', fontSize: 11 }} 
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                          <Bar dataKey="stronglyAgree" name="Strongly Agree" stackId="a" fill="#4F9CF9" />
                          <Bar dataKey="agree" name="Agree" stackId="a" fill="#67E8F9" />
                          <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#94A3B8" />
                          <Bar dataKey="disagree" name="Disagree" stackId="a" fill="#F59E0B" />
                          <Bar dataKey="stronglyDisagree" name="Strongly Disagree" stackId="a" fill="#EF4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* RAW DATA TABLE VIEW */
            <div className="overflow-x-auto bg-slate-950/80 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-[#67E8F9]">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Structured Tabular Records</span>
                </span>
                <span className="font-mono text-slate-500 text-[11px]">CSV / Excel Format &bull; Curated Model</span>
              </div>
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Index</th>
                    <th className="py-2.5 px-3">Variable / Category</th>
                    <th className="py-2.5 px-3">Metric Value</th>
                    <th className="py-2.5 px-3">Proportion / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {activeTab === 0 && currentProject.gradeDistribution?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-2 px-3 text-slate-500">#{idx + 1}</td>
                      <td className="py-2 px-3 text-white font-sans">{row.grade}</td>
                      <td className="py-2 px-3 text-[#67E8F9]">{row.count} students</td>
                      <td className="py-2 px-3">{row.percentage}% of cohort</td>
                    </tr>
                  ))}
                  {activeTab === 1 && currentProject.monthlyTrends?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-2 px-3 text-slate-500">#{idx + 1}</td>
                      <td className="py-2 px-3 text-white font-sans">{row.month} 2024</td>
                      <td className="py-2 px-3 text-[#67E8F9]">${row.revenue.toLocaleString()}</td>
                      <td className="py-2 px-3">Target: ${row.target.toLocaleString()} ({row.margin}% margin)</td>
                    </tr>
                  ))}
                  {activeTab === 2 && currentProject.likertResponses?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-2 px-3 text-slate-500">#{idx + 1}</td>
                      <td className="py-2 px-3 text-white font-sans">{row.question}</td>
                      <td className="py-2 px-3 text-[#67E8F9]">Agree: {row.stronglyAgree + row.agree}%</td>
                      <td className="py-2 px-3">Neutral: {row.neutral}% | Disagree: {row.disagree + row.stronglyDisagree}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Key Analytical Takeaway Callout */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-start gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
            <CheckCircle2 className="w-5 h-5 text-[#4F9CF9] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#67E8F9] mb-1">
                Analytical Finding & Decision Takeaway
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {currentProject.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

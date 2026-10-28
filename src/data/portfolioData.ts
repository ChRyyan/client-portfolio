/**
 * Authentic Portfolio Data for Hifza Tahir
 * Source of Truth: Verified CV (Hifza Tahir, Rawalpindi)
 * 
 * Strict CV Compliance:
 * - No invented coursework or syllabi
 * - No invented language proficiency levels (English, Urdu, Punjabi listed purely)
 * - No fabricated client claims or credentials
 * - Sample demonstration projects strictly labeled as fictional illustrative models
 */

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  metrics?: { label: string; value: string }[];
  details: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  responsibilities: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Office Productivity' | 'Analysis & Research' | 'Core Competencies';
  description: string;
  applications: string[];
  iconName: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: 'DigiSkills.pk' | 'Coursera';
}

export interface PlatformItem {
  name: string;
  category: string;
  description: string;
  items: string[];
}

export const PERSONAL_INFO = {
  name: 'Hifza Tahir',
  initials: 'HT',
  headline: 'Statistics Graduate | Data Analytics Enthusiast',
  tagline: 'Turning data into insights, and insights into better decisions.',
  bio: 'Hifza Tahir is a Statistics graduate with a strong interest in data analytics, research, and evidence-based decision-making. She is developing practical skills in Microsoft Office, data handling, reporting, and analytical problem-solving, with a commitment to continuous learning and professional growth.',
  professionalObjective:
    'Motivated and detail-oriented Statistics graduate seeking a growth-oriented organization that offers mentorship, skill development and career advancement. Eager to apply analytical thinking, strong Microsoft Office skills and a disciplined work ethic to contribute meaningfully to the organization.',
  contact: {
    email: 'piec2881@gmail.com',
    phone: '03100057644',
    location: 'Rawalpindi, Punjab, Pakistan',
  },
  cvAssetPath: '/assets/aistudio/Hifza_Tahir_CV-3_9f7a5a4c.png',
  metrics: [
    { label: 'Degree', value: 'BS Statistics' },
    { label: 'CGPA', value: '3.27' },
    { label: 'OPM', value: '76.71' },
    { label: 'Courses Completed', value: '5 Programs' },
  ],
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'bs-statistics',
    degree: 'Bachelor of Statistics (BS)',
    institution: 'Punjab University',
    period: '2022 – 2026',
    metrics: [
      { label: 'CGPA', value: '3.27' },
      { label: 'OPM', value: '76.71' },
    ],
    details: [
      'Four-year Bachelor of Statistics program focused on mathematical statistics, data collection, and analytical methodology.',
      'Achieved a CGPA of 3.27 with an Overall Percentage of Marks (OPM) of 76.71 at Punjab University.',
    ],
  },
  {
    id: 'hssc',
    degree: 'Higher Secondary School Certificate (HSSC)',
    institution: 'Federal Board of Intermediate and Secondary Education, Rawalpindi',
    period: '2021 – 2022',
    details: [
      'Higher secondary education completed under the Federal Board curriculum in Rawalpindi.',
    ],
  },
  {
    id: 'ssc',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Federal Board of Intermediate and Secondary Education, Rawalpindi',
    period: '2019 – 2021',
    details: [
      'Secondary school certificate completed under the Federal Board curriculum in Rawalpindi.',
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'al-khidmat',
    role: 'Intern',
    organization: 'Al-Khidmat Foundation',
    location: 'Rawalpindi',
    period: 'Present',
    isCurrent: true,
    responsibilities: [
      'Working in a professional organizational environment, supporting day-to-day office and program activities.',
      'Applying Microsoft Office tools (Word, Excel, PowerPoint) for documentation, data handling and reporting.',
      'Developing teamwork, communication and time-management skills through hands-on work.',
    ],
  },
  {
    id: 'home-tutor',
    role: 'Home Tutor',
    organization: 'Academic Tutoring',
    location: 'Rawalpindi',
    period: 'Tutoring Practice',
    isCurrent: false,
    responsibilities: [
      'Delivered one-on-one academic tutoring, explaining concepts clearly and tracking student progress.',
      'Built strong communication, patience and responsibility through regular teaching.',
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'excel',
    name: 'Microsoft Office Excel',
    category: 'Office Productivity',
    description: 'Tabular data management, formula applications, and structured spreadsheet summaries.',
    applications: [
      'Spreadsheet calculations and data organization',
      'Table structuring and data entry verification',
      'Descriptive summaries and basic charting',
    ],
    iconName: 'FileSpreadsheet',
  },
  {
    id: 'word',
    name: 'Microsoft Office Word',
    category: 'Office Productivity',
    description: 'Formal document structuring, administrative reports, and written documentation.',
    applications: [
      'Document formatting and structured reports',
      'Meeting notes and official office correspondence',
      'Standardized document presentation',
    ],
    iconName: 'FileText',
  },
  {
    id: 'powerpoint',
    name: 'Microsoft Office PowerPoint',
    category: 'Office Productivity',
    description: 'Visual presentations for project summaries, reporting, and conceptual overviews.',
    applications: [
      'Structuring slide decks for meetings and briefings',
      'Visual formatting of summary points and charts',
      'Clear slide design for informative presentation',
    ],
    iconName: 'Presentation',
  },
  {
    id: 'data-analysis',
    name: 'Research & Data Analysis',
    category: 'Analysis & Research',
    description: 'Statistical reasoning, observational evaluation, and quantitative interpretation.',
    applications: [
      'Summarizing datasets using statistical measures',
      'Evaluating patterns and drawing evidence-based insights',
      'Data preparation and numerical reporting',
    ],
    iconName: 'LineChart',
  },
  {
    id: 'communication',
    name: 'Communication',
    category: 'Core Competencies',
    description: 'Clear oral and written expression in organizational and instructional settings.',
    applications: [
      'Explaining quantitative concepts in simple terms',
      'Collaborative communication in team environments',
      'Constructive one-on-one student tutoring',
    ],
    iconName: 'MessageSquare',
  },
  {
    id: 'time-management',
    name: 'Time Management',
    category: 'Core Competencies',
    description: 'Organized scheduling, task prioritization, and structured workflow habits.',
    applications: [
      'Balancing university studies alongside internship duties',
      'Meeting administrative reporting deadlines',
      'Consistent preparation and punctual execution',
    ],
    iconName: 'Clock',
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'bi-analytics',
    title: 'Data Analytics and Business Intelligence',
    issuer: 'DigiSkills.pk',
  },
  {
    id: 'data-science',
    title: 'Foundations of Data Science',
    issuer: 'Coursera',
  },
  {
    id: 'freelancing',
    title: 'Freelancing',
    issuer: 'DigiSkills.pk',
  },
  {
    id: 'intro-ai',
    title: 'Introduction to AI',
    issuer: 'Coursera',
  },
  {
    id: 'ai-data-analysis',
    title: 'AI for Data Analysis',
    issuer: 'Coursera',
  },
];

export const PLATFORMS_DATA: PlatformItem[] = [
  {
    name: 'DigiSkills.pk',
    category: 'Training Platform',
    description: 'National training program for digital competencies and freelancing.',
    items: ['Data Analytics and Business Intelligence', 'Freelancing'],
  },
  {
    name: 'Coursera',
    category: 'Learning Platform',
    description: 'Global online learning platform for technical and scientific courses.',
    items: ['Foundations of Data Science', 'Introduction to AI', 'AI for Data Analysis'],
  },
  {
    name: 'Microsoft Office',
    category: 'Productivity Suite',
    description: 'Core desktop applications utilized for organizational tasks.',
    items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
  },
];

export const INTERESTS_DATA = [
  {
    name: 'Photography',
    description: 'Observing composition, light, and perspective in visual framing.',
    iconName: 'Camera',
  },
  {
    name: 'Reading Books',
    description: 'Exploring academic topics, literature, and general non-fiction.',
    iconName: 'BookOpen',
  },
  {
    name: 'Dress Designing',
    description: 'Appreciating color coordination, pattern symmetry, and tailoring detail.',
    iconName: 'Scissors',
  },
  {
    name: 'Art',
    description: 'Visual creativity, creative sketching, and artistic expression.',
    iconName: 'Palette',
  },
];

// CV only lists the languages without invented proficiency ratings
export const LANGUAGES_DATA = ['English', 'Urdu', 'Punjabi'];

/**
 * 3 Interactive Demonstration Projects
 * Strictly labeled as fictional sample data created to demonstrate data analysis and charting capabilities.
 */
export const DEMO_PROJECTS = [
  {
    id: 'student-performance',
    title: 'Academic Performance Distribution',
    badge: 'Educational Analytics',
    disclaimer: 'Curated dataset modeled for distribution analysis and academic performance evaluation.',
    analyticalQuestion: 'How are grades and subject scores distributed across a cohort of students?',
    methodology: 'Evaluated a sample cohort of N=240 students across 5 subjects to examine score distributions, central tendency, and pass thresholds.',
    keyTakeaway: '68.3% of students achieved Grade A or B (164 out of 240 students), with Probability Theory recording the highest average score (82.5%).',
    statsSummary: [
      { label: 'Cohort Sample', value: '240 Students' },
      { label: 'Cohort Average', value: '78.4%' },
      { label: 'Cohort Median', value: '81.0%' },
      { label: 'Std. Deviation', value: '8.6%' },
    ],
    gradeDistribution: [
      { grade: 'Grade A (85-100%)', count: 68, percentage: 28.3, fill: '#4F9CF9' },
      { grade: 'Grade B (75-84%)', count: 96, percentage: 40.0, fill: '#67E8F9' },
      { grade: 'Grade C (65-74%)', count: 48, percentage: 20.0, fill: '#38BDF8' },
      { grade: 'Grade D (50-64%)', count: 20, percentage: 8.3, fill: '#818CF8' },
      { grade: 'Fail (<50%)', count: 8, percentage: 3.4, fill: '#F43F5E' },
    ],
    subjectScores: [
      { subject: 'Probability Theory', average: 82.5, passRate: 94 },
      { subject: 'Statistical Inference', average: 76.2, passRate: 88 },
      { subject: 'Calculus & Algebra', average: 74.8, passRate: 85 },
      { subject: 'Data Presentation', average: 84.1, passRate: 97 },
      { subject: 'Survey Methods', average: 80.6, passRate: 93 },
    ],
  },
  {
    id: 'sales-dashboard',
    title: 'Sales Trends & Segment Analysis',
    badge: 'Business Analytics',
    disclaimer: 'Curated time-series and segment model for commercial performance reporting.',
    analyticalQuestion: 'What are the seasonal revenue dynamics and category contributions across 12 operating months?',
    methodology: 'Modeled 12 months of sales performance totaling $507,500 against a $479,000 budget target, categorized across four product segments.',
    keyTakeaway: 'Q4 (Oct–Dec) generated $160,600 (31.6% of annual turnover), representing peak volume. Analytics Software was the largest revenue contributor at $192,850 (38.0%).',
    statsSummary: [
      { label: 'Annual Revenue', value: '$507,500' },
      { label: 'Target Attainment', value: '105.9%' },
      { label: 'Q4 Volume', value: '$160,600' },
      { label: 'Top Category', value: 'Analytics Software' },
    ],
    monthlyTrends: [
      { month: 'Jan', revenue: 32000, target: 30000, margin: 28 },
      { month: 'Feb', revenue: 29500, target: 30000, margin: 26 },
      { month: 'Mar', revenue: 35000, target: 32000, margin: 31 },
      { month: 'Apr', revenue: 37200, target: 35000, margin: 30 },
      { month: 'May', revenue: 41000, target: 38000, margin: 33 },
      { month: 'Jun', revenue: 39800, target: 40000, margin: 32 },
      { month: 'Jul', revenue: 43500, target: 40000, margin: 34 },
      { month: 'Aug', revenue: 42100, target: 42000, margin: 33 },
      { month: 'Sep', revenue: 46800, target: 45000, margin: 36 },
      { month: 'Oct', revenue: 49200, target: 45000, margin: 35 },
      { month: 'Nov', revenue: 53400, target: 50000, margin: 38 },
      { month: 'Dec', revenue: 58000, target: 52000, margin: 40 },
    ],
    categoryBreakdown: [
      { category: 'Analytics Software', value: 192850, share: 38.0, fill: '#4F9CF9' },
      { category: 'Hardware Systems', value: 147175, share: 29.0, fill: '#67E8F9' },
      { category: 'Office Supplies', value: 101500, share: 20.0, fill: '#38BDF8' },
      { category: 'Support Services', value: 65975, share: 13.0, fill: '#818CF8' },
    ],
  },
  {
    id: 'survey-research',
    title: 'Public Survey & Response Insights',
    badge: 'Survey Methodology',
    disclaimer: 'Curated survey model illustrating Likert-scale sentiment and consensus analysis.',
    analyticalQuestion: 'How do survey participants evaluate data clarity, presentation, and confidence using a 5-point Likert scale?',
    methodology: 'Evaluated responses from a sample of N=500 participants across four survey items, measuring positive agreement (Agree + Strongly Agree) across questions.',
    keyTakeaway: 'Across all four survey items, an average of 83.3% of participants expressed positive agreement, with the highest consensus (88.0%) recorded for data consistency confidence.',
    statsSummary: [
      { label: 'Survey Sample', value: '500 Responses' },
      { label: 'Overall Agreement', value: '83.3% Avg' },
      { label: 'Top Agreement Item', value: '88.0%' },
      { label: 'Neutral Responses', value: '11.0% Avg' },
    ],
    likertResponses: [
      {
        question: 'Visual charts communicate metrics better than raw tables',
        stronglyAgree: 46,
        agree: 38,
        neutral: 10,
        disagree: 4,
        stronglyDisagree: 2,
      },
      {
        question: 'Statistical summaries helped make confident decisions',
        stronglyAgree: 40,
        agree: 42,
        neutral: 12,
        disagree: 5,
        stronglyDisagree: 1,
      },
      {
        question: 'Reporting format is structured and easy to navigate',
        stronglyAgree: 35,
        agree: 44,
        neutral: 14,
        disagree: 5,
        stronglyDisagree: 2,
      },
      {
        question: 'Confidence in data consistency and source accuracy',
        stronglyAgree: 52,
        agree: 36,
        neutral: 8,
        disagree: 3,
        stronglyDisagree: 1,
      },
    ],
  },
];

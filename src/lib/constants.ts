// src/lib/constants.ts

export const APP_NAME = "Analyst.OS"
export const APP_DESCRIPTION = "From MIS Graduate to Data Analyst in 90 days."
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export const TOTAL_DAYS = 90

export const PHASES = [
  { number: 1, name: "Foundations", startDay: 1, endDay: 7, colorHex: "#8B5CF6", skill: "foundations" },
  { number: 2, name: "Excel for Analysts", startDay: 8, endDay: 20, colorHex: "#10B981", skill: "excel" },
  { number: 3, name: "SQL for Data Analysis", startDay: 21, endDay: 35, colorHex: "#3B82F6", skill: "sql" },
  { number: 4, name: "Statistics & Business Analysis", startDay: 36, endDay: 42, colorHex: "#F59E0B", skill: "statistics" },
  { number: 5, name: "Power BI", startDay: 43, endDay: 55, colorHex: "#EC4899", skill: "power_bi" },
  { number: 6, name: "Python for Data Analysis", startDay: 56, endDay: 65, colorHex: "#06B6D4", skill: "python" },
  { number: 7, name: "Business & Systems Analysis", startDay: 66, endDay: 72, colorHex: "#6366F1", skill: "business_analysis" },
  { number: 8, name: "Portfolio Projects", startDay: 73, endDay: 82, colorHex: "#F97316", skill: "projects" },
  { number: 9, name: "Job Preparation", startDay: 83, endDay: 87, colorHex: "#84CC16", skill: "job_prep" },
  { number: 10, name: "Job Launch", startDay: 88, endDay: 90, colorHex: "#22D3EE", skill: "job_launch" },
] as const

export const CAREER_GOALS = [
  {
    id: "data_analyst",
    label: "Data Analyst",
    description: "Analyze business data to generate insights and support decisions",
    icon: "BarChart3",
  },
  {
    id: "bi_analyst",
    label: "BI Analyst",
    description: "Build dashboards, reports, and data models for business intelligence",
    icon: "LayoutDashboard",
  },
  {
    id: "business_analyst",
    label: "Business Analyst",
    description: "Bridge business requirements and technical solutions",
    icon: "Briefcase",
  },
] as const

// Progress thresholds
export const QUIZ_PASS_SCORE = 70 // percent
export const QUIZ_MAX_ATTEMPTS = 3
export const QUIZ_COOLDOWN_HOURS = 1
export const LESSON_READ_THRESHOLD = 80 // percent of sections to be read
export const MIN_EXERCISES_REQUIRED = 1

// AI limits
export const AI_MESSAGES_PER_DAY = 30
export const AI_MAX_MESSAGE_LENGTH = 2000
export const AI_MAX_RESPONSE_TOKENS = 1500

// File upload limits
export const UPLOAD_MAX_SIZE_MB = 50
export const UPLOAD_ALLOWED_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.ms-excel", // xls
  "application/octet-stream", // pbix
  "text/csv",
  "application/zip",
]

// Day status colors for UI
export const DAY_STATUS_STYLES = {
  locked: {
    bg: "bg-background-surface",
    border: "border-border-subtle",
    text: "text-foreground-tertiary",
    icon: "Lock",
  },
  available: {
    bg: "bg-background-surface",
    border: "border-primary/40",
    text: "text-foreground-secondary",
    icon: "Circle",
  },
  in_progress: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    icon: "PlayCircle",
  },
  completed: {
    bg: "bg-success/10",
    border: "border-success/30",
    text: "text-success",
    icon: "CheckCircle2",
  },
  missed: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    text: "text-warning",
    icon: "AlertCircle",
  },
} as const

// Readiness level labels
export const READINESS_LEVELS = [
  { key: "foundation", label: "Foundation", description: "Knows the concepts" },
  { key: "developing", label: "Developing", description: "Actively practicing" },
  { key: "practical", label: "Practical", description: "Can do the job tasks" },
  { key: "portfolio_ready", label: "Portfolio Ready", description: "Has documented work" },
  { key: "interview_ready", label: "Interview Ready", description: "Can explain and defend work" },
  { key: "job_launch", label: "Job Launch", description: "CV, LinkedIn, and pipeline active" },
] as const

// Achievement keys
export const ACHIEVEMENT_KEYS = {
  FIRST_LESSON: "first_lesson",
  FIRST_SQL: "first_sql_query",
  STREAK_7: "streak_7_days",
  STREAK_30: "streak_30_days",
  PHASE_1_COMPLETE: "phase_1_complete",
  PHASE_2_COMPLETE: "phase_2_complete",
  PHASE_3_COMPLETE: "phase_3_complete",
  PHASE_4_COMPLETE: "phase_4_complete",
  PHASE_5_COMPLETE: "phase_5_complete",
  PHASE_6_COMPLETE: "phase_6_complete",
  PHASE_7_COMPLETE: "phase_7_complete",
  PROJECT_1_SUBMITTED: "project_1_submitted",
  PROJECT_2_SUBMITTED: "project_2_submitted",
  CAPSTONE_SUBMITTED: "capstone_submitted",
  JOURNEY_COMPLETE: "journey_complete",
} as const

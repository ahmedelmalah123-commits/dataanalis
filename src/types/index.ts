// src/types/index.ts
// Shared TypeScript types across the application

// ============ USER & AUTH ============
export type CareerGoal = "data_analyst" | "bi_analyst" | "business_analyst"
export type AuthProvider = "email" | "google"

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  authProvider: AuthProvider | null
  isAdmin: boolean
  createdAt: string
  lastActive: string
}

export interface Profile {
  userId: string
  careerGoal: CareerGoal
  startDate: string
  currentDay: number
  streak: number
  longestStreak: number
  totalXp: number
  avatarUrl: string | null
  country: string
  timezone: string
}

export interface UserWithProfile extends User {
  profile: Profile | null
}

// ============ CURRICULUM ============
export type Difficulty = "beginner" | "intermediate" | "advanced"
export type ContentStatus = "draft" | "published" | "archived"
export type DayStatus = "locked" | "available" | "in_progress" | "completed" | "missed"
export type Skill =
  | "foundations"
  | "excel"
  | "sql"
  | "statistics"
  | "power_bi"
  | "python"
  | "business_analysis"
  | "projects"
  | "job_prep"
  | "job_launch"

export interface Phase {
  id: number
  number: number
  name: string
  description: string
  colorHex: string
  startDay: number
  endDay: number
}

export interface Day {
  id: number
  dayNumber: number
  phaseId: number
  phase?: Phase
  title: string
  subtitle: string | null
  skill: Skill
  estimatedMinutes: number
  difficulty: Difficulty
  xpReward: number
  status: ContentStatus
  version: number
  updatedAt: string
}

export interface DayWithProgress extends Day {
  userStatus: DayStatus
  completionPercentage: number
  completedAt: string | null
}

// ============ LESSON CONTENT ============
export type SectionType =
  | "concept"
  | "analogy"
  | "business_example"
  | "code_example"
  | "visual"
  | "interactive"
  | "practice"
  | "common_mistakes"
  | "job_connection"
  | "review"

export interface LessonSection {
  id: string
  type: SectionType
  order: number
  title: string
  content: string
  code?: string
  language?: string
  runnable?: boolean
  datasetRef?: string
  imageUrl?: string
  explanation?: string
}

export interface Lesson {
  id: string
  dayId: number
  learningObjective: string
  sections: LessonSection[]
  prerequisites: number[]
  nextDayTeaser: string | null
}

// ============ QUIZ ============
export type QuestionType = "mcq" | "multi_select" | "sql_fill" | "code_write" | "short_text" | "ordering" | "matching"

export interface QuizQuestion {
  id: string
  dayId: number
  orderIndex: number
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export interface QuizAttempt {
  questionId: string
  answer: string
}

export interface QuizResult {
  score: number
  passed: boolean
  answers: Array<{
    questionId: string
    correct: boolean
    explanation: string
  }>
  attemptsRemaining: number
  nextAttemptAt: string | null
}

// ============ EXERCISES ============
export type ExerciseType = "sql" | "python" | "fill_blank" | "mcq" | "matching" | "short_answer" | "file_upload" | "checklist"
export type ValidationMode = "result_match" | "output_match" | "string_match" | "manual" | "checklist"

export interface Exercise {
  id: string
  dayId: number
  orderIndex: number
  type: ExerciseType
  title: string
  instructions: string
  datasetRef: string | null
  starterCode: string | null
  solution: string | null
  validationType: ValidationMode
  hints: string[]
  difficulty: Difficulty
}

export interface ExerciseSubmission {
  exerciseId: string
  answer: string
  correct: boolean
  hintsUsed: number
  usedSolution: boolean
}

// ============ MISSIONS ============
export type MissionType = "sql" | "excel" | "python" | "powerbi" | "written" | "file_upload" | "checklist"
export type SubmissionType = "sql_playground" | "file_upload" | "text_answer" | "checklist"
export type EvaluationType = "automated" | "manual" | "self_check"
export type AIGuardrail = "hint_only" | "explain_only" | "full"

export interface Mission {
  id: string
  dayId: number
  title: string
  type: MissionType
  description: string
  tasks: string[]
  datasetRef: string | null
  submissionType: SubmissionType
  evaluationType: EvaluationType
  aiGuardrail: AIGuardrail
}

export interface MissionSubmission {
  id: string
  userId: string
  missionId: string
  dayId: number
  submissionType: SubmissionType
  content: string | null
  fileUrl: string | null
  checklistData: Record<string, boolean> | null
  submittedAt: string
  isFinal: boolean
}

// ============ PROGRESS ============
export interface DayProgress {
  dayId: number
  dayNumber: number
  userId: string
  status: DayStatus
  lessonReadPct: number
  quizPassed: boolean
  quizBestScore: number
  quizAttempts: number
  exercisesDone: number
  missionSubmitted: boolean
  completedAt: string | null
  lastAccessed: string | null
}

export interface ProgressSummary {
  currentDay: number
  overallPercent: number
  streak: number
  longestStreak: number
  totalXp: number
  daysCompleted: number
  phaseSummaries: PhaseSummary[]
  skillScores: Record<Skill, number>
}

export interface PhaseSummary {
  phaseId: number
  phaseNumber: number
  phaseName: string
  colorHex: string
  daysTotal: number
  daysCompleted: number
  completionPercent: number
}

// ============ PROJECTS ============
export type ProjectStatus = "locked" | "available" | "in_progress" | "submitted" | "reviewed"

export interface Project {
  id: string
  number: number
  title: string
  businessContext: string
  scenario: string
  tools: string[]
  phaseStart: number
  phaseEnd: number
  status: ContentStatus
}

export interface ProjectSubmission {
  id: string
  userId: string
  projectId: string
  taskCompletions: Record<string, boolean>
  fileUrls: Record<string, string>
  writtenReflection: string | null
  selfScore: number | null
  submittedAt: string | null
  submissionStatus: "draft" | "submitted" | "reviewed"
  rubricScore: number | null
  feedback: string | null
}

// ============ DATASETS ============
export type DatasetFormat = "csv" | "parquet" | "xlsx"

export interface Dataset {
  id: string
  refName: string
  displayName: string
  description: string
  fileUrl: string
  fileFormat: DatasetFormat
  schemaJson: DatasetSchema | null
  version: number
}

export interface DatasetSchema {
  tables: Array<{
    name: string
    columns: Array<{
      name: string
      type: string
      nullable: boolean
      description?: string
    }>
  }>
}

// ============ NOTES & BOOKMARKS ============
export interface Note {
  id: string
  userId: string
  dayId: number
  dayTitle?: string
  content: string
  selectionText: string | null
  createdAt: string
  updatedAt: string
}

export interface Bookmark {
  id: string
  userId: string
  dayId: number
  dayTitle?: string
  sectionId: string | null
  createdAt: string
}

// ============ ACHIEVEMENTS ============
export interface Achievement {
  id: string
  key: string
  name: string
  description: string
  icon: string
  xpValue: number
}

export interface UserAchievement {
  achievement: Achievement
  earnedAt: string
}

// ============ JOB LAUNCH ============
export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "phone_screen"
  | "technical"
  | "final_round"
  | "offer"
  | "rejected"

export interface JobApplication {
  id: string
  userId: string
  company: string
  jobTitle: string
  source: string | null
  appliedDate: string | null
  status: ApplicationStatus
  contactName: string | null
  notes: string | null
  nextAction: string | null
  nextActionDate: string | null
}

export type ReadinessLevel =
  | "foundation"
  | "developing"
  | "practical"
  | "portfolio_ready"
  | "interview_ready"
  | "job_launch"

export interface ReadinessMatrix {
  overall: ReadinessLevel
  skills: Record<string, ReadinessLevel>
  completionFlags: {
    allPhasesComplete: boolean
    twoProjectsSubmitted: boolean
    jobPrepComplete: boolean
    cvChecklistDone: boolean
  }
}

// ============ AI TUTOR ============
export type AIGuardrailLevel = "hint_only" | "explain_only" | "full"

export interface AIMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface AIContext {
  dayNumber: number
  lessonTitle: string
  currentSection?: string
  exerciseId?: string
  missionId?: string
  lastQuery?: string
  guardrail: AIGuardrailLevel
}

// ============ API RESPONSES ============
export interface ApiSuccess<T> {
  success: true
  data: T
  meta?: {
    timestamp: string
    version: string
  }
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export interface PaginatedResponse<T> {
  success: true
  data: T[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

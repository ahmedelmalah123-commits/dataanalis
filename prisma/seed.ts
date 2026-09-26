// prisma/seed.ts
// Seeds the database with all 10 phases, 90 day stubs, achievements, and 3 projects.

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// ============================================================
// PHASE + DAY DATA
// ============================================================

const phases = [
  {
    number: 1,
    name: "Foundations",
    description: "Understand what data analysis is, what analysts do, and how businesses think about data.",
    colorHex: "#8B5CF6",
    startDay: 1,
    endDay: 7,
  },
  {
    number: 2,
    name: "Excel for Analysts",
    description: "Master Excel from zero to practical analyst level — formulas, Pivot Tables, data cleaning, and Power Query.",
    colorHex: "#10B981",
    startDay: 8,
    endDay: 20,
  },
  {
    number: 3,
    name: "SQL for Data Analysis",
    description: "Write real SQL queries against real databases — from SELECT to window functions.",
    colorHex: "#3B82F6",
    startDay: 21,
    endDay: 35,
  },
  {
    number: 4,
    name: "Statistics & Business Analysis",
    description: "Learn the statistics that analysts actually use, and how to turn data into business insights.",
    colorHex: "#F59E0B",
    startDay: 36,
    endDay: 42,
  },
  {
    number: 5,
    name: "Power BI",
    description: "Build professional dashboards from raw data — data modeling, DAX, and business storytelling.",
    colorHex: "#EC4899",
    startDay: 43,
    endDay: 55,
  },
  {
    number: 6,
    name: "Python for Data Analysis",
    description: "Use Python and Pandas to clean, analyze, and visualize data — no software engineering required.",
    colorHex: "#06B6D4",
    startDay: 56,
    endDay: 65,
  },
  {
    number: 7,
    name: "Business & Systems Analysis",
    description: "Learn requirements, process mapping, stakeholder analysis, and how to translate business needs.",
    colorHex: "#6366F1",
    startDay: 66,
    endDay: 72,
  },
  {
    number: 8,
    name: "Portfolio Projects",
    description: "Build 3 real portfolio projects that you can show to any employer.",
    colorHex: "#F97316",
    startDay: 73,
    endDay: 82,
  },
  {
    number: 9,
    name: "Job Preparation",
    description: "Build your CV, optimize LinkedIn, and prepare for interviews.",
    colorHex: "#84CC16",
    startDay: 83,
    endDay: 87,
  },
  {
    number: 10,
    name: "Job Launch",
    description: "Launch your job search with a strategy, application tracker, and pipeline.",
    colorHex: "#22D3EE",
    startDay: 88,
    endDay: 90,
  },
]

// Day definitions: dayNumber, title, subtitle, skill, estimatedMinutes, difficulty
const days = [
  // Phase 1: Foundations
  { dayNumber: 1, title: "What Is Data?", subtitle: "Every analyst's starting point", skill: "foundations", estimatedMinutes: 30, difficulty: "beginner" },
  { dayNumber: 2, title: "What Do Analysts Actually Do?", subtitle: "A day in the life of a Data Analyst", skill: "foundations", estimatedMinutes: 35, difficulty: "beginner" },
  { dayNumber: 3, title: "Thinking Like an Analyst", subtitle: "From data to decisions", skill: "foundations", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 4, title: "Data Structures", subtitle: "Rows, columns, tables, and databases", skill: "foundations", estimatedMinutes: 35, difficulty: "beginner" },
  { dayNumber: 5, title: "KPIs & Business Metrics", subtitle: "How companies measure success", skill: "foundations", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 6, title: "Data-Driven Decision Making", subtitle: "How businesses actually use data", skill: "foundations", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 7, title: "Phase 1 Review", subtitle: "Consolidate and test your foundations", skill: "foundations", estimatedMinutes: 45, difficulty: "beginner" },

  // Phase 2: Excel
  { dayNumber: 8, title: "Excel Interface & Navigation", subtitle: "Your workspace, demystified", skill: "excel", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 9, title: "Data Entry & Basic Formulas", subtitle: "Building from cells up", skill: "excel", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 10, title: "Core Functions: SUM, AVERAGE, COUNT", subtitle: "Your most-used analyst functions", skill: "excel", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 11, title: "Conditional Logic with IF", subtitle: "Making Excel think for you", skill: "excel", estimatedMinutes: 50, difficulty: "beginner" },
  { dayNumber: 12, title: "SUMIF, SUMIFS, COUNTIF, COUNTIFS", subtitle: "Conditional aggregation in practice", skill: "excel", estimatedMinutes: 50, difficulty: "beginner" },
  { dayNumber: 13, title: "Lookup Functions: XLOOKUP & INDEX/MATCH", subtitle: "Finding data across tables", skill: "excel", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 14, title: "Text & Date Functions", subtitle: "Clean and transform strings and dates", skill: "excel", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 15, title: "Sorting, Filtering & Data Validation", subtitle: "Taming large datasets", skill: "excel", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 16, title: "Data Cleaning in Excel", subtitle: "Real data is messy — here's how to fix it", skill: "excel", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 17, title: "Excel Tables & Pivot Tables: Intro", subtitle: "Summarize data in seconds", skill: "excel", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 18, title: "Advanced Pivot Tables & Charts", subtitle: "From summary to insight", skill: "excel", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 19, title: "Conditional Formatting & Power Query", subtitle: "Visualize and automate data transformation", skill: "excel", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 20, title: "Excel Mini-Project", subtitle: "Sales performance analysis — end to end", skill: "excel", estimatedMinutes: 90, difficulty: "intermediate" },

  // Phase 3: SQL
  { dayNumber: 21, title: "Databases & Tables", subtitle: "What you're actually querying", skill: "sql", estimatedMinutes: 35, difficulty: "beginner" },
  { dayNumber: 22, title: "Your First SELECT", subtitle: "Reading data from a table", skill: "sql", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 23, title: "Filtering Data with WHERE", subtitle: "Ask specific questions of your data", skill: "sql", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 24, title: "Sorting & DISTINCT", subtitle: "Order matters in analysis", skill: "sql", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 25, title: "Aggregate Functions", subtitle: "COUNT, SUM, AVG, MIN, MAX", skill: "sql", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 26, title: "Grouping Data with GROUP BY", subtitle: "Summarize by category", skill: "sql", estimatedMinutes: 50, difficulty: "beginner" },
  { dayNumber: 27, title: "Conditional Logic with CASE WHEN", subtitle: "If/else inside your query", skill: "sql", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 28, title: "Single-Table Mastery", subtitle: "Complex business queries — practice day", skill: "sql", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 29, title: "Understanding JOINs", subtitle: "Why tables need each other", skill: "sql", estimatedMinutes: 45, difficulty: "intermediate" },
  { dayNumber: 30, title: "INNER JOIN", subtitle: "Combine matching records from two tables", skill: "sql", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 31, title: "LEFT JOIN & NULL Handling", subtitle: "Include unmatched records — safely", skill: "sql", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 32, title: "Multi-Table Analysis", subtitle: "Three-table queries for business reports", skill: "sql", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 33, title: "Subqueries & CTEs", subtitle: "Write readable, reusable SQL", skill: "sql", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 34, title: "Window Functions & Date Operations", subtitle: "Rank, lag, lead — analyst superpowers", skill: "sql", estimatedMinutes: 65, difficulty: "advanced" },
  { dayNumber: 35, title: "SQL Capstone Challenge", subtitle: "8 real business queries — prove your SQL", skill: "sql", estimatedMinutes: 90, difficulty: "advanced" },

  // Phase 4: Statistics & Business Analysis
  { dayNumber: 36, title: "Descriptive Statistics", subtitle: "Mean, median, mode — and when to use each", skill: "statistics", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 37, title: "Spread & Distribution", subtitle: "Variance, standard deviation, histograms", skill: "statistics", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 38, title: "Percentages, Growth & Change", subtitle: "The language of business reporting", skill: "statistics", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 39, title: "Outliers & Correlation", subtitle: "Spotting the unusual and finding relationships", skill: "statistics", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 40, title: "Sampling & A/B Testing Fundamentals", subtitle: "How companies test decisions with data", skill: "statistics", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 41, title: "Business Analysis Foundations", subtitle: "KPI trees, root-cause thinking, stakeholders", skill: "statistics", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 42, title: "Analytical Thinking Workshop", subtitle: "Real business cases — think, question, answer", skill: "statistics", estimatedMinutes: 60, difficulty: "intermediate" },

  // Phase 5: Power BI
  { dayNumber: 43, title: "What Is Power BI?", subtitle: "Your first look at the BI world", skill: "power_bi", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 44, title: "Importing & Connecting Data", subtitle: "Get your data into Power BI", skill: "power_bi", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 45, title: "Power Query Deep Dive", subtitle: "Transform raw data before it hits your model", skill: "power_bi", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 46, title: "Data Modeling Basics", subtitle: "Tables, relationships, and cardinality", skill: "power_bi", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 47, title: "Star Schema & Data Design", subtitle: "Think like a BI engineer", skill: "power_bi", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 48, title: "DAX Fundamentals", subtitle: "Measures, calculated columns, and basic DAX", skill: "power_bi", estimatedMinutes: 65, difficulty: "intermediate" },
  { dayNumber: 49, title: "KPIs & Card Visuals", subtitle: "Numbers that matter, displayed clearly", skill: "power_bi", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 50, title: "Filters, Slicers & Interactions", subtitle: "Give your users control", skill: "power_bi", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 51, title: "Visualization Types", subtitle: "Match the chart to the insight", skill: "power_bi", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 52, title: "Dashboard Design Principles", subtitle: "Layout, hierarchy, color — done right", skill: "power_bi", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 53, title: "Business Storytelling with Data", subtitle: "Insight, not just charts", skill: "power_bi", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 54, title: "Performance & Publishing", subtitle: "Optimize and share your report", skill: "power_bi", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 55, title: "Power BI Dashboard Project", subtitle: "Retail analytics — full pipeline", skill: "power_bi", estimatedMinutes: 120, difficulty: "intermediate" },

  // Phase 6: Python
  { dayNumber: 56, title: "Python for Analysts: Setup & Mindset", subtitle: "Variables, types, and the analyst's toolkit", skill: "python", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 57, title: "Data Structures for Analysts", subtitle: "Lists and dictionaries — just what you need", skill: "python", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 58, title: "Pandas: Your Data Table", subtitle: "DataFrames, Series, loading data", skill: "python", estimatedMinutes: 55, difficulty: "beginner" },
  { dayNumber: 59, title: "Selecting & Filtering Data", subtitle: "iloc, loc, and boolean filtering", skill: "python", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 60, title: "Sorting, Grouping & Aggregation", subtitle: "groupby, agg, pivot_table", skill: "python", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 61, title: "Cleaning Data with Pandas", subtitle: "Missing values, duplicates, type conversion", skill: "python", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 62, title: "Merging & Joining DataFrames", subtitle: "merge, concat — just like SQL JOINs", skill: "python", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 63, title: "NumPy Basics for Analysts", subtitle: "Arrays, vectorized operations, statistics", skill: "python", estimatedMinutes: 45, difficulty: "intermediate" },
  { dayNumber: 64, title: "Data Visualization with Matplotlib", subtitle: "Line, bar, histogram, scatter", skill: "python", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 65, title: "Exploratory Data Analysis (EDA)", subtitle: "Profile a dataset, ask business questions", skill: "python", estimatedMinutes: 75, difficulty: "intermediate" },

  // Phase 7: Business & Systems Analysis
  { dayNumber: 66, title: "What Is Business Analysis?", subtitle: "The BA role and what it produces", skill: "business_analysis", estimatedMinutes: 40, difficulty: "beginner" },
  { dayNumber: 67, title: "Requirements Gathering", subtitle: "Functional vs. non-functional requirements", skill: "business_analysis", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 68, title: "User Stories & Acceptance Criteria", subtitle: "Write requirements the Agile way", skill: "business_analysis", estimatedMinutes: 50, difficulty: "intermediate" },
  { dayNumber: 69, title: "Process Mapping & BPMN Basics", subtitle: "Visualize how work actually flows", skill: "business_analysis", estimatedMinutes: 55, difficulty: "intermediate" },
  { dayNumber: 70, title: "Stakeholder Analysis", subtitle: "Who matters, how much, and why", skill: "business_analysis", estimatedMinutes: 45, difficulty: "intermediate" },
  { dayNumber: 71, title: "ERP, CRM & Enterprise Systems", subtitle: "The systems analysts work with every day", skill: "business_analysis", estimatedMinutes: 45, difficulty: "beginner" },
  { dayNumber: 72, title: "Translating Business to Technical", subtitle: "BRD basics and developer handoff", skill: "business_analysis", estimatedMinutes: 50, difficulty: "intermediate" },

  // Phase 8: Projects
  { dayNumber: 73, title: "Project 1: Sales Analytics — Setup", subtitle: "Understand the business and the data", skill: "projects", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 74, title: "Project 1: SQL & Excel Analysis", subtitle: "Query and summarize the sales data", skill: "projects", estimatedMinutes: 90, difficulty: "intermediate" },
  { dayNumber: 75, title: "Project 1: Power BI Dashboard & Submit", subtitle: "Build and deliver the dashboard", skill: "projects", estimatedMinutes: 120, difficulty: "intermediate" },
  { dayNumber: 76, title: "Project 2: Telecom Analytics — Setup", subtitle: "Understand churn and the customer data", skill: "projects", estimatedMinutes: 60, difficulty: "intermediate" },
  { dayNumber: 77, title: "Project 2: Python EDA", subtitle: "Profile the dataset, find churn patterns", skill: "projects", estimatedMinutes: 90, difficulty: "intermediate" },
  { dayNumber: 78, title: "Project 2: SQL Analysis", subtitle: "Query churn drivers and customer segments", skill: "projects", estimatedMinutes: 75, difficulty: "intermediate" },
  { dayNumber: 79, title: "Project 2: Dashboard & Recommendation", subtitle: "Visualize and write your business insight", skill: "projects", estimatedMinutes: 120, difficulty: "intermediate" },
  { dayNumber: 80, title: "Capstone: Choose & Plan", subtitle: "Pick your domain, define your questions", skill: "projects", estimatedMinutes: 60, difficulty: "advanced" },
  { dayNumber: 81, title: "Capstone: Analysis & Visualization", subtitle: "Execute your plan", skill: "projects", estimatedMinutes: 120, difficulty: "advanced" },
  { dayNumber: 82, title: "Capstone: Portfolio Package & Submit", subtitle: "Package your work for employers", skill: "projects", estimatedMinutes: 90, difficulty: "advanced" },

  // Phase 9: Job Preparation
  { dayNumber: 83, title: "CV & ATS Fundamentals", subtitle: "Write a CV that gets past the filter", skill: "job_prep", estimatedMinutes: 60, difficulty: "beginner" },
  { dayNumber: 84, title: "LinkedIn Optimization", subtitle: "Build a profile that attracts recruiters", skill: "job_prep", estimatedMinutes: 55, difficulty: "beginner" },
  { dayNumber: 85, title: "Portfolio & GitHub Basics", subtitle: "Show your work to the world", skill: "job_prep", estimatedMinutes: 55, difficulty: "beginner" },
  { dayNumber: 86, title: "Technical Interview Prep", subtitle: "SQL, Excel, Power BI, statistics questions", skill: "job_prep", estimatedMinutes: 70, difficulty: "intermediate" },
  { dayNumber: 87, title: "Behavioral Interview & STAR Method", subtitle: "'Tell me about yourself' — mastered", skill: "job_prep", estimatedMinutes: 60, difficulty: "beginner" },

  // Phase 10: Job Launch
  { dayNumber: 88, title: "Job-Search Strategy", subtitle: "The right titles, the right places", skill: "job_launch", estimatedMinutes: 50, difficulty: "beginner" },
  { dayNumber: 89, title: "Application System", subtitle: "Volume meets quality — your pipeline", skill: "job_launch", estimatedMinutes: 55, difficulty: "beginner" },
  { dayNumber: 90, title: "The Launch", subtitle: "Network, follow up, and track your offers", skill: "job_launch", estimatedMinutes: 60, difficulty: "beginner" },
]

// ============================================================
// ACHIEVEMENTS
// ============================================================

const achievements = [
  { key: "first_lesson", name: "First Step", description: "Completed your very first lesson", icon: "🎯", xpValue: 50 },
  { key: "first_sql_query", name: "Query Writer", description: "Ran your first SQL query in the playground", icon: "🔍", xpValue: 75 },
  { key: "streak_7_days", name: "Week Warrior", description: "Maintained a 7-day learning streak", icon: "🔥", xpValue: 100 },
  { key: "streak_30_days", name: "Month Master", description: "Maintained a 30-day learning streak", icon: "⚡", xpValue: 300 },
  { key: "phase_1_complete", name: "Foundation Set", description: "Completed Phase 1: Foundations", icon: "🧱", xpValue: 150 },
  { key: "phase_2_complete", name: "Excel Expert", description: "Completed Phase 2: Excel for Analysts", icon: "📊", xpValue: 200 },
  { key: "phase_3_complete", name: "SQL Analyst", description: "Completed Phase 3: SQL for Data Analysis", icon: "🗄️", xpValue: 250 },
  { key: "phase_4_complete", name: "Data Scientist Jr.", description: "Completed Phase 4: Statistics & Business Analysis", icon: "📈", xpValue: 200 },
  { key: "phase_5_complete", name: "BI Builder", description: "Completed Phase 5: Power BI", icon: "📱", xpValue: 250 },
  { key: "phase_6_complete", name: "Pythonista", description: "Completed Phase 6: Python for Data Analysis", icon: "🐍", xpValue: 250 },
  { key: "phase_7_complete", name: "BA Ready", description: "Completed Phase 7: Business & Systems Analysis", icon: "📋", xpValue: 200 },
  { key: "project_1_submitted", name: "Portfolio Starter", description: "Submitted your first portfolio project", icon: "💼", xpValue: 400 },
  { key: "project_2_submitted", name: "Building Portfolio", description: "Submitted your second portfolio project", icon: "🏗️", xpValue: 400 },
  { key: "capstone_submitted", name: "Analyst Ready", description: "Submitted your capstone project", icon: "🎓", xpValue: 600 },
  { key: "journey_complete", name: "Job Ready", description: "Completed the full 90-day journey", icon: "🚀", xpValue: 1000 },
]

// ============================================================
// PROJECTS
// ============================================================

const projects = [
  {
    number: 1,
    title: "Sales & Business Performance Analytics",
    businessContext: "You are a junior analyst at RetailCore, a mid-sized retail company operating across Egypt. The Sales Director has asked you to prepare a quarterly performance analysis to present to the leadership team.",
    scenario: "You have been handed 4 quarters of sales data across 8 product categories and 5 regions. The data needs cleaning, summarizing, and presenting as a one-page executive dashboard. The leadership team wants to know: which regions performed best, which products are declining, and what drove Q4 performance.",
    tools: ["excel", "sql", "power_bi"],
    phaseStart: 73,
    phaseEnd: 75,
    status: "published",
  },
  {
    number: 2,
    title: "Customer & Telecom Churn Analytics",
    businessContext: "You are an analyst at TelecomX, a telecommunications company. The Head of Customer Experience has asked you to investigate churn patterns and prepare a data-backed recommendation.",
    scenario: "You have customer data including demographics, plan details, usage patterns, support call history, and a churn flag. Your goal is to identify the key drivers of churn, segment at-risk customers, and provide a written recommendation to reduce churn by at least 15%.",
    tools: ["python", "sql", "power_bi"],
    phaseStart: 76,
    phaseEnd: 79,
    status: "published",
  },
  {
    number: 3,
    title: "Capstone: Your Domain, Your Analysis",
    businessContext: "You choose your business domain from: E-commerce Analytics, HR & People Analytics, or Financial Performance Analytics. You play the role of a junior analyst hired to answer 5 business questions independently.",
    scenario: "Unlike the guided projects, this capstone requires you to define the business questions, select the tools, perform the analysis, and package the result as a professional portfolio deliverable — a GitHub README or PDF executive summary.",
    tools: ["excel", "sql", "python", "power_bi"],
    phaseStart: 80,
    phaseEnd: 82,
    status: "published",
  },
]

// ============================================================
// SEED FUNCTION
// ============================================================

async function main() {
  console.log("🌱 Seeding Analyst.OS database...")

  // 1. Seed phases
  console.log("  → Seeding phases...")
  for (const phase of phases) {
    await prisma.phase.upsert({
      where: { number: phase.number },
      update: phase,
      create: phase,
    })
  }

  // 2. Seed days (stubs — content added via Admin CMS)
  console.log("  → Seeding 90 day stubs...")
  const phaseRecords = await prisma.phase.findMany()
  const phaseMap = new Map(phaseRecords.map((p) => [p.number, p]))

  for (const day of days) {
    const phase = phaseRecords.find((p) => p.startDay <= day.dayNumber && p.endDay >= day.dayNumber)
    if (!phase) {
      console.warn(`  ⚠ No phase found for Day ${day.dayNumber}`)
      continue
    }
    await prisma.day.upsert({
      where: { dayNumber: day.dayNumber },
      update: {
        title: day.title,
        subtitle: day.subtitle,
        skill: day.skill,
        estimatedMinutes: day.estimatedMinutes,
        difficulty: day.difficulty,
        phaseId: phase.id,
      },
      create: {
        dayNumber: day.dayNumber,
        title: day.title,
        subtitle: day.subtitle,
        skill: day.skill,
        estimatedMinutes: day.estimatedMinutes,
        difficulty: day.difficulty,
        xpReward: 100,
        status: "draft",
        phaseId: phase.id,
      },
    })
  }

  // 3. Seed achievements
  console.log("  → Seeding achievements...")
  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: achievement,
      create: achievement,
    })
  }

  // 4. Seed projects
  console.log("  → Seeding portfolio projects...")
  for (const project of projects) {
    await prisma.project.upsert({
      where: { number: project.number },
      update: project,
      create: project,
    })
  }

  const dayCount = await prisma.day.count()
  const phaseCount = await prisma.phase.count()
  const achievementCount = await prisma.achievement.count()
  const projectCount = await prisma.project.count()

  console.log(`\n✅ Seeding complete!`)
  console.log(`   Phases:       ${phaseCount}`)
  console.log(`   Days:         ${dayCount}`)
  console.log(`   Achievements: ${achievementCount}`)
  console.log(`   Projects:     ${projectCount}`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

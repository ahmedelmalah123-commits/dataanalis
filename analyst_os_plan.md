# Analyst.OS — Complete Product Blueprint
### Implementation-Ready Planning Document
**Version:** 1.0 | **Date:** 2026-09-26 | **Status:** Planning Only — No Code

---

> [!IMPORTANT]
> This is a **PLANNING DOCUMENT ONLY**. No code should be written until the user approves this plan and explicitly instructs a coding agent to begin implementation.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Target Users](#3-target-users)
4. [User Journey](#4-user-journey)
5. [Product Principles](#5-product-principles)
6. [90-Day Curriculum Architecture](#6-90-day-curriculum-architecture)
7. [Daily Lesson Architecture](#7-daily-lesson-architecture)
8. [Learning Methodology](#8-learning-methodology)
9. [Feature Map](#9-feature-map)
10. [Information Architecture](#10-information-architecture)
11. [UX Architecture](#11-ux-architecture)
12. [Page-by-Page Specification](#12-page-by-page-specification)
13. [Progress System](#13-progress-system)
14. [Calendar System](#14-calendar-system)
15. [Exercise System](#15-exercise-system)
16. [SQL Playground](#16-sql-playground)
17. [Excel Workflow](#17-excel-workflow)
18. [Python Playground](#18-python-playground)
19. [Power BI Workflow](#19-power-bi-workflow)
20. [Project System](#20-project-system)
21. [AI Tutor](#21-ai-tutor)
22. [Job Launch System](#22-job-launch-system)
23. [Account & Profile](#23-account--profile)
24. [Admin CMS](#24-admin-cms)
25. [Analytics](#25-analytics)
26. [Database Architecture](#26-database-architecture)
27. [API Architecture](#27-api-architecture)
28. [Technical Stack](#28-technical-stack)
29. [Security Architecture](#29-security-architecture)
30. [Accessibility](#30-accessibility)
31. [Performance](#31-performance)
32. [MVP Scope](#32-mvp-scope)
33. [V2 Scope](#33-v2-scope)
34. [V3 Scope](#34-v3-scope)
35. [Implementation Roadmap](#35-implementation-roadmap)
36. [Detailed Task Breakdown](#36-detailed-task-breakdown)
37. [Acceptance Criteria](#37-acceptance-criteria)
38. [Risks & Mitigations](#38-risks--mitigations)
39. [Open Questions](#39-open-questions)
40. [Recommended Next Step](#40-recommended-next-step)
41. [Build Order](#build-order)

---

## 1. Executive Summary

**Analyst.OS** is a structured, 90-day, self-contained career-launch platform targeting fresh MIS graduates and beginners in the MENA region seeking entry-level Data/BI/Business Analysis roles.

Unlike a traditional LMS or course marketplace, Analyst.OS functions as a **Career Operating System** — a single product that eliminates the need for external courses and guides the learner from zero knowledge to job-ready through daily structured lessons, interactive environments, real projects, and a curated job-launch system.

### Core Differentiators
| Dimension | Traditional LMS | Analyst.OS |
|---|---|---|
| Learning Model | Passive video consumption | Active, multi-format daily structure |
| Progress | Course completion % | Meaningful skill + outcome tracking |
| Tooling | External | Embedded SQL, Python playgrounds |
| Outcome | Certificate | Job readiness + Portfolio + Offer pipeline |
| Guidance | Choose your own path | Structured Day 1→90 operating system |
| AI Role | Marketing gimmick | Contextual support layer with guardrails |

### MVP Goal
Deliver a working product that covers Days 1–90 curriculum, SQL playground, Excel dataset workflow, basic Python playground, progress tracking, quiz engine, and Day 1–30 fully authored content.

---

## 2. Product Vision

### Vision Statement
> **"You don't need external courses. Analyst.OS takes you from zero knowledge to job-ready in 90 days — through a structured daily system that teaches, trains, and launches your career."**

### The Operating System Metaphor
The product is deliberately called an "OS" because it:
- **Boots up** when the user logs in (dashboard = home screen)
- Has **installed applications** (SQL playground, Python runner, Excel toolkit)
- Has a **file system** (projects, portfolio, notes)
- Has a **task queue** (today's mission)
- Has a **system status** (job readiness)
- Has a **calendar** (schedule awareness)
- **Runs continuously** — every day has a task

### What the Product Is NOT
- Not a video course platform
- Not a certificate mill
- Not a Udemy clone
- Not a gamified children's app
- Not a portfolio builder alone
- Not an AI chatbot

---

## 3. Target Users

### Primary Persona: Salma, 22, Fresh MIS Graduate, Cairo

**Background:**
- Graduated from a business/IT program
- Took one Python and one Excel course in university — both theoretical
- Never used SQL professionally
- Never built a Power BI dashboard
- Confused about what role to apply for
- Overwhelmed by contradictory advice on LinkedIn

**Goals:**
- Land an entry-level data analyst or MIS analyst job within 3–6 months
- Build a portfolio that demonstrates real skills
- Understand how to apply for jobs in Egypt/MENA

**Frustrations:**
- Udemy has 200+ options, no clear path
- YouTube tutorials are disconnected
- Has no mentor
- Doesn't know if she's learning the right things
- Imposter syndrome — "I don't know enough yet"

**Platform expectations:**
- Tell me exactly what to do today
- Show me that I'm progressing
- Don't waste my time
- Prepare me for actual interviews
- Show me what a job actually looks like

### Secondary Persona: Ahmed, 25, Career Switcher
- Working in operations/admin, wants to transition to data
- Has spare 1–2 hours daily
- More impatient, results-oriented
- Willing to pay if the product is clearly useful

### User Skill Baseline Assumptions
| Skill | Assumed Level |
|---|---|
| Excel | Knows it exists, maybe basic entry |
| SQL | Zero |
| Power BI | Zero |
| Python | Zero or very basic |
| Statistics | Weak high school level |
| Business Analysis | Zero structured knowledge |
| Data concepts | Very weak |

---

## 4. User Journey

### Pre-Registration
1. User discovers platform (search, social, referral)
2. Lands on marketing/landing page
3. Sees: what this is, what they'll learn, what job they can get
4. Sees: sample day lesson preview
5. Signs up

### Onboarding (Days 0)
1. Register: Name, Email, Password
2. Quick assessment: 5 questions about current knowledge (not a gate — just personalization)
3. Select primary career goal (Data Analyst / BI Analyst / Business Analyst)
4. See: "Your 90-day plan is ready"
5. Land on Dashboard — Day 1 available, locked beyond

### Daily Loop
1. Open platform → Dashboard shows: "Today is Day 14 — SQL: SELECT with WHERE"
2. Click "Continue Learning"
3. Lesson opens in focused reading mode
4. Progress through sections (read, interact, practice)
5. Complete quiz
6. Complete mission
7. Mark complete
8. Streak +1, XP +, progress bar fills
9. Day 15 unlocks

### Weekly Loop
- Every 7 days: Review summary of phase progress
- Phase completion badge
- Project milestone check

### Phase Completion
- Phase summary view
- Skill badge awarded
- Mini-assessment
- "Ready for Phase 3?"

### Day 90
- Final capstone submission
- Job readiness score revealed
- Portfolio review checklist
- Job launch section unlocked
- Celebration screen
- "You are now a candidate"

---

## 5. Product Principles

### P1: Structure Over Choice
The learner does not decide what to learn next. The OS decides. This removes decision fatigue and ensures completeness.

### P2: Every Day Has a Purpose
No day is filler. Every day teaches something that will be directly useful in a job.

### P3: Active Learning Over Passive Consumption
No day should be "just read this." Every day must include at least one of: exercise, quiz, interactive example, or mission.

### P4: Honest Progress
Progress must reflect what the learner can actually do, not just what they've opened.

### P5: Context Always
Every lesson must answer: "Why does this matter in a real job?" The "so what" is mandatory.

### P6: Tools Are Real
SQL runs real queries. Python executes real code. Excel exercises use real datasets. No fakes.

### P7: AI Supports, Never Replaces
AI is a contextual guide. It can explain, hint, question — but must not complete missions for the learner.

### P8: Mobile-Aware, Desktop-Primary for Practice
Reading and review work great on mobile. Interactive tools (SQL, Python) are desktop-optimized but remain functional on mobile.

### P9: Earn Your Progress
Completion requires demonstration of learning, not just time spent on page.

### P10: Job Focus, Always
The final answer to every feature decision is: "Does this help the learner get a job?"

---

## 6. 90-Day Curriculum Architecture

### Phase Overview

```
Phase 1:  Days 01–07  →  Foundations & Analytical Thinking     (7 days)
Phase 2:  Days 08–20  →  Excel for Analysts                   (13 days)
Phase 3:  Days 21–35  →  SQL for Data Analysis                (15 days)
Phase 4:  Days 36–42  →  Statistics & Business Analysis       (7 days)
Phase 5:  Days 43–55  →  Power BI                             (13 days)
Phase 6:  Days 56–65  →  Python for Data Analysis             (10 days)
Phase 7:  Days 66–72  →  Business & Systems Analysis          (7 days)
Phase 8:  Days 73–82  →  Portfolio Projects                   (10 days)
Phase 9:  Days 83–87  →  Job Preparation                      (5 days)
Phase 10: Days 88–90  →  Job Launch                           (3 days)
```

**Design rationale for distribution:**
- Excel extended to 13 days (from 13 suggested) because it is the most-used tool in Egyptian/MENA entry-level roles and many beginners are weaker than expected
- SQL extended to 15 days because SQL is the #1 tested skill in analyst interviews — more practice time is critical
- Statistics compressed to 7 days because only practically-applicable statistics are taught; no academic theory
- Python kept at 10 days with a tight scope: analysis only, not software development
- Portfolio given a full 10 days because project quality directly determines hirability
- Job prep and launch are kept concise (8 days total) because they should be action-oriented, not theoretical

---

### Phase 1: Foundations (Days 1–7)

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 1 | What is Data? | Data types, raw vs. structured data, why data matters |
| 2 | What Do Analysts Actually Do? | Analyst roles, daily tasks, real job descriptions |
| 3 | Thinking Like an Analyst | Business questions, analytical framing, hypothesis thinking |
| 4 | Data Structures | Rows, columns, records, fields, tables, spreadsheets vs. databases |
| 5 | KPIs & Business Metrics | What is a KPI, how companies measure success, common KPIs by industry |
| 6 | Data-Driven Decision Making | How companies use data, case studies, decision frameworks |
| 7 | Phase 1 Review + Foundation Quiz | Active recall of all concepts, self-assessment |

**Learning outcomes:**
- Can explain what a data analyst does to a non-technical person
- Can identify a business question and connect it to data
- Can identify data types and explain the difference between structured and unstructured data
- Can define KPI and give 3 examples from a real business

---

### Phase 2: Excel for Analysts (Days 8–20)

**Prerequisite chain:**
```
Interface → Navigation → Formulas → Functions → IF Logic → Lookup → 
Text/Date → Sorting/Filtering → Data Cleaning → Tables → Pivot Tables → 
Charts → Conditional Formatting → Power Query → Mini-Project
```

| Day | Title | Key Concepts | Prerequisite |
|-----|-------|-------------|--------------|
| 8  | Excel Interface & Navigation | Ribbon, workbook, sheets, cells, cell references | None |
| 9  | Data Entry & Basic Formulas | Cell types, entering data, basic arithmetic formulas | Day 8 |
| 10 | Core Functions | SUM, AVERAGE, COUNT, COUNTA, MIN, MAX | Day 9 |
| 11 | Conditional Logic | IF, nested IF, IFS | Day 10 |
| 12 | Conditional Aggregation | SUMIF, SUMIFS, COUNTIF, COUNTIFS, AVERAGEIF | Day 11 |
| 13 | Lookup Functions | XLOOKUP, INDEX/MATCH (concept + use case) | Day 12 |
| 14 | Text & Date Functions | LEFT, RIGHT, MID, TRIM, PROPER, TODAY, YEAR, MONTH, DATEDIF | Day 13 |
| 15 | Sorting, Filtering & Data Validation | Sort, Filter, AutoFilter, Data Validation, Dropdown lists | Day 14 |
| 16 | Data Cleaning in Excel | Remove duplicates, handle blanks, clean inconsistencies, find/replace | Day 15 |
| 17 | Excel Tables & Pivot Tables Intro | Table creation, Pivot Table basics, summarizing data | Day 16 |
| 18 | Advanced Pivot Tables & Charts | Pivot slicers, calculated fields, chart types, business charts | Day 17 |
| 19 | Conditional Formatting & Power Query Intro | Rules-based formatting, heatmaps, Power Query basics, data import | Day 18 |
| 20 | Excel Mini-Project | Sales dataset analysis, full workflow end-to-end | Days 8–19 |

**Excel Mini-Project (Day 20):**
- Dataset: "Regional Sales Performance Q1-Q4"
- Tasks: Clean data, build summary table, create Pivot analysis, build a one-page dashboard
- Output: Excel file with a business summary and 3 charts
- Evaluation: Checklist-based self-assessment + automated formula validation

---

### Phase 3: SQL for Data Analysis (Days 21–35)

**SQL Environment:** Browser-based DuckDB WASM playground (see Section 16)

**Prerequisite chain:**
```
DB Concepts → SELECT basics → Filtering → Sorting → Aggregation → 
Grouping → CASE WHEN → Single-table mastery → JOINs → Multi-table → 
Subqueries → CTEs → Window functions → Date/NULL handling → Capstone
```

| Day | Title | Key Concepts | Prerequisite |
|-----|-------|-------------|--------------|
| 21 | Databases & Tables | What a database is, tables, rows, columns, primary keys, relational concept | None |
| 22 | Your First SELECT | SELECT, FROM, LIMIT, *, column selection | Day 21 |
| 23 | Filtering Data | WHERE, comparison operators, logical operators (AND, OR, NOT) | Day 22 |
| 24 | Sorting & Distinct | ORDER BY ASC/DESC, DISTINCT, combined filtering | Day 23 |
| 25 | Aggregate Functions | COUNT, SUM, AVG, MIN, MAX, COUNT DISTINCT | Day 24 |
| 26 | Grouping Data | GROUP BY, HAVING, filtering aggregated results | Day 25 |
| 27 | Conditional Logic in SQL | CASE WHEN, CASE with aggregation, category creation | Day 26 |
| 28 | Single-Table Mastery | Complex business queries using Days 22–27, business scenario practice | Days 22–27 |
| 29 | Understanding JOINs | What relationships are, why JOINs exist, ER diagram reading | Day 28 |
| 30 | INNER JOIN | INNER JOIN syntax, matching records, business scenarios | Day 29 |
| 31 | LEFT JOIN & NULL handling | LEFT JOIN, NULL concept, IS NULL, COALESCE | Day 30 |
| 32 | Multi-table Analysis | 3-table queries, join chaining, business reporting queries | Day 31 |
| 33 | Subqueries & CTEs | Subqueries in WHERE/FROM, CTE syntax, readability | Day 32 |
| 34 | Window Functions & Date Operations | ROW_NUMBER, RANK, LAG, LEAD, date functions, STRFTIME | Day 33 |
| 35 | SQL Capstone Challenge | Full business scenario, 8 progressively harder queries | Days 21–34 |

**SQL Capstone (Day 35):**
- Dataset: "E-commerce Orders, Customers, Products" (3-table relational)
- 8 queries: From simple to window function usage
- Automated result validation in the playground
- Business interpretation questions (written answer)

---

### Phase 4: Statistics & Business Analysis (Days 36–42)

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 36 | Descriptive Statistics | Mean, median, mode, when to use which, Excel/Python calculation |
| 37 | Spread & Distribution | Variance, standard deviation, percentiles, histograms, distribution shape |
| 38 | Percentages, Growth & Change | % calculation, % change, YoY, MoM growth, CAGR concept |
| 39 | Outliers & Correlation | Identifying outliers, IQR method, correlation concept, not causation |
| 40 | Sampling & A/B Testing Fundamentals | Sampling concept, random sampling, A/B test logic, interpretation basics |
| 41 | Business Analysis Foundations | Business problems, KPI trees, root-cause thinking, stakeholder concept |
| 42 | Analytical Thinking Workshop | Real business cases, analytical questioning, insight storytelling |

---

### Phase 5: Power BI (Days 43–55)

**Note:** Power BI runs externally; platform provides guided walkthroughs, datasets, and mission checklists.

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 43 | What is Power BI? | BI concept, Power BI Desktop intro, interface walkthrough |
| 44 | Importing & Connecting Data | Data connectors, import from Excel/CSV, preview data |
| 45 | Power Query Deep Dive | Data transformation, column operations, data types, applied steps |
| 46 | Data Modeling Basics | Tables, relationships, cardinality, relationship types |
| 47 | Star Schema & Data Design | Fact/dimension tables, why star schema matters, building a model |
| 48 | DAX Fundamentals | Measures vs. calculated columns, basic DAX syntax, SUM/COUNT/DIVIDE |
| 49 | KPIs & Card Visuals | KPI cards, goal tracking, conditional formatting in visuals |
| 50 | Filters, Slicers & Interactions | Slicer types, page-level/report-level filters, visual interactions |
| 51 | Visualization Types | Bar, line, scatter, map, table, matrix — when to use each |
| 52 | Dashboard Design Principles | Layout, alignment, visual hierarchy, color, data-ink ratio |
| 53 | Business Storytelling with Data | Narrative structure, insight vs. data, executive summary thinking |
| 54 | Performance & Publishing | Slow reports, optimization basics, publish to Power BI Service concept |
| 55 | Power BI Dashboard Project | Full retail dashboard from raw data to published report |

---

### Phase 6: Python for Data Analysis (Days 56–65)

**Environment:** Browser-based Pyodide WASM Python runner (see Section 18)

**Scope boundary:** This is NOT a Python course. It covers ONLY what an analyst needs.

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 56 | Python for Analysts: Setup & Mindset | Why Python for analysis, Jupyter mindset, basic syntax, variables, types |
| 57 | Data Structures for Analysts | Lists, dictionaries, basic operations — only what Pandas requires |
| 58 | Pandas: Your Data Table | DataFrames, Series, loading CSV/Excel, head/info/describe |
| 59 | Selecting & Filtering Data | iloc, loc, boolean filtering, query() |
| 60 | Sorting, Grouping & Aggregation | sort_values, groupby, agg, pivot_table |
| 61 | Cleaning Data with Pandas | Missing values, duplicates, dtype conversion, string cleaning |
| 62 | Merging & Joining DataFrames | merge, concat, join types — mapping to SQL JOINs |
| 63 | NumPy Basics for Analysts | Arrays, vectorized operations, statistical functions |
| 64 | Data Visualization with Matplotlib | Line, bar, histogram, scatter — readable output for analysis |
| 65 | Exploratory Data Analysis (EDA) | EDA workflow, profiling a dataset, business questions from data |

---

### Phase 7: Business & Systems Analysis (Days 66–72)

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 66 | What Is Business Analysis? | BA role vs. data analyst, when BAs are involved, outputs |
| 67 | Requirements Gathering | Stakeholder interviews, functional vs non-functional requirements |
| 68 | User Stories & Acceptance Criteria | Agile user story format, "As a... I want... So that...", AC writing |
| 69 | Process Mapping & BPMN Basics | BPMN notation, swim lanes, process flows, tools (draw.io) |
| 70 | Stakeholder Analysis | Stakeholder matrix, communication planning, influence/interest grid |
| 71 | ERP, CRM & Enterprise Systems | What ERPs/CRMs are, SAP/Oracle/Salesforce context, analyst's role |
| 72 | Translating Business to Technical | BRD basics, use case documents, handoff to developers |

---

### Phase 8: Portfolio Projects (Days 73–82)

**Project design principle:** Every project should be indistinguishable from a real analyst's work product.

#### Project 1: Sales & Business Performance Analytics (Days 73–75)
**Business scenario:** You are a junior analyst at a retail company. The Sales Director has asked for a quarterly performance analysis.

**Dataset:** Synthetic "RetailCore" dataset
- ~5,000 rows: sales transactions, product categories, regions, sales reps
- Provided as CSV (for SQL/Python) and Excel

**Tools:** Excel + SQL + Power BI

**Deliverables:**
1. Cleaned dataset with documented assumptions
2. SQL analysis: 5 business questions answered with queries
3. Excel summary table with formulas
4. Power BI dashboard (3 pages minimum)
5. One-paragraph business insight narrative

**Evaluation rubric:**
- Data accuracy (25%)
- SQL query correctness (25%)
- Dashboard clarity (25%)
- Insight quality — not just "sales went up" (25%)

#### Project 2: Customer & Telecom Analytics (Days 76–79)
**Business scenario:** You are an analyst at a telecom company. The Head of Customer Experience wants to understand churn patterns.

**Dataset:** Synthetic "TelecomX" dataset
- ~3,000 customers with demographics, plan details, usage, churn flag

**Tools:** Python (Pandas + Matplotlib) + SQL + Power BI

**Deliverables:**
1. Python EDA notebook with 5 key findings
2. SQL queries analyzing churn drivers
3. Power BI churn dashboard
4. Written recommendation (2 paragraphs)

**Evaluation rubric:**
- EDA depth and correctness (30%)
- SQL quality (20%)
- Dashboard design (25%)
- Business recommendation quality (25%)

#### Project 3: Final Capstone (Days 80–82)
**Business scenario:** Learner chooses from 3 domain options:
- Option A: E-commerce analytics
- Option B: HR / people analytics
- Option C: Financial performance analytics

**Requirements:**
- Define 5 business questions independently
- Choose tools independently
- Deliver: SQL analysis + visualization dashboard + written executive summary
- Portfolio-ready: A GitHub README or PDF deliverable

**Evaluation rubric:**
- Problem definition quality (20%)
- Technical execution (30%)
- Visualization storytelling (25%)
- Written communication (25%)

---

### Phase 9: Job Preparation (Days 83–87)

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 83 | CV & ATS Fundamentals | What ATS is, CV structure, keywords, what to include, what to skip |
| 84 | LinkedIn Optimization | Profile photo, headline, about section, experience, skills, endorsements |
| 85 | Portfolio Presentation & GitHub Basics | How to present work, GitHub README basics, project storytelling |
| 86 | Technical Interview Prep | SQL questions, Excel questions, Power BI questions, statistics questions |
| 87 | Behavioral Interview & STAR | STAR method, "tell me about yourself", explaining projects, common questions |

---

### Phase 10: Job Launch (Days 88–90)

| Day | Title | Key Concepts |
|-----|-------|-------------|
| 88 | Job-Search Strategy | Job titles to apply for, where to search, prioritization |
| 89 | Application System | Application tracking, volume vs. quality, cover letter basics |
| 90 | The Launch | Networking, recruiter messaging, follow-up strategy, pipeline tracking |

---

## 7. Daily Lesson Architecture

### Day Schema (JSON Content Model)

Every day in the system is driven by a structured JSON document. This ensures the curriculum is database-driven and editable through the Admin CMS.

```jsonc
{
  "day": 23,
  "phase": 3,
  "phase_name": "SQL for Data Analysis",
  "skill": "sql",
  "title": "Filtering Data with WHERE",
  "subtitle": "Ask specific questions of your data",
  "learning_objective": "Write SQL WHERE clauses using comparison and logical operators to filter real business data",
  "estimated_minutes": 45,
  "difficulty": "beginner",   // beginner | intermediate | advanced
  "prerequisites": [22],     // day numbers that must be completed
  "xp_reward": 100,
  "status": "published",     // draft | published | archived
  "version": 2,
  "updated_at": "2026-08-01",
  "author": "content_team",

  "sections": [
    {
      "id": "s1",
      "type": "concept",
      "order": 1,
      "title": "Why Do We Need to Filter?",
      "content": "...",       // Markdown or rich text
      "level": 1             // Explanation level 1–7
    },
    {
      "id": "s2",
      "type": "analogy",
      "order": 2,
      "title": "The Coffee Shop Analogy",
      "content": "..."
    },
    {
      "id": "s3",
      "type": "business_example",
      "order": 3,
      "title": "Business Scenario: Sales Data",
      "content": "..."
    },
    {
      "id": "s4",
      "type": "code_example",
      "order": 4,
      "title": "Your First WHERE",
      "code": "SELECT * FROM sales WHERE region = 'Cairo';",
      "language": "sql",
      "explanation": "...",
      "runnable": true,
      "dataset_ref": "sales_q1"
    },
    {
      "id": "s5",
      "type": "interactive",
      "order": 5,
      "title": "Try It Yourself",
      "instructions": "Find all sales where amount > 5000",
      "playground_config": {
        "engine": "duckdb_wasm",
        "dataset": "sales_q1",
        "starter_code": "SELECT * FROM sales WHERE ___",
        "solution": "SELECT * FROM sales WHERE amount > 5000;",
        "validation_type": "result_match",
        "expected_row_count": 847,
        "expected_columns": ["order_id", "amount", "region"]
      }
    },
    {
      "id": "s6",
      "type": "common_mistakes",
      "order": 6,
      "title": "Common Mistakes",
      "content": "..."
    },
    {
      "id": "s7",
      "type": "job_connection",
      "order": 7,
      "title": "How This Appears in a Real Job",
      "content": "..."
    }
  ],

  "quiz": {
    "passing_score": 70,
    "max_attempts": 3,
    "questions": [
      {
        "id": "q1",
        "type": "mcq",
        "question": "Which operator would you use to filter for rows where region is NOT Cairo?",
        "options": ["= 'Cairo'", "<> 'Cairo'", "!= NOT 'Cairo'", "EXCLUDE 'Cairo'"],
        "correct": 1,
        "explanation": "..."
      },
      {
        "id": "q2",
        "type": "sql_fill",
        "question": "Complete the query to find orders above 1000 from Cairo:",
        "starter": "SELECT * FROM orders WHERE region = 'Cairo' ___ amount > 1000",
        "correct": "AND",
        "explanation": "..."
      },
      {
        "id": "q3",
        "type": "mcq",
        "question": "...",
        "options": ["..."],
        "correct": 0,
        "explanation": "..."
      }
    ]
  },

  "practice_exercises": [
    {
      "id": "ex1",
      "difficulty": "easy",
      "title": "Find Premium Customers",
      "instructions": "...",
      "dataset": "customers_v1",
      "starter_code": "SELECT ...",
      "solution": "...",
      "validation_type": "result_match",
      "hints": ["Think about which column has customer tier", "The value you need is 'Premium'"]
    },
    {
      "id": "ex2",
      "difficulty": "medium",
      "title": "Complex Filter",
      "instructions": "...",
      "dataset": "orders_v1",
      "starter_code": "...",
      "solution": "...",
      "hints": ["..."]
    }
  ],

  "mission": {
    "id": "m23",
    "title": "Filter the Sales Report",
    "type": "sql",                 // sql | excel | python | powerbi | written | file_upload
    "description": "The Sales Manager needs a filtered report...",
    "dataset": "sales_q1",
    "tasks": [
      "Find all orders from Cairo with amount > 5000",
      "Find all orders from Q4 with status = 'completed'",
      "Find products that were returned but have high quantity"
    ],
    "submission_type": "sql_playground",  // sql_playground | file_upload | text_answer
    "evaluation": "automated",           // automated | manual | checklist
    "can_ask_ai": true,
    "ai_guardrail": "hint_only"          // hint_only | explain_only | full
  },

  "reflection": {
    "prompt": "What kind of business questions do WHERE clauses help you answer? Give one example from a real job you might want.",
    "type": "text",
    "required": false
  },

  "completion_criteria": {
    "lesson_read_percentage": 80,
    "quiz_passed": true,
    "practice_completed_minimum": 1,
    "mission_submitted": true
  },

  "next_day": 24,
  "next_day_teaser": "Tomorrow you'll learn to sort your results — because order matters in analysis."
}
```

### Section Types Reference

| Type | Description |
|------|-------------|
| `concept` | Core explanation, Level 1 framing |
| `analogy` | Simple real-world comparison |
| `business_example` | Concrete business scenario |
| `code_example` | Runnable or illustrative code |
| `visual` | Diagram, table, or infographic |
| `interactive` | Embedded interactive tool |
| `practice` | In-lesson exercise |
| `common_mistakes` | Error patterns and misconceptions |
| `job_connection` | "How this appears in a real job" |
| `review` | Spaced recall of previous concepts |

### Question Types Reference

| Type | Description |
|------|-------------|
| `mcq` | Multiple choice, single correct |
| `multi_select` | Multiple choice, multiple correct |
| `sql_fill` | Fill-in-the-blank SQL |
| `code_write` | Write code, validate against expected output |
| `short_text` | Written response, no auto-validation |
| `ordering` | Drag to arrange items in correct order |
| `matching` | Match term to definition |

---

## 8. Learning Methodology

### The 7-Level Explanation Framework

Every new concept must follow this explanation progression:

| Level | Name | Description | Example for SQL WHERE |
|-------|------|-------------|----------------------|
| 1 | Zero Knowledge | Explain as if they know nothing | "Imagine you have 10,000 rows and only need rows from Cairo..." |
| 2 | Analogy | Real-world comparison | "It's like a filter in a coffee shop — you only want medium roast" |
| 3 | Business Example | Concrete business scenario | "A Sales Manager wants only Q4 sales from Cairo" |
| 4 | Technical Implementation | Actual code or tool step | `SELECT * FROM sales WHERE region = 'Cairo'` |
| 5 | Independent Problem | Learner solves it alone | "Write a query to find orders over 5000" |
| 6 | Common Mistakes | Errors and how to avoid | "Don't forget quotes around text values: WHERE region = Cairo will fail" |
| 7 | Job Connection | Real-world job context | "In your first week, your manager will ask you to pull filtered data like this every single day" |

### Active Recall Strategy

- Every 5 days: Micro-review questions referencing content from days ago
- Every phase: Phase review session with mixed questions
- Projects force cumulative recall by requiring all previous skills

### Spaced Repetition Approach (Simple Version)

Rather than implementing a full SRS algorithm in MVP, use:
- Explicit "Review Moment" sections embedded in later lessons ("Remember from Day 22...")
- Phase review days
- Project phases that force re-application of previous tools

### Cognitive Load Management

- Maximum 7 new concepts per lesson
- Complex topics split across consecutive days (e.g., SQL JOINs across 3 days)
- Visual summaries at the end of each section
- "Key takeaways" before every quiz

---

## 9. Feature Map

### MVP Features (Must Have)

| Feature | Priority | Category |
|---------|----------|----------|
| User registration & auth | P0 | Auth |
| Onboarding flow | P0 | UX |
| Dashboard | P0 | Core |
| 90-day roadmap view | P0 | Navigation |
| Calendar view | P0 | Navigation |
| Lesson reader | P0 | Learning |
| Quiz engine | P0 | Learning |
| SQL playground (DuckDB WASM) | P0 | Tools |
| Exercise system | P0 | Learning |
| Day completion tracking | P0 | Progress |
| Streak system | P0 | Engagement |
| Mission submission (SQL + text) | P0 | Learning |
| Progress indicators | P0 | Progress |
| Excel dataset download workflow | P0 | Tools |
| File upload (Excel missions) | P0 | Tools |
| Phase completion | P0 | Progress |
| Basic AI tutor (explain/hint) | P1 | AI |
| Python playground (Pyodide) | P1 | Tools |
| Notes & bookmarks | P1 | UX |
| Power BI mission workflow | P0 | Tools |
| Project system | P0 | Portfolio |
| Job readiness score | P1 | Progress |
| Basic admin CMS | P1 | Admin |

### V2 Features

| Feature | Notes |
|---------|-------|
| Advanced AI tutor | Contextual answers, Socratic mode |
| Gamification (XP, badges, leaderboard) | Subtle, opt-in |
| Community forum | Per-day discussion |
| Mentor review | Human feedback on projects |
| Browser-based spreadsheet | Significant technical effort |
| Mobile app | React Native wrapper |
| Arabic language toggle | MENA market expansion |
| Multiple career paths | BI Engineer, Data Engineer |
| Advanced analytics dashboard | Admin |
| Cohort/group learning | Social learning |

### V3 Features

| Feature | Notes |
|---------|-------|
| AI-generated personalized paths | Adaptive learning |
| Job board integration | Direct application tracking |
| Partner company access | Employer visibility |
| Certification system | Verifiable credential |
| Live sessions / office hours | Synchronous layer |

---

## 10. Information Architecture

### Learner Navigation

```
Analyst.OS
├── Dashboard (Home)          — Today's task, progress summary, streak
├── Roadmap                   — Full 90-day visual progress map
├── Calendar                  — Day-by-day calendar view with statuses
├── Today                     — Direct shortcut to current day's lesson
├── Lessons                   — Browse/search all lessons
│   └── [Day #] Lesson
│       ├── Read
│       ├── Practice
│       ├── Quiz
│       └── Mission
├── Skills                    — Skill progress tracker (Excel, SQL, etc.)
├── Projects                  — Project submissions and portfolio
├── Practice                  — SQL + Python playground (open mode)
├── Notes                     — Personal notes and bookmarks
├── Job Launch                — CV, LinkedIn, interview prep, job tracker
└── Profile & Settings        — Account, preferences, progress history
```

### Admin Navigation

```
Admin
├── Dashboard                 — Active learners, completion rates, alerts
├── Curriculum                — Phase and day management
│   └── [Phase] → [Day] → [Lesson Editor]
├── Content Library           — Datasets, files, media
├── Users                     — User search, profiles, progress view
├── Projects                  — Submissions, rubrics, reviews
├── Analytics                 — Learner behavior, drop-off, quiz stats
└── Settings                  — Roles, platform config
```

---

## 11. UX Architecture

### Design Language

**Visual Identity:**
- Color palette: Dark mode primary, light mode secondary
  - Background: `#0F1117` (deep dark), `#1A1D27` (card surface)
  - Primary accent: `#6366F1` (indigo — professional, tech, calm)
  - Secondary accent: `#22D3EE` (cyan — interactive elements)
  - Success: `#10B981` (emerald)
  - Warning: `#F59E0B` (amber)
  - Error: `#EF4444` (red)
  - Text primary: `#F8FAFC`
  - Text secondary: `#94A3B8`
- Typography: `Inter` (body), `JetBrains Mono` (code), `Outfit` (headings/display)
- No rounded-everything aesthetic. Controlled, slightly sharp corners (border-radius 6–8px)
- Generous whitespace — never cluttered
- Minimal decorative elements — every element earns its place

**Design Anti-Patterns to Avoid:**
- Rainbow progress bars
- Cartoon achievements
- Excessive icon usage
- Overlapping glassmorphism cards
- Text walls without visual breathing room

### Layout System

**Shell Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Logo]        Analyst.OS        [Day 14/90] [Streak]│  ← Top Nav
├────────────┬────────────────────────────────────────┤
│            │                                        │
│  Sidebar   │          Main Content Area             │
│  Nav       │                                        │
│  (64px)    │                                        │
│            │                                        │
└────────────┴────────────────────────────────────────┘
```

**Lesson Layout (Focused Mode):**
```
┌─────────────────────────────────────────────────────┐
│  ← Back   Day 23: Filtering Data    [Progress] [AI] │
├────────────────────────────────────────────────────┤
│                                                    │
│                 LESSON CONTENT                     │
│                                                    │
│                                                    │
├────────────────────────────────────────────────────┤
│  [← Previous]          [Mark Complete & Continue →]│
└────────────────────────────────────────────────────┘
```

### Responsive Behavior Matrix

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Dashboard | Full | Full | Full |
| Lesson reading | Full | Full | Full |
| SQL playground | Basic (scrollable) | Good | Full |
| Python playground | Basic | Good | Full |
| Excel workflow | Read only | Read only | Full |
| Power BI workflow | Read instructions | Read instructions | Full |
| Calendar | Vertical list | Grid | Full grid |
| Admin CMS | Disabled (redirect) | Limited | Full |

---

## 12. Page-by-Page Specification

### 12.1 Landing Page

**Goal:** Convert visitor to registered user.

**Sections:**
1. Hero: "From MIS Graduate to Data Analyst in 90 Days" — CTA: Start Free
2. Problem: "You're not confused because you're not smart. You're confused because there's no clear path."
3. Solution: What Analyst.OS is (not a course, a system)
4. How it works: 3-step visual (Sign up → Follow the plan → Get hired)
5. Sample day preview: Interactive mockup of Day 22 SQL lesson
6. Curriculum overview: Phase accordion
7. What you'll be able to do: Skill outcomes list
8. Testimonials (placeholder for V2)
9. Pricing (if applicable) or Free Beta CTA
10. FAQ
11. Footer

**Key UX:** The "Sample Day" section should let the visitor interact with a demo SQL editor — this demonstrates the product promise in 30 seconds.

---

### 12.2 Dashboard

**Goal:** Answer "What should I do right now?"

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Good morning, Salma           🔥 14-day streak              │
│  Day 23 of 90 · SQL Phase                                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │  CONTINUE TODAY      │  │  YOUR PROGRESS               │ │
│  │  Day 23: Filtering   │  │  ████████░░░░░░  25%         │ │
│  │  SQL · 45 min        │  │  Phase 3: SQL                │ │
│  │  [Start Lesson →]    │  │  ████████████░  Day 23/35    │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  SKILL PROGRESS                                             │
│  Excel    ████████████  Complete                            │
│  SQL      ████░░░░░░░░  Building (Day 3/15)                 │
│  Power BI ░░░░░░░░░░░░  Locked until Day 43                 │
├─────────────────────────────────────────────────────────────┤
│  UPCOMING                    RECENT ACHIEVEMENTS            │
│  Day 24: Sorting & DISTINCT  🎯 Excel Complete              │
│  Day 25: Aggregate Functions 📊 First SQL Query             │
│  Day 26: GROUP BY            🔥 7-Day Streak                │
└─────────────────────────────────────────────────────────────┘
```

**State variants:** Not started | In progress | Paused | Completed

---

### 12.3 Roadmap Page

**Goal:** Show the full journey visually.

**Layout:** Timeline with phases as chapters. Each day shows:
- Day number
- Title
- Status icon (locked/available/complete/in-progress)
- Phase color coding
- Click → opens lesson

**Filter controls:** Filter by phase, show completed, show locked.

---

### 12.4 Calendar Page

**Goal:** Show learning schedule and status at a glance.

**Layout:** Month grid calendar.

**Day cell states:**
| State | Visual |
|-------|--------|
| Locked | Gray, padlock icon |
| Available | Indigo border, open |
| In Progress | Indigo fill, half-check |
| Completed | Green fill, checkmark, day number |
| Missed | Amber border, "!" |
| Review available | Cyan accent |

**Clicking a day:**
- If completed → opens review mode
- If available → opens lesson
- If locked → shows "Complete Day X first"
- If missed → shows recovery options

---

### 12.5 Lesson Page

**Full layout spec:**

```
Header (sticky):
  ← Back  |  Phase 3 · Day 23 · SQL  |  45 min  |  [Progress: 40%]  |  [AI Help]

Section Navigation (left sidebar, collapsible on mobile):
  ✓ Why Filter Data?
  ✓ The Analogy  
  ● WHERE Syntax (active)
  ○ Business Example
  ○ Interactive Example
  ○ Common Mistakes
  ○ Job Connection
  ─────────────
  ○ Practice Exercises
  ○ Quiz
  ○ Mission

Main Content (scrollable, max-width 720px, centered):
  [Section Title]
  [Content]
  [Interactive element if applicable]
  [Next section button or scroll-to-reveal]

Bottom action bar (sticky):
  [← Previous Day]      [Mark Complete & Continue →]
```

**Distraction-free mode:** Collapses sidebar and header. Full-width content only. Toggle via "Focus Mode" button.

---

### 12.6 SQL Playground Page (Standalone)

**Open practice mode** — not tied to a lesson.

```
┌────────────────────────────────────────────────────────┐
│  SQL Practice          Dataset: [sales_q1 ▼]  [Reset]  │
├─────────────────────────────┬──────────────────────────┤
│  EDITOR                     │  TABLE SCHEMA            │
│  SELECT *                   │  sales                   │
│  FROM sales                 │  ├── order_id INT        │
│  WHERE region = 'Cairo'     │  ├── amount DECIMAL      │
│  LIMIT 10;                  │  ├── region TEXT         │
│                             │  ├── date DATE           │
│  [▶ Run Query]  [Format]    │  └── status TEXT         │
├─────────────────────────────┴──────────────────────────┤
│  RESULTS (10 rows)                                     │
│  order_id | amount | region | date    | status         │
│  ─────────────────────────────────────────────────────│
│  1024     | 6750   | Cairo  | 2024-01 | completed      │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

---

### 12.7 Skills Page

**Shows:** Per-skill proficiency based on completed lessons, quizzes, exercises, and projects.

**Skills tracked:**
Excel · SQL · Power BI · Python · Statistics · Business Analysis · Data Visualization · Business Writing

**Each skill card shows:**
- Proficiency level (Foundation / Developing / Practical / Advanced)
- Completed lessons in this skill
- Quiz average score
- Projects that used this skill
- "What this unlocks" (job roles)

---

### 12.8 Projects Page

**Lists:** All 3 portfolio projects.

**Each project card shows:**
- Project title and business context
- Status: Locked / Available / In Progress / Submitted / Reviewed
- Tools used (icons)
- Deadline suggestion
- Deliverables checklist

**Clicking opens Project Workspace:**
- Business scenario
- Dataset downloads
- Task list
- Submission area
- Rubric
- AI feedback (V2)

---

### 12.9 Job Launch Page

**Tabs:**
1. CV Builder / CV Review Checklist
2. LinkedIn Optimizer
3. Portfolio Review
4. Interview Prep (question bank, STAR practice)
5. Job Search Tracker (Kanban: Wishlist / Applied / Interview / Offer)

---

### 12.10 Admin Dashboard

**For content managers and platform admins.**

**Sections:**
- Active learners today (chart)
- Day completion heatmap
- Drop-off funnel
- Quiz failure rates by day
- Recent user activity feed
- Content alerts (draft lessons, missing datasets)

---

## 13. Progress System

### Completion Criteria Definition

**Day Completion Requirements:**
A day is "Complete" when ALL of these are true:
1. Lesson read ≥ 80% (scroll-based tracking per section)
2. Quiz passed (≥ 70%, within allowed attempts)
3. At least 1 practice exercise submitted
4. Mission submitted (any type)

If quiz is failed 3 times → Day is not completable until learner reviews and retries after 1 hour.

**Exceptions:**
- Reflection prompts: Optional (do not block completion)
- Power BI missions: Checklist self-verification (automated validation not possible)
- Excel missions: File upload or checklist self-assessment

---

### Progress Calculation Model

**Day progress (0–100%):**
```
Progress = (
  lesson_sections_read / total_sections * 30% +
  quiz_passed ? 25% : 0% +
  practice_submitted / total_practice * 20% +
  mission_submitted ? 25% : 0%
)
```

**Phase completion:** % of days completed in the phase.

**Skill score per skill:**
```
Skill Score = (
  lesson_completion_rate * 0.3 +
  avg_quiz_score * 0.3 +
  exercise_completion_rate * 0.2 +
  project_usage * 0.2
)
```

**Overall progress:**
```
Overall Progress = Σ(day_completion) / 90 * 100
```

---

### Streak System

- Streak = consecutive calendar days with at least 1 lesson partially completed (not full completion required for streak)
- Streak continues if learner completes ANY lesson on the day
- If a day is missed → streak resets to 0
- **Streak shield:** Earnable item (V2) that allows 1 missed day without reset

**Streak recovery:** After missing days, learner can catch up. Locked days unlock in order. Missed days are marked "Missed" and can be completed retroactively — but streak does not recover retroactively.

---

### Day Locking Policy

**Default: Sequential unlocking.**

- Day N+1 unlocks only when Day N is Complete.
- Exception: Same-phase "review" days always available.
- Exception: Phase 8–10 (Projects, Job Prep, Launch) — available after completing Day 72.

**Skip recommendation:** Do NOT allow arbitrary skipping in MVP. Reasons:
1. Curriculum has prerequisite chains — skipping Day 24 and doing Day 30 will fail the learner
2. MENA market users benefit from structured guidance more than autonomy
3. Cognitive load: choices cause anxiety, not progress

**V2 "Accelerate" mode:** A verified skip test (10 questions) proves proficiency in a phase. If passed, skip that phase.

---

### Retake Policy

| Scenario | Policy |
|----------|--------|
| Quiz failed (< 70%) | Retry up to 3 times, 1-hour cooldown after 3rd fail |
| Quiz passed | Can retake for review (score doesn't decrease) |
| Practice exercise | Unlimited retries |
| Mission submitted | Can resubmit (best submission counted) |
| Day marked complete | Can re-enter lesson in "review mode" at any time |

---

## 14. Calendar System

### Calendar Data Model

```jsonc
{
  "calendar_day": {
    "day_number": 23,
    "calendar_date": "2026-10-18",  // set relative to user's start date
    "status": "available",          // locked | available | in_progress | completed | missed
    "completion_percentage": 0,
    "estimated_minutes": 45,
    "phase": 3,
    "title": "Filtering Data with WHERE"
  }
}
```

### Status Transition Rules

```
locked → available        : Previous day completed
available → in_progress   : Learner opens the lesson
in_progress → completed   : All completion criteria met
available → missed        : Calendar date passes without completion (next day calculation)
missed → completed        : Learner retroactively completes (no streak recovery)
any → review              : Available after lesson is completed
```

### Calendar UX Notes
- Month view with phase color bands
- Week view option for dense planning
- "Jump to today" button
- Phase labels as column dividers
- Click any day → lesson or lock message

---

## 15. Exercise System

### Exercise Types

| Type | Description | Validation |
|------|-------------|------------|
| SQL Editor | Write query, run against DuckDB | Automated (result match) |
| Python Cell | Write code, execute in Pyodide | Automated (output match or assertion) |
| Fill-in-the-blank | Complete a code snippet | String match (normalized) |
| MCQ | Select correct answer | Immediate feedback |
| Matching | Match terms to definitions | Drag-and-drop |
| Short Answer | Write a response | No auto-validation (AI review in V2) |
| File Upload | Submit Excel / PBI file | Checklist self-assessment |
| Checklist | Self-verify steps completed | Trust-based (honesty system) |

### Exercise Validation Architecture

**SQL Validation:**
1. Run learner's query against sandbox DuckDB instance
2. Run solution query to get expected output
3. Compare: column names match? row count matches? values match? (with tolerance for floating point)
4. Return: ✅ Correct / ❌ Error with message / ⚠️ Partially correct

**Python Validation:**
1. Execute learner code in Pyodide sandbox
2. Assert against expected output or variable state
3. Capture stdout and DataFrame outputs
4. Return: pass / fail with specific error

**Hint System:**
- Max 3 hints per exercise
- Hints are progressive (vague → specific)
- After 3rd hint: "Show solution" option unlocks
- Showing solution does not fail the exercise but adds a "used solution" flag

---

## 16. SQL Playground

### Architecture Decision

**Technology:** DuckDB compiled to WebAssembly (WASM), running entirely in the browser.

**Why DuckDB WASM:**

| Option | Pros | Cons |
|--------|------|------|
| DuckDB WASM | No backend needed, fast, full SQL support, real engine, free | Limited to in-browser data, no multi-user state |
| SQLite WASM | Very mature, lightweight | Less analytical function support |
| Server-side PostgreSQL | Full power, multi-user | Latency, cost, security complexity, rate limiting needed |
| Fake/mock | Zero infrastructure | Defeats the educational purpose entirely |

**Recommendation: DuckDB WASM** for MVP. Rationale: zero infrastructure cost, real SQL semantics, analytics-optimized (window functions work out of the box), datasets load from static Parquet/CSV files.

### Dataset Strategy

- Datasets stored as `.parquet` or `.csv` files in CDN/object storage
- Loaded into DuckDB WASM on playground init
- Each lesson references a specific `dataset_ref`
- Datasets are versioned separately from lesson content

### Playground Component Spec

**Panel 1: Query Editor**
- CodeMirror 6 editor with SQL syntax highlighting
- Keyboard shortcuts (Ctrl+Enter = run)
- Auto-complete for table names and column names
- Line numbers, error highlighting

**Panel 2: Schema Browser**
- Shows all tables and columns in the loaded dataset
- Click column → inserts into editor
- Shows data types

**Panel 3: Results**
- Paginated table (50 rows per page)
- Column sorting
- "Download as CSV" button
- Row count display
- Execution time display

**Panel 4: Messages**
- Error messages (friendly, not raw database errors)
- Query history (last 10 queries)

**Exercise Mode vs. Open Mode:**
- Exercise mode: Shows instructions, validates result, hint system
- Open mode: No restrictions, free practice

### SQL Lesson Datasets

| Dataset | Tables | Row Count | Used In |
|---------|--------|-----------|---------|
| `retail_sales` | sales, products, regions | 5,000 | Days 22–28 |
| `ecommerce` | orders, customers, products | 8,000 | Days 29–35 |
| `telecom` | customers, plans, usage, churn | 3,000 | Project 2 |
| `retail_full` | All retail tables combined | 12,000 | Project 1 |
| `hr_data` | employees, departments, salaries | 2,500 | Capstone Option B |

All datasets are synthetic but realistic. Designed to reflect Egyptian/MENA business context where appropriate.

---

## 17. Excel Workflow

### Why No Browser Excel

Building a full spreadsheet engine in the browser equivalent to Microsoft Excel is not feasible for MVP. Alternatives like Handsontable or Google Sheets embedding require either significant cost or data sharing concerns.

**Decision: External workflow with structured guidance.**

### Excel Workflow Design

**Step 1: Dataset Download**
- Learner downloads pre-prepared `.xlsx` file from platform
- File is formatted professionally (not raw dump)
- Contains: data sheet + instructions sheet

**Step 2: Guided Mission**
- Platform shows step-by-step instructions (collapsible)
- Each step has a screenshot example
- Steps reference specific Excel operations

**Step 3: Verification**
- Option A (MVP): Self-assessment checklist — learner confirms each step done
- Option B (MVP): Answer specific questions about their output ("What is the total revenue for Q4?") — validates correctness without file parsing

**Step 4: Submission**
- Learner uploads completed `.xlsx` file
- File stored in object storage against user account

**Step 5: Evaluation**
- MVP: Numeric answer validation + checklist
- V2: Server-side Excel parsing (openpyxl) to validate formulas and values

---

## 18. Python Playground

### Architecture Decision

**Technology:** Pyodide (Python compiled to WASM), running in browser.

**Why Pyodide:**

| Option | Pros | Cons |
|--------|------|------|
| Pyodide (WASM) | No backend, secure, full Python, Pandas/NumPy included | Load time (~30MB initial), limited I/O |
| JupyterLite | Full Jupyter in browser | Complex setup, heavy |
| Server-side sandbox (Docker) | Full flexibility | Significant infrastructure, security risk |
| Skulpt/Brython | Lightweight | Limited library support (no Pandas) |

**Recommendation: Pyodide** — Pandas and NumPy are essential and work in Pyodide. Load time is acceptable with progressive loading strategy. No backend means no security risk from arbitrary code execution.

### Python Playground Component Spec

**Editor:** CodeMirror 6 with Python syntax highlighting + basic autocomplete

**Execution Environment:**
- Pyodide loads once per session (cached in service worker)
- Datasets pre-loaded as CSV strings (converted to DataFrame on load)
- `import pandas as pd` and `import numpy as np` pre-imported
- Matplotlib output rendered as inline image (canvas)

**Output Panel:**
- stdout text output
- DataFrame display (styled HTML table, first 20 rows)
- Matplotlib figure rendering
- Error traceback (cleaned up for readability)

**Cell Model:** Single-cell execution (like a Jupyter cell), not multi-cell in MVP. V2 adds multi-cell notebook experience.

### Security Consideration for Pyodide

Since code runs in the browser:
- No file system access (browser sandbox)
- No network access (no `requests`, `urllib` in exercises)
- No subprocess execution
- Memory limited by browser tab
- Infinite loop protection: timeout via Web Worker with termination

---

## 19. Power BI Workflow

### Architecture

Power BI cannot run in a browser. Power BI Embedded requires significant licensing cost and is not appropriate for MVP.

**Decision: Guided External Workflow**

### Power BI Mission Structure

**Phase A: Setup Mission (Day 43)**
- Instructions to download Power BI Desktop (free)
- Verification: Screenshot of installed Power BI

**Phase B: Guided Missions (Days 44–54)**
- Download starter `.pbix` file (partially built) OR raw dataset
- Step-by-step instructions with annotated screenshots
- Learner builds incrementally

**Phase C: Project Submission (Day 55)**
- Learner uploads completed `.pbix` file
- Upload checklist:
  - [ ] Data loaded and transformed
  - [ ] Data model built with relationships
  - [ ] At least 3 calculated measures
  - [ ] Dashboard has 4+ visuals
  - [ ] Dashboard is filterable by date and region
  - [ ] Screenshot of published report

**Validation (MVP):**
- Checklist self-assessment
- Screenshot review (optional: manual admin review)

**Validation (V2):**
- Parse `.pbix` file server-side (Power BI files are ZIP-based XML)
- Extract measures, relationship count, visual count
- Automated scoring

---

## 20. Project System

### Project Workspace Architecture

Each project has its own workspace page with tabs:

```
[Overview] [Dataset] [Tasks] [Workspace] [Submission] [Rubric]
```

**Overview Tab:**
- Business scenario narrative (2–3 paragraphs, realistic)
- Role: "You are a junior analyst at..."
- Stakeholders: "The Sales Director has asked you to..."
- Deliverables summary
- Timeline suggestion

**Dataset Tab:**
- Dataset description
- Download links (CSV, Excel)
- Data dictionary (all columns explained)
- Known data quality issues (realistic — forces learner to handle them)

**Tasks Tab:**
- Numbered task list
- Each task has: description, tools, expected output, hint link
- Completion checkboxes (stored server-side)

**Workspace Tab:**
- Embedded SQL playground (for SQL tasks)
- Embedded Python playground (for Python tasks)
- Notes area (Markdown editor)
- Upload area (for Excel/PBI files)

**Submission Tab:**
- Submit each deliverable separately
- Written reflection required: "What did you find? What would you recommend to the business?"
- PDF export option (for portfolio)

**Rubric Tab:**
- Full evaluation rubric visible before submission
- Learner self-evaluates before final submit

### Project Datasets Design

All datasets are:
1. Synthetic (no real personal data)
2. Realistic (realistic Egyptian/MENA business context)
3. Dirty (contain real data quality issues to practice cleaning)
4. Multi-format (available as CSV and Excel)
5. Documented (data dictionary provided)

**"RetailCore" Dataset:**
- 5,000 sales transactions
- Products: 150 SKUs across 8 categories
- Regions: Cairo, Alexandria, Giza, Suez, Aswan
- Dates: 2022–2024
- Issues: Missing values in discount column, duplicate order IDs (3), inconsistent region naming
- SQL schema: 3 tables (sales, products, regions)

**"TelecomX" Dataset:**
- 3,000 customer records
- Features: age, plan, monthly_charge, total_charges, support_calls, churn
- Issues: Blanks in total_charges for recent customers, typos in plan names

---

## 21. AI Tutor

### Role Definition

The AI tutor is a **Socratic guide**, not an answer machine.

**The AI can:**
- Explain a concept differently
- Give a simpler analogy
- Give a more complex example
- Give a progressive hint (not the answer)
- Explain an error message in plain English
- Ask the learner a guiding question
- Confirm whether their reasoning is on the right track

**The AI cannot (by guardrails):**
- Complete a mission for the learner
- Write the full query when the mission requires them to write it
- Give the final answer to a quiz question
- Bypass completion criteria

### AI Guardrail System

**Context injection per interaction:**
```
System prompt includes:
- Current day and lesson title
- The specific exercise or mission the learner is on
- The guardrail level (hint_only | explain_only | full)
- What the learner has already tried (if SQL: their last query)
- Forbidden: Do not give the final answer or complete solution
```

**Guardrail levels:**
| Level | Description | When Used |
|-------|-------------|-----------|
| `hint_only` | AI can only give progressive hints, not solutions | During missions |
| `explain_only` | AI can explain concepts but not solve | During quiz attempts |
| `full` | AI can explain fully | After mission submitted or review mode |

### AI Interaction Types

**Quick actions (UI buttons):**
- "Explain simpler" — rephrases the current section for beginner comprehension
- "Give me an example" — generates a new analogy or business example
- "I'm stuck" — opens hint flow
- "What does this error mean?" — paste error, get explanation
- "Check my thinking" — learner describes their approach, AI evaluates reasoning

**Free chat:**
- Available in sidebar panel
- Context-aware (knows what lesson/exercise is active)
- Rate-limited to prevent abuse (30 messages/day in MVP)

### AI Technology Selection

**Recommendation: Google Gemini API (via backend proxy)**

| Option | Pros | Cons |
|--------|------|------|
| Gemini Flash | Fast, cheap, good reasoning | Requires API key management |
| GPT-4o | Excellent quality | More expensive, OpenAI dependency |
| Claude | Good reasoning, better safety | API availability |
| Local model | Privacy, no cost | Infrastructure overhead, lower quality |

**MVP: Gemini Flash** — cheapest per token, fast, sufficient for tutoring tasks. Backend proxy prevents API key exposure.

---

## 22. Job Launch System

### Job Readiness Score Architecture

**NOT a single number.** A multi-dimensional readiness matrix.

**6 Readiness Levels (not a %):**
1. **Foundation** — Knows concepts, no practice
2. **Developing** — Has practiced, completing exercises
3. **Practical** — Can do the job tasks with tools
4. **Portfolio Ready** — Has documented, presentable work
5. **Interview Ready** — Can explain and defend their work
6. **Job Launch** — CV, LinkedIn, and pipeline active

**Per-skill readiness matrix:**
| Skill | Threshold for "Practical" |
|-------|--------------------------|
| Excel | Phase 2 complete + mini project submitted |
| SQL | Phase 3 complete + SQL capstone passed |
| Power BI | Phase 5 complete + dashboard project submitted |
| Python | Phase 6 complete + EDA exercise submitted |
| Statistics | Phase 4 complete + quiz average ≥ 70% |
| Business Analysis | Phase 7 complete |
| Projects | At least 2 projects submitted with rubric ≥ 70% |
| CV/LinkedIn | Job prep checklist complete |
| Interview | Interview prep exercises done |

**Overall readiness badge:**
Only "Job Launch Ready" when:
- All Phase 1–7 complete
- At least 2 projects submitted
- Job prep complete
- CV checklist done

### Job Tracker (Kanban)

**Columns:** Wishlist → Applied → Phone Screen → Technical Interview → Final Round → Offer → Rejected

**Per application card:**
- Company name
- Job title
- Date applied
- Source (LinkedIn, company website, referral)
- Contact name
- Notes
- Status
- Next action + due date

**Dashboard aggregate:**
- Applications this week: 5
- Response rate: 40%
- Interviews scheduled: 2

---

## 23. Account & Profile

### User Data Model

```jsonc
{
  "users": {
    "id": "uuid",
    "name": "string",
    "email": "string (unique)",
    "password_hash": "string",
    "auth_provider": "email | google | null",
    "email_verified": "boolean",
    "created_at": "timestamp",
    "last_active": "timestamp"
  },

  "profiles": {
    "user_id": "uuid (FK → users)",
    "career_goal": "data_analyst | bi_analyst | business_analyst",
    "start_date": "date",
    "current_day": "int",
    "streak": "int",
    "longest_streak": "int",
    "total_xp": "int",
    "avatar_url": "string | null",
    "bio": "string | null",
    "country": "string",
    "timezone": "string"
  }
}
```

### Profile Page Components

- Avatar + Name + Career Goal
- Current day and phase
- Streak display
- Skill progress summary (radar chart)
- Project portfolio (public/private toggle)
- Achievement badges
- Account settings
- Notification preferences
- Privacy settings

---

## 24. Admin CMS

### Content Management Architecture

**Design principle:** The curriculum lives in the database, not in code. A non-technical content editor should be able to update lesson text, add questions, and upload datasets without touching the codebase.

### Admin Roles

| Role | Permissions |
|------|------------|
| Super Admin | Everything |
| Content Editor | Edit lessons, questions, missions (no publish) |
| Content Publisher | Edit + publish |
| Data Manager | Upload/manage datasets |
| User Support | View user profiles, reset progress |
| Analytics Viewer | Read-only analytics |

### Lesson Editor Spec

**Rich text editor:** Tiptap or ProseMirror-based with:
- Markdown import/export
- Code block insertion with language selector
- SQL code block (connects to playground preview)
- Table insertion
- Image upload
- Section ordering (drag-and-drop)

**Question Editor:**
- Add/edit questions per type
- Preview quiz as learner sees it
- Set passing score
- Reorder questions

**Dataset Manager:**
- Upload `.csv`, `.parquet`, `.xlsx`
- Preview first 20 rows
- Auto-detect column types
- Name and version dataset
- Assign to lessons

**Content Status Flow:**
```
Draft → Review → Approved → Published → Archived
```

Only Published content is visible to learners. Drafts and archived content visible only in admin.

---

## 25. Analytics

### Platform Analytics Dashboard

**Learner Behavior Metrics:**
- Daily Active Users (DAU)
- Weekly/Monthly Active Users
- Day-by-day completion rate (heatmap across all users)
- Drop-off analysis: At which day do most users stop?
- Average time per lesson (by day)
- Quiz failure rate by question
- Exercise hint usage rate
- Mission submission rate

**Content Quality Signals:**
- Days with highest time-on-page (too complex?)
- Days with lowest completion (drop-off bottleneck?)
- Questions answered incorrectly most often (concept not landing?)
- SQL exercises with most errors (query too hard?)

**Retention Metrics:**
- Day 1 → Day 7 retention rate
- Day 7 → Day 30 retention rate
- Day 30 → Day 90 completion rate
- Streak distribution

**Output:**
All analytics stored in `analytics_events` table with event type, user, day, timestamp. Aggregate views computed by scheduled jobs or materialized views.

---

## 26. Database Architecture

### Entity Relationship Overview

```
users ─────────────── profiles
  │                        │
  ├── user_progress ───────┼── days
  │                        │     │
  ├── quiz_attempts        │   phases
  │                        │
  ├── exercise_submissions │
  │                        │
  ├── mission_submissions  │
  │                        │
  ├── project_submissions  │
  │                        │
  ├── notes                │
  ├── bookmarks            │
  ├── achievements         │
  ├── job_applications     │
  └── ai_interactions      │
                           │
curriculum:                │
  phases ─────── days ─── lessons ─── sections
                  │              └──── exercises
                  │              └──── quiz_questions
                  └── missions
                  
datasets (standalone, referenced by lessons/missions)
files (uploaded files, stored in object storage)
content_versions (audit trail for lesson edits)
analytics_events (raw event stream)
```

### Core Table Definitions

**`users`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
email           TEXT UNIQUE NOT NULL
name            TEXT NOT NULL
password_hash   TEXT
auth_provider   TEXT CHECK (auth_provider IN ('email','google'))
email_verified  BOOLEAN DEFAULT FALSE
created_at      TIMESTAMPTZ DEFAULT NOW()
last_active     TIMESTAMPTZ
is_admin        BOOLEAN DEFAULT FALSE
```

**`profiles`**
```sql
user_id         UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE
career_goal     TEXT CHECK (career_goal IN ('data_analyst','bi_analyst','business_analyst'))
start_date      DATE
current_day     INT DEFAULT 1
streak          INT DEFAULT 0
longest_streak  INT DEFAULT 0
total_xp        INT DEFAULT 0
avatar_url      TEXT
country         TEXT DEFAULT 'EG'
timezone        TEXT DEFAULT 'Africa/Cairo'
```

**`phases`**
```sql
id              SERIAL PRIMARY KEY
number          INT UNIQUE NOT NULL
name            TEXT NOT NULL
description     TEXT
color_hex       TEXT
start_day       INT
end_day         INT
created_at      TIMESTAMPTZ DEFAULT NOW()
```

**`days`**
```sql
id              SERIAL PRIMARY KEY
day_number      INT UNIQUE NOT NULL
phase_id        INT REFERENCES phases(id)
title           TEXT NOT NULL
subtitle        TEXT
skill           TEXT NOT NULL
estimated_minutes INT
difficulty      TEXT CHECK (difficulty IN ('beginner','intermediate','advanced'))
xp_reward       INT DEFAULT 100
status          TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived'))
version         INT DEFAULT 1
updated_at      TIMESTAMPTZ DEFAULT NOW()
author_id       UUID REFERENCES users(id)
```

**`lessons`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
day_id          INT REFERENCES days(id)
learning_objective TEXT NOT NULL
sections        JSONB NOT NULL  -- array of section objects
prerequisites   INT[]           -- array of day numbers
next_day_teaser TEXT
created_at      TIMESTAMPTZ DEFAULT NOW()
updated_at      TIMESTAMPTZ DEFAULT NOW()
```

**`exercises`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
day_id          INT REFERENCES days(id)
order_index     INT
type            TEXT NOT NULL
title           TEXT NOT NULL
instructions    TEXT NOT NULL
dataset_ref     TEXT
starter_code    TEXT
solution        TEXT
validation_type TEXT
hints           JSONB  -- array of hint strings
difficulty      TEXT
```

**`quiz_questions`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
day_id          INT REFERENCES days(id)
order_index     INT
type            TEXT NOT NULL
question        TEXT NOT NULL
options         JSONB  -- for MCQ types
correct_answer  TEXT NOT NULL
explanation     TEXT
```

**`missions`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
day_id          INT UNIQUE REFERENCES days(id)
title           TEXT NOT NULL
type            TEXT NOT NULL
description     TEXT NOT NULL
tasks           JSONB
dataset_ref     TEXT
submission_type TEXT
evaluation_type TEXT
ai_guardrail    TEXT DEFAULT 'hint_only'
```

**`user_progress`**
```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id             UUID REFERENCES users(id) ON DELETE CASCADE
day_id              INT REFERENCES days(id)
status              TEXT DEFAULT 'locked'
lesson_read_pct     INT DEFAULT 0
quiz_passed         BOOLEAN DEFAULT FALSE
quiz_best_score     INT DEFAULT 0
quiz_attempts       INT DEFAULT 0
exercises_done      INT DEFAULT 0
mission_submitted   BOOLEAN DEFAULT FALSE
completed_at        TIMESTAMPTZ
last_accessed       TIMESTAMPTZ
UNIQUE(user_id, day_id)
```

**`mission_submissions`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id)
mission_id      UUID REFERENCES missions(id)
day_id          INT
submission_type TEXT
content         TEXT  -- SQL query or written answer
file_url        TEXT  -- for file uploads
checklist_data  JSONB -- for checklist submissions
submitted_at    TIMESTAMPTZ DEFAULT NOW()
is_final        BOOLEAN DEFAULT FALSE
```

**`projects`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
number          INT UNIQUE NOT NULL
title           TEXT NOT NULL
business_context TEXT
scenario        TEXT
tools           TEXT[]
phase_start     INT
phase_end       INT
status          TEXT DEFAULT 'draft'
```

**`project_submissions`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id)
project_id      UUID REFERENCES projects(id)
task_completions JSONB
file_urls       JSONB
written_reflection TEXT
self_score      INT
submitted_at    TIMESTAMPTZ
status          TEXT DEFAULT 'submitted'
rubric_score    INT  -- filled by admin/AI review
feedback        TEXT
```

**`datasets`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
ref_name        TEXT UNIQUE NOT NULL
display_name    TEXT NOT NULL
description     TEXT
file_url        TEXT NOT NULL
file_format     TEXT CHECK (file_format IN ('csv','parquet','xlsx'))
schema_json     JSONB
version         INT DEFAULT 1
created_at      TIMESTAMPTZ DEFAULT NOW()
```

**`notes`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id) ON DELETE CASCADE
day_id          INT REFERENCES days(id)
content         TEXT NOT NULL
selection_text  TEXT  -- if note is a highlight
created_at      TIMESTAMPTZ DEFAULT NOW()
updated_at      TIMESTAMPTZ DEFAULT NOW()
```

**`bookmarks`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id) ON DELETE CASCADE
day_id          INT REFERENCES days(id)
section_id      TEXT  -- optional: specific section
created_at      TIMESTAMPTZ DEFAULT NOW()
UNIQUE(user_id, day_id, section_id)
```

**`achievements`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
key             TEXT UNIQUE NOT NULL  -- 'first_query', 'phase2_complete', etc.
name            TEXT NOT NULL
description     TEXT
icon            TEXT  -- emoji or icon ref
xp_value        INT DEFAULT 50
```

**`user_achievements`**
```sql
user_id         UUID REFERENCES users(id)
achievement_id  UUID REFERENCES achievements(id)
earned_at       TIMESTAMPTZ DEFAULT NOW()
PRIMARY KEY(user_id, achievement_id)
```

**`job_applications`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id)
company         TEXT NOT NULL
job_title       TEXT NOT NULL
source          TEXT
applied_date    DATE
status          TEXT DEFAULT 'wishlist'
contact_name    TEXT
notes           TEXT
next_action     TEXT
next_action_date DATE
```

**`analytics_events`**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id)
event_type      TEXT NOT NULL  -- 'lesson_started', 'quiz_passed', 'day_completed', etc.
day_id          INT
metadata        JSONB
occurred_at     TIMESTAMPTZ DEFAULT NOW()
```

### Database Indexes

```sql
-- Performance-critical queries
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_day ON user_progress(day_id);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_date ON analytics_events(occurred_at);
CREATE INDEX idx_mission_subs_user ON mission_submissions(user_id);
CREATE INDEX idx_notes_user ON notes(user_id);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
```

---

## 27. API Architecture

### API Design

**Style:** RESTful JSON API with predictable resource naming. GraphQL considered but rejected for MVP — REST is simpler to implement and debug.

**Base URL:** `/api/v1/`

**Authentication:** JWT (short-lived access token 15min + refresh token 7 days in HttpOnly cookie)

### Core API Endpoints

#### Auth
```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
GET  /api/v1/auth/verify-email/:token
```

#### User & Profile
```
GET  /api/v1/me                          — Current user + profile
PATCH /api/v1/me                         — Update profile
GET  /api/v1/me/progress                 — Full progress summary
GET  /api/v1/me/streak                   — Streak data
GET  /api/v1/me/achievements             — User achievements
GET  /api/v1/me/skills                   — Skill scores
```

#### Curriculum
```
GET  /api/v1/curriculum                  — All phases summary
GET  /api/v1/phases/:id                  — Phase details + days
GET  /api/v1/days/:dayNumber             — Day full data (requires auth + access check)
GET  /api/v1/days/:dayNumber/lesson      — Lesson content
GET  /api/v1/days/:dayNumber/exercises   — Exercise list
GET  /api/v1/days/:dayNumber/quiz        — Quiz questions (shuffled)
GET  /api/v1/days/:dayNumber/mission     — Mission details
```

#### Progress
```
POST /api/v1/progress/lesson-read        — Update read percentage
POST /api/v1/progress/exercise-submit    — Submit exercise
POST /api/v1/progress/quiz-submit        — Submit quiz answers
POST /api/v1/progress/mission-submit     — Submit mission
POST /api/v1/progress/day-complete       — Mark day complete (validated server-side)
GET  /api/v1/progress/calendar           — Calendar view data
```

#### SQL Playground (thin layer)
```
POST /api/v1/playground/sql/validate     — Validate exercise result (compare hashes)
GET  /api/v1/playground/datasets/:ref    — Get dataset URL for DuckDB WASM
```

#### Projects
```
GET  /api/v1/projects                    — All projects (with user status)
GET  /api/v1/projects/:id                — Project details
POST /api/v1/projects/:id/submit         — Submit project deliverable
PATCH /api/v1/projects/:id/tasks         — Update task completion
```

#### Notes & Bookmarks
```
GET    /api/v1/notes                     — User's notes (searchable)
POST   /api/v1/notes                     — Create note
PATCH  /api/v1/notes/:id                 — Update note
DELETE /api/v1/notes/:id                 — Delete note
POST   /api/v1/bookmarks                 — Add bookmark
DELETE /api/v1/bookmarks/:dayId          — Remove bookmark
GET    /api/v1/bookmarks                 — List bookmarks
```

#### AI Tutor
```
POST /api/v1/ai/ask                      — Send message to AI (context-injected)
GET  /api/v1/ai/usage                    — User's daily AI usage count
```

#### Job Launch
```
GET    /api/v1/jobs                      — User's job applications
POST   /api/v1/jobs                      — Add application
PATCH  /api/v1/jobs/:id                  — Update status
DELETE /api/v1/jobs/:id                  — Remove application
GET    /api/v1/jobs/readiness            — Job readiness matrix
```

#### File Upload
```
POST /api/v1/upload/mission              — Upload mission file (presigned URL flow)
POST /api/v1/upload/project              — Upload project file
GET  /api/v1/upload/presign              — Get presigned upload URL
```

#### Admin
```
GET    /api/v1/admin/users               — User list with search/filter
GET    /api/v1/admin/users/:id           — User detail + progress
GET    /api/v1/admin/analytics           — Platform analytics
GET    /api/v1/admin/curriculum/phases   — Phase management
POST   /api/v1/admin/curriculum/phases   — Create phase
PATCH  /api/v1/admin/curriculum/days/:id — Update day
POST   /api/v1/admin/curriculum/days     — Create day
PATCH  /api/v1/admin/content/lessons/:id — Update lesson content
POST   /api/v1/admin/datasets            — Upload dataset
GET    /api/v1/admin/projects/submissions — Review project submissions
PATCH  /api/v1/admin/projects/submissions/:id — Score submission
```

### API Response Standards

```jsonc
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "...", "version": "1.0" }
}

// Error
{
  "success": false,
  "error": {
    "code": "QUIZ_ATTEMPT_LIMIT",
    "message": "You have reached the maximum attempts for today's quiz. Try again in 1 hour.",
    "details": { "next_attempt_at": "..." }
  }
}

// Paginated
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 145,
    "total_pages": 8
  }
}
```

---

## 28. Technical Stack

### Final Stack Recommendation

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | **Next.js 14 (App Router)** | SSR for landing page SEO, RSC for performance, React ecosystem |
| Language | **TypeScript** | Type safety, better DX, catches bugs early |
| Styling | **Tailwind CSS v3** | Utility-first, excellent for complex layouts, pairs with shadcn/ui |
| Component Library | **shadcn/ui** | Unstyled, accessible, composable — we can customize everything |
| Code Editor | **CodeMirror 6** | Best-in-class browser editor for SQL and Python |
| SQL Engine | **DuckDB WASM** | Browser-native analytical SQL, no server needed |
| Python Engine | **Pyodide** | Browser-native Python with Pandas/NumPy |
| Rich Text | **Tiptap** | Extensible editor for lesson content and notes |
| State Management | **Zustand** (client) + **React Query/TanStack Query** | Lightweight, fast, excellent cache management |
| Backend | **Next.js API Routes** (MVP) → **Separate Express/Node service** (V2) | Simplest MVP setup; separate when team grows |
| Database | **PostgreSQL** (via Supabase or Railway) | Proven, relational, great for complex progress queries |
| ORM | **Prisma** | Type-safe, excellent DX, migrations included |
| Authentication | **NextAuth.js v5** | Handles email + Google OAuth, session management |
| File Storage | **Supabase Storage** or **AWS S3** | Object storage for datasets and user uploads |
| AI | **Google Gemini Flash API** (via server-side proxy) | Cost-effective, fast, good reasoning |
| Email | **Resend** | Reliable transactional email, simple API |
| Analytics (internal) | **PostHog** (self-hosted or cloud) | Product analytics, funnels, session recording |
| Deployment | **Vercel** (frontend + API routes) | Zero-config Next.js deployment |
| Database hosting | **Supabase** | Managed PostgreSQL + auth helpers |
| CDN | **Cloudflare** | Static assets, dataset files |

### Why Not Alternatives

**Why not Create React App / Vite SPA:** No SSR = SEO issues for landing page, no easy API routes

**Why not Django/FastAPI backend:** Adds complexity for MVP; Next.js API routes are sufficient; can extract later

**Why not MySQL:** PostgreSQL's JSONB support is critical for lesson content storage

**Why not Firebase:** NoSQL is wrong for relational curriculum and progress data

**Why not Supabase Auth instead of NextAuth:** NextAuth gives more flexibility for custom session handling and is framework-integrated

---

## 29. Security Architecture

### Authentication Security

- Passwords hashed with **bcrypt** (cost factor 12)
- JWT access tokens: 15-minute expiry, signed with RS256
- Refresh tokens: 7-day expiry, stored in HttpOnly SameSite=Strict cookie
- Email verification required before accessing curriculum
- Rate limit: 5 login attempts per IP per 15 minutes
- Google OAuth as alternative (no password stored)

### Authorization

- All API routes require valid JWT (middleware layer)
- Day access validated server-side (not just frontend-locked):
  - Check that `user_progress.status IN ('available','in_progress')` for requested day
  - Admin routes require `users.is_admin = true`
  - Role-based permission check for admin sub-routes

### File Upload Security

- Max file size: 10MB for Excel, 50MB for .pbix
- Allowed MIME types explicitly whitelisted
- Virus scan: ClamAV (V2) or partner with Cloudflare Gateway
- Files stored in private S3/Supabase bucket (not publicly accessible)
- Access via signed time-limited URLs (5 minutes)
- Filename sanitization (UUID rename on upload)

### SQL Playground Security

Since DuckDB runs in the browser (WASM):
- No server-side SQL execution from user code
- The only server-side SQL operation is dataset download (validated by `dataset_ref` whitelist)
- Exercise validation: Server compares query result hash, never executes user query server-side
- Rate limit dataset downloads: 50/hour per user

### Python Playground Security

Since Pyodide runs in the browser (WASM):
- No server-side Python execution
- Network access disabled in Pyodide config (`micropip` blocked after initial load)
- File system access: browser sandbox only (no real FS)
- Infinite loop protection: Web Worker with 30-second timeout + message ping
- Memory limit: Browser tab (typically 2GB max, sufficient for analysis datasets)

### AI Security

- All AI calls go through server-side proxy (Gemini API key never on client)
- Rate limit: 30 AI messages per user per day (configurable)
- Content moderation: Gemini's built-in safety filters enabled
- System prompt: Injected server-side, not modifiable by user
- User message length: Max 2,000 characters
- Response length: Max 1,500 tokens
- Logging: All AI interactions stored in `ai_interactions` table for abuse monitoring

### General API Protection

- All routes: `helmet.js` headers (HSTS, X-Frame-Options, CSP, etc.)
- CORS: Restricted to platform domain
- Input validation: Zod schemas on all API inputs
- SQL injection: Prisma parameterized queries (no raw string interpolation)
- API rate limiting: 100 req/min general, 10 req/min for auth endpoints
- Secrets: Environment variables only, never in code, managed via Vercel env or AWS Secrets Manager

---

## 30. Accessibility

### Compliance Target

**WCAG 2.1 Level AA** as the minimum standard.

### Specific Requirements

**Keyboard Navigation:**
- All interactive elements reachable by Tab
- Quiz questions navigable with arrow keys
- SQL editor supports Tab for indentation (not focus trap)
- Modal dialogs trap focus and return on close
- Skip-to-content link at page top

**Semantic HTML:**
- Single `<h1>` per page
- Correct heading hierarchy (h2→h3→h4)
- `<nav>`, `<main>`, `<aside>`, `<section>` used correctly
- Lists (`<ul>/<ol>`) for navigation items
- `<table>` for data with `<thead>`, `<tbody>`, `aria-label`

**Forms:**
- All inputs have `<label>` or `aria-label`
- Error messages associated with inputs via `aria-describedby`
- Submit buttons are `<button type="submit">` not `<div>` with click handler
- Required fields marked with `aria-required="true"`

**Color & Contrast:**
- Minimum 4.5:1 ratio for body text
- Minimum 3:1 ratio for large text and UI components
- No information conveyed by color alone (icons + text + shape)
- Focus indicators: visible outline, not just color change

**Motion:**
- All animations respect `prefers-reduced-motion` media query
- No auto-playing animations that distract reading

**Screen Readers:**
- Progress bars have `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Icons that convey meaning have `aria-label`
- Decorative icons have `aria-hidden="true"`
- Quiz results announced via `aria-live` region

---

## 31. Performance

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Lesson page load | < 1s (cached) |
| SQL playground init (DuckDB WASM) | < 3s (first load) |
| Python playground init (Pyodide) | < 8s (first load, then cached) |

### Strategies

**Code Splitting:**
- Next.js automatic per-page splitting
- SQL playground: lazy-loaded only on SQL lesson pages
- Pyodide: lazy-loaded only on Python lesson pages
- Admin CMS: completely separate chunk (admin only)

**Caching:**
- DuckDB WASM binary: cached in Service Worker (persistent)
- Pyodide: cached in Service Worker (persistent)
- Datasets: cached in IndexedDB per session
- Lesson content: SWR/TanStack Query with stale-while-revalidate
- User progress: Optimistic updates (local state updates first, API call second)

**Asset Optimization:**
- Images: Next.js `<Image>` component (WebP conversion, lazy loading, size hints)
- Fonts: Next.js font optimization (`next/font`) — preloaded, no layout shift
- Icons: SVG sprite or lucide-react (tree-shakeable)

**Database:**
- `user_progress` indexed on `user_id`
- `analytics_events` partitioned by month (V2)
- Lesson content: JSONB stored in DB (fast for reads, indexed by day_id)
- Heavy analytics queries: Computed nightly and stored in summary tables

**API:**
- Progress endpoint cached client-side for 60 seconds
- Curriculum data (phases/days list): cached 1 hour (changes rarely)
- Lesson content: cached 5 minutes (admin edits propagate within 5min)

---

## 32. MVP Scope

### MVP Definition

The MVP must prove the **core loop**: Sign up → See roadmap → Open lesson → Read → Practice → Quiz → Mission → Track progress.

### MVP Includes

**Core:**
- [ ] Landing page with sample demo
- [ ] Registration, login, email verification
- [ ] Onboarding flow (5-question assessment + goal selection)
- [ ] Dashboard (current day, streak, progress, next lesson)
- [ ] 90-day roadmap view (visual)
- [ ] Calendar view (with status indicators)
- [ ] Lesson reader (all section types rendered)
- [ ] Quiz engine (MCQ + fill-in-the-blank)
- [ ] Exercise system (SQL exercises)
- [ ] Day completion tracking (server-validated)
- [ ] Streak system
- [ ] SQL playground (DuckDB WASM, 5 datasets)
- [ ] Excel workflow (download + answer validation + upload)
- [ ] Python playground (Pyodide, basic single-cell)
- [ ] Power BI guided workflow
- [ ] File upload for missions
- [ ] Project workspace (Project 1 and Project 2)
- [ ] Job readiness matrix (read-only display)
- [ ] Job application tracker (basic Kanban)
- [ ] Notes (create/read/delete)
- [ ] Bookmarks
- [ ] Basic AI tutor (explain/hint mode)
- [ ] Basic admin CMS (edit lesson content, manage users)
- [ ] Phase completion tracking

**Content authored for MVP:**
- Days 1–30 (Foundations + Excel + First 10 SQL days): Fully authored
- Days 31–90: Schema in place, placeholder/stub content ready
- All datasets created and loaded
- All quiz questions for Days 1–30 authored
- Projects 1 and 2 fully designed

### MVP Excludes (V2)

- Advanced AI tutor (multi-turn Socratic mode)
- Gamification (XP system, badges, leaderboard)
- Community forum
- Arabic language support
- Mobile app
- Browser-based spreadsheet
- Mentor review / human feedback
- Advanced analytics for admin
- Multi-career paths
- Cohort learning

---

## 33. V2 Scope

- Full gamification: XP, badges, skill trees, leaderboard
- Advanced AI tutor: Multi-turn Socratic dialogue, code review
- Community: Per-day discussion threads, peer review
- Arabic UI toggle (RTL support)
- Phase skip test (verified accelerate mode)
- Streak shields and recovery mechanics
- Mentor marketplace: Optional paid human feedback on projects
- Full content for all 90 days authored and QA'd
- Admin CMS v2: Rich text editor, question builder, visual preview
- Browser-based spreadsheet (Handsontable or custom)
- Expanded datasets and exercises
- A/B testing framework for lesson content

---

## 34. V3 Scope

- Multiple career paths (Data Engineer, ML Engineer, Product Analyst)
- AI-adaptive curriculum (adjusts pace based on performance)
- Partner employer program (employer visibility into top learners)
- Verifiable credential/certificate system
- Integration with LinkedIn for profile sync
- Job board integration (apply directly from platform)
- Live session layer (weekly office hours, cohort kickoffs)
- Mobile app (React Native)
- Enterprise/university licensing

---

## 35. Implementation Roadmap

### Phase 0: Architecture (Week 1)
Set up the project scaffold, CI/CD, database, and development environment.

### Phase 1: Foundation (Week 1–2)
Core Next.js setup, Tailwind, component library, routing structure.

### Phase 2: Authentication (Week 2)
Registration, login, email verification, session management.

### Phase 3: Dashboard & Navigation (Week 3)
Dashboard layout, sidebar, roadmap view, calendar view.

### Phase 4: Curriculum Engine (Week 3–4)
Database curriculum schema, lesson content API, day/phase data.

### Phase 5: Lesson System (Week 4–5)
Lesson reader, section rendering, all content types.

### Phase 6: Quiz Engine (Week 5)
Quiz rendering, submission, scoring, attempt tracking.

### Phase 7: Exercise System (Week 5–6)
Exercise rendering, validation, hints, tracking.

### Phase 8: SQL Playground (Week 6)
DuckDB WASM integration, editor, results table, datasets.

### Phase 9: Progress Engine (Week 6–7)
Completion criteria, day locking, streak calculation, progress API.

### Phase 10: Excel Workflow (Week 7)
Dataset download, answer validation, file upload.

### Phase 11: Python Playground (Week 7–8)
Pyodide integration, single-cell execution, output rendering.

### Phase 12: Power BI Workflow (Week 8)
Guided mission UI, checklist, file upload.

### Phase 13: Mission System (Week 8)
Mission submission, tracking, status management.

### Phase 14: Project System (Week 9)
Project workspace, task tracking, submission, rubric.

### Phase 15: AI Tutor (Week 9–10)
Gemini integration, guardrail system, context injection.

### Phase 16: Job Launch System (Week 10)
Job readiness matrix, application tracker, CV checklist.

### Phase 17: Notes & Bookmarks (Week 10)
Note creation, bookmarking, search.

### Phase 18: Admin CMS (Week 11)
Admin panel, lesson editor, user management, dataset manager.

### Phase 19: Content Authoring (Week 11–14)
Fully author Days 1–30 in admin CMS. QA all content.

### Phase 20: Analytics (Week 12)
Event tracking, admin analytics dashboard.

### Phase 21: Security Hardening (Week 13)
Rate limiting, file validation, API security audit.

### Phase 22: Performance Optimization (Week 13)
Caching, code splitting, WASM caching, bundle analysis.

### Phase 23: Accessibility Audit (Week 13–14)
Keyboard nav, screen reader, contrast checks.

### Phase 24: Testing (Week 14)
Unit tests, integration tests, E2E tests.

### Phase 25: Deployment & Beta (Week 15)
Vercel deployment, Supabase production, beta user group.

---

## 36. Detailed Task Breakdown

---

### TASK-001: Project Scaffold & DevOps
**Goal:** Set up the entire project foundation — monorepo or single Next.js app, TypeScript config, Tailwind, ESLint, Prettier, Prisma, and CI/CD pipeline.

**Dependencies:** None

**Files/Components:**
- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `.eslintrc.json`
- `prisma/schema.prisma`
- `next.config.ts`
- `.env.example`
- `Dockerfile` (optional)
- GitHub Actions workflow file

**Database changes:** Initial Prisma schema with all core tables

**API changes:** None

**UX requirements:** None

**Acceptance criteria:**
- [ ] `npm run dev` starts successfully on localhost
- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no warnings
- [ ] Prisma client generates from schema
- [ ] Tailwind CSS applies correctly to a test component
- [ ] Environment variables loaded from `.env.local`
- [ ] Git repository initialized with main + dev branches
- [ ] CI pipeline runs on pull request (lint + type check)

**Edge cases:** Windows/Mac dev environment compatibility

**Testing:** CI run passes on push

---

### TASK-002: Database Schema Migration
**Goal:** Implement all Prisma models for users, curriculum, progress, content, and analytics.

**Dependencies:** TASK-001

**Files/Components:**
- `prisma/schema.prisma` (complete)
- `prisma/migrations/`
- `prisma/seed.ts` (seed phases and day skeletons)

**Database changes:** Create all tables listed in Section 26

**Acceptance criteria:**
- [ ] All tables created in PostgreSQL
- [ ] All foreign key relationships enforced
- [ ] All indexes created
- [ ] Seed script populates all 10 phases and 90 day stubs
- [ ] `prisma studio` shows correct schema

**Edge cases:** Enum constraints, JSONB default values

---

### TASK-003: Authentication System
**Goal:** Implement complete auth: registration, login, email verification, Google OAuth, session management.

**Dependencies:** TASK-001, TASK-002

**Files/Components:**
- `app/api/auth/[...nextauth]/route.ts`
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `app/(auth)/verify-email/page.tsx`
- `app/(auth)/forgot-password/page.tsx`
- `lib/auth.ts`
- `components/auth/LoginForm.tsx`
- `components/auth/RegisterForm.tsx`

**Database changes:** `users` table, NextAuth session tables

**API changes:**
- `POST /api/auth/register`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

**UX requirements:**
- Clean, minimal auth forms (centered card layout)
- Password strength indicator on registration
- Clear error messages (not "something went wrong")
- Loading states on all form submissions
- Email verification prompt with resend option

**Acceptance criteria:**
- [ ] User can register with email + password
- [ ] Verification email sent on registration
- [ ] Unverified users cannot access curriculum
- [ ] User can log in with correct credentials
- [ ] Wrong credentials show specific error
- [ ] Session persists across browser refresh
- [ ] Logout clears session
- [ ] Forgot password flow sends reset email
- [ ] Reset password link expires after 1 hour
- [ ] Google OAuth login works
- [ ] Protected routes redirect to login if unauthenticated

**Edge cases:**
- Duplicate email registration
- Expired verification link
- Password reset for Google OAuth account (show OAuth prompt)

**Testing:** Registration → login → session → logout cycle. Auth guard on protected routes.

---

### TASK-004: Onboarding Flow
**Goal:** Post-registration onboarding: career goal selection, quick assessment, plan confirmation.

**Dependencies:** TASK-003

**Files/Components:**
- `app/onboarding/page.tsx`
- `components/onboarding/Step1CareerGoal.tsx`
- `components/onboarding/Step2Assessment.tsx`
- `components/onboarding/Step3PlanReady.tsx`
- `hooks/useOnboarding.ts`

**Database changes:** `profiles` table populated on completion

**API changes:** `POST /api/v1/me/onboarding`

**UX requirements:**
- Multi-step wizard (3 steps, progress indicator)
- Step 1: Choose career goal (3 cards: Data Analyst, BI Analyst, Business Analyst)
- Step 2: 5 quick assessment questions (MCQ, no wrong/right framing — "just so we know where you start")
- Step 3: "Your 90-day plan is ready" — show the 10 phases as a visual timeline, "Start Day 1" CTA
- Cannot skip onboarding (redirect if profile incomplete)

**Acceptance criteria:**
- [ ] New user always lands on onboarding first
- [ ] All 3 steps render correctly
- [ ] Career goal saved to profile
- [ ] Assessment answers stored (for analytics, not gates)
- [ ] Completing onboarding sets `start_date` and unlocks Day 1
- [ ] Cannot re-trigger onboarding if already completed

---

### TASK-005: Dashboard
**Goal:** Implement the main learner dashboard.

**Dependencies:** TASK-003, TASK-004

**Files/Components:**
- `app/dashboard/page.tsx`
- `components/dashboard/WelcomeCard.tsx`
- `components/dashboard/TodayCard.tsx`
- `components/dashboard/ProgressCard.tsx`
- `components/dashboard/SkillProgress.tsx`
- `components/dashboard/UpcomingLessons.tsx`
- `components/dashboard/RecentAchievements.tsx`
- `components/dashboard/StreakDisplay.tsx`

**API changes:** `GET /api/v1/me/progress`

**UX requirements:** See Section 12.2 for layout spec. Must answer "What should I do right now?" in under 3 seconds of looking.

**Acceptance criteria:**
- [ ] Dashboard loads with correct current day
- [ ] "Continue" button links to correct lesson
- [ ] Streak displayed accurately
- [ ] Skill progress cards show correct phases completed/total
- [ ] Upcoming lessons list shows next 3 days
- [ ] Recent achievements display (if any)
- [ ] Empty states handled (Day 1 user, zero streak)
- [ ] Responsive (mobile, tablet, desktop)

---

### TASK-006: Roadmap View
**Goal:** Visual 90-day roadmap showing all phases and days with status.

**Dependencies:** TASK-005

**Files/Components:**
- `app/roadmap/page.tsx`
- `components/roadmap/PhaseAccordion.tsx`
- `components/roadmap/DayCard.tsx`
- `components/roadmap/ProgressBar.tsx`

**API changes:** `GET /api/v1/curriculum`

**Acceptance criteria:**
- [ ] All 10 phases visible (expandable)
- [ ] All 90 days listed with correct status
- [ ] Locked days show padlock
- [ ] Completed days show checkmark + green
- [ ] In-progress days highlighted
- [ ] Clicking available day navigates to lesson
- [ ] Clicking locked day shows tooltip "Complete Day X first"

---

### TASK-007: Calendar View
**Goal:** Month-view calendar showing day status and access.

**Dependencies:** TASK-005

**Files/Components:**
- `app/calendar/page.tsx`
- `components/calendar/CalendarGrid.tsx`
- `components/calendar/DayCell.tsx`
- `components/calendar/CalendarLegend.tsx`

**API changes:** `GET /api/v1/progress/calendar`

**Acceptance criteria:**
- [ ] Calendar shows current month by default
- [ ] Navigation to previous/next month
- [ ] Day cells show status icons
- [ ] Phase color bands visible
- [ ] Click completed day → lesson review mode
- [ ] Click available day → lesson
- [ ] Click locked day → "Complete previous day first"
- [ ] Today highlighted
- [ ] Legend displayed

---

### TASK-008: Lesson Reader
**Goal:** Core lesson reading experience with all section type renderers.

**Dependencies:** TASK-006

**Files/Components:**
- `app/lessons/[day]/page.tsx`
- `components/lesson/LessonShell.tsx`
- `components/lesson/SectionNav.tsx`
- `components/lesson/LessonContent.tsx`
- `components/lesson/sections/ConceptSection.tsx`
- `components/lesson/sections/AnalogySection.tsx`
- `components/lesson/sections/BusinessExampleSection.tsx`
- `components/lesson/sections/CodeExampleSection.tsx`
- `components/lesson/sections/VisualSection.tsx`
- `components/lesson/sections/JobConnectionSection.tsx`
- `components/lesson/sections/CommonMistakesSection.tsx`
- `components/lesson/SectionProgress.tsx`
- `components/lesson/LessonHeader.tsx`
- `components/lesson/LessonFooter.tsx`

**API changes:** `GET /api/v1/days/:dayNumber/lesson`, `POST /api/v1/progress/lesson-read`

**Acceptance criteria:**
- [ ] All section types render correctly
- [ ] Section navigation sidebar works (click to jump)
- [ ] Scroll tracking updates progress (fires at 80% per section)
- [ ] Code blocks have syntax highlighting
- [ ] Runnable SQL code blocks show "Run in Playground" button
- [ ] Focused mode hides sidebar
- [ ] Previous/Next day navigation works
- [ ] Locked days redirect with message
- [ ] Reading progress stored server-side
- [ ] Responsive on mobile (sidebar collapses)

---

### TASK-009: Quiz Engine
**Goal:** Full quiz system with question types, scoring, attempts, and feedback.

**Dependencies:** TASK-008

**Files/Components:**
- `app/lessons/[day]/quiz/page.tsx`
- `components/quiz/QuizShell.tsx`
- `components/quiz/QuizQuestion.tsx`
- `components/quiz/questions/MCQQuestion.tsx`
- `components/quiz/questions/FillBlankQuestion.tsx`
- `components/quiz/questions/OrderingQuestion.tsx`
- `components/quiz/QuizResult.tsx`
- `components/quiz/QuizTimer.tsx` (optional)

**API changes:** `GET /api/v1/days/:dayNumber/quiz`, `POST /api/v1/progress/quiz-submit`

**Acceptance criteria:**
- [ ] Quiz renders all question types
- [ ] Questions shuffled each attempt
- [ ] Submit calculates score correctly
- [ ] Pass (≥70%) → congratulations + day progress updated
- [ ] Fail (< 70%) → attempt count shown, explanation per question shown
- [ ] After 3 fails → locked for 1 hour (next attempt timestamp shown)
- [ ] Correct/incorrect feedback per question shown after submission
- [ ] Explanation shown for each question after attempt
- [ ] Passing score stored in `user_progress`
- [ ] Best score preserved across retakes

---

### TASK-010: SQL Playground (DuckDB WASM)
**Goal:** Full SQL playground with DuckDB WASM, editor, schema browser, results table, and exercise validation.

**Dependencies:** TASK-001

**Files/Components:**
- `app/practice/sql/page.tsx`
- `components/sql/SQLPlayground.tsx`
- `components/sql/SQLEditor.tsx`
- `components/sql/SchemaPanel.tsx`
- `components/sql/ResultsTable.tsx`
- `components/sql/QueryHistory.tsx`
- `components/sql/DatasetSelector.tsx`
- `lib/duckdb-wasm.ts`

**API changes:** `GET /api/v1/playground/datasets/:ref`, `POST /api/v1/playground/sql/validate`

**Acceptance criteria:**
- [ ] DuckDB WASM loads in browser
- [ ] Dataset loads from CDN URL
- [ ] Query runs successfully
- [ ] Results displayed in paginated table
- [ ] SQL syntax errors displayed clearly (not raw error)
- [ ] Schema panel shows table + column names
- [ ] "Run" triggered by Ctrl+Enter or button
- [ ] Dataset selector switches datasets
- [ ] Reset button reloads original dataset
- [ ] Query history shows last 10 queries
- [ ] Download results as CSV works
- [ ] Exercise mode: validates result against expected
- [ ] Exercise mode: hint system works
- [ ] Exercise mode: shows solution after 3 hints
- [ ] WASM cached after first load

---

### TASK-011: Exercise System
**Goal:** Exercise rendering, submission, tracking, and validation for all exercise types.

**Dependencies:** TASK-010

**Files/Components:**
- `components/exercises/ExerciseContainer.tsx`
- `components/exercises/SQLExercise.tsx`
- `components/exercises/FillBlankExercise.tsx`
- `components/exercises/MCQExercise.tsx`
- `components/exercises/HintSystem.tsx`

**API changes:** `POST /api/v1/progress/exercise-submit`

**Acceptance criteria:**
- [ ] All exercise types render
- [ ] SQL exercise embedded playground works within lesson
- [ ] Hint system (max 3, progressive)
- [ ] "Show solution" after 3 hints
- [ ] Exercise completion tracked per user per exercise
- [ ] At least 1 exercise required for day completion

---

### TASK-012: Progress Engine
**Goal:** Server-side progress calculation, day completion criteria, locking, and streak.

**Dependencies:** TASK-009, TASK-011

**Files/Components:**
- `lib/progress-engine.ts`
- `app/api/v1/progress/day-complete/route.ts`
- `lib/streak.ts`

**API changes:** `POST /api/v1/progress/day-complete`

**Acceptance criteria:**
- [ ] Day complete only if all 4 criteria met
- [ ] Next day unlocks on day completion
- [ ] Streak increments on daily lesson progress
- [ ] Streak resets if no activity on a calendar day
- [ ] Missed days marked correctly
- [ ] Progress percentages calculated correctly
- [ ] Cannot bypass completion via direct URL navigation to locked day

---

### TASK-013: Mission System
**Goal:** Mission display, submission (SQL, text, file upload), and tracking.

**Dependencies:** TASK-010, TASK-012

**Files/Components:**
- `components/mission/MissionContainer.tsx`
- `components/mission/SQLMission.tsx`
- `components/mission/TextMission.tsx`
- `components/mission/FileUploadMission.tsx`
- `components/mission/ChecklistMission.tsx`
- `components/mission/MissionSubmitted.tsx`

**API changes:** `POST /api/v1/progress/mission-submit`, `POST /api/v1/upload/mission`

**Acceptance criteria:**
- [ ] Mission renders based on `type` field
- [ ] SQL mission: uses embedded playground, submits query text
- [ ] Text mission: rich text area, submits written response
- [ ] File upload: validates file type and size, stores in object storage
- [ ] Checklist mission: all items must be checked before submit
- [ ] Submission recorded in DB
- [ ] Can resubmit (best submission kept)
- [ ] Mission status shown on day card
- [ ] AI tutor button available with `hint_only` guardrail

---

### TASK-014: Python Playground (Pyodide)
**Goal:** Browser-based Python execution environment with Pandas/NumPy/Matplotlib support.

**Dependencies:** TASK-001

**Files/Components:**
- `app/practice/python/page.tsx`
- `components/python/PythonPlayground.tsx`
- `components/python/PythonEditor.tsx`
- `components/python/OutputPanel.tsx`
- `lib/pyodide-worker.ts`
- `public/pyodide-worker.js` (Web Worker)

**Acceptance criteria:**
- [ ] Pyodide loads in Web Worker
- [ ] Pandas/NumPy available after load
- [ ] Code executes successfully
- [ ] stdout displayed in output panel
- [ ] DataFrame displays as styled HTML table (first 20 rows)
- [ ] Matplotlib chart renders as image in output
- [ ] Error tracebacks displayed cleanly
- [ ] 30-second execution timeout kills runaway loops
- [ ] Pyodide cached in Service Worker
- [ ] Loading indicator shown during init

---

### TASK-015: Project System
**Goal:** Full project workspace for all 3 portfolio projects.

**Dependencies:** TASK-010, TASK-014, TASK-013

**Files/Components:**
- `app/projects/page.tsx`
- `app/projects/[id]/page.tsx`
- `components/projects/ProjectCard.tsx`
- `components/projects/ProjectWorkspace.tsx`
- `components/projects/ProjectOverview.tsx`
- `components/projects/ProjectDataset.tsx`
- `components/projects/ProjectTasks.tsx`
- `components/projects/ProjectSubmission.tsx`
- `components/projects/ProjectRubric.tsx`

**API changes:** `GET /api/v1/projects`, `GET /api/v1/projects/:id`, `POST /api/v1/projects/:id/submit`

**Acceptance criteria:**
- [ ] Project list shows all 3 projects with status
- [ ] Project workspace tabs all functional
- [ ] Dataset download works
- [ ] Task completion tracked
- [ ] SQL and Python playgrounds embedded in workspace
- [ ] File upload for Excel/PBI deliverables
- [ ] Written reflection required before final submission
- [ ] Rubric visible before submission
- [ ] Self-assessment score recorded
- [ ] Submitted projects marked as complete

---

### TASK-016: AI Tutor
**Goal:** Context-aware AI tutor with guardrails, quick actions, and chat panel.

**Dependencies:** TASK-003, TASK-008

**Files/Components:**
- `components/ai/AITutorPanel.tsx`
- `components/ai/AIChat.tsx`
- `components/ai/QuickActions.tsx`
- `app/api/v1/ai/ask/route.ts`
- `lib/ai-client.ts`
- `lib/ai-guardrails.ts`

**API changes:** `POST /api/v1/ai/ask`

**Acceptance criteria:**
- [ ] AI panel accessible from lesson page
- [ ] Quick action buttons ("Explain simpler", "Give example", "I'm stuck")
- [ ] Free chat with context injection
- [ ] Guardrail active during missions (hint only)
- [ ] Guardrail active during quiz (explain only)
- [ ] Rate limit: 30 messages/day enforced server-side
- [ ] Rate limit clearly communicated in UI
- [ ] AI never gives final mission answer
- [ ] Gemini API key never exposed to client
- [ ] All interactions logged to DB

---

### TASK-017: Job Launch System
**Goal:** Job readiness matrix, CV checklist, LinkedIn optimizer, interview prep, and job tracker.

**Dependencies:** TASK-012

**Files/Components:**
- `app/job-launch/page.tsx`
- `components/job/ReadinessMatrix.tsx`
- `components/job/CVChecklist.tsx`
- `components/job/LinkedInChecklist.tsx`
- `components/job/InterviewPrepBank.tsx`
- `components/job/JobTracker.tsx`
- `components/job/KanbanBoard.tsx`
- `components/job/ApplicationCard.tsx`

**API changes:** `GET /api/v1/jobs/readiness`, `GET /api/v1/jobs`, `POST /api/v1/jobs`, `PATCH /api/v1/jobs/:id`

**Acceptance criteria:**
- [ ] Readiness matrix shows correct level per skill
- [ ] CV checklist with progress
- [ ] LinkedIn checklist with progress
- [ ] Interview question bank (SQL, Excel, PBI, behavioral)
- [ ] STAR method template
- [ ] Job tracker Kanban works (drag + status change)
- [ ] Application cards with all fields
- [ ] Add/Edit/Delete applications
- [ ] Application stats (count, response rate)

---

### TASK-018: Notes & Bookmarks
**Goal:** In-lesson note-taking, text highlighting, and bookmark system.

**Dependencies:** TASK-008

**Files/Components:**
- `components/notes/NotePanel.tsx`
- `components/notes/NoteEditor.tsx`
- `components/notes/NoteList.tsx`
- `components/bookmarks/BookmarkButton.tsx`
- `app/notes/page.tsx`
- `app/bookmarks/page.tsx`

**API changes:** Notes and Bookmarks CRUD endpoints

**Acceptance criteria:**
- [ ] Note panel opens from lesson
- [ ] Notes saved with lesson context
- [ ] Notes searchable
- [ ] Bookmarks on lessons
- [ ] Bookmarks listed with lesson title
- [ ] Delete note/bookmark
- [ ] Notes and bookmarks persist across sessions

---

### TASK-019: Admin CMS
**Goal:** Admin panel for curriculum management, content editing, user management, and dataset management.

**Dependencies:** TASK-002

**Files/Components:**
- `app/admin/page.tsx`
- `app/admin/curriculum/page.tsx`
- `app/admin/curriculum/[dayId]/page.tsx`
- `app/admin/users/page.tsx`
- `app/admin/users/[userId]/page.tsx`
- `app/admin/datasets/page.tsx`
- `components/admin/LessonEditor.tsx`
- `components/admin/QuestionEditor.tsx`
- `components/admin/DatasetManager.tsx`
- `components/admin/UserTable.tsx`
- `middleware/adminGuard.ts`

**Acceptance criteria:**
- [ ] Admin role gate (non-admins cannot access /admin)
- [ ] Lesson editor with all section types editable
- [ ] Content status workflow (draft → published)
- [ ] Quiz question builder
- [ ] Dataset upload and preview
- [ ] User search and progress view
- [ ] Project submission review

---

### TASK-020: Analytics Event System
**Goal:** Track all learning events and populate admin analytics dashboard.

**Dependencies:** TASK-012

**Files/Components:**
- `lib/analytics.ts` (event tracking helpers)
- `app/admin/analytics/page.tsx`
- `components/admin/analytics/CompletionHeatmap.tsx`
- `components/admin/analytics/DropoffChart.tsx`
- `components/admin/analytics/QuizFailureTable.tsx`

**API changes:** `GET /api/v1/admin/analytics`

**Acceptance criteria:**
- [ ] Events tracked: lesson_started, section_read, quiz_submitted, exercise_submitted, mission_submitted, day_completed, streak_extended, ai_message_sent
- [ ] Admin analytics shows DAU chart
- [ ] Day completion heatmap
- [ ] Drop-off funnel visible
- [ ] Quiz failure rates by question

---

### TASK-021: Security Hardening
**Goal:** Apply all security measures: headers, rate limiting, file validation, API protection.

**Dependencies:** All API tasks

**Files/Components:**
- `middleware.ts` (Next.js middleware for auth + CORS + rate limit)
- `lib/rate-limit.ts`
- `lib/file-validator.ts`

**Acceptance criteria:**
- [ ] Helmet-equivalent headers applied
- [ ] Rate limits enforced per endpoint
- [ ] File upload MIME type validation
- [ ] File size limits enforced
- [ ] All inputs validated with Zod
- [ ] No raw SQL string interpolation anywhere
- [ ] AI API key not exposed in client bundle

---

### TASK-022: Performance Optimization
**Goal:** Achieve performance targets (LCP < 2.5s, CLS < 0.1).

**Dependencies:** All frontend tasks

**Acceptance criteria:**
- [ ] Lighthouse score ≥ 90 on lesson page
- [ ] DuckDB WASM cached in Service Worker
- [ ] Pyodide cached in Service Worker
- [ ] Fonts preloaded, no FOUT
- [ ] Images use `next/image`
- [ ] Code splitting verified (admin not in learner bundle)
- [ ] TanStack Query cache configured correctly

---

### TASK-023: Accessibility Audit
**Goal:** Meet WCAG 2.1 AA standard across all pages.

**Dependencies:** All frontend tasks

**Acceptance criteria:**
- [ ] axe DevTools passes with 0 critical/serious errors
- [ ] Keyboard-only navigation works throughout
- [ ] Screen reader (NVDA/JAWS) reads lesson content correctly
- [ ] All form inputs labeled
- [ ] Color contrast passes
- [ ] Focus indicators visible on all interactive elements
- [ ] Progress bars have correct ARIA attributes

---

### TASK-024: Testing Suite
**Goal:** Test coverage for critical paths.

**Dependencies:** All tasks

**Test types:**
- Unit: Progress engine calculation, quiz scoring, streak logic
- Integration: Auth flow, lesson read + quiz + mission = day complete
- E2E (Playwright): Registration → onboarding → Day 1 lesson → quiz → complete

**Acceptance criteria:**
- [ ] Progress engine unit tests: 100% coverage
- [ ] Auth flow integration tests pass
- [ ] Quiz scoring unit tests pass
- [ ] Streak logic unit tests pass
- [ ] E2E: full Day 1 completion flow passes
- [ ] E2E: SQL playground query execution passes

---

### TASK-025: Deployment & Production Setup
**Goal:** Deploy to production with monitoring and error tracking.

**Dependencies:** All tasks

**Components:**
- Vercel project configuration
- Supabase production database
- Environment variables configured
- Cloudflare CDN for datasets
- Sentry error tracking
- Uptime monitoring

**Acceptance criteria:**
- [ ] Application deployed to production URL
- [ ] Database connected and seeded
- [ ] All environment variables set
- [ ] Datasets accessible from CDN
- [ ] Email sending works (verification, reset)
- [ ] Error tracking active (Sentry)
- [ ] Uptime monitoring active

---

## 37. Acceptance Criteria (Master Summary)

### System-Level Acceptance Criteria

**Core Learning Loop:**
- [ ] User can register, verify email, and reach dashboard
- [ ] Dashboard correctly shows current day and streak
- [ ] Lesson opens for current day only (locked days blocked)
- [ ] Lesson progress tracked server-side
- [ ] Quiz can be taken and scored
- [ ] Exercise can be submitted
- [ ] Mission can be submitted
- [ ] Day marked complete only when all criteria met
- [ ] Next day unlocks on completion
- [ ] Streak increments daily

**SQL Playground:**
- [ ] DuckDB WASM executes real SQL
- [ ] Results table renders correctly
- [ ] Exercise validation works
- [ ] Errors displayed clearly

**Python Playground:**
- [ ] Pyodide executes Python
- [ ] Pandas DataFrames display
- [ ] Matplotlib renders
- [ ] Timeouts protect against infinite loops

**Project System:**
- [ ] All 3 projects accessible at correct phases
- [ ] Submission system works for all deliverable types
- [ ] Rubric displayed before submission

**Admin:**
- [ ] Lesson content editable without code change
- [ ] Published content visible to learners
- [ ] Draft content not visible to learners

---

## 38. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| DuckDB WASM load failure on some browsers | Medium | High | Fallback message + browser compatibility checker + async load with graceful degradation |
| Pyodide load time too slow (mobile 3G) | High | Medium | Show loading spinner + cache aggressively + allow skipping Python exercises on mobile |
| Content quality bottleneck (90 days of content) | High | Very High | Prioritize Days 1–30 for MVP; create content templates that non-engineers can fill; hire content writer |
| AI tutor overused / becomes a crutch | Medium | Medium | Hard rate limit (30/day), guardrails on missions, encourage use for understanding not answers |
| User drop-off before Day 7 | High | High | Strong Day 1–7 experience, push notifications (V2), email re-engagement sequence |
| File upload abuse | Low | High | File type + size validation, virus scan (V2), signed URLs only |
| Power BI mission validation is purely trust-based | High | Low | Clear rubric, screenshot review, V2 automated .pbix parsing |
| Database cost scaling | Low | Medium | Supabase free tier for beta; upgrade plan when MAU > 500 |
| AI cost overrun | Medium | Medium | Rate limit, monitor usage dashboard, switch to cheaper model if needed |
| MENA connectivity issues | Medium | High | Aggressive caching, CDN for all assets, no large uncompressed files |

---

## 39. Open Questions

> [!IMPORTANT]
> **Q1: Pricing model?**
> Is the platform free, subscription-based, or one-time purchase? This affects registration flow, feature gating, and the overall product conversation. Recommendation: Free for beta (first 100 users), then monthly subscription (~$15–$20/month or Egyptian market equivalent).

> [!IMPORTANT]
> **Q2: Who writes the curriculum content?**
> 90 days × ~1,500 words of lesson content + quizzes + exercises = significant content production. Is this AI-assisted, human-written, or a combination? Recommendation: Human expert writes Day 1–30 for MVP. AI-assisted drafts for Days 31–90 with human review.

> [!WARNING]
> **Q3: Arabic language?**
> Is an Arabic UI or Arabic-language content required for the MENA market initially, or is English acceptable for the MVP? This significantly affects development time.

> [!NOTE]
> **Q4: Self-paced or cohort-based?**
> Should Day 1 begin on registration date (self-paced) or should there be cohort start dates? MVP recommendation: Self-paced. Cohorts in V2.

> [!NOTE]
> **Q5: Mentor/human review for projects?**
> MVP has no human project review. Is this acceptable for launch? Recommendation: Yes for MVP — self-rubric + AI feedback is sufficient. Human mentors in V2.

> [!WARNING]
> **Q6: Data residency / privacy?**
> Any regulatory requirements for storing Egyptian/MENA user data (PDPL compliance)? Need to confirm before production.

> [!NOTE]
> **Q7: Pre-launch content requirement?**
> How much content must be fully authored before opening to users? Recommendation: Days 1–30 complete = sufficient for a 4-week beta. Day 31+ marked "Coming Soon" with timeline.

---

## 40. Recommended Next Step

Once this plan is approved, the recommended immediate next steps are:

1. **Resolve the 7 open questions** (pricing, content authoring plan, language, etc.)
2. **Approve the technical stack** (Next.js + Supabase + Prisma + DuckDB WASM + Pyodide + Gemini)
3. **Commission content authoring** — Days 1–30 should be written in parallel with development, not after
4. **Begin TASK-001** (Scaffold) and **TASK-002** (Database schema) immediately
5. **Commission dataset creation** — RetailCore and TelecomX datasets needed early (they affect SQL playground and project system)

The coding agent should be handed this document and instructed to follow the **Build Order** below.

---

## Build Order

The following is the precise, dependency-respecting order in which a coding agent should build Analyst.OS:

```
BUILD ORDER

[BLOCK 1 — Infrastructure]
1.  TASK-001  Project scaffold, TypeScript, Tailwind, CI/CD
2.  TASK-002  Database schema (all Prisma models + seed)

[BLOCK 2 — Auth & Identity]
3.  TASK-003  Authentication (register, login, session, OAuth)
4.  TASK-004  Onboarding flow

[BLOCK 3 — Core Navigation]
5.  TASK-005  Dashboard
6.  TASK-006  Roadmap view
7.  TASK-007  Calendar view

[BLOCK 4 — Lesson System]
8.  TASK-008  Lesson reader (all section types)
9.  TASK-009  Quiz engine

[BLOCK 5 — Interactive Tools]
10. TASK-010  SQL playground (DuckDB WASM)
11. TASK-014  Python playground (Pyodide)

[BLOCK 6 — Exercise & Mission]
12. TASK-011  Exercise system
13. TASK-013  Mission system (SQL, text, file upload)

[BLOCK 7 — Progress Engine]
14. TASK-012  Progress engine (completion, locking, streak)

[BLOCK 8 — Projects]
15. TASK-015  Project system (workspace, submission, rubric)

[BLOCK 9 — Supporting Features]
16. TASK-016  AI tutor (with guardrails)
17. TASK-017  Job launch system
18. TASK-018  Notes & bookmarks

[BLOCK 10 — Admin & Analytics]
19. TASK-019  Admin CMS
20. TASK-020  Analytics event system

[BLOCK 11 — Production Readiness]
21. TASK-021  Security hardening
22. TASK-022  Performance optimization
23. TASK-023  Accessibility audit
24. TASK-024  Testing suite
25. TASK-025  Deployment & production setup

[PARALLEL — Content]
P1. Author Days 1–30 curriculum in Admin CMS
P2. Create RetailCore dataset (CSV + SQL schema)
P3. Create TelecomX dataset (CSV)
P4. Design all quiz questions for Days 1–30
P5. Write all mission descriptions for Days 1–30
```

---

*End of Analyst.OS Planning Document*
*Status: PLANNING ONLY — Awaiting Approval*

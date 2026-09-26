import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ===== ANALYST.OS DESIGN SYSTEM =====
      colors: {
        // Backgrounds
        background: {
          DEFAULT: "#0F1117",   // Main dark background
          surface: "#1A1D27",   // Card / panel surface
          elevated: "#20243A",  // Elevated surface (modals, dropdowns)
          subtle: "#13161F",    // Subtle background variant
        },
        // Brand / Accent
        primary: {
          DEFAULT: "#6366F1",   // Indigo — primary accent
          hover: "#5457E5",
          muted: "#6366F120",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#22D3EE",   // Cyan — interactive / highlights
          hover: "#06B6D4",
          muted: "#22D3EE15",
          foreground: "#0F1117",
        },
        // Semantic colors
        success: {
          DEFAULT: "#10B981",   // Emerald
          muted: "#10B98115",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",   // Amber
          muted: "#F59E0B15",
          foreground: "#0F1117",
        },
        destructive: {
          DEFAULT: "#EF4444",   // Red
          muted: "#EF444415",
          foreground: "#FFFFFF",
        },
        // Text
        foreground: {
          DEFAULT: "#F8FAFC",   // Primary text
          secondary: "#94A3B8", // Secondary / muted text
          tertiary: "#64748B",  // Very muted text
          inverse: "#0F1117",   // On light backgrounds
        },
        // Borders
        border: {
          DEFAULT: "#2D3246",   // Default border
          subtle: "#1E2235",    // Subtle border
          strong: "#3D4266",    // Strong border
        },
        // Phase colors
        phase: {
          1: "#8B5CF6",   // Foundations — violet
          2: "#10B981",   // Excel — emerald
          3: "#3B82F6",   // SQL — blue
          4: "#F59E0B",   // Statistics — amber
          5: "#EC4899",   // Power BI — pink
          6: "#06B6D4",   // Python — cyan
          7: "#6366F1",   // Business Analysis — indigo
          8: "#F97316",   // Projects — orange
          9: "#84CC16",   // Job Prep — lime
          10: "#22D3EE",  // Job Launch — cyan
        },
      },
      // Typography
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
      },
      // Border radius
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
      },
      // Animations
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "progress-fill": "progressFill 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
      },
      // Spacing extras
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "sidebar": "16rem",
      },
      // Box shadows
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
        "glow-primary": "0 0 20px rgba(99,102,241,0.25)",
        "glow-success": "0 0 20px rgba(16,185,129,0.25)",
        "inner-sm": "inset 0 1px 2px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

# SentinelEd - AI-Powered Exam Proctoring System

## Migration Guide for Antigravity Workspace

This document contains all the source code required to migrate the SentinelEd proctoring system to a new workspace.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Dependencies](#dependencies)
3. [Core Files](#core-files)
   - [app/layout.tsx](#applayouttsx)
   - [app/globals.css](#appglobalscss)
   - [app/page.tsx](#apppagetsx)
   - [components/exam/student-exam-interface.tsx](#componentsexamstudent-exam-interfacetsx)
   - [components/dashboard/proctor-dashboard.tsx](#componentsdashboardproctor-dashboardtsx)
4. [Features Implemented](#features-implemented)
5. [Setup Instructions](#setup-instructions)

---

## Project Structure

```
sentineled/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── exam/
│   │   └── student-exam-interface.tsx
│   ├── dashboard/
│   │   └── proctor-dashboard.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       └── tabs.tsx
├── lib/
│   └── utils.ts
├── package.json
└── tsconfig.json
```

---

## Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.460.0",
    "recharts": "^2.15.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-progress": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "tailwindcss": "^4.0.0",
    "tw-animate-css": "^1.0.0"
  }
}
```

---

## Core Files

### app/layout.tsx

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SentinelEd - Secure AI Proctoring',
  description: 'AI-driven exam proctoring system for secure and fair online assessments',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

---

### app/globals.css

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.98 0.005 250);
  --foreground: oklch(0.15 0.02 250);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.02 250);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.02 250);
  --primary: oklch(0.35 0.1 250);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.95 0.01 250);
  --secondary-foreground: oklch(0.25 0.05 250);
  --muted: oklch(0.94 0.01 250);
  --muted-foreground: oklch(0.5 0.02 250);
  --accent: oklch(0.92 0.02 250);
  --accent-foreground: oklch(0.25 0.05 250);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.9 0.01 250);
  --input: oklch(0.9 0.01 250);
  --ring: oklch(0.45 0.12 250);
  --chart-1: oklch(0.55 0.18 145);
  --chart-2: oklch(0.65 0.15 45);
  --chart-3: oklch(0.55 0.22 25);
  --chart-4: oklch(0.45 0.12 250);
  --chart-5: oklch(0.6 0.1 200);
  --radius: 0.5rem;
  --sidebar: oklch(0.18 0.03 250);
  --sidebar-foreground: oklch(0.95 0.01 250);
  --sidebar-primary: oklch(0.55 0.18 145);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.25 0.04 250);
  --sidebar-accent-foreground: oklch(0.95 0.01 250);
  --sidebar-border: oklch(0.3 0.04 250);
  --sidebar-ring: oklch(0.55 0.18 145);
  
  /* Semantic colors for SentinelEd */
  --success: oklch(0.55 0.18 145);
  --success-foreground: oklch(0.98 0 0);
  --warning: oklch(0.75 0.15 85);
  --warning-foreground: oklch(0.25 0.05 85);
  --danger: oklch(0.55 0.22 25);
  --danger-foreground: oklch(0.98 0 0);
}

.dark {
  --background: oklch(0.12 0.02 250);
  --foreground: oklch(0.95 0.01 250);
  --card: oklch(0.16 0.025 250);
  --card-foreground: oklch(0.95 0.01 250);
  --popover: oklch(0.16 0.025 250);
  --popover-foreground: oklch(0.95 0.01 250);
  --primary: oklch(0.55 0.12 250);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.22 0.03 250);
  --secondary-foreground: oklch(0.9 0.01 250);
  --muted: oklch(0.2 0.025 250);
  --muted-foreground: oklch(0.6 0.02 250);
  --accent: oklch(0.25 0.035 250);
  --accent-foreground: oklch(0.95 0.01 250);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.28 0.03 250);
  --input: oklch(0.22 0.025 250);
  --ring: oklch(0.55 0.12 250);
  --chart-1: oklch(0.6 0.2 145);
  --chart-2: oklch(0.7 0.15 45);
  --chart-3: oklch(0.6 0.22 25);
  --chart-4: oklch(0.55 0.12 250);
  --chart-5: oklch(0.65 0.1 200);
  --sidebar: oklch(0.1 0.015 250);
  --sidebar-foreground: oklch(0.95 0.01 250);
  --sidebar-primary: oklch(0.6 0.2 145);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.2 0.03 250);
  --sidebar-accent-foreground: oklch(0.95 0.01 250);
  --sidebar-border: oklch(0.25 0.035 250);
  --sidebar-ring: oklch(0.6 0.2 145);
  
  /* Semantic colors for SentinelEd */
  --success: oklch(0.6 0.2 145);
  --success-foreground: oklch(0.98 0 0);
  --warning: oklch(0.75 0.15 85);
  --warning-foreground: oklch(0.2 0.05 85);
  --danger: oklch(0.6 0.22 25);
  --danger-foreground: oklch(0.98 0 0);
}

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

### app/page.tsx

```tsx
"use client"

import { useState } from "react"
import { 
  Shield, 
  GraduationCap, 
  Users, 
  Eye, 
  Camera, 
  Monitor, 
  BrainCircuit, 
  Lock,
  Zap,
  BarChart3,
  Mail,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Shuffle,
  Clock,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StudentExamInterface } from "@/components/exam/student-exam-interface"
import { ProctorDashboard } from "@/components/dashboard/proctor-dashboard"

type View = "home" | "student" | "proctor"

const features = [
  {
    icon: FileText,
    title: "API-Based Questions",
    description: "Questions fetched dynamically from secure API endpoints"
  },
  {
    icon: Shuffle,
    title: "Randomized Display",
    description: "Each student receives questions in random order"
  },
  {
    icon: Monitor,
    title: "Full Screen Mode",
    description: "Enforced fullscreen environment prevents distractions"
  },
  {
    icon: Eye,
    title: "Tab Detection",
    description: "Instant alerts when students switch browser tabs"
  },
  {
    icon: Clock,
    title: "Auto Submission",
    description: "Timer-based automatic exam submission"
  },
  {
    icon: BrainCircuit,
    title: "AI Cheating Detection",
    description: "ML-powered analysis of behavior patterns"
  },
  {
    icon: BarChart3,
    title: "Answer Analysis",
    description: "Real-time analysis and integrity scoring"
  },
  {
    icon: Camera,
    title: "Webcam Snapshots",
    description: "Periodic captures for visual verification"
  }
]

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home")

  if (currentView === "student") {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 z-50 bg-card shadow-lg border-border"
          onClick={() => setCurrentView("home")}
        >
          Exit Demo
        </Button>
        <StudentExamInterface />
      </div>
    )
  }

  if (currentView === "proctor") {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 z-50 bg-card shadow-lg border-border"
          onClick={() => setCurrentView("home")}
        >
          Exit Demo
        </Button>
        <ProctorDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">SentinelEd</span>
            <Badge variant="secondary" className="hidden sm:flex">v1.0 MVP</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">Documentation</Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">Support</Button>
            <Button size="sm" className="gap-2" onClick={() => setCurrentView("proctor")}>
              <Lock className="h-4 w-4" />
              Admin Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-80 h-80 bg-success/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6">
              <Zap className="h-4 w-4" />
              AI-Powered Exam Security
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Secure Online Exams with{" "}
              <span className="text-primary">AI Proctoring</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              SentinelEd uses advanced machine learning to ensure academic integrity through real-time monitoring, behavior analysis, and intelligent cheating detection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 h-12 px-8 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/20"
                onClick={() => setCurrentView("student")}
              >
                <GraduationCap className="h-5 w-5" />
                Try Student Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gap-2 h-12 px-8 text-base"
                onClick={() => setCurrentView("proctor")}
              >
                <Users className="h-5 w-5" />
                View Proctor Dashboard
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                99.9% Uptime
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                End-to-End Encrypted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Core Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              Complete Proctoring Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to conduct secure, fair online examinations at scale
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <Card key={idx} className="group hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Demo Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Student Interface Card */}
            <Card 
              className="group cursor-pointer transition-all hover:shadow-2xl hover:border-success/50 overflow-hidden"
              onClick={() => setCurrentView("student")}
            >
              {/* Preview Image */}
              <div className="aspect-video bg-gradient-to-br from-success/5 to-success/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap className="h-10 w-10 text-success" />
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/30">
                      Interactive Demo
                    </Badge>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 p-2 bg-card/90 rounded-lg shadow-lg flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Fullscreen Mode
                </div>
                <div className="absolute bottom-4 right-4 p-2 bg-card/90 rounded-lg shadow-lg flex items-center gap-2 text-xs">
                  <Camera className="h-3 w-3 text-muted-foreground" />
                  Webcam Active
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  Student Exam Interface
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-success transition-all" />
                </CardTitle>
                <CardDescription>
                  Experience the secure, distraction-free exam environment with fullscreen enforcement, webcam monitoring, and real-time AI alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">Fullscreen lock</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">Tab detection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">AI monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">Auto-submit</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-success hover:bg-success/90 text-success-foreground gap-2"
                >
                  Launch Student Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Proctor Dashboard Card */}
            <Card 
              className="group cursor-pointer transition-all hover:shadow-2xl hover:border-primary/50 overflow-hidden"
              onClick={() => setCurrentView("proctor")}
            >
              {/* Preview Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                      Admin Dashboard
                    </Badge>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 p-2 bg-card/90 rounded-lg shadow-lg flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                  3 Flagged
                </div>
                <div className="absolute bottom-4 right-4 p-2 bg-card/90 rounded-lg shadow-lg flex items-center gap-2 text-xs">
                  <BarChart3 className="h-3 w-3 text-muted-foreground" />
                  Live Analytics
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  Proctor Dashboard
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </CardTitle>
                <CardDescription>
                  Monitor all test-takers in real-time with AI-powered integrity scoring, analytics dashboard, and comprehensive event logging.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">Live grid view</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">Integrity scores</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">Event timeline</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">Email reports</span>
                  </div>
                </div>
                <Button className="w-full mt-6 gap-2">
                  Launch Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Email Notification Section */}
      <section className="py-16 border-t border-border bg-gradient-to-r from-primary/5 via-transparent to-success/5">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 p-3 bg-primary/10 rounded-full mb-6">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Automated Email Reports
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Results, integrity reports, and flagged incidents are automatically emailed to designated administrators upon exam completion.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm">
            <span className="text-muted-foreground">Reports sent to:</span>
            <span className="font-semibold text-foreground">Amitabha Mam HOD</span>
            <Badge variant="secondary">Configured</Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">SentinelEd</span>
              <span className="text-muted-foreground text-sm">• MVP Demo</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Built for academic integrity. All demo data is simulated.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

---

### components/exam/student-exam-interface.tsx

```tsx
"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { 
  Shield, 
  Clock, 
  Wifi, 
  AlertTriangle, 
  Eye, 
  Camera, 
  CheckCircle2,
  Maximize,
  X,
  Loader2,
  Monitor,
  EyeOff,
  BrainCircuit,
  Zap,
  Lock,
  AlertCircle,
  Send
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  text: string
  options: string[]
  category: string
}

// Mock API endpoint for questions
const fetchQuestionsFromAPI = async (): Promise<Question[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const questionBank: Question[] = [
    {
      id: 1,
      text: "Which of the following best describes the principle of separation of concerns in software architecture?",
      options: [
        "A design principle that separates a computer program into distinct sections",
        "A security protocol for isolating network segments",
        "A database normalization technique",
        "A method for distributing workload across servers"
      ],
      category: "Software Architecture"
    },
    {
      id: 2,
      text: "In the context of RESTful APIs, what does the term 'stateless' mean?",
      options: [
        "The server does not store any session information between requests",
        "The API cannot handle concurrent requests",
        "All data must be stored in a single database table",
        "The client must maintain a persistent connection"
      ],
      category: "Web Development"
    },
    {
      id: 3,
      text: "What is the primary purpose of a load balancer in a distributed system?",
      options: [
        "To distribute network traffic across multiple servers",
        "To compress data for faster transmission",
        "To encrypt all communications between services",
        "To cache frequently accessed data"
      ],
      category: "System Design"
    },
    {
      id: 4,
      text: "Which data structure would be most efficient for implementing a priority queue?",
      options: [
        "Binary Heap",
        "Linked List",
        "Array",
        "Hash Table"
      ],
      category: "Data Structures"
    },
    {
      id: 5,
      text: "What is the time complexity of binary search in a sorted array?",
      options: [
        "O(log n)",
        "O(n)",
        "O(n log n)",
        "O(1)"
      ],
      category: "Algorithms"
    },
    {
      id: 6,
      text: "In object-oriented programming, what is polymorphism?",
      options: [
        "The ability of objects of different types to respond to the same method call",
        "The process of hiding internal implementation details",
        "The ability to create new classes from existing ones",
        "The bundling of data with methods that operate on that data"
      ],
      category: "OOP Concepts"
    },
    {
      id: 7,
      text: "What is the purpose of an index in a database?",
      options: [
        "To speed up data retrieval operations",
        "To ensure data integrity",
        "To compress stored data",
        "To encrypt sensitive information"
      ],
      category: "Database"
    },
    {
      id: 8,
      text: "Which protocol operates at the transport layer of the OSI model?",
      options: [
        "TCP",
        "HTTP",
        "IP",
        "Ethernet"
      ],
      category: "Networking"
    }
  ]
  
  // Randomly shuffle and return questions
  return questionBank.sort(() => Math.random() - 0.5)
}

interface AlertNotification {
  id: number
  message: string
  type: "warning" | "danger" | "info"
  icon: React.ElementType
}

interface SecurityEvent {
  id: number
  type: string
  timestamp: Date
  severity: "low" | "medium" | "high"
}

export function StudentExamInterface() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(3600)
  const [alerts, setAlerts] = useState<AlertNotification[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true)
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const [webcamActive, setWebcamActive] = useState(false)
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [aiAnalysisStatus, setAiAnalysisStatus] = useState<"idle" | "analyzing" | "complete">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Fetch questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)
      try {
        const fetchedQuestions = await fetchQuestionsFromAPI()
        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error("Failed to load questions:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadQuestions()
  }, [])

  // Initialize webcam
  const initWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, facingMode: "user" },
        audio: false 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setWebcamActive(true)
      }
    } catch (err) {
      console.error("Webcam access denied:", err)
      addAlert("Camera access required for proctoring", "warning", Camera)
    }
  }, [])

  // Capture webcam snapshot
  const captureSnapshot = useCallback(() => {
    if (videoRef.current && canvasRef.current && webcamActive) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = 320
        canvasRef.current.height = 240
        context.drawImage(videoRef.current, 0, 0, 320, 240)
        // In production, this would be sent to backend for AI analysis
        setAiAnalysisStatus("analyzing")
        setTimeout(() => setAiAnalysisStatus("complete"), 2000)
      }
    }
  }, [webcamActive])

  // Periodic snapshots for AI analysis
  useEffect(() => {
    if (!webcamActive) return
    const interval = setInterval(captureSnapshot, 10000)
    return () => clearInterval(interval)
  }, [webcamActive, captureSnapshot])

  // Fullscreen API
  const enterFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
      setShowFullscreenPrompt(false)
      initWebcam()
    } catch (err) {
      console.error("Fullscreen failed:", err)
    }
  }, [initWebcam])

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement
      setIsFullscreen(isFs)
      if (!isFs && !showFullscreenPrompt && !examSubmitted) {
        addSecurityEvent("Exited fullscreen mode", "high")
        addAlert("Fullscreen mode exited. Please return to fullscreen.", "danger", Maximize)
        setShowFullscreenPrompt(true)
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [showFullscreenPrompt, examSubmitted])

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isFullscreen) {
        setTabSwitchCount(prev => prev + 1)
        addSecurityEvent("Tab switch detected", "high")
        addAlert("Tab switch detected! This has been logged.", "danger", EyeOff)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isFullscreen])

  // Countdown timer with auto-submit
  useEffect(() => {
    if (timeRemaining <= 0 && !examSubmitted) {
      handleSubmitExam()
      return
    }
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeRemaining, examSubmitted])

  // Timer warnings
  useEffect(() => {
    if (timeRemaining === 300) {
      addAlert("5 minutes remaining!", "warning", Clock)
    } else if (timeRemaining === 60) {
      addAlert("1 minute remaining! Exam will auto-submit.", "danger", Clock)
    }
  }, [timeRemaining])

  // Demo AI alerts
  useEffect(() => {
    if (!isFullscreen) return
    const alertTimer = setTimeout(() => {
      addAlert("AI detected slight gaze deviation. Please focus on screen.", "warning", Eye)
      addSecurityEvent("Gaze deviation detected", "medium")
    }, 8000)
    return () => clearTimeout(alertTimer)
  }, [isFullscreen])

  const addAlert = (message: string, type: "warning" | "danger" | "info", icon: React.ElementType) => {
    const newAlert: AlertNotification = { id: Date.now(), message, type, icon }
    setAlerts(prev => [newAlert, ...prev])
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== newAlert.id))
    }, 5000)
  }

  const addSecurityEvent = (type: string, severity: "low" | "medium" | "high") => {
    setSecurityEvents(prev => [...prev, { id: Date.now(), type, timestamp: new Date(), severity }])
  }

  const handleSubmitExam = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setExamSubmitted(true)
    setIsSubmitting(false)
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const answeredCount = Object.keys(answers).length
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <BrainCircuit className="absolute inset-0 m-auto h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading Exam</h2>
          <p className="text-muted-foreground">Fetching randomized questions from API...</p>
        </div>
      </div>
    )
  }

  // Fullscreen Prompt
  if (showFullscreenPrompt && !examSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-foreground/20 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">SentinelEd Proctoring</h1>
                  <p className="text-sm text-primary-foreground/80">Secure Exam Environment</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Before You Begin
              </h2>
              
              {/* Feature Cards */}
              <div className="grid gap-3 mb-6">
                <FeatureCard 
                  icon={Maximize} 
                  title="Full Screen Mode" 
                  description="Required for exam security"
                  status="required"
                />
                <FeatureCard 
                  icon={Camera} 
                  title="Webcam Access" 
                  description="AI monitoring for integrity"
                  status="required"
                />
                <FeatureCard 
                  icon={Monitor} 
                  title="Tab Detection" 
                  description="Switching tabs will be logged"
                  status="active"
                />
                <FeatureCard 
                  icon={BrainCircuit} 
                  title="AI Analysis" 
                  description="Real-time behavior monitoring"
                  status="active"
                />
              </div>

              {tabSwitchCount > 0 && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-danger" />
                  <span className="text-sm text-danger">Tab switches detected: {tabSwitchCount}</span>
                </div>
              )}

              <Button 
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg"
                onClick={enterFullscreen}
              >
                <Lock className="h-5 w-5 mr-2" />
                Enter Secure Exam Mode
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                By continuing, you agree to be monitored during this examination.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Exam Submitted State
  if (examSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-success/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Exam Submitted</h1>
          <p className="text-muted-foreground mb-6">
            Your answers have been securely submitted for review. Results will be emailed to your institution.
          </p>
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Questions Answered</p>
                <p className="text-xl font-bold text-foreground">{answeredCount}/{questions.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Security Events</p>
                <p className="text-xl font-bold text-foreground">{securityEvents.length}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Results will be emailed to Amitabha Mam HOD
          </p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Hidden canvas for snapshots */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Alert Notifications */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        {alerts.map(alert => {
          const Icon = alert.icon
          return (
            <div
              key={alert.id}
              className={cn(
                "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-sm animate-in slide-in-from-top-2 duration-300",
                alert.type === "warning" && "bg-warning/95 text-warning-foreground border-warning",
                alert.type === "danger" && "bg-danger/95 text-danger-foreground border-danger",
                alert.type === "info" && "bg-primary/95 text-primary-foreground border-primary"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="font-medium text-sm">{alert.message}</span>
            </div>
          )
        })}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Logo & Exam Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground hidden sm:inline">SentinelEd</span>
            </div>
            <div className="h-5 w-px bg-border hidden sm:block" />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">CS-401 Final Examination</p>
              <p className="text-xs text-muted-foreground">Randomized Question Set</p>
            </div>
          </div>

          {/* Timer */}
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
            timeRemaining < 300 
              ? "bg-danger/10 border border-danger/30" 
              : "bg-secondary"
          )}>
            <Clock className={cn(
              "h-5 w-5",
              timeRemaining < 300 ? "text-danger animate-pulse" : "text-muted-foreground"
            )} />
            <span className={cn(
              "font-mono text-lg font-bold",
              timeRemaining < 300 ? "text-danger" : "text-foreground"
            )}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="bg-success/10 text-success border-success/30 gap-1.5 hidden sm:flex"
            >
              <Wifi className="h-3.5 w-3.5" />
              Secure
            </Badge>
            {tabSwitchCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                {tabSwitchCount} Tab Switch{tabSwitchCount > 1 ? "es" : ""}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 lg:px-6 pb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>{answeredCount} of {questions.length} answered</span>
            <span>{Math.round(progressPercent)}% complete</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Question Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Question Navigation Pills */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm font-semibold transition-all shrink-0",
                    idx === currentQuestion
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                      : answers[idx] !== undefined
                        ? "bg-success/20 text-success border-2 border-success/30"
                        : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
              {/* Category Badge */}
              <div className="bg-gradient-to-r from-primary/5 to-transparent px-6 py-3 border-b border-border">
                <Badge variant="secondary" className="font-medium">
                  {question?.category}
                </Badge>
              </div>
              
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-4 mb-8">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-lg shrink-0">
                    {currentQuestion + 1}
                  </span>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground leading-relaxed text-pretty">
                    {question?.text}
                  </h2>
                </div>

                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onValueChange={(value) => setAnswers(prev => ({ ...prev, [currentQuestion]: value }))}
                  className="space-y-3"
                >
                  {question?.options.map((option, idx) => (
                    <div key={idx}>
                      <Label
                        htmlFor={`option-${idx}`}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          answers[currentQuestion] === option
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/30 hover:bg-accent/30"
                        )}
                      >
                        <RadioGroupItem
                          value={option}
                          id={`option-${idx}`}
                          className="mt-0.5"
                        />
                        <span className="text-sm lg:text-base text-foreground leading-relaxed">
                          {option}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button 
                  size="lg"
                  className="rounded-xl bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success/80 text-success-foreground shadow-lg"
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Exam
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="rounded-xl"
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Proctoring Panel */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card/50 backdrop-blur-sm p-4 lg:p-6">
          {/* Webcam Feed */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Live Camera</span>
              </div>
              {webcamActive && (
                <div className="flex items-center gap-1.5 text-success">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-xs font-medium">Active</span>
                </div>
              )}
            </div>
            <div className="aspect-video bg-muted rounded-xl overflow-hidden relative border border-border">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {!webcamActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">Initializing...</span>
                  </div>
                </div>
              )}
              {/* Recording indicator */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-danger/90 px-2 py-1 rounded-lg text-xs text-danger-foreground font-medium">
                <span className="w-2 h-2 bg-danger-foreground rounded-full animate-pulse" />
                REC
              </div>
              {/* AI Analysis indicator */}
              {aiAnalysisStatus === "analyzing" && (
                <div className="absolute bottom-2 left-2 right-2 bg-primary/90 px-2 py-1.5 rounded-lg flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary-foreground animate-pulse" />
                  <span className="text-xs text-primary-foreground font-medium">AI Analyzing...</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Monitoring Status */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">AI Monitoring</span>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Gaze Tracking</p>
                  <p className="text-xs text-success">Normal</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-card/50 rounded-lg p-2">
                  <p className="text-muted-foreground">Face Detection</p>
                  <p className="font-semibold text-success">Active</p>
                </div>
                <div className="bg-card/50 rounded-lg p-2">
                  <p className="text-muted-foreground">Audio Monitor</p>
                  <p className="font-semibold text-success">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">System Status</span>
            </div>
            <div className="space-y-2">
              <StatusItem label="Webcam Feed" status={webcamActive} />
              <StatusItem label="Network Connection" status={true} />
              <StatusItem label="Fullscreen Mode" status={isFullscreen} />
              <StatusItem label="AI Proctoring" status={true} />
            </div>
          </div>

          {/* Security Events */}
          {securityEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Security Log</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {securityEvents.slice(-3).reverse().map(event => (
                  <div 
                    key={event.id} 
                    className={cn(
                      "text-xs p-2 rounded-lg border-l-2",
                      event.severity === "high" && "bg-danger/5 border-danger",
                      event.severity === "medium" && "bg-warning/5 border-warning",
                      event.severity === "low" && "bg-muted border-muted-foreground"
                    )}
                  >
                    <p className="font-medium text-foreground">{event.type}</p>
                    <p className="text-muted-foreground">
                      {event.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  status 
}: { 
  icon: React.ElementType
  title: string
  description: string
  status: "required" | "active"
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
      <div className={cn(
        "p-2 rounded-lg",
        status === "required" ? "bg-primary/10" : "bg-success/10"
      )}>
        <Icon className={cn(
          "h-5 w-5",
          status === "required" ? "text-primary" : "text-success"
        )} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Badge 
        variant={status === "required" ? "default" : "secondary"}
        className="text-xs"
      >
        {status === "required" ? "Required" : "Active"}
      </Badge>
    </div>
  )
}

function StatusItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        {status ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-xs font-medium text-success">OK</span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4 text-danger" />
            <span className="text-xs font-medium text-danger">Error</span>
          </>
        )}
      </div>
    </div>
  )
}
```

---

### components/dashboard/proctor-dashboard.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Activity, 
  Camera,
  Search,
  LayoutGrid,
  List,
  Bell,
  Settings,
  LogOut,
  Eye,
  User,
  Clock,
  ChevronRight,
  BarChart3,
  FileText,
  TrendingUp,
  TrendingDown,
  Zap,
  BrainCircuit,
  Monitor,
  Wifi,
  Play,
  Pause,
  MoreVertical,
  Mail,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts"

interface Student {
  id: string
  name: string
  email: string
  integrityScore: number
  status: "active" | "flagged" | "completed" | "disconnected"
  examProgress: number
  tabSwitches: number
  gazeDeviations: number
  lastActivity: string
}

const sampleStudents: Student[] = [
  { id: "STU-001", name: "Emma Rodriguez", email: "emma.r@university.edu", integrityScore: 98, status: "active", examProgress: 75, tabSwitches: 0, gazeDeviations: 1, lastActivity: "Answered Q15" },
  { id: "STU-002", name: "John Doe", email: "john.d@university.edu", integrityScore: 52, status: "flagged", examProgress: 45, tabSwitches: 3, gazeDeviations: 8, lastActivity: "Tab switch detected" },
  { id: "STU-003", name: "Sarah Chen", email: "sarah.c@university.edu", integrityScore: 95, status: "active", examProgress: 60, tabSwitches: 0, gazeDeviations: 2, lastActivity: "Answered Q12" },
  { id: "STU-004", name: "Michael Brown", email: "michael.b@university.edu", integrityScore: 38, status: "flagged", examProgress: 30, tabSwitches: 5, gazeDeviations: 12, lastActivity: "Multiple faces detected" },
  { id: "STU-005", name: "Lisa Wang", email: "lisa.w@university.edu", integrityScore: 99, status: "completed", examProgress: 100, tabSwitches: 0, gazeDeviations: 0, lastActivity: "Exam submitted" },
  { id: "STU-006", name: "James Wilson", email: "james.w@university.edu", integrityScore: 87, status: "active", examProgress: 55, tabSwitches: 1, gazeDeviations: 3, lastActivity: "Answered Q11" },
  { id: "STU-007", name: "Emily Davis", email: "emily.d@university.edu", integrityScore: 94, status: "active", examProgress: 70, tabSwitches: 0, gazeDeviations: 1, lastActivity: "Answered Q14" },
  { id: "STU-008", name: "David Kim", email: "david.k@university.edu", integrityScore: 68, status: "flagged", examProgress: 40, tabSwitches: 2, gazeDeviations: 6, lastActivity: "Audio anomaly" },
  { id: "STU-009", name: "Anna Martinez", email: "anna.m@university.edu", integrityScore: 91, status: "active", examProgress: 65, tabSwitches: 0, gazeDeviations: 2, lastActivity: "Answered Q13" },
  { id: "STU-010", name: "Robert Taylor", email: "robert.t@university.edu", integrityScore: 0, status: "disconnected", examProgress: 20, tabSwitches: 0, gazeDeviations: 0, lastActivity: "Connection lost" },
]

interface EventLog {
  id: number
  time: string
  student: string
  event: string
  severity: "info" | "warning" | "danger"
  aiConfidence: number
}

const sampleEvents: EventLog[] = [
  { id: 1, time: "12:15 PM", student: "John Doe", event: "Multiple faces detected in frame", severity: "danger", aiConfidence: 94 },
  { id: 2, time: "12:14 PM", student: "Michael Brown", event: "Tab switch detected (3rd occurrence)", severity: "danger", aiConfidence: 100 },
  { id: 3, time: "12:12 PM", student: "David Kim", event: "Gaze deviation for 8 seconds", severity: "warning", aiConfidence: 87 },
  { id: 4, time: "12:10 PM", student: "John Doe", event: "Audio anomaly - possible voice detected", severity: "warning", aiConfidence: 76 },
  { id: 5, time: "12:08 PM", student: "Sarah Chen", event: "Exam resumed after brief disconnection", severity: "info", aiConfidence: 100 },
  { id: 6, time: "12:05 PM", student: "Emma Rodriguez", event: "Completed Section 2 with 100% answers", severity: "info", aiConfidence: 100 },
  { id: 7, time: "12:03 PM", student: "Michael Brown", event: "Face not visible in frame for 5 seconds", severity: "danger", aiConfidence: 92 },
  { id: 8, time: "12:00 PM", student: "All Students", event: "Exam session started - 10 participants", severity: "info", aiConfidence: 100 },
]

// Analytics data
const integrityTrendData = [
  { time: "12:00", avgScore: 95 },
  { time: "12:05", avgScore: 93 },
  { time: "12:10", avgScore: 89 },
  { time: "12:15", avgScore: 85 },
  { time: "12:20", avgScore: 82 },
  { time: "12:25", avgScore: 80 },
]

const violationTypeData = [
  { name: "Tab Switches", value: 11, color: "hsl(var(--chart-3))" },
  { name: "Gaze Deviation", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Multiple Faces", value: 3, color: "hsl(var(--danger))" },
  { name: "Audio Anomaly", value: 8, color: "hsl(var(--chart-4))" },
]

const progressDistribution = [
  { range: "0-25%", count: 1 },
  { range: "26-50%", count: 3 },
  { range: "51-75%", count: 4 },
  { range: "76-100%", count: 2 },
]

export function ProctorDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "flagged" | "active">("all")
  const [isLive, setIsLive] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredStudents = sampleStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "flagged" && s.status === "flagged") ||
                         (filterStatus === "active" && s.status === "active")
    return matchesSearch && matchesFilter
  })

  const activeSessions = sampleStudents.filter(s => s.status === "active").length
  const flaggedCount = sampleStudents.filter(s => s.status === "flagged").length
  const completedCount = sampleStudents.filter(s => s.status === "completed").length
  const avgIntegrity = Math.round(sampleStudents.reduce((a, b) => a + b.integrityScore, 0) / sampleStudents.length)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-sidebar-border">
          <div className="p-2 bg-sidebar-primary/20 rounded-lg">
            <Shield className="h-6 w-6 text-sidebar-primary" />
          </div>
          <div>
            <span className="font-bold text-sidebar-foreground">SentinelEd</span>
            <Badge variant="outline" className="ml-2 text-[10px] border-sidebar-border text-sidebar-foreground/70">
              Admin
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={LayoutGrid} label="Live Dashboard" active />
          <NavItem icon={Users} label="All Students" />
          <NavItem icon={FileText} label="Exam Library" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={BrainCircuit} label="AI Settings" />
          <NavItem icon={Bell} label="Alert Center" badge={flaggedCount} />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        {/* Quick Stats */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 mb-3 font-medium">QUICK STATS</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground/80">Online</span>
              <span className="text-sm font-semibold text-sidebar-primary">{activeSessions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground/80">Flagged</span>
              <span className="text-sm font-semibold text-danger">{flaggedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground/80">Completed</span>
              <span className="text-sm font-semibold text-success">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 flex items-center justify-center">
              <span className="text-sm font-bold text-sidebar-primary-foreground">AS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">Amitabha Mam</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">HOD - Proctor Admin</p>
            </div>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <div className="lg:hidden flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold">SentinelEd</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Live Proctoring</h1>
                {isLive && (
                  <span className="flex items-center gap-1.5 text-success text-xs font-medium">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">CS-401 Final Examination - {currentTime.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant={isLive ? "default" : "outline"} 
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="gap-2"
            >
              {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isLive ? "Pause" : "Resume"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-danger-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {flaggedCount}
              </span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="monitoring" className="flex-1 flex flex-col">
            <div className="border-b border-border px-4 lg:px-6">
              <TabsList className="h-12 bg-transparent gap-4">
                <TabsTrigger value="monitoring" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2">
                  <Monitor className="h-4 w-4" />
                  Live Monitoring
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="ai-insights" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2">
                  <BrainCircuit className="h-4 w-4" />
                  AI Insights
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monitoring" className="flex-1 overflow-hidden flex flex-col lg:flex-row m-0">
              {/* Main Grid Area */}
              <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <MetricCard
                    title="Active Sessions"
                    value={activeSessions}
                    icon={Users}
                    trend={{ value: 2, direction: "up" }}
                    color="primary"
                  />
                  <MetricCard
                    title="Flagged Students"
                    value={flaggedCount}
                    icon={AlertTriangle}
                    trend={{ value: 1, direction: "up" }}
                    color="danger"
                  />
                  <MetricCard
                    title="Avg Integrity"
                    value={`${avgIntegrity}%`}
                    icon={Shield}
                    trend={{ value: 3, direction: "down" }}
                    color="warning"
                  />
                  <MetricCard
                    title="AI Uptime"
                    value="99.9%"
                    icon={Zap}
                    trend={{ value: 0, direction: "up" }}
                    color="success"
                  />
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-foreground">Test-Takers</h2>
                    <Badge variant="secondary">{filteredStudents.length}</Badge>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search students..." 
                        className="pl-9 bg-secondary border-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                          All Students
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                          Active Only
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("flagged")}>
                          Flagged Only
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex border border-border rounded-lg overflow-hidden">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        className="rounded-none"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        className="rounded-none"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Student Grid */}
                <div className={cn(
                  "grid gap-4",
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" 
                    : "grid-cols-1"
                )}>
                  {filteredStudents.map(student => (
                    <StudentCard 
                      key={student.id} 
                      student={student} 
                      viewMode={viewMode}
                      isSelected={selectedStudent === student.id}
                      onSelect={() => setSelectedStudent(student.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Event Feed Sidebar */}
              <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-card/50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground">AI Event Feed</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs gap-1">
                        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                        Live
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Real-time AI-powered telemetry</p>
                </div>
                <ScrollArea className="h-[400px] lg:h-[calc(100vh-280px)]">
                  <div className="p-4 space-y-3">
                    {sampleEvents.map(event => (
                      <EventItem key={event.id} event={event} />
                    ))}
                  </div>
                </ScrollArea>
              </aside>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 overflow-y-auto m-0 p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Integrity Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Average Integrity Score Trend</CardTitle>
                    <CardDescription>Real-time integrity monitoring across all students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={integrityTrendData}>
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--card))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="avgScore" 
                            stroke="hsl(var(--primary))" 
                            fillOpacity={1} 
                            fill="url(#colorScore)" 
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Violation Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AI Detection Breakdown</CardTitle>
                    <CardDescription>Types of integrity violations detected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={violationTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {violationTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--card))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {violationTypeData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="font-semibold ml-auto">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Exam Progress Distribution</CardTitle>
                    <CardDescription>How far students have progressed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={progressDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--card))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">System Health</CardTitle>
                    <CardDescription>AI proctoring system status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <SystemHealthItem label="AI Gaze Detection" status="operational" latency="23ms" />
                    <SystemHealthItem label="Face Recognition" status="operational" latency="45ms" />
                    <SystemHealthItem label="Audio Analysis" status="operational" latency="67ms" />
                    <SystemHealthItem label="Tab Detection" status="operational" latency="12ms" />
                    <SystemHealthItem label="Answer Analysis" status="operational" latency="156ms" />
                    <SystemHealthItem label="Email Notifications" status="operational" latency="89ms" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-insights" className="flex-1 overflow-y-auto m-0 p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Confidence Overview */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                      AI Detection Confidence
                    </CardTitle>
                    <CardDescription>Machine learning model confidence scores for recent detections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleEvents.slice(0, 5).map(event => (
                        <div key={event.id} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{event.event}</p>
                            <p className="text-xs text-muted-foreground">{event.student} - {event.time}</p>
                          </div>
                          <div className="w-32">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Confidence</span>
                              <span className={cn(
                                "font-semibold",
                                event.aiConfidence >= 90 ? "text-success" : 
                                event.aiConfidence >= 70 ? "text-warning" : "text-muted-foreground"
                              )}>{event.aiConfidence}%</span>
                            </div>
                            <Progress value={event.aiConfidence} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>AI Features</CardTitle>
                    <CardDescription>Active detection systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <AIFeatureItem 
                      icon={Eye} 
                      title="Gaze Tracking" 
                      description="Monitors eye movement patterns"
                      active 
                    />
                    <AIFeatureItem 
                      icon={Users} 
                      title="Face Detection" 
                      description="Detects multiple faces"
                      active 
                    />
                    <AIFeatureItem 
                      icon={Activity} 
                      title="Audio Analysis" 
                      description="Detects voice anomalies"
                      active 
                    />
                    <AIFeatureItem 
                      icon={Monitor} 
                      title="Tab Detection" 
                      description="Monitors browser focus"
                      active 
                    />
                    <AIFeatureItem 
                      icon={FileText} 
                      title="Answer Analysis" 
                      description="Plagiarism detection"
                      active 
                    />
                    <AIFeatureItem 
                      icon={Camera} 
                      title="Webcam Snapshots" 
                      description="Periodic captures"
                      active 
                    />
                  </CardContent>
                </Card>

                {/* Email Notifications */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          Email Notifications
                        </CardTitle>
                        <CardDescription>Results and alerts sent to Amitabha Mam HOD</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Send Test Email
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
                        <CheckCircle2 className="h-8 w-8 text-success mb-2" />
                        <p className="font-semibold text-foreground">Exam Completion</p>
                        <p className="text-sm text-muted-foreground">Auto-sent when all students finish</p>
                      </div>
                      <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl">
                        <AlertTriangle className="h-8 w-8 text-warning mb-2" />
                        <p className="font-semibold text-foreground">Flag Alerts</p>
                        <p className="text-sm text-muted-foreground">Instant alerts for critical flags</p>
                      </div>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <FileText className="h-8 w-8 text-primary mb-2" />
                        <p className="font-semibold text-foreground">Result Report</p>
                        <p className="text-sm text-muted-foreground">Detailed PDF with analytics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function NavItem({ 
  icon: Icon, 
  label, 
  active = false, 
  badge 
}: { 
  icon: React.ElementType
  label: string
  active?: boolean
  badge?: number 
}) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span className="w-6 h-6 rounded-full bg-danger text-danger-foreground text-xs flex items-center justify-center font-semibold">
          {badge}
        </span>
      )}
    </button>
  )
}

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color
}: {
  title: string
  value: string | number
  icon: React.ElementType
  trend: { value: number; direction: "up" | "down" }
  color: "primary" | "danger" | "success" | "warning"
}) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    danger: "text-danger bg-danger/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10"
  }

  return (
    <Card className="py-4 hover:shadow-lg transition-shadow">
      <CardContent className="px-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            {trend.value > 0 && (
              <div className={cn(
                "flex items-center gap-1 text-xs mt-1",
                trend.direction === "up" ? "text-success" : "text-danger"
              )}>
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{trend.value} this hour</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", colorClasses[color])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StudentCard({ 
  student, 
  viewMode,
  isSelected,
  onSelect
}: { 
  student: Student
  viewMode: "grid" | "list"
  isSelected: boolean
  onSelect: () => void
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-danger"
  }

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return "stroke-success"
    if (score >= 60) return "stroke-warning"
    return "stroke-danger"
  }

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="text-success border-success/30 bg-success/5">Active</Badge>
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>
      case "completed":
        return <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">Completed</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
    }
  }

  const circumference = 2 * Math.PI * 18
  const strokeDashoffset = circumference - (student.integrityScore / 100) * circumference

  if (viewMode === "list") {
    return (
      <Card 
        className={cn(
          "py-3 cursor-pointer transition-all hover:shadow-md",
          isSelected && "ring-2 ring-primary",
          student.status === "flagged" && "border-danger/30 bg-danger/5"
        )}
        onClick={onSelect}
      >
        <CardContent className="px-4">
          <div className="flex items-center gap-4">
            {/* Video Thumbnail */}
            <div className="w-20 h-14 bg-muted rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
              <Camera className="h-5 w-5 text-muted-foreground" />
              {student.status === "active" && (
                <span className="absolute top-1 left-1 w-2 h-2 bg-success rounded-full animate-pulse" />
              )}
            </div>
            
            {/* Student Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground truncate">{student.name}</span>
                {getStatusBadge(student.status)}
              </div>
              <p className="text-xs text-muted-foreground">{student.id} - {student.email}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{student.lastActivity}</p>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Tab Switches</p>
                <p className={cn("font-semibold", student.tabSwitches > 0 ? "text-danger" : "text-foreground")}>{student.tabSwitches}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Gaze Issues</p>
                <p className={cn("font-semibold", student.gazeDeviations > 5 ? "text-danger" : "text-foreground")}>{student.gazeDeviations}</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className={cn("text-xl font-bold", getScoreColor(student.integrityScore))}>
                  {student.integrityScore}%
                </span>
                <p className="text-xs text-muted-foreground">Integrity</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg group",
        isSelected && "ring-2 ring-primary",
        student.status === "flagged" && "border-danger/30"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        {/* Video Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl mb-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-card/80 flex items-center justify-center">
              <Camera className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          {/* Live indicator */}
          {student.status === "active" && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-danger/90 px-2 py-1 rounded-lg text-[10px] text-danger-foreground font-semibold">
              <span className="w-1.5 h-1.5 bg-danger-foreground rounded-full animate-pulse" />
              LIVE
            </div>
          )}
          {student.status === "flagged" && (
            <div className="absolute top-2 right-2 p-1.5 bg-danger rounded-lg">
              <AlertTriangle className="h-4 w-4 text-danger-foreground" />
            </div>
          )}
          {student.status === "completed" && (
            <div className="absolute top-2 right-2 p-1.5 bg-success rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-success-foreground" />
            </div>
          )}
          {/* Actions overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button size="sm" variant="secondary" className="shadow-lg">
              View Details
            </Button>
          </div>
        </div>

        {/* Student Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-foreground truncate">{student.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{student.id}</span>
          </div>

          {/* Integrity Score Ring */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-muted"
              />
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                className={getScoreRingColor(student.integrityScore)}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  transition: "stroke-dashoffset 0.5s ease"
                }}
              />
            </svg>
            <span className={cn(
              "absolute inset-0 flex items-center justify-center text-xs font-bold",
              getScoreColor(student.integrityScore)
            )}>
              {student.integrityScore}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-secondary/50 rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground">Tab Switches</p>
            <p className={cn("font-semibold text-sm", student.tabSwitches > 0 ? "text-danger" : "text-foreground")}>{student.tabSwitches}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground">Gaze Issues</p>
            <p className={cn("font-semibold text-sm", student.gazeDeviations > 5 ? "text-danger" : "text-foreground")}>{student.gazeDeviations}</p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Exam Progress</span>
            <span className="font-semibold text-foreground">{student.examProgress}%</span>
          </div>
          <Progress value={student.examProgress} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  )
}

function EventItem({ event }: { event: EventLog }) {
  const severityStyles = {
    info: "border-l-primary bg-primary/5",
    warning: "border-l-warning bg-warning/5",
    danger: "border-l-danger bg-danger/5"
  }

  const severityIcons = {
    info: Eye,
    warning: AlertTriangle,
    danger: XCircle
  }

  const Icon = severityIcons[event.severity]

  return (
    <div className={cn(
      "p-3 rounded-xl border-l-4 transition-all hover:shadow-md",
      severityStyles[event.severity]
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-1.5 rounded-lg shrink-0",
          event.severity === "info" && "bg-primary/10",
          event.severity === "warning" && "bg-warning/10",
          event.severity === "danger" && "bg-danger/10"
        )}>
          <Icon className={cn(
            "h-4 w-4",
            event.severity === "info" && "text-primary",
            event.severity === "warning" && "text-warning",
            event.severity === "danger" && "text-danger"
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug">{event.event}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{event.time}</span>
            </div>
            <span className="text-xs text-muted-foreground">-</span>
            <span className="text-xs font-medium text-foreground">{event.student}</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 ml-auto">
              AI {event.aiConfidence}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

function SystemHealthItem({ label, status, latency }: { label: string; status: string; latency: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{latency}</span>
        <Badge variant="outline" className="text-success border-success/30 text-xs">
          {status}
        </Badge>
      </div>
    </div>
  )
}

function AIFeatureItem({ 
  icon: Icon, 
  title, 
  description, 
  active 
}: { 
  icon: React.ElementType
  title: string
  description: string
  active: boolean 
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
      <div className={cn(
        "p-2 rounded-lg",
        active ? "bg-success/10" : "bg-muted"
      )}>
        <Icon className={cn("h-4 w-4", active ? "text-success" : "text-muted-foreground")} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {active && (
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
      )}
    </div>
  )
}
```

---

## Features Implemented

### Student Exam Interface
- API-based question fetching with loading states
- Randomized question display
- Full screen enforcement with secure entry prompt
- Tab switch detection with violation counting
- Timer-based auto-submission with warnings (5 min, 1 min)
- Live webcam integration with periodic AI analysis snapshots
- Security event logging visible to the student
- Modern gradient backgrounds, rounded cards, and smooth animations

### Proctor Dashboard
- Three tabs: Live Monitoring, Analytics, and AI Insights
- Real-time student grid with integrity score rings
- Analytics charts (Recharts) showing integrity trends, violation breakdowns, and progress distribution
- AI feature status panel showing all detection systems
- Email notification configuration showing results sent to "Amitabha Mam HOD"
- System health monitoring with latency indicators
- Event feed with AI confidence scores

### Landing Page
- Hero section with gradient backgrounds and trust indicators
- Feature grid showcasing all 8 core features
- Interactive demo cards for both student and proctor views
- Email reporting section highlighting automated reports

---

## Setup Instructions

1. Create a new Next.js project:
   ```bash
   npx create-next-app@latest sentineled --typescript --tailwind --eslint
   cd sentineled
   ```

2. Install dependencies:
   ```bash
   npm install lucide-react recharts @radix-ui/react-radio-group @radix-ui/react-tabs @radix-ui/react-scroll-area @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-progress class-variance-authority clsx tailwind-merge tw-animate-css
   ```

3. Set up shadcn/ui:
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add badge button card dropdown-menu input label progress radio-group scroll-area tabs
   ```

4. Copy the files from this document into their respective locations

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## Notes

- This is an MVP demonstration with mock data
- The webcam and AI analysis features are simulated
- For production, connect to real APIs for questions and AI backend services
- Email notifications are configured but require backend integration

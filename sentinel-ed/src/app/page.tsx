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
  FileText,
  KeyRound
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StudentExamInterface } from "@/components/exam/student-exam-interface"
import { ProctorDashboard } from "@/components/dashboard/proctor-dashboard"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"

type View = "home" | "student" | "proctor" | "login"

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
  const [targetView, setTargetView] = useState<"student" | "proctor" | null>(null)
  const [password, setPassword] = useState("")
  const [studentId, setStudentId] = useState("")
  const [loginError, setLoginError] = useState(false)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (targetView === "student" && password === "student" && studentId.length > 2) {
      if (typeof window !== "undefined") {
        localStorage.setItem("sentinelStudentId", studentId)
      }
      setCurrentView("student")
      setPassword("")
      setLoginError(false)
      toast.success(`Successfully authenticated as ${studentId}`)
    } else if (targetView === "proctor" && password === "admin") {
      setCurrentView("proctor")
      setPassword("")
      setLoginError(false)
      toast.success("Successfully authenticated as Admin Proctor")
    } else {
      setLoginError(true)
      toast.error("Invalid credentials. Please try again.")
    }
  }

  const navigateToLogin = (role: "student" | "proctor") => {
    setTargetView(role)
    setCurrentView("login")
    setPassword("")
    setLoginError(false)
  }

  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-border shadow-2xl overflow-hidden glassmorphism-heavy">
            <div className={`p-6 text-white relative overflow-hidden bg-gradient-to-r ${targetView === "proctor" ? "from-primary to-primary/80" : "from-success to-success/80"}`}>
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  {targetView === "proctor" ? <Shield className="h-6 w-6" /> : <GraduationCap className="h-6 w-6" />}
                </div>
                <div>
                  <h1 className="text-xl font-bold">{targetView === "proctor" ? "Proctor Portal" : "Student Examination Login"}</h1>
                  <p className="text-sm opacity-90">Secure Authentication Required</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                
                {targetView === "student" && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground mb-1">
                      Student ID Number
                    </p>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="text" 
                        placeholder="e.g. STU-1002"
                        className="pl-10 h-12 text-base rounded-xl"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Enter your {targetView === "proctor" ? "Administrator" : "Student"} Password
                  </p>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="Password"
                      className={`pl-10 h-12 text-base rounded-xl ${loginError ? "border-danger focus-visible:ring-danger" : ""}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus={targetView === "proctor"}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {targetView === "proctor" ? "Hint: use password 'admin'" : "Hint: use password 'student'"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="w-full h-12 rounded-xl" onClick={() => setCurrentView("home")}>
                    Cancel
                  </Button>
                  <Button type="submit" className={`w-full h-12 rounded-xl text-white ${targetView === "proctor" ? "bg-primary hover:bg-primary/90" : "bg-success hover:bg-success/90"}`}>
                    Authenticate
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (currentView === "student") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 z-50 bg-card shadow-lg border-border"
          onClick={() => setCurrentView("home")}
        >
          Exit Demo
        </Button>
        <StudentExamInterface />
      </motion.div>
    )
  }

  if (currentView === "proctor") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 z-50 bg-card shadow-lg border-border"
          onClick={() => setCurrentView("home")}
        >
          Exit Demo
        </Button>
        <ProctorDashboard />
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
    >
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
            <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => {
              toast.info("SentinelEd Documentation", { description: "API and implementation docs are coming soon in v1.1" })
            }}>Documentation</Button>
            <Button size="sm" className="gap-2" onClick={() => navigateToLogin("proctor")}>
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
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute top-60 -left-40 w-80 h-80 bg-success/10 rounded-full blur-3xl" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 relative">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-center"
          >
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
                className="w-full sm:w-auto gap-2 h-12 px-8 text-base bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success/80 shadow-lg shadow-success/20 text-white"
                onClick={() => navigateToLogin("student")}
              >
                <GraduationCap className="h-5 w-5" />
                Try Student Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gap-2 h-12 px-8 text-base"
                onClick={() => navigateToLogin("proctor")}
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
          </motion.div>
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
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Demo Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Student Interface Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer transition-all hover:shadow-2xl hover:border-success/50 overflow-hidden"
                onClick={() => navigateToLogin("student")}
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
            </motion.div>

            {/* Proctor Dashboard Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer transition-all hover:shadow-2xl hover:border-primary/50 overflow-hidden"
                onClick={() => navigateToLogin("proctor")}
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
            </motion.div>
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
    </motion.div>
  )
}

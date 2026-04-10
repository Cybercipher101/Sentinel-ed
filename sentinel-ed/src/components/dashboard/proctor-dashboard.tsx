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
import { motion, AnimatePresence } from "framer-motion"
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
    <div className="min-h-[100vh] bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-sidebar border-r border-sidebar-border shadow-xl z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-sidebar-border bg-sidebar/50 backdrop-blur">
          <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-lg text-sidebar-foreground">SentinelEd</span>
            <Badge variant="outline" className="ml-2 text-[10px] border-sidebar-border/50 text-sidebar-foreground/70 bg-sidebar-accent">
              Proctor View
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <NavItem icon={LayoutGrid} label="Live Dashboard" active />
          <NavItem icon={Users} label="All Students" />
          <NavItem icon={FileText} label="Exam Library" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={BrainCircuit} label="AI Settings" />
          <NavItem icon={Bell} label="Alert Center" badge={flaggedCount} />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        {/* Quick Stats */}
        <div className="p-6 border-t border-sidebar-border bg-sidebar-accent/30 m-4 rounded-2xl">
          <p className="text-[10px] text-sidebar-foreground/60 mb-3 font-bold tracking-widest uppercase">Quick Statistics</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sidebar-foreground/80">Online Users</span>
              <span className="text-sm font-bold text-sidebar-primary">{activeSessions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sidebar-foreground/80">Violations</span>
              <span className="text-sm font-bold text-danger bg-danger/10 px-2 py-0.5 rounded text-center">{flaggedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sidebar-foreground/80">Completed</span>
              <span className="text-sm font-bold text-success">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-5 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-primary-foreground">AM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-sidebar-foreground truncate">Amitabha Mam</p>
              <p className="text-xs text-sidebar-foreground/60 truncate font-medium">Head of Dept.</p>
            </div>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground/60 hover:text-danger hover:bg-danger/10 transition-colors">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 z-10 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="lg:hidden flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
                {isLive && (
                  <Badge variant="outline" className="border-success/30 text-success bg-success/10 gap-1.5 px-2 py-0.5">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    LIVE TELEMETRY
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-medium mt-1">CS-401 Final Examination • Active Monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl font-mono text-sm shadow-inner border border-border">
              <Clock className="w-4 h-4 text-muted-foreground" />
              {currentTime.toLocaleTimeString()}
            </div>
            <Button 
              variant={isLive ? "default" : "outline"} 
              onClick={() => setIsLive(!isLive)}
              className={cn("gap-2 shadow-lg transition-all hover:scale-105 rounded-xl h-10 px-5", isLive ? "" : "bg-warning/20 border-warning text-warning-foreground")}
            >
              {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isLive ? "Pause Event" : "Resume"}
            </Button>
            <Button variant="outline" className="gap-2 hidden md:flex rounded-xl h-10 shadow-sm border-border">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 bg-secondary/50 rounded-xl hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-danger-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background shadow-lg">
                {flaggedCount}
              </span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-hidden flex flex-col pt-2 bg-muted/20">
          <Tabs defaultValue="monitoring" className="flex-1 flex flex-col">
            <div className="px-6 lg:px-10 mb-4 mt-2">
              <TabsList className="bg-card border border-border shadow-sm p-1 rounded-xl gap-1">
                <TabsTrigger value="monitoring" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg gap-2 py-2 px-4 transition-all">
                  <Monitor className="h-4 w-4" /> Live Monitoring
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg gap-2 py-2 px-4 transition-all">
                  <BarChart3 className="h-4 w-4" /> Real-time Analytics
                </TabsTrigger>
                <TabsTrigger value="ai-insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg gap-2 py-2 px-4 transition-all">
                  <BrainCircuit className="h-4 w-4" /> AI Diagnostics
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monitoring" className="flex-1 overflow-hidden flex flex-col lg:flex-row m-0">
              {/* Main Grid Area */}
              <div className="flex-1 p-6 lg:px-10 overflow-y-auto w-full">
                {/* Metric Cards Top Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <AnimatePresence>
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
                      <MetricCard title="Active Enrollees" value={activeSessions} icon={Users} trend={{ value: 2, direction: "up" }} color="primary" />
                    </motion.div>
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                      <MetricCard title="Critical Flags" value={flaggedCount} icon={AlertTriangle} trend={{ value: 1, direction: "up" }} color="danger" />
                    </motion.div>
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{delay:0.3}}>
                      <MetricCard title="Global Integrity" value={`${avgIntegrity}%`} icon={Shield} trend={{ value: 3, direction: "down" }} color="warning" />
                    </motion.div>
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{delay:0.4}}>
                      <MetricCard title="AI Confidence" value="99.9%" icon={Zap} trend={{ value: 0, direction: "up" }} color="success" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-card p-2 border border-border shadow-sm rounded-2xl">
                  <div className="flex items-center gap-3 px-3">
                    <div className="p-1.5 bg-primary/10 rounded-lg"><Users className="h-5 w-5 text-primary"/></div>
                    <h2 className="font-bold text-foreground">Cohort View</h2>
                    <Badge variant="secondary" className="bg-secondary/50 px-2 py-0.5">{filteredStudents.length}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto px-2">
                    <div className="relative flex-1 sm:w-64 group">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input 
                        placeholder="Search student ID or Name..." 
                        className="pl-9 bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary transition-all rounded-xl h-10"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      {/* @ts-ignore */}
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 shadow-sm border-border">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl shadow-xl border-border">
                        <DropdownMenuItem onClick={() => setFilterStatus("all")} className="font-semibold cursor-pointer">All Students</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("active")} className="font-semibold cursor-pointer text-success">Active Only</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("flagged")} className="font-semibold cursor-pointer text-danger">Flagged Only</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex bg-muted/50 rounded-xl p-1 shadow-inner border border-border/50">
                      <Button variant={viewMode==="grid"?"default":"ghost"} size="sm" className="rounded-lg h-8 px-2.5 shadow-none" onClick={() => setViewMode("grid")}>
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button variant={viewMode==="list"?"default":"ghost"} size="sm" className="rounded-lg h-8 px-2.5 shadow-none" onClick={() => setViewMode("list")}>
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className={cn("grid gap-6 w-full pb-8", viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1")}>
                  <AnimatePresence>
                    {filteredStudents.map((student, idx) => (
                      <motion.div
                        key={student.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                      >
                        <StudentCard 
                          student={student} 
                          viewMode={viewMode}
                          isSelected={selectedStudent === student.id}
                          onSelect={() => setSelectedStudent(student.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Telegraph Feed Sidebar */}
              <aside className="w-full lg:w-[400px] bg-card border-t lg:border-t-0 lg:border-l border-border flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.02)] z-10">
                <div className="p-5 border-b border-border bg-gradient-to-br from-card to-secondary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[15px] uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      Global Events 
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-bold tracking-widest gap-1 border-primary/30 text-primary bg-primary/5 uppercase">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                        Syslog
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase opacity-80 tracking-widest">
                    Machine Learning Telemetry Stream
                  </p>
                </div>
                <ScrollArea className="flex-1 p-5">
                  <div className="space-y-4">
                    {sampleEvents.map(event => (
                      <EventItem key={event.id} event={event} />
                    ))}
                  </div>
                </ScrollArea>
              </aside>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 overflow-y-auto m-0 p-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-2xl shadow-sm border border-border">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-foreground">Integrity Drift Analysis</CardTitle>
                    <CardDescription>Live measurement of cohort exam fidelity</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={integrityTrendData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "1px solid hsl(var(--border))", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                        <Area type="monotone" dataKey="avgScore" stroke="var(--color-primary)" fill="url(#colorScore)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm border border-border">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-foreground">Incident Classifications</CardTitle>
                    <CardDescription>Anomaly typing distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={violationTypeData} cx="50%" cy="50%" 
                            innerRadius={70} outerRadius={90} paddingAngle={8} 
                            dataKey="value" stroke="none"
                          >
                            {violationTypeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "none" }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute text-center flex flex-col items-center pointer-events-none">
                        <Shield className="w-6 h-6 text-primary opacity-50 mb-1" />
                        <span className="font-bold text-xl text-foreground">57</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold">Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-insights" className="flex-1 overflow-y-auto m-0 p-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Same as before, just UI wrapped properly */}
                <Card className="lg:col-span-2 rounded-2xl shadow-sm border border-border">
                  <CardHeader>
                    <CardTitle className="font-bold flex items-center gap-2">
                       <BrainCircuit className="h-5 w-5 text-primary"/> AI Diagnostics
                    </CardTitle>
                    <CardDescription>Machine learning diagnostic readouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {sampleEvents.slice(0,4).map(event => (
                        <div key={event.id} className="flex gap-4 items-center group cursor-default">
                          <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors">
                            <Activity className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm mb-1">{event.event}</p>
                            <p className="text-xs text-muted-foreground uppercase font-mono">{event.student} • {event.time}</p>
                          </div>
                          <div className="text-right w-24">
                            <p className="font-bold text-sm mb-1">{event.aiConfidence}%</p>
                            <Progress value={event.aiConfidence} className="h-1.5 bg-muted [&>div]:bg-success" />
                          </div>
                        </div>
                      ))}
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

function NavItem({ icon: Icon, label, active = false, badge }: any) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group",
        active 
          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]" 
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent border border-transparent hover:border-sidebar-border"
      )}
    >
      <Icon className={cn("h-5 w-5 transition-transform", active ? "" : "group-hover:scale-110")} />
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="w-6 h-6 rounded-md bg-danger text-danger-foreground text-xs flex items-center justify-center font-bold shadow-sm">
          {badge}
        </span>
      )}
    </button>
  )
}

function MetricCard({ title, value, icon: Icon, trend, color }: any) {
  const colorClasses:any = {
    primary: "text-primary bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20",
    danger: "text-danger bg-gradient-to-br from-danger/20 to-danger/5 border-danger/20",
    success: "text-success bg-gradient-to-br from-success/20 to-success/5 border-success/20",
    warning: "text-warning bg-gradient-to-br from-warning/20 to-warning/5 border-warning/20"
  }
  return (
    <Card className="rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl -mx-10 -mt-10 opacity-40 transition-opacity group-hover:opacity-60", colorClasses[color].split(" ")[1])} />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{title}</p>
            <p className="text-3xl font-black text-foreground tracking-tight">{value}</p>
            {trend.value > 0 && (
              <div className={cn("flex items-center gap-1.5 text-[11px] mt-2 font-bold uppercase", trend.direction==="up"?"text-success":"text-danger")}>
                {trend.direction==="up"?<TrendingUp className="h-3.5 w-3.5"/>:<TrendingDown className="h-3.5 w-3.5"/>}
                {trend.value} / hr trend
              </div>
            )}
          </div>
          <div className={cn("p-4 rounded-2xl shadow-inner border", colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StudentCard({ student, viewMode, isSelected, onSelect }: any) {
  const scoreConfig = student.integrityScore >= 80 ? "success" : student.integrityScore >= 60 ? "warning" : "danger";
  const colors = {
    success: "text-success stroke-success bg-success/10",
    warning: "text-warning stroke-warning bg-warning/10",
    danger: "text-danger stroke-danger bg-danger/10"
  };
  const activeColor = colors[scoreConfig];

  const circumference = 2 * Math.PI * 22
  const strokeDashoffset = circumference - (student.integrityScore / 100) * circumference

  if (viewMode === "list") return null;

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl rounded-2xl overflow-hidden group border",
        isSelected ? "ring-2 ring-primary border-primary" : "border-border",
        student.status === "flagged" && "border-danger/40 shadow-danger/10"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-5">
        <div className="aspect-video bg-black/90 rounded-xl mb-5 relative overflow-hidden ring-1 ring-border shadow-inner">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Camera className="h-8 w-8 text-white/20" />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          {student.status === "active" && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-danger/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-bold tracking-widest shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              LIVE
            </div>
          )}
          
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-white text-xs font-mono font-medium drop-shadow-md opacity-80 z-10 block truncate max-w-[150px]">
              CAM_{student.id}
            </span>
            {student.status === "flagged" && (
              <Badge variant="destructive" className="h-5 px-1.5 py-0 text-[10px] gap-1 animate-pulse shadow-xl shadow-danger/50 mt-1">
                <AlertTriangle className="h-3 w-3" /> FLG
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between mb-5">
          <div className="min-w-0 pr-4">
            <h3 className="font-bold text-[17px] text-foreground truncate">{student.name}</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">{student.id}</p>
          </div>
          <div className="relative w-14 h-14 shrink-0">
            <svg className="w-14 h-14 -rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/50" />
              <circle
                cx="28" cy="28" r="22" fill="none" strokeWidth="4" strokeLinecap="round"
                className={activeColor.split(' ')[1]}
                style={{ strokeDasharray: circumference, strokeDashoffset }}
              />
            </svg>
            <span className={cn("absolute inset-0 flex items-center justify-center text-sm font-black", activeColor.split(' ')[0])}>
              {student.integrityScore}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-secondary/40 rounded-xl p-3 text-center border border-border/50 shadow-inner">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Tabs</p>
            <p className={cn("font-black text-lg", student.tabSwitches > 0 ? "text-danger" : "text-foreground")}>{student.tabSwitches}</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 text-center border border-border/50 shadow-inner">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Gaze</p>
            <p className={cn("font-black text-lg", student.gazeDeviations > 5 ? "text-danger" : "text-foreground")}>{student.gazeDeviations}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] mb-2 font-bold uppercase tracking-wide">
            <span className="text-muted-foreground">Progression</span>
            <span className="text-primary">{student.examProgress}%</span>
          </div>
          <Progress value={student.examProgress} className="h-2 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function EventItem({ event }: any) {
  const styles:any = { info:"border-primary", warning:"border-warning", danger:"border-danger" }
  const icons:any = { info: Eye, warning: AlertTriangle, danger: XCircle }
  const Icon = icons[event.severity];
  
  return (
    <div className={cn("p-4 rounded-xl border-l-[3px] bg-card border border-border/50 shadow-sm transition-all hover:shadow-md", styles[event.severity])}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-secondary shrink-0 mt-0.5">
          <Icon className={cn("h-4 w-4", event.severity==="danger"?"text-danger":event.severity==="warning"?"text-warning":"text-primary")} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-foreground leading-snug mb-1.5">{event.event}</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase">{event.student}</span>
            <span className="text-[11px] font-bold text-muted-foreground">{event.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

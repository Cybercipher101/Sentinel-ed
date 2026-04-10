"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    }
  ]
  
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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize Audio Object on mount (to avoid SSR issues)
  useEffect(() => {
    // The MP3 will be loaded from public/audio/alert.mp3
    audioRef.current = new Audio("/audio/alert.mp3");
  }, [])

  // Action to play audio when there's an alert
  const playAlertAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // reset
      audioRef.current.play().catch(e => console.warn("Audio playback prevented by browser:", e));
    }
  }

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
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }, 
          facingMode: "user" 
        },
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

  const captureSnapshot = useCallback(() => {
    if (videoRef.current && canvasRef.current && webcamActive) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = 1280
        canvasRef.current.height = 720
        context.drawImage(videoRef.current, 0, 0, 1280, 720)
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

  const enterFullscreen = useCallback(async () => {
    try {
      // Unlock audio playback during explicit user interaction
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current?.pause();
          if (audioRef.current) audioRef.current.currentTime = 0;
        }).catch(e => console.warn("Audio pre-load bypassed", e));
      }
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
      setShowFullscreenPrompt(false)
      initWebcam()
    } catch (err) {
      console.error("Fullscreen failed:", err)
    }
  }, [initWebcam])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement
      setIsFullscreen(isFs)
      if (!isFs && !showFullscreenPrompt && !examSubmitted) {
        addSecurityEvent("Exited fullscreen mode", "high")
        addAlert("Fullscreen mode exited. Please return to fullscreen.", "danger", Maximize)
        playAlertAudio() // Play Voice Alert
        setShowFullscreenPrompt(true)
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [showFullscreenPrompt, examSubmitted])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isFullscreen) {
        setTabSwitchCount(prev => prev + 1)
        addSecurityEvent("Tab switch detected", "high")
        addAlert("Tab switch detected! This has been logged.", "danger", EyeOff)
        playAlertAudio() // Play Voice Alert
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isFullscreen])

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

  useEffect(() => {
    if (!isFullscreen) return
    const alertTimer = setTimeout(() => {
      addAlert("AI detected slight gaze deviation. Please focus on screen.", "warning", Eye)
      addSecurityEvent("Gaze deviation detected", "medium")
      playAlertAudio() // Play Voice Alert
    }, 15000) // Trigger after 15 seconds for demo
    return () => clearTimeout(alertTimer)
  }, [isFullscreen])

  const addAlert = (message: string, type: "warning" | "danger" | "info", icon: React.ElementType) => {
    const newAlert: AlertNotification = { id: Date.now(), message, type, icon }
    setAlerts(prev => [newAlert, ...prev])
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== newAlert.id))
    }, 6000)
  }

  const addSecurityEvent = (type: string, severity: "low" | "medium" | "high") => {
    setSecurityEvents(prev => [...prev, { id: Date.now(), type, timestamp: new Date(), severity }])
  }

  const handleSubmitExam = async () => {
    setIsSubmitting(true)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent" 
            />
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <BrainCircuit className="absolute inset-0 m-auto h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Initializing AI Core</h2>
          <p className="text-muted-foreground">Securing exam payload and loading models...</p>
        </motion.div>
      </div>
    )
  }

  if (showFullscreenPrompt && !examSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden glassmorphism-heavy">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="flex items-center gap-3 relative z-10 mb-4">
                <div className="p-2 bg-primary-foreground/20 rounded-lg backdrop-blur-md">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">SentinelEd Proctoring</h1>
                  <p className="text-sm text-primary-foreground/80">Secure Pre-Flight Check</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                System Requirements
              </h2>
              
              <div className="grid gap-3 mb-6">
                <FeatureCard icon={Maximize} title="Full Screen Mode" description="Required for exam security" status="required" />
                <FeatureCard icon={Camera} title="Webcam Access" description="AI monitoring for integrity" status="required" />
                <FeatureCard icon={Monitor} title="Tab Detection" description="Switching tabs will be logged" status="active" />
                <FeatureCard icon={BrainCircuit} title="AI Threat Analysis" description="Real-time behavior monitoring" status="active" />
              </div>

              {tabSwitchCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center gap-2"
                >
                  <AlertTriangle className="h-5 w-5 text-danger" />
                  <span className="text-sm text-danger font-semibold">Violation Logged: Tab switches detected ({tabSwitchCount})</span>
                </motion.div>
              )}

              <Button 
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-primary/50 transition-all hover:scale-[1.02]"
                onClick={enterFullscreen}
              >
                <Lock className="h-5 w-5 mr-2" />
                Agree & Enter Secure Exam
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (examSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-success/5 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center border-4 border-success/30"
          >
            <CheckCircle2 className="h-12 w-12 text-success" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Exam Secured</h1>
          <p className="text-muted-foreground mb-6">
            Your answers and integrity timeline have been securely transmitted to your institution.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Shield className="w-32 h-32" />
             </div>
            <div className="grid grid-cols-2 gap-4 text-sm relative z-10">
              <div>
                <p className="text-muted-foreground font-medium">Completion</p>
                <p className="text-3xl font-bold text-success">{Math.round(progressPercent)}%</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Flags</p>
                <p className={cn("text-3xl font-bold", securityEvents.length > 0 ? "text-danger" : "text-success")}>
                  {securityEvents.length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Alert Notifications (Floating) */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none w-full max-w-md">
        <AnimatePresence>
          {alerts.map(alert => {
            const Icon = alert.icon
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                className={cn(
                  "pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-xl w-full",
                  alert.type === "warning" && "bg-warning/90 text-warning-foreground border-warning",
                  alert.type === "danger" && "bg-danger/90 text-danger-foreground border-danger",
                  alert.type === "info" && "bg-primary/90 text-primary-foreground border-primary"
                )}
              >
                <div className="p-2 bg-background/20 rounded-full">
                  <Icon className="h-6 w-6 shrink-0" />
                </div>
                <span className="font-semibold text-sm tracking-wide">{alert.message}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
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
            </div>
          </div>

          {/* Timer */}
          <motion.div 
            animate={timeRemaining < 300 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl border shadow-inner",
            timeRemaining < 300 
              ? "bg-danger/10 border-danger/50 text-danger" 
              : "bg-secondary/50 border-border"
          )}>
            <Clock className="h-5 w-5" />
            <span className="font-mono text-lg font-bold">
              {formatTime(timeRemaining)}
            </span>
          </motion.div>
        </div>
        <Progress value={progressPercent} className="h-1 rounded-none border-t border-background/10 bg-muted" />
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Exam Panel */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Question Paginator */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm font-semibold transition-all shrink-0 border-2",
                    idx === currentQuestion
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-110"
                      : answers[idx] !== undefined
                        ? "bg-success/10 text-success border-success/30"
                        : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary/10 to-transparent px-6 border-b border-border py-4 flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold px-3 py-1 bg-background/50 backdrop-blur">
                    {question?.category}
                  </Badge>
                  <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                
                <div className="p-6 lg:p-10">
                  <h2 className="text-xl lg:text-2xl font-semibold text-foreground leading-relaxed mb-8">
                    {question?.text}
                  </h2>

                  <RadioGroup
                    value={answers[currentQuestion] || ""}
                    onValueChange={(value) => setAnswers(prev => ({ ...prev, [currentQuestion]: value }))}
                    className="space-y-4"
                  >
                    {question?.options.map((option, idx) => (
                      <div key={idx}>
                        <Label
                          htmlFor={`option-${idx}`}
                          className={cn(
                            "flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover:-translate-y-0.5",
                            answers[currentQuestion] === option
                              ? "border-primary bg-primary/5 shadow-md ring-4 ring-primary/10"
                              : "border-border hover:border-primary/30 hover:bg-accent/30 shadow-sm"
                          )}
                        >
                          <RadioGroupItem value={option} id={`option-${idx}`} className="mt-1" />
                          <span className="text-base text-foreground leading-relaxed">
                            {option}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 gap-4 pb-20">
              <Button
                variant="outline" size="lg" className="rounded-xl h-14 px-8 text-base shadow-sm"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button 
                  size="lg"
                  className="rounded-xl h-14 px-8 text-base bg-gradient-to-r from-success to-success/80 text-success-foreground shadow-lg hover:shadow-success/40 transition-all hover:scale-105"
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Securing...</>
                  ) : (
                    <><Send className="h-5 w-5 mr-2" />Submit Final Answers</>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg" className="rounded-xl h-14 px-8 text-base shadow-lg hover:shadow-primary/30 transition-all"
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* Proctoring Radar Widget Sidebar */}
        <aside className="w-full lg:w-96 border-l border-border bg-card/60 backdrop-blur-xl p-6 flex flex-col overflow-y-auto">
          {/* Webcam Radar View */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="h-4 w-4 text-primary" />
              </div>
              <span className="text-base font-bold text-foreground">Live Telemetry</span>
            </div>
            
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border-2 border-border shadow-2xl">
              <video
                ref={videoRef} autoPlay muted playsInline
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Radar Scanner Animation Base */}
              {webcamActive && (
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    animate={{ y: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-full h-1 bg-primary/50 shadow-[0_0_20px_4px_rgba(var(--primary),0.8)]"
                  />
                  {/* Face bounding box mockup */}
                  <motion.div
                    animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute left-1/4 top-1/4 right-1/4 bottom-1/4 border border-success/50 rounded-lg"
                  />
                </div>
              )}

              {/* Status Pill */}
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/10">
                {webcamActive ? (
                  <><span className="w-2 h-2 bg-danger rounded-full animate-pulse" /> REC</>
                ) : (
                  <><Loader2 className="h-3 w-3 animate-spin"/> INIT</>
                )}
              </div>

              {/* Analysing HUD */}
              <AnimatePresence>
                {aiAnalysisStatus === "analyzing" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-3 left-3 right-3 bg-primary/90 backdrop-blur-lg px-3 py-2 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-primary-foreground animate-pulse" />
                      <span className="text-xs text-primary-foreground font-semibold">Processing Frame</span>
                    </div>
                    <span className="text-[10px] font-mono text-primary-foreground/70">OK</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold tracking-wide uppercase">AI Monitors</span>
              </div>
              <div className="space-y-3">
                <AIStatus label="Gaze Tracking" status="OK" color="success" />
                <AIStatus label="Face Match" status="OK" color="success" />
                <AIStatus label="Audio Level" status="Listen" color="primary" />
              </div>
            </div>

            {securityEvents.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-bold tracking-wide uppercase">Event Log</span>
                </div>
                <div className="space-y-3">
                  {securityEvents.slice(-4).reverse().map(event => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      key={event.id} 
                      className={cn(
                        "text-xs p-3 rounded-xl border-l-4 shadow-sm",
                        event.severity === "high" && "bg-danger/5 border-danger",
                        event.severity === "medium" && "bg-warning/5 border-warning",
                        event.severity === "low" && "bg-muted border-muted-foreground"
                      )}
                    >
                      <p className="font-semibold text-foreground mb-1">{event.type}</p>
                      <p className="text-muted-foreground opacity-70">
                        {event.timestamp.toLocaleTimeString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function AIStatus({ label, status, color }: { label: string, status: string, color: 'success'|'danger'|'primary' }) {
  const colors = {
    success: "bg-success text-success-foreground",
    danger: "bg-danger text-danger-foreground",
    primary: "bg-primary text-primary-foreground"
  }
  return (
    <div className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0 last:pb-0">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Badge variant="secondary" className={cn("text-[10px] font-bold tracking-wider", colors[color])}>
        {status}
      </Badge>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, status }: any) {
  return (
    <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-secondary">
      <div className={cn("p-3 rounded-xl shadow-inner", status === "required" ? "bg-primary/20" : "bg-success/20")}>
        <Icon className={cn("h-6 w-6", status === "required" ? "text-primary" : "text-success")} />
      </div>
      <div className="flex-1">
        <p className="text-base font-bold text-foreground mb-0.5">{title}</p>
        <p className="text-xs font-medium text-muted-foreground">{description}</p>
      </div>
      <Badge variant={status === "required" ? "default" : "secondary"} className="shadow-sm">
        {status === "required" ? "Required" : "Active"}
      </Badge>
    </div>
  )
}

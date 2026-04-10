# 🛡️ SentinelEd: Complete Tech Stack & Ultimate Q&A Guide

This document is your master reference for the SentinelEd project. It clearly defines the technological architecture you built and provides a comprehensive list of technical, strategic, and practical questions that judges, professors, or other students might ask you.

---

## 💻 Part 1: The Tech Stack Definition

If you are asked to define your technology stack, here is exactly what SentinelEd is built with and **why** you chose it:

### 1. The Core Framework
*   **Next.js 15 (React App Router):** 
    *   *Why?* Next.js allows for extremely fast page routing and Server-Side Rendering (SSR). This is crucial for a proctoring app where latency must be minimized. It gives the application a snappy, desktop-like feel directly in the browser.
*   **TypeScript:**
    *   *Why?* Enforces strict type-safety, which practically eliminates runtime errors—a non-negotiable requirement for an application handling secure exam states.

### 2. Styling & UI Components
*   **Tailwind CSS:** 
    *   *Why?* Allows for rapid styling without massive external stylesheets, letting us achieve the "neo-cyberpunk" dark mode aesthetic instantly.
*   **Shadcn/UI & Radix Primitives:** 
    *   *Why?* Provides highly accessible, unstyled components that we fully customized. It allowed us to build complex components (like the Notifications Dropdown and Tab architecture) flawlessly.
*   **Framer Motion:** 
    *   *Why?* Powers the fluid animations and micro-interactions that make the platform feel like a premium, enterprise-grade application rather than a clunky school project.
*   **Recharts:**
    *   *Why?* Used to build the live rendering Data Visualization graphs inside the Proctor Analytics dashboard.

### 3. Architecture & Edge Storage (The "Database")
*   **Ephemeral Browser Storage (`localStorage` API):**
    *   *Why?* For this MVP, we explicitly bypassed a traditional SQL database (like PostgreSQL). Instead, we built a zero-latency global state using the browser's local memory. This proves out our core thesis: **Ephemeral Processing**. Data (like custom questions) is stored and accessed instantly without requiring expensive server database queries, maximizing student privacy.

---

## 🎤 Part 2: The Ultimate Panel Q&A Defense Guide

Study these questions. We have divided them into three categories: **Technical Defenses**, **Security/Cheating Vectors**, and **Business/Scalability**.

### ⚙️ Category 1: Technical Defenses

**Q1: Why did you choose Next.js instead of just standard HTML/JS or Python?**
> **Answer:** "A proctoring system requires immediate reactivity. If a student tabs out, the UI needs to react in milliseconds. Next.js combined with React's Virtual DOM allows us to update complex UI states instantly without full page reloads. A Python backend rendering HTML would introduce dangerous latency."

**Q2: So, where is the database? How are questions stored?**
> **Answer:** "For this MVP, we utilize an **Ephemeral Local Storage model**. When a teacher adds a question, it is stored instantly in the browser's secure `localStorage`. We did this deliberately to prove our concept of 'Zero-Retention Architecture'—our ultimate goal is to process data on the edge and instantly delete it, rather than hoarding student data in massive centralized databases."

**Q3: How does your AI Gaze Tracking actually run? Is it server-side?**
> **Answer:** "No, and that is our biggest advantage. Sending massive video files to a server to be analyzed is slow and expensive. We conceptually rely on **Edge AI** (leveraging models like MediaPipe via WebGL/WASM). The computer vision runs directly using the processing power of the student's *own* laptop browser, outputting only small text-based JSON telemetry bytes to the server."

### 🕵️ Category 2: Security & Cheating Vectors

**Q4: What happens if a student just copies the question and searches it in another tab?**
> **Answer:** "Our UI is hard-coded to intercept user actions. We utilize the browser's `Page Visibility API`. The literal millisecond the student clicks away from the exam tab, the system logs a 'Tab Switch Anomaly' and immediately flags the teacher in the Command Center."

**Q5: What if they use a Virtual Machine (VM), dual monitors, or look at their phone?**
> **Answer:** "Dual monitors and phones are caught by the AI's physical tracking capabilities. The system tracks facial yaw, pitch, and roll. If a student's eyes consistently deviate away from the center of the viewport, the AI calculates that drift and triggers a 'Gaze Deviation Warning'."

**Q6: What if they just turn off their internet midway through the exam?**
> **Answer:** "The exam caches their answers locally. However, a 'loss of connection' immediately triggers a 'disconnected' flag on the teacher's Live Tracking Grid. It is impossible to go offline without the proctor explicitly knowing it."

### 📈 Category 3: Scalability & Business Comparison

**Q7: How is this different from Proctorio or Lockdown Browser?**
> **Answer:** "Current industry leaders require students to install massive, highly invasive OS-level software that essentially acts as spyware and has root access to their computers. **SentinelEd is 100% web-native.** There is absolutely nothing to download. You click a link, the exam opens, the browser AI analyzes you, and when you close the tab, you are completely safe. We prioritize student privacy without sacrificing security."

**Q8: Could this platform handle a university with 10,000 concurrent students?**
> **Answer:** "Absolutely. Because of our Edge Computing architecture, the heavy lifting—analyzing webcam video—is done by the 10,000 individual student laptops, not by our servers. Our servers only receive tiny bits of text data (the integrity scores). This makes SentinelEd infinitely more scalable and cheaper to host than platforms streaming live video to the cloud."

**Q9: Some students get severe anxiety from AI proctoring. How do you solve that?**
> **Answer:** "By humanizing the AI. Our system does not instantly fail a student or lock them out. If you sneeze or look away in thought, the system registers it, but it simply passes a confidence score to the teacher. The Teacher makes the final call. We are building a tool to *assist* educators, not an algorithm to ruthlessly punish students."

"use client"

import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
import { portfolioData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const GITHUB_URL = "https://github.com/CyPietro17"

const ROLES = [
  "Software Developer",
  "Java & Spring Developer",
  "Test Automation Engineer",
]

const TYPING_SPEED = 80
const ERASE_SPEED = 40
const PAUSE_AFTER_FULL = 1800
const PAUSE_BEFORE_NEXT = 300

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

type TypingPhase =
  | { kind: "typing"; roleIndex: number; charCount: number }
  | { kind: "pausing"; roleIndex: number }
  | { kind: "erasing"; roleIndex: number; charCount: number }
  | { kind: "switching"; nextRoleIndex: number }

function useTypingAnimation() {
  const [phase, setPhase] = useState<TypingPhase>({
    kind: "typing",
    roleIndex: 0,
    charCount: 0,
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (phase.kind === "typing") {
      const full = ROLES[phase.roleIndex]
      if (phase.charCount < full.length) {
        timer = setTimeout(
          () =>
            setPhase({
              kind: "typing",
              roleIndex: phase.roleIndex,
              charCount: phase.charCount + 1,
            }),
          TYPING_SPEED
        )
      } else {
        timer = setTimeout(
          () => setPhase({ kind: "pausing", roleIndex: phase.roleIndex }),
          PAUSE_AFTER_FULL
        )
      }
    } else if (phase.kind === "pausing") {
      timer = setTimeout(
        () =>
          setPhase({
            kind: "erasing",
            roleIndex: phase.roleIndex,
            charCount: ROLES[phase.roleIndex].length,
          }),
        0
      )
    } else if (phase.kind === "erasing") {
      if (phase.charCount > 0) {
        timer = setTimeout(
          () =>
            setPhase({
              kind: "erasing",
              roleIndex: phase.roleIndex,
              charCount: phase.charCount - 1,
            }),
          ERASE_SPEED
        )
      } else {
        timer = setTimeout(
          () =>
            setPhase({
              kind: "switching",
              nextRoleIndex: (phase.roleIndex + 1) % ROLES.length,
            }),
          PAUSE_BEFORE_NEXT
        )
      }
    } else {
      timer = setTimeout(
        () =>
          setPhase({
            kind: "typing",
            roleIndex: phase.nextRoleIndex,
            charCount: 0,
          }),
        0
      )
    }

    return () => clearTimeout(timer)
  }, [phase])

  const displayText =
    phase.kind === "typing"
      ? ROLES[phase.roleIndex].slice(0, phase.charCount)
      : phase.kind === "pausing"
        ? ROLES[phase.roleIndex]
        : phase.kind === "erasing"
          ? ROLES[phase.roleIndex].slice(0, phase.charCount)
          : ""

  const isPausing = phase.kind === "pausing"

  return { displayText, isPausing }
}

export default function Hero() {
  const { displayText, isPausing } = useTypingAnimation()

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[90svh] flex items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-background to-muted/30"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-(family-name:--font-geist-mono) text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
          >
            {portfolioData.name}
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            variants={itemVariants}
            className="mt-4 flex h-8 items-center justify-center"
          >
            <span className="font-(family-name:--font-geist-mono) text-xl sm:text-2xl text-muted-foreground">
              {displayText}
            </span>
            <span
              aria-hidden
              className={cn(
                "ml-0.5 inline-block h-[1.2em] w-0.5 align-middle bg-muted-foreground",
                isPausing ? "animate-pulse" : ""
              )}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-prose mx-auto leading-relaxed"
          >
            {portfolioData.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              asChild
              variant="default"
              className="h-11 px-6 text-base font-medium"
            >
              <a href="#projects">Vedi i miei progetti</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 px-6 text-base font-medium"
            >
              <a href="#contact">Contattami</a>
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="mt-4 flex items-center justify-center gap-1"
          >
            <Button
              asChild
              variant="ghost"
              className="size-10 rounded-full p-0"
            >
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="size-10 rounded-full p-0"
            >
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GithubIcon className="size-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

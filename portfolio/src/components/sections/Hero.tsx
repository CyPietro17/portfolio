"use client"

import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import { Mail, Download, Network } from "lucide-react"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { portfolioData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

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
              variant="ghost"
              className="h-11 px-6 text-base font-medium"
            >
              <a href="#projects">
                Vedi i miei progetti
                <Network size={18} />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-11 px-6 text-base font-medium"
            >
              <a
                href={`mailto:${portfolioData.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inviami una mail
                <Mail size={18} />
              </a>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-11 px-6 text-base font-medium"
                >
                  Scarica il mio CV
                  <Download size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent showCloseButton={true}>
                <DialogHeader>
                  <DialogTitle>Download CV</DialogTitle>
                  <DialogDescription>
                    Stai per scaricare il mio curriculum vitae in formato PDF.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="destructive">Annulla</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button asChild>
                      <a href="/CV_Pietro_Salvatore.pdf" download="CV_Pietro_Salvatore.pdf">
                        <Download size={16} />
                        Scarica il CV
                      </a>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <FaLinkedin className="size-5" />
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
                <FaGithub className="size-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="size-10 rounded-full p-0"
            >
              <a
                href={`https://wa.me/${portfolioData.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp profile"
              >
                <FaWhatsapp className="size-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

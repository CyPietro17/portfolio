"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { portfolioData, type Experience, type Education } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Discriminated union ──────────────────────────────────────────────────────

type WorkEntry = { kind: "work" } & Experience;
type EduEntry = { kind: "education" } & Education;
type TimelineEntry = WorkEntry | EduEntry;

const TIMELINE_ENTRIES: TimelineEntry[] = [
  ...portfolioData.experience.map((e) => ({ kind: "work" as const, ...e })),
  ...portfolioData.education.map((e) => ({ kind: "education" as const, ...e })),
];

const EXPERIENCE_ICONS: Record<string, string[]> = {
  "I.T.Svil":               ["https://www.itsvil.it/assets/images/logo-itsvil-2022-r2.svg",/*"https://www.itsvil.it/assets/images/logo-itsvil-2026-white.png-419x139.png",*/ "https://www.itsvil.it/"],
  "Wolters Kluwer":         ["https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/logo/assets/white-medium.svg",/*"https://cdn.wolterskluwer.io/wk/jumpstart-v3-assets/0.x.x/logo/large.svg",*/ "https://www.wolterskluwer.com/it-it"],
  "Universitas Mercatorum": ["https://lms.mercatorum.multiversity.click/assets/logo-f9ea1ffe.svg",/*"https://mercatorum.multiversity.click/main/img/logo5.png",*/ "https://www.unimercatorum.it/"],
};

// ── Animation variants ───────────────────────────────────────────────────────

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardFromBottomVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── ExperienceCard ───────────────────────────────────────────────────────────

function ExperienceCard({
  entry,
  inView,
  isWork,
}: {
  entry: TimelineEntry;
  inView: boolean;
  isWork: boolean;
}) {
  const org = isWork
    ? (entry as WorkEntry).company
    : (entry as EduEntry).institution;
  const orgIcon = EXPERIENCE_ICONS[org];

  return (
    <Card
      className={cn(
        "border-l-4",
        isWork ? "border-l-foreground" : "border-l-muted-foreground/50",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <Badge variant={isWork ? "default" : "secondary"}>
            {isWork ? "Esperienza" : "Formazione"}
          </Badge>
          <span className="font-(family-name:--font-geist-mono) text-xs text-muted-foreground shrink-0">
            {entry.period}
          </span>
        </div>
        <CardTitle className="mt-2 text-base font-semibold leading-snug">
          {isWork ? (entry as WorkEntry).role : (entry as EduEntry).degree}
        </CardTitle>
        <CardDescription>
          <span className="flex items-center gap-1.5">
            {orgIcon && (
              <a target="_blank" href={orgIcon[1]}>
              <img
                src={orgIcon[0]}
                alt={org}
                aria-hidden
                width={120}
                height={120}
                className="shrink-0 object-contain"
              />
              </a>
            )}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Work: activity list */}
        {isWork && (
          <>
            <Separator className="my-3" />
            <p className="font-(family-name:--font-geist-mono) text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Attività principali
            </p>
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-1"
            >
              {(entry as WorkEntry).description.map((item, i) => (
                <motion.li
                  key={i}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50"
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}

        {/* Education: courses */}
        {!isWork &&
          (entry as EduEntry).courses &&
          (entry as EduEntry).courses!.length > 0 && (
            <>
              <Separator className="my-3" />
              <p className="font-(family-name:--font-geist-mono) text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Corsi principali
              </p>
              <motion.ul
                variants={listContainerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-1"
              >
                {(entry as EduEntry).courses!.map((course, i) => (
                  <motion.li
                    key={i}
                    variants={listItemVariants}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50"
                    />
                    {course}
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}

        {/* Education: courses */}
        {!isWork && (entry as EduEntry).vote && (
          <>
            <Separator className="my-3" />
            <span
              aria-hidden
              className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50"
            />
            <p className="font-(family-name:--font-geist-mono) text-sm text-muted-foreground">
              Voto: {(entry as EduEntry).vote}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── TimelineItem ─────────────────────────────────────────────────────────────

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  // ref is on the dot column (Col 2) — always rendered with a real layout box
  // so IntersectionObserver fires correctly (display:contents has no box)
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const isRight = index % 2 === 1;
  const isWork = entry.kind === "work";

  return (
    <div className="contents">
      {/* ── Col 1: left card (desktop even) | hidden on mobile ── */}
      <div className="hidden md:flex md:justify-end md:pr-8 md:items-start md:pt-4">
        {!isRight && (
          <motion.div
            className="w-full max-w-sm"
            variants={cardFromLeftVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ExperienceCard entry={entry} inView={inView} isWork={isWork} />
          </motion.div>
        )}
      </div>

      {/* ── Col 2: dot — ref lives here, always a real layout box ── */}
      <div ref={ref} className="flex flex-col items-center pt-4 px-1 md:px-0">
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={cn(
            "relative z-10 h-4 w-4 shrink-0 rounded-full ring-2 ring-background",
            isWork ? "bg-foreground" : "bg-muted-foreground",
          )}
        />
      </div>

      {/* ── Col 3: always a grid item (never md:hidden, or desktop row shifts) ── */}
      <div className="pb-10 pl-3 md:pl-8 md:pt-4">
        {/* Mobile: show card for every entry here */}
        <div className="md:hidden">
          <motion.div
            variants={cardFromBottomVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ExperienceCard entry={entry} inView={inView} isWork={isWork} />
          </motion.div>
        </div>

        {/* Desktop: show card only for right-side (odd) entries */}
        {isRight && (
          <div className="hidden md:block max-w-sm">
            <motion.div
              variants={cardFromRightVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <ExperienceCard entry={entry} inView={inView} isWork={isWork} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Experience section ───────────────────────────────────────────────────────

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
          className="mb-16 text-center"
        >
          <h2 className="font-(family-name:--font-geist-sans) text-3xl sm:text-4xl font-bold tracking-tight">
            Esperienza & Formazione
          </h2>
          <p className="mt-3 text-muted-foreground">
            Percorso professionale e accademico
          </p>
        </motion.div>

        {/* Timeline grid */}
        <div
          className={cn(
            "relative",
            // Mobile: dot-left | card-right
            "grid grid-cols-[auto_1fr]",
            // Desktop: card-left | dot-center | card-right
            "md:grid-cols-[1fr_auto_1fr]",
          )}
        >
          {/* Vertical line */}
          <div
            aria-hidden
            className={cn(
              "absolute top-0 bottom-0 w-px bg-border",
              // Mobile: align with dot center (dot col is ~28px, dot is 16px → center ≈ 12px)
              "left-[11px]",
              // Desktop: true center
              "md:left-1/2 md:-translate-x-1/2",
            )}
          />

          {TIMELINE_ENTRIES.map((entry, i) => (
            <TimelineItem key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

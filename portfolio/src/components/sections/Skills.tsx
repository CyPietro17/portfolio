"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { portfolioData } from "@/lib/data"
import { cn } from "@/lib/utils"

// SimpleIcons CDN slug for each skill (https://cdn.simpleicons.org/{slug})
const SKILL_ICONS: Record<string, string> = {
  // Linguaggi
  "Java":              "logos:java",
  "C#":                "logos:c-sharp",
  "TypeScript":        "logos:typescript-icon",
  "Javascript":        "logos:javascript",
  "Python":            "logos:python",
  "SQL":               "devicon:sqldeveloper",
  "Shell Script":      "logos:bash-icon",
  // Framework & Tools
  "Spring Framework":  "logos:spring-icon",
  "Maven":             "devicon:maven",
  "Hibernate":         "devicon:hibernate",
  "JUnit":             "devicon:junit",
  "Docker":            "logos:docker-icon",
  "Git":               "logos:git-icon",
  "Svn":               "simple-icons:subversion",
  "Robot Framework":   "simple-icons:robotframework",
  "Angular":           "logos:angular-icon",
  "NPM":               "logos:npm",
  "Jenkins":           "logos:jenkins",
  "Cucumber":          "logos:cucumber",
  "JBoss":             "devicon:redhat",
  "Jira":              "logos:jira",
  // Metodologie
  "Agile/Scrum":       "material-symbols:sprint",
  "CI/CD":             "carbon:continuous-deployment",
  "TDD":               "carbon:test-tool",
  "BDD":               "carbon:development"
}

// Per-category visual config: accent border color + badge style
const CATEGORY_CONFIG = [
  {
    accent: "border-l-foreground",
    badgeClass:
      "bg-foreground text-background border border-transparent",
    labelClass: "text-foreground",
  },
  {
    accent: "border-l-muted-foreground/50",
    badgeClass:
      "bg-background text-foreground border border-border hover:bg-muted",
    labelClass: "text-foreground/80",
  },
  {
    accent: "border-l-muted-foreground/25",
    badgeClass:
      "bg-muted text-muted-foreground border border-transparent",
    labelClass: "text-muted-foreground",
  },
] as const

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const badgeContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
          className="mb-12 text-center"
        >
          <h2 className="font-(family-name:--font-geist-sans) text-3xl sm:text-4xl font-bold tracking-tight">
            Competenze
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tecnologie e metodologie con cui lavoro quotidianamente
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.skills.map((category, i) => {
            const config = CATEGORY_CONFIG[i] ?? CATEGORY_CONFIG[0]
            return (
              <motion.div
                key={category.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "rounded-xl bg-card ring-1 ring-foreground/10 p-6",
                  "border-l-4",
                  config.accent
                )}
              >
                {/* Category title */}
                <h3
                  className={cn(
                    "font-(family-name:--font-geist-mono) text-sm font-semibold uppercase tracking-widest mb-5",
                    config.labelClass
                  )}
                >
                  {category.category}
                </h3>

                {/* Badges */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={badgeContainerVariants}
                  className="flex flex-wrap gap-2"
                >
                  {category.items.map((item) => {
                    const slug = SKILL_ICONS[item]
                    return (
                      <motion.span
                        key={item}
                        variants={badgeVariants}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors",
                          config.badgeClass
                        )}
                      >
                        {slug && (
                          <Image
                            src={`https://api.iconify.design/${slug}.svg`}
                            alt=""
                            aria-hidden
                            width={14}
                            height={14}
                            className={cn(
                              "shrink-0",
                              // Invert icons in dark-bg badges so they're readable
                              // i === 0 ? "brightness-0 invert" : ""
                            )}
                          />
                        )}
                        {item}
                      </motion.span>
                    )
                  })}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

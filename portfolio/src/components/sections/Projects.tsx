"use client";

import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { TECH_ICONS, PROJECT_ICONS, portfolioData, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ── Animation variants ──────────────────────────────────────────────────────

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── ProjectCard ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={cn(
        "pt-0 h-full",
        "transition-all duration-300",
        "hover:shadow-lg hover:ring-foreground/20",
      )}
    >
      {/* Screenshot area
      <div className="relative aspect-video bg-muted rounded-t-xl overflow-hidden flex items-center justify-center">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`Screenshot di ${project.name}`}
            fill
            className="object-cover"
          />
        ) : (
          <ImageIcon className="size-8 text-muted-foreground/30" />
        )}
      </div> */}

      <CardHeader>
        <CardTitle className="text-base font-semibold">
          <span className="flex items-center gap-1.5">
            {project.name}
            <img
              src={PROJECT_ICONS[project.name]}
              alt={project.name}
              aria-hidden
              width={30}
              height={30}
              className="shrink-0 object-contain"
            />
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => {
            const slug = TECH_ICONS[tech];
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-foreground text-background border border-transparent"
              >
                {slug && (
                  <Image
                    src={`https://api.iconify.design/${slug}.svg`}
                    alt=""
                    aria-hidden
                    width={13}
                    height={13}
                    className="shrink-0"
                  />
                )}
                {tech}
              </span>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="gap-2 flex-wrap">
        {project.links.map((link) => {
          const isGitHub = link.url.includes("github.com");
          return (
            <Button key={link.label} variant="outline" size="sm" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {isGitHub ? (
                  <FaGithub className="size-3.5" />
                ) : (
                  <ExternalLinkIcon />
                )}
                {link.label}
              </a>
            </Button>
          );
        })}
      </CardFooter>
    </Card>
  );
}

// ── Projects section ────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
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
            Progetti
          </h2>
          <p className="mt-3 text-muted-foreground">
            Progetti personali e applicazioni sviluppate
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {portfolioData.projects.map((project) => (
            <motion.div key={project.name} variants={cardVariants} className="flex flex-col">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
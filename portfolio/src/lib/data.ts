export interface Skill {
  category: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
}

export interface Project {
  name: string
  description: string
  tech: string[]
  links: { label: string; url: string }[]
}

export interface Contact {
  email: string
  linkedin: string
}

export const portfolioData = {
  name: "Pietro Salvatore",
  role: "Software Developer",
  bio: "Specializzato nello sviluppo backend con Java e Spring Framework e automazione dei test, con forte attenzione alla qualità del codice, abituato a lavorare in team Agile/Scrum",
  skills: [
    { category: "Linguaggi", items: ["Java", "C#", "TypeScript", "Python", "SQL", "Shell Script"] },
    { category: "Framework", items: ["Spring Framework", "Robot Framework", "Angular"] },
    { category: "Tools", items: ["Git", "SVN", "Jenkins", "Cucumber", "Gherkin", "JBoss"] },
  ],
  experience: [
    {
      company: "I.T.Svil srl",
      role: "Software Developer",
      period: "Marzo 2023 – Presente",
      description: [
        "Sviluppo e manutenzione su CCH Tagetik",
        "Backend Java/Spring Framework",
        "C# Excel Add-in",
        "Metodologia Agile/Scrum",
      ],
    },
  ],
  education: [
    {
      degree: "Laurea Triennale in Ingegneria Informatica",
      institution: "Universitas Mercatorum",
      period: "2021 – 2024",
    },
  ],
  projects: [
    {
      name: "MediCuore",
      description: "Gestionale per clinica privata",
      tech: ["Java", "Spring", "SQL", "MyBatis", "Angular"],
      links: [
        { label: "Backend", url: "https://github.com/CyPietro17/Meduicuore-api" },
        { label: "Frontend", url: "https://github.com/CyPietro17/MediCuore" },
      ],
    },
  ],
  contact: {
    email: "pietro.salvatore95@protonmail.com",
    linkedin: "https://www.linkedin.com/in/pietro-salvatore-a94ab4243/",
  },
} as const satisfies {
  name: string
  role: string
  bio: string
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
  contact: Contact
}

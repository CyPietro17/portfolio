export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  vote?: string;
  courses?: readonly string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
  //screenshot?: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  whatsapp: string;
}

export const portfolioData = {
  name: "Pietro Salvatore",
  role: "Software Developer",
  bio: "Specializzato nello sviluppo backend con Java e Spring Framework e automazione dei test, con forte attenzione alla qualità del codice, abituato a lavorare in team Agile/Scrum",
  skills: [
    {
      category: "Linguaggi",
      items: [
        "Java",
        "TypeScript",
        "Javascript",
        "Python",
        "C#",
        "SQL",
        "Shell Script",
      ],
    },
    {
      category: "Framework & Tools",
      items: [
        "Spring Framework",
        "Maven",
        "Hibernate",
        "JUnit",
        "Docker",
        "Git",
        "Svn",
        "Robot Framework",
        "Angular",
        "NPM",
        "Jenkins",
        "Jira",
        "Cucumber",
        "Swagger",
        "JBoss",
      ],
    },
    { category: "Metodologie", items: ["Agile/Scrum", "CI/CD", "TDD", "BDD"] },
  ],
  experience: [
    {
      company: "Wolters Kluwer",
      role: "Software Developer",
      period: "Luglio 2023 - Presente",
      description: [
        "Sviluppo e manutenzione progetto backend Java/Spring Framework",
        "Manutenzione progetto Add-in Excel in C#",
        "Automazione test con RobotFramework e Python",
        "Gestione di Database SQL con vari vendor",
        "Gestione e configurazione AS locale (Jboss)",
        "Utilizzo di metodologie Agile framework Scrum",
        "Applicazione della CI/CD con Jenkins",
        "VCS con Git e SVN",
        "Sviluppo di test funzionali con Cucumber e Gherkin",
      ],
    },

    {
      company: "I.T.Svil",
      role: "Software Developer",
      period: "Marzo 2023 - Presente",
      description: [
        "Consulenaza per Wolters Kluwer sul prodotto CCH Tagetik",
        "Academy su Sviluppo backend Java/Spring Framework",
        "Academy su Sviluppo frontend Angular",
      ],
    },
  ],
  education: [
    {
      degree: "Laurea Triennale in Ingegneria Informatica",
      institution: "Universitas Mercatorum",
      period: "2021 – 2024",
      vote: "103/110",
      courses: [
        "Ingegneria del Software",
        "Basi di Dati",
        "Reti di Calcolatori",
        "Sistemi Operativi",
        "Algoritmi e Strutture Dati",
        "Programmazione in C",
      ],
    },
  ],
  projects: [
    {
      name: "MediCuore",
      description:
        "Applicazione gestionale per clinica privata - gestione pazienti e operatori",
      tech: ["Java", "Spring Framework", "SQL", "Angular", "TypeScript"],
      links: [
        {
          label: "Backend GitHub",
          url: "https://github.com/CyPietro17/Meduicuore-api",
        },
        {
          label: "Frontend GitHub",
          url: "https://github.com/CyPietro17/MediCuore",
        },
      ],
    },
  ],
  contact: {
    email: "pietro.salvatore95@protonmail.com",
    linkedin: "https://www.linkedin.com/in/pietro-salvatore-a94ab4243/",
    whatsapp: "393894361538",
  },
} as const satisfies {
  name: string;
  role: string;
  bio: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  contact: Contact;
};

// SimpleIcons CDN slug for each skill (https://cdn.simpleicons.org/{slug})
export const TECH_ICONS: Record<string, string> = {
  // Linguaggi
  Java: "logos:java",
  "C#": "logos:c-sharp",
  TypeScript: "logos:typescript-icon",
  Javascript: "logos:javascript",
  Python: "logos:python",
  SQL: "devicon:sqldeveloper",
  "Shell Script": "logos:bash-icon",
  // Framework & Tools
  "Spring Framework": "logos:spring-icon",
  Maven: "devicon:maven",
  Hibernate: "devicon:hibernate",
  JUnit: "devicon:junit",
  Docker: "logos:docker-icon",
  Git: "logos:git-icon",
  Svn: "simple-icons:subversion",
  "Robot Framework": "simple-icons:robotframework",
  Angular: "logos:angular-icon",
  NPM: "logos:npm",
  Jenkins: "logos:jenkins",
  Jira: "logos:jira",
  Cucumber: "logos:cucumber",
  Swagger: "devicon:swagger",
  JBoss: "devicon:redhat",
  // Metodologie
  "Agile/Scrum": "material-symbols:sprint",
  "CI/CD": "carbon:continuous-deployment",
  TDD: "carbon:test-tool",
  BDD: "carbon:development",
};

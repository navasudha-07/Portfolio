// ============================================================
// PORTFOLIO DATA — Source of truth: Nava Sudha S resume
// ============================================================

export const personal = {
  name: "Nava Sudha S",
  firstName: "Nava Sudha",
  role: "UI/UX Designer",
  email: "navasudha07@gmail.com",
  phone: "8072980932",
  linkedin: "https://linkedin.com/in/nava-sudha-s0707",
  linkedinHandle: "nava-sudha-s0707",
  github: "https://github.com/navasudha-07",
  githubHandle: "navasudha-07",
  summary:
    "Aspiring to start my career in the IT industry where I can utilize my knowledge in programming and web technologies to develop efficient solutions and gain practical experience.",
  extraContent: "I am passionate about creating visually stunning and highly functional interfaces. I believe in continuous learning, exploring new design trends, and applying them to real-world projects. From conceptualization to final execution, I focus on building digital experiences that are both beautiful and user-friendly.",
  tagline: "Designing Digital Experiences That Feel Simple.",
};

export const skills = [
  {
    name: "Figma",
    category: "design",
    highlight: true,
    description: "UI/UX prototyping & wireframing",
  },
  {
    name: "Canva",
    category: "design",
    highlight: true,
    description: "Visual design & graphics",
  },
  {
    name: "HTML",
    category: "web",
    highlight: false,
    description: "Web markup & structure",
  },
  {
    name: "MS PowerPoint",
    category: "productivity",
    highlight: false,
    description: "Presentation design",
  },
  {
    name: "MS Word",
    category: "productivity",
    highlight: false,
    description: "Document creation",
  },
  {
    name: "Basic Computer Knowledge",
    category: "general",
    highlight: false,
    description: "Core computing fundamentals",
  },
  {
    name: "Problem Solving",
    category: "soft",
    highlight: false,
    description: "Analytical thinking",
  },
  {
    name: "Teamwork",
    category: "soft",
    highlight: false,
    description: "Collaborative work",
  },
];

export const experience = [
  {
    title: "UI/UX Designer Intern",
    company: "DigiSailor",
    companyUrl: "https://www.digisailor.com/",
    type: "Internship",
    responsibilities: [
      "Completed a UI/UX Design internship at DigiSailor.",
      "Worked on designing user-friendly interfaces.",
      "Gained hands-on experience in wireframing and prototyping.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Structural Health Monitoring System",
    shortTitle: "SHMS",
    description:
      "A real-time structural health monitoring system built using sensor data, providing live visualization and automated safety reporting.",
    highlights: [
      "Built a real-time monitoring system using sensor data",
      "Developed live graph visualization and alerts",
      "Generated automated PDF reports",
      "Implemented safety threshold monitoring",
    ],
    tech: ["Python"],
    color: "#19B8D1",
  },
];

export const designProjects = [
  {
    id: 1,
    title: "Expense Tracker App",
    description:
      "Mobile finance app UI — splash screen design with clean typography and depth.",
    imageIndex: 0,
  },
  {
    id: 2,
    title: "Transaction History Screen",
    description:
      "Clean transaction list UI with category filtering and real-time history.",
    imageIndex: 1,
  },
  {
    id: 3,
    title: "Budget Goals Screen",
    description:
      "Budget goals tracking UI with visual progress indicators per category.",
    imageIndex: 2,
  },
];

export const certifications = [
  {
    title: "UI/UX Designing Internship",
    issuer: "DigiSailor",
    url: "https://www.digisailor.com/",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Kamaraj College (Autonomous)",
    university: "",
    period: "2025 – Present",
    current: true,
  },
  {
    degree: "B.Sc Information Technology",
    institution: "Pope's College",
    university: "Manonmaniam Sundaranar University",
    period: "2022 – 2025",
    current: false,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Subbiah Vidhyalayam Higher Secondary School",
    university: "",
    period: "2021 – 2022",
    current: false,
  },
];

export const languages = [
  { name: "Tamil", level: 5 },
  { name: "English", level: 4 },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

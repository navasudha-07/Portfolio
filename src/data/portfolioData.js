// ============================================================
// PORTFOLIO DATA — Nava Sudha S
// ============================================================

export const personal = {
  name: "Nava Sudha S",
  firstName: "Nava Sudha",
  studioName: "NAVA SUDHA",
  role: "UI/UX Designer & Creative Tech",
  email: "navasudha07@gmail.com",
  phone: "8072980932",
  phoneFormatted: "+91 80729 80932",
  location: "Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/nava-sudha-s0707",
  linkedinHandle: "nava-sudha-s0707",
  github: "https://github.com/navasudha-07",
  githubHandle: "navasudha-07",
  summary:
    "Aspiring to start my career in the IT industry where I can utilize my knowledge in programming and web technologies to develop efficient solutions and gain practical experience.",
  extraContent:
    "I am passionate about creating visually stunning and highly functional interfaces. I believe in continuous learning, exploring new design trends, and applying them to real-world projects. From conceptualization to final execution, I focus on building digital experiences that are both beautiful and user-friendly.",
  tagline: "Designing digital experiences that feel simple, fluid, and alive.",
  knockNotice: "Knock on the glass · navasudha07@gmail.com",
}

export const tankProjects = [
  {
    id: "kiwi-kiosk",
    number: "01",
    title: "KIWI — Restaurant & Café Kiosk",
    headline: "Self-ordering touchscreen kiosk & tableside dining model.",
    category: "DESIGN",
    genre: ["UI/UX", "Kiosk Model", "Figma", "Ergonomics"],
    year: "2025",
    propImage: "/projects/kiwi/kiwi_welcome.png",
    propAlt: "KIWI Restaurant & Café touch ordering kiosk screen",
    isKioskPresentation: true,
    kioskScreens: [
      {
        id: "welcome",
        title: "Welcome & Splash",
        subtitle: "Where Every Bite Tells a Story",
        image: "/projects/kiwi/kiwi_welcome.png",
        tag: "Kiosk Attract Mode",
        desc: "Rich crimson brand identity with prominent amber touch CTA ('Start Ordering →'), instant dietary badges (Spicy Specials, Veg Options, Award Winning, Quick Service), and warm appetizing glow."
      },
      {
        id: "menu",
        title: "Interactive Menu & Deals",
        subtitle: "Category Filtering & Daily Chef Specials",
        image: "/projects/kiwi/kiwi_menu.png",
        tag: "Browse & Deals Engine",
        desc: "Tactile card hierarchy featuring Today's Special (Kiwi Signature Biryani ₹449), promotional deal cards (25% off, B1G1), category chips (Biryani, Thali, Snacks, Pizza, Burgers), and quick-add counters."
      },
      {
        id: "customize",
        title: "Item Customization Sheet",
        subtitle: "Spiciness, Ingredients & Nutrition",
        image: "/projects/kiwi/kiwi_item_detail.png",
        tag: "Micro-Interactions",
        desc: "Ergonomic bottom modal with nutritional data (180 cal, 8 min prep), spice and oil customization chips, special instruction inputs, quantity adjuster, and cross-selling recommendations."
      },
      {
        id: "cart",
        title: "Cart & Bill Summary",
        subtitle: "Transparent Tax Breakdown & Coupon Engine",
        image: "/projects/kiwi/kiwi_cart.png",
        tag: "Frictionless Checkout",
        desc: "Instant quantity controls, promotional coupon tags (KIWI100, BIRYANILOVE, FAMILY799), detailed SGST/CGST tax clarity, and high-visibility checkout button with multiple payment options."
      },
      {
        id: "table-auth",
        title: "Table-side Dining & Auth",
        subtitle: "Your Table, Your Way",
        image: "/projects/kiwi/kiwi_table_auth.png",
        tag: "Guest & OTP Journey",
        desc: "Dual-card layout enabling diners to order directly from table seating with seamless guest checkout or 10-digit mobile OTP authentication."
      }
    ],
    description:
      "A production-grade UI/UX self-ordering restaurant kiosk and tableside dining model crafted in Figma. Architected for rapid ordering velocity, standing-distance touch ergonomics, and mouth-watering food presentation that eliminates dining hall congestion.",
    highlights: [
      "Ergonomically tuned for standing kiosk touchscreens with large 48px+ finger tap targets",
      "High-contrast crimson and gold appetizing brand palette with accessible typographic hierarchy",
      "Dynamic promotional deal carousel & real-time coupon discount engine",
      "Modular item customization flow for dietary preferences, spice levels, and cooking notes",
      "Comprehensive guest checkout and mobile OTP table-ordering architecture"
    ],
    tools: ["Figma", "UI/UX Architecture", "Touch Ergonomics", "Design Systems"],
    actionLabel: "Explore Kiosk",
    externalUrl: "https://github.com/navasudha-07",
  },
  {
    id: "expense-tracker",
    number: "02",
    title: "Expense Tracker App",
    headline: "Mobile finance that makes numbers quiet and clear.",
    category: "DESIGN",
    genre: ["UI/UX", "Mobile", "Figma"],
    year: "2025",
    propImage: "/tank/finance_phone.jpg",
    propAlt: "3D submerged smartphone showing Expense Tracker UI",
    description:
      "A thoughtfully crafted mobile finance application designed from wireframes to high-fidelity prototypes in Figma. Focuses on effortless daily tracking, category breakdown rings, and clean typographic hierarchy that eliminates financial cognitive overload.",
    highlights: [
      "Custom design system with 8px fluid layout grid",
      "Interactive category spend visualization & charts",
      "One-handed micro-interaction navigation flows",
      "Dark and light contrast tuned for quick glanceability",
    ],
    tools: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    actionLabel: "Explore Design",
    externalUrl: "https://github.com/navasudha-07",
  },
  {
    id: "shms",
    number: "03",
    title: "Structural Health Monitoring",
    headline: "Realtime Sensor Telemetry & Automated Safety Logic.",
    category: "TECH",
    genre: ["Python", "Sensors", "Analytics"],
    year: "2025",
    propImage: "/tank/sensor_cube.jpg",
    propAlt: "3D submerged glowing sensor cube",
    description:
      "An intelligent structural monitoring system built using sensor telemetry, live frequency graphing, and automated threshold alert logic. Analyzes stress, vibration, and environmental load in real time, auto-generating compliance reports before hazards occur.",
    highlights: [
      "Real-time sensor data ingest and streaming pipeline",
      "Live dynamic waveform visualization with alert thresholds",
      "Automated inspection report generation (PDF)",
      "Fault detection algorithm with instant safety flags",
    ],
    tools: ["Python", "Data Visualization", "Sensor APIs", "Analytics"],
    actionLabel: "View Source",
    externalUrl: "https://github.com/navasudha-07",
  },
  {
    id: "transaction-history",
    number: "04",
    title: "Transaction Ledger Screen",
    headline: "A rhythmic timeline for every financial footprint.",
    category: "DESIGN",
    genre: ["UI/UX", "FinTech", "Figma"],
    year: "2025",
    propImage: "/tank/finance_phone.jpg",
    propAlt: "Clean transaction history screen UI",
    description:
      "A modular transaction history interface designed with search filtering, merchant icons, and multi-state receipts. Built to make statements readable at a glance without cluttered tables or nested menus.",
    highlights: [
      "Dynamic filtering by month, merchant category, and status",
      "Collapsible card receipts with tactile expand states",
      "Accessible color-coded cash in/out indicators",
      "High polish interaction states and empty screen states",
    ],
    tools: ["Figma", "Design Systems", "Visual Hierarchy"],
    actionLabel: "View Screens",
    externalUrl: "https://github.com/navasudha-07",
  },
  {
    id: "digisailor-internship",
    number: "05",
    title: "DigiSailor UI/UX Internship",
    headline: "Wireframing and user journeys built for production teams.",
    category: "EXPERIENCE",
    genre: ["Internship", "UI/UX", "Case Study"],
    year: "2024",
    propImage: "/tank/wireframe_layers.jpg",
    propAlt: "3D frosted glass wireframe layers in water",
    description:
      "Hands-on UI/UX design internship at DigiSailor. Collaborated with development squads to translate complex client briefs into clean user flows, interactive Figma wireframes, and production-ready component libraries.",
    highlights: [
      "Developed responsive component libraries and design tokens",
      "Created low to high-fidelity wireframes and interactive user tests",
      "Collaborated closely with frontend developers for pixel-perfect execution",
      "Earned certified recognition for outstanding design contributions",
    ],
    tools: ["Figma", "Wireframing", "User Research", "Prototyping"],
    actionLabel: "View Credentials",
    externalUrl: "https://www.digisailor.com/",
  },
  {
    id: "budget-goals",
    number: "06",
    title: "Budget Goals & Savings UI",
    headline: "Gamified progress rings that turn saving into a habit.",
    category: "DESIGN",
    genre: ["UI/UX", "Mobile", "Figma"],
    year: "2025",
    propImage: "/tank/finance_phone.jpg",
    propAlt: "Mobile budget goals UI screen",
    description:
      "A visually rewarding savings target interface that presents monthly budget thresholds as calm progress meters. Employs soft gradients, celebratory micro-animations, and actionable savings pacing recommendations.",
    highlights: [
      "Custom radial and linear progress indicators",
      "Goal timeline projection calculator",
      "Tactile milestone celebrations and reward cues",
    ],
    tools: ["Figma", "Micro-interactions", "User Psychology"],
    actionLabel: "Inspect Prototype",
    externalUrl: "https://github.com/navasudha-07",
  },
  {
    id: "mca-academic",
    number: "07",
    title: "Master of Computer Applications",
    headline: "Bridging computer science rigor with design intuition.",
    category: "TECH",
    genre: ["Education", "MCA", "Web Tech"],
    year: "2025–Present",
    propImage: "/tank/wireframe_layers.jpg",
    propAlt: "Technical foundation artboard",
    description:
      "Pursuing MCA at Kamaraj College (Autonomous) following a B.Sc in Information Technology from Pope's College (Manonmaniam Sundaranar University). Combining software architecture, database foundations, and modern web UI technologies.",
    highlights: [
      "Advanced studies in software engineering and algorithms",
      "Modern web architecture, frontend logic & systems design",
      "Consistent academic excellence and project leadership",
    ],
    tools: ["Python", "Web Tech", "HTML/CSS", "Database Systems"],
    actionLabel: "Read Bio",
    externalUrl: "https://linkedin.com/in/nava-sudha-s0707",
  },
]

export const availableDolls = [
  {
    id: "axolotl",
    name: "Lola",
    species: "Aquarium Axolotl",
    avatar: "/tank/axolotl.jpg",
    glowColor: "rgba(244, 114, 182, 0.75)",
    accentColor: "#f472b6",
    bubbleClass: "axolotl-speech",
    pitch: 580,
    quotes: [
      "Whenever we cannot decide on a layout...",
      "We prototype.",
      "Knock on the glass to wake up an idea.",
      "Simple designs always float to the top.",
      "Good UX is like clean water — completely invisible.",
    ],
  },
  {
    id: "octopus",
    name: "Inky",
    species: "Coral Octopus",
    avatar: "/tank/octopus.jpg",
    glowColor: "rgba(248, 113, 113, 0.75)",
    accentColor: "#f87171",
    bubbleClass: "coral-bubble",
    pitch: 440,
    quotes: [
      "We fight for the user.",
      "Eight arms to test eight viewport sizes.",
      "Knock twice for coffee and Figma files.",
      "Check out Nava Sudha's projects on the right!",
      "Drop an email to knockonglass@navasudha07@gmail.com!",
    ],
  },
  {
    id: "jellyfish",
    name: "Aura",
    species: "Bioluminescent Jelly",
    avatar: "/tank/jellyfish.jpg",
    glowColor: "rgba(56, 189, 248, 0.8)",
    accentColor: "#38bdf8",
    bubbleClass: "cyan-bubble",
    pitch: 660,
    quotes: [
      "Bioluminescent ideas glow in the deep.",
      "Fluid interactions make users feel weightless.",
      "Design systems are like underwater currents — seamless.",
      "Translucent glass and clean typography.",
      "Let's build something memorable together.",
    ],
  },
  {
    id: "puffer",
    name: "Bubbles",
    species: "Golden Puffer",
    avatar: "/tank/puffer.jpg",
    customGlow: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    glowColor: "rgba(251, 191, 36, 0.75)",
    accentColor: "#fbbf24",
    bubbleClass: "gold-bubble",
    pitch: 520,
    quotes: [
      "Don't panic when requirements puff up!",
      "Turning complex problems into clean UI.",
      "Breathe in, wireframe, iterate.",
      "Pixel perfection in every viewport.",
    ],
  },
]

export const tankCreatures = {
  axolotl: availableDolls[0],
  octopus: availableDolls[1],
}

export const skills = [
  { name: "Figma", category: "design", highlight: true, description: "UI/UX prototyping & wireframing" },
  { name: "Canva", category: "design", highlight: true, description: "Visual design & graphics" },
  { name: "HTML5 / CSS3", category: "web", highlight: true, description: "Semantic web markup & styling" },
  { name: "Python", category: "tech", highlight: true, description: "Scripting & data monitoring logic" },
  { name: "Wireframing", category: "design", highlight: true, description: "User flows & low-fi blueprints" },
  { name: "Design Systems", category: "design", highlight: true, description: "Reusable components & token styles" },
  { name: "MS PowerPoint", category: "productivity", highlight: false, description: "Executive presentation decks" },
  { name: "MS Word", category: "productivity", highlight: false, description: "Documentation & reports" },
  { name: "Problem Solving", category: "soft", highlight: false, description: "Analytical user journey thinking" },
  { name: "Collaborative Teamwork", category: "soft", highlight: false, description: "Cross-functional design & dev sync" },
]

export const experience = [
  {
    title: "UI/UX Designer Intern",
    company: "DigiSailor",
    companyUrl: "https://www.digisailor.com/",
    period: "2024",
    type: "Internship",
    responsibilities: [
      "Completed intensive UI/UX Design internship at DigiSailor.",
      "Transformed business specs into intuitive, user-friendly mobile and web wireframes.",
      "Engineered comprehensive interactive prototypes and usability feedback loops.",
    ],
  },
]

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
]

export const contactPearls = [
  {
    id: "email",
    label: "EMAIL",
    value: "navasudha07@gmail.com",
    href: "mailto:navasudha07@gmail.com",
    color: "#f87171",
    ambient: "rgba(248, 113, 113, 0.4)",
    hint: "Direct inbox — click to mail",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "nava-sudha-s0707",
    href: "https://linkedin.com/in/nava-sudha-s0707",
    color: "#60a5fa",
    ambient: "rgba(96, 165, 250, 0.4)",
    hint: "Connect on LinkedIn",
  },
  {
    id: "github",
    label: "GITHUB",
    value: "navasudha-07",
    href: "https://github.com/navasudha-07",
    color: "#a78bfa",
    ambient: "rgba(167, 139, 250, 0.4)",
    hint: "Explore repositories",
  },
  {
    id: "phone",
    label: "PHONE",
    value: "+91 80729 80932",
    href: "tel:8072980932",
    color: "#34d399",
    ambient: "rgba(52, 211, 153, 0.4)",
    hint: "Call / WhatsApp",
  },
  {
    id: "location",
    label: "LOCATION",
    value: "Tamil Nadu, India",
    href: "#",
    color: "#fbbf24",
    ambient: "rgba(251, 191, 36, 0.4)",
    hint: "Open to Relocate / Remote",
  },
]


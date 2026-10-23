import { Project, SkillGroup, Achievement, Experience, Certification, EducationInfo } from '../types';

export const PERSONAL_INFO = {
  name: 'SYED FAIZAN ALI',
  shortName: 'Faizan Ali',
  title: 'AI & ML Undergraduate · Full-Stack & 3D Web Developer',
  primaryTagline: 'Building Ideas Into Intelligent Experiences.',
  secondaryTaglines: [
    'Turning Ideas Into Interactive Experiences.',
    'Code With Purpose. Design With Imagination.',
    'Exploring Intelligence. Engineering Possibilities.',
    'Building the Future, One Project at a Time.'
  ],
  heroKicker: 'AI & Machine Learning · Web Development · Creative Technology · Hackathons',
  bioIntro: "I'm a BCA student specializing in Artificial Intelligence and Machine Learning, passionate about web development, interactive 3D experiences, and building technology that solves real-world problems.",
  aboutParagraphs: [
    "I'm Syed Faizan Ali, a Bachelor of Computer Applications (BCA) student specializing in Artificial Intelligence and Machine Learning at Scope Global Skill University (SGSU), Bhopal.",
    "I'm passionate about technology, software development, and transforming creative ideas into practical digital experiences. My interests span web development, AI-powered applications, interactive 3D websites, and intelligent systems.",
    "I enjoy learning by building. From developing management systems in C++ to collaborating on AI chatbot projects and creating innovative solutions for hackathons, I continuously look for opportunities to strengthen my technical skills and solve real-world problems.",
    "Beyond coding, I enjoy exploring UI/UX design, experimenting with emerging technologies, participating in technology events, and collaborating with others to turn ambitious ideas into working prototypes.",
    "My goal is to become a skilled developer who combines technical knowledge, creativity, and problem-solving to build meaningful technology for the future."
  ],
  philosophy: "Code with purpose. Design with imagination. Build with impact.",
  philosophySubtext: "I believe technology becomes meaningful when creativity meets problem-solving. Every project is an opportunity to learn something new, challenge limitations, and turn ideas into experiences that make a difference.",
  email: 'faizanzafarali385@gmail.com',
  linkedin: 'https://www.linkedin.com/in/syed-faizan-ali-aa132a37a/',
  github: 'https://github.com',
  location: 'Bhopal, Madhya Pradesh, India',
  coordinates: '23.2599° N, 77.4126° E',
};

export const EDUCATION: EducationInfo = {
  degree: 'Bachelor of Computer Applications (BCA)',
  specialization: 'Artificial Intelligence and Machine Learning',
  university: 'Scope Global Skill University (SGSU)',
  location: 'Bhopal, Madhya Pradesh, India',
  duration: '2025 – Present',
  status: 'Second Year, Third Semester',
  sgpa: '8.7',
  areas: [
    'Programming Fundamentals',
    'Python and C++',
    'Web Development',
    'Artificial Intelligence and Machine Learning',
    'Data Analysis',
    'Database Management',
    'Software Development'
  ]
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    skills: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Python (Basic)', 'C++ (Basic)', 'JSON']
  },
  {
    category: 'Frontend Development',
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Responsive Web Design', 'React Router', 'shadcn/ui']
  },
  {
    category: '3D Web Development & Animation',
    skills: ['Three.js', 'MapLibre GL JS', 'Framer Motion', 'GSAP', 'Interactive 3D Experiences', 'UI Animation']
  },
  {
    category: 'AI, Machine Learning & Data Science',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'NLTK', 'spaCy', 'Natural Language Processing']
  },
  {
    category: 'Backend & Database Technologies',
    skills: ['FastAPI', 'Python', 'PostgreSQL', 'Supabase', 'SQLAlchemy', 'Database Fundamentals', 'Authentication & APIs']
  },
  {
    category: 'Tools & Services',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Cloudinary', 'Algolia', 'Razorpay', 'Stripe']
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'smartuni-ai',
    title: 'SmartUni.Ai',
    tagline: 'One University. One Intelligent Campus.',
    category: 'Full-Stack & AI',
    badge: 'Comprehensive Smart Campus',
    headline: 'Unified AI-powered university ecosystem streamlining campus administration and student life.',
    description: 'SmartUni.Ai is a smart campus platform concept designed to bring essential university services into one connected digital ecosystem. It aims to reduce fragmented administrative processes and make campus services more accessible to students, faculty, and administrators.',
    keyFeatures: [
      'AI-powered campus conversational assistant',
      'Smart attendance concept utilizing face verification & geolocation',
      'Verified digital academic certificates vault',
      'Hostel and transport logistics coordination',
      'Dynamic timetable and academic service scheduling',
      'Unified fee management and student helpdesk ticketing',
      'Parent portal with academic progress insights',
      'Canteen pre-ordering system with queue minimization',
      'Interactive 3D AI avatar concierge concept',
      'Role-based access portals (Student, Faculty, Admin)'
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'FastAPI', 'Python', 'PostgreSQL', 'Supabase'],
    goal: 'To create a unified digital campus that improves administrative efficiency, accessibility, transparency, and student experience.',
    metrics: [
      { label: 'Integrated Modules', value: '12 Portals' },
      { label: 'Admin Friction', value: '-65% Estimated' },
      { label: 'Access Speed', value: '<200ms API' }
    ],
    accentColor: '#75C5DE',
    baseImage: '/SmartUni.AI Digital University Logo.png',
    secondaryImage: '/Smartuni2.png',
    secondaryTag: 'Unified Smart Dashboard'
  },
  {
    id: 'gullymart',
    title: 'GullyMart',
    tagline: 'Local Commerce Meets Spatial Community',
    category: '3D & Social Commerce',
    team: 'The Vibe Coders',
    badge: 'Hackathon Innovation',
    headline: 'Hyperlocal social commerce empowering neighborhood merchants through interactive 3D spatial discovery.',
    description: 'GullyMart is a social commerce platform concept focused on helping local sellers connect with nearby customers through digital storefronts, community engagement, and location-based discovery.',
    keyFeatures: [
      'Interactive 3D city map with dynamic geolocation pins',
      'Nearby local business & bazaar discovery',
      'Digital storefronts with fast catalog browsing',
      'Seller inventory management dashboard',
      'Community social feed & merchant stories',
      'Real-time customer-seller direct communication',
      'Interactive digital bargaining mechanism',
      'Order fulfillment tracking & digital wallet interface',
      'GullyCoins gamified community loyalty program'
    ],
    loyaltySystem: '100 GullyCoins = ₹1',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vite', 'MapLibre GL JS', 'Three.js', 'Supabase', 'Framer Motion', 'GSAP'],
    goal: 'To empower local businesses with digital tools and create a more interactive, community-driven shopping experience.',
    metrics: [
      { label: 'Loyalty Reward', value: '100 Coins = ₹1' },
      { label: 'Map Engine', value: 'MapLibre + Three.js' },
      { label: 'Community Feed', value: 'Hyperlocal' }
    ],
    accentColor: '#C6283D',
    baseImage: '/GullyMart Local Shops Logo Banner.png',
    secondaryImage: '/Gullymart2.png',
    secondaryTag: '3D Spatial Discovery'
  },
  {
    id: 'sgsu-chatbot',
    title: 'SGSU AI Chatbot',
    tagline: 'Conversational University Intelligence',
    category: 'Conversational AI',
    badge: 'SGSU INNOVATE AI Hackathon',
    headline: 'AI assistant designed to make complex university guidelines, exams, and notices instantly conversational.',
    description: 'Developed in the context of the SGSU INNOVATE AI Hackathon, this project explored using conversational AI to make university-related information effortlessly accessible to students and faculty.',
    keyFeatures: [
      'Conversational NLP answering academic and admission inquiries',
      'Syllabus, exam schedule, and circular lookups',
      'Contextual multi-turn dialogue with student context',
      'Collaborative prompt engineering and knowledge indexing'
    ],
    technologies: ['Python', 'FastAPI', 'Natural Language Processing', 'NLTK', 'React', 'Tailwind CSS'],
    goal: 'Simplify access to university information, explore AI student assistance, improve student experience, and encourage practical AI learning.',
    metrics: [
      { label: 'Hackathon Track', value: 'AI Innovation' },
      { label: 'Query Resolution', value: 'Instant' },
      { label: 'Team Effort', value: 'SGSU Innovate' }
    ],
    accentColor: '#38BDF8',
    baseImage: '/sgsubot1.png',
    secondaryImage: '/sgsubot2.png',
    secondaryTag: 'Conversational NLP Engine'
  },
  {
    id: 'attendance-system',
    title: 'Attendance Management System',
    tagline: 'Algorithmic Precision in C++',
    category: 'Core Systems',
    badge: 'C++ Academic Foundation',
    headline: 'High-performance structured console management system practicing core programming invariants.',
    description: 'A robust C++ academic software engineering project designed to organize student attendance records, calculate eligibility ratios, and ensure data integrity.',
    keyFeatures: [
      'Structured record indexing with binary file persistence',
      'Real-time student attendance percentage computation',
      'Defaulter warning triggers for attendance thresholds',
      'Comprehensive reporting and student ledger filtering'
    ],
    technologies: ['C++', 'Object-Oriented Programming', 'File I/O Streams', 'Data Structures', 'Algorithmic Logic'],
    goal: 'Organize student information, maintain structured records, and practice fundamental memory and logical problem-solving.',
    metrics: [
      { label: 'Core Language', value: 'C++' },
      { label: 'Persistence', value: 'Structured I/O' },
      { label: 'Execution', value: 'Zero Overhead' }
    ],
    accentColor: '#A78BFA',
    baseImage: '/EduTrack Education Progress Logo.png',
    secondaryImage: '/Edutrack2.png',
    secondaryTag: 'C++ Algorithmic Core'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'viksit-bharat-first-prize',
    title: 'First Prize Winner',
    event: 'BGI Viksit Bharat 2047 Hackathon',
    theme: 'Smart Mobility, EVs and Logistics',
    prize: '₹25,000 Cash Prize',
    award: 'Champion / First Place',
    date: '2025',
    highlight: true,
    description: 'Participated in a highly competitive innovation hackathon focused on solving critical real-world mobility and logistic challenges through technology, clean architecture, and rapid prototyping.'
  },
  {
    id: 'sgsu-innovate-hackathon',
    title: 'Finalist & Presenter',
    event: 'SGSU INNOVATE AI Hackathon',
    theme: 'Artificial Intelligence in Education',
    award: 'Innovative AI Prototype',
    date: '2025',
    highlight: false,
    description: 'Collaborated with a multidisciplinary team to build and showcase the SGSU AI Chatbot, bringing conversational accessibility to university academic information.'
  },
  {
    id: 'tech-innovation-activities',
    title: 'Civic & Tech Contributor',
    event: 'SGSU Innovation Initiatives',
    theme: 'Smart Campus & Civic Technologies',
    award: 'Active Innovator',
    date: '2025 – 2026',
    highlight: false,
    description: 'Active participant in campus hackathons, open workshops, and developer meetups spanning artificial intelligence, full-stack web, and interactive 3D computing.'
  }
];

export const INTERNSHIP: Experience = {
  role: 'Cyber Warrior Intern',
  company: 'Quick Heal Foundation',
  department: 'Media Team',
  focus: 'Cyber Safety Awareness & Digital Threat Education',
  responsibilities: [
    'Created concepts, visual storyboards, and scripts for engaging cybersecurity awareness reels.',
    'Developed promotional video concepts and interactive narratives for the Antifraud.AI application.',
    'Formulated high-impact social media content and digital security awareness campaigns.',
    'Prepared structured presentations and interactive educational activities for youth audiences.',
    'Researched and distilled complex attack vectors: phishing, online banking fraud, AI voice cloning, deepfakes, and digital safety hygiene.',
    'Translated technical cybersecurity concepts into accessible, engaging public media formats.'
  ],
  skillsDeveloped: [
    'Creative Communication & Scripting',
    'Cybersecurity Threat Awareness',
    'Media Content Strategy',
    'Storytelling & Educational Design',
    'Teamwork & Presentation'
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'HTML Certificate',
    issuer: 'NSDC (National Skill Development Corporation)',
    year: 'Verified'
  },
  {
    name: 'CSS Certificate',
    issuer: 'NSDC (National Skill Development Corporation)',
    year: 'Verified'
  },
  {
    name: 'JavaScript Certificate',
    issuer: 'Verified Technical Certification',
    year: '2026'
  }
];

export const PERSONAL_INTERESTS = [
  {
    title: 'Sketching & Visual Creativity',
    description: 'Exploring pencil sketches and visual ideas, which directly informs intuition for creative UI design, layout balance, and digital experiences.'
  },
  {
    title: 'Gaming & Virtual Worlds',
    description: 'Fueling curiosity about immersive 3D environments, physics simulations, lighting, and interactive spatial interfaces.'
  },
  {
    title: 'Stock Market & FinTech',
    description: 'Analyzing financial markets, algorithmic trends, economic indicators, and how technology disrupts global capital.'
  },
  {
    title: 'Emerging Technologies & AI',
    description: 'Experimenting with cutting-edge developer tools, generative models, creative code, and novel ways to build practical digital products.'
  }
];

export const LANGUAGES = [
  { name: 'Hindi', proficiency: 'Native / Fluent' },
  { name: 'English', proficiency: 'Professional Working' },
  { name: 'Urdu', proficiency: 'Fluent' },
  { name: 'Arabic', proficiency: 'Reading Proficiency' }
];

export const PERSONAL_STRENGTHS = [
  'Creative Problem-Solving',
  'Continuous Learning',
  'Team Collaboration',
  'Adaptability',
  'Visual & Spatial Thinking',
  'Communication & Storytelling',
  'Curiosity & Rapid Prototyping',
  'Innovative Product Thinking'
];

export const CURRENTLY_EXPLORING = [
  'Building responsive full-stack web applications with React, Next.js & FastAPI',
  'Exploring practical AI, NLP, and machine learning pipelines',
  'Creating cinematic 3D websites with Three.js, GSAP & WebGL shaders',
  'Developing student-focused and community-driven digital platforms',
  'Strengthening core algorithmic problem solving and data structures',
  'Participating in high-tempo national hackathons and innovation sprints'
];

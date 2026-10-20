# Syed Faizan Ali — Personal Portfolio & Creative Web Showcase

<div align="center">

![Portfolio Banner](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80)

### **Building Ideas Into Intelligent Experiences.**

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WebGL2](https://img.shields.io/badge/WebGL2-Shader_Graphics-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

[**Explore Live Demo**](https://faizanzafarali385-star.github.io/Pixel_me.Faizan/) · [**View Source Code**](https://github.com/faizanzafarali385-star/Pixel_me.Faizan) · [**Report Bug**](https://github.com/faizanzafarali385-star/Pixel_me.Faizan/issues)

</div>

---

## 🌟 Overview

Welcome to the personal portfolio and creative engineering showcase of **Syed Faizan Ali** — an AI & ML undergraduate, full-stack developer, and creative web builder based in Bhopal, India. 

This project is a high-performance, dark-aesthetic portfolio engineered to blend architectural typography, responsive layouts, interactive WebGL shader graphics, and interactive project case studies.

---

## ✨ Key Features & Creative Effects

- **✨ WebGL Pixel Trail Cursor Effect**: Custom shader-powered pixel trail running on WebGL2 (`PixelTrail`), creating a reactive, sparkling particle dissipation effect trailing behind the cursor.
- **🎨 Interactive Pixel Transition**: Custom canvas/DOM pixelated image morphing and glitch reveal animations on project cards (`PixelTransition`).
- **🏛️ Architectural Dark Monolith Design**: Handcrafted design system built on deep obsidian tones (`#101820`), soft arctic highlights (`#75C5DE`), crimson focal accents (`#C6283D`), and crisp monospace typography.
- **📱 Comprehensive Responsive Experience**: Fluid adaptive layouts from mobile phones to high-resolution ultrawide desktop displays.
- **💼 Interactive Case Study Modals**: Deep-dive modals highlighting project architecture, key technical features, metrics, and technology stacks.
- **📬 Interactive Slide-Over Inquiry Drawer**: Seamless contact drawer with copy-to-clipboard contact details and interactive project inquiry forms.
- **🎓 Verified Credentials & Academics**: Displays current BCA (AI & ML) standing at Scope Global Skill University (SGSU) with SGPA details and verified certifications.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)

### Graphics & Micro-Animations
- **Shaders / Canvas**: Custom WebGL 2.0 Fragment & Vertex Shaders
- **Motion**: [Motion](https://motion.dev/) (Framer Motion)
- **Effects**: Interactive Pixel Trail, Staggered Grid Splash Reveal, Spotlight Masking

### Data & Backend Competencies
- **Languages**: JavaScript (ES6+), TypeScript, Python, C++, SQL
- **AI & Data Science**: NumPy, Pandas, Scikit-learn, NLTK, spaCy
- **Backend**: FastAPI, Python, PostgreSQL, Supabase

---

## 🚀 Featured Projects

| Project | Category | Key Highlights |
| :--- | :--- | :--- |
| **SmartUni.Ai** | Full-Stack & AI | Unified campus management platform with AI chatbot concierge, biometric attendance, and digital credential vault. |
| **GullyMart** | 3D & Social Commerce | Hyperlocal discovery engine featuring 3D city maps (MapLibre + Three.js), local bazaar listings, and gamified loyalty. |
| **SGSU AI Chatbot** | Conversational AI | Context-aware academic assistant built with FastAPI and NLP for university notices, exams, and syllabus retrieval. |
| **Smart Attendance Concept** | Computer Vision / Security | Face verification with geolocation fencing to prevent proxy check-ins and streamline campus records. |

---

## 📂 Project Structure

```
Faizan_About.me/
├── public/                 # Static assets and icons
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx                   # Identity, education, and philosophy
│   │   ├── AchievementsSection.tsx            # Hackathon victories and awards
│   │   ├── CaseStudyModal.tsx                 # Project deep-dive modal
│   │   ├── CertificationsAndInterestsSection.tsx # Certifications & interests
│   │   ├── ExperienceSection.tsx              # Internships & leadership roles
│   │   ├── Footer.tsx                         # Contact colophon & Bhopal live clock
│   │   ├── HeroSection.tsx                    # Architectural hero & spotlight mask
│   │   ├── InquiryDrawer.tsx                  # Slide-over inquiry & reach-out drawer
│   │   ├── Navigation.tsx                     # Header navigation & frosted drawer menu
│   │   ├── PixelTrail.css                     # WebGL canvas positioning
│   │   ├── PixelTrail.jsx                     # WebGL2 cursor trail shader effect
│   │   ├── PixelTransition.css                # CSS rules for pixel transition component
│   │   ├── PixelTransition.tsx                # Interactive pixel transition component
│   │   ├── ProjectsSection.tsx                # Featured projects grid & filters
│   │   ├── SkillsSection.tsx                  # Categorized technical abilities
│   │   └── SplashReveal.tsx                   # Staggered curtain entrance animation
│   ├── data/
│   │   └── portfolioData.ts                   # Central content & project records
│   ├── App.tsx                                # Main application orchestrator
│   ├── index.css                              # Tailwind v4 theme & typography styling
│   ├── main.tsx                               # DOM root initialization
│   └── types.ts                               # TypeScript interfaces & types
├── index.html                                 # Document root
├── package.json                               # Dependencies & scripts
├── tsconfig.json                              # TypeScript compiler settings
└── vite.config.ts                             # Vite configuration
```

---

## 💻 Local Development Setup

Follow these steps to run the project locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/faizanzafarali385-star/Pixel_me.Faizan.git
cd Pixel_me.Faizan
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The portfolio will be available at:
```
http://localhost:3000
```

### 4. Build for production
```bash
npm run build
```

---

## 📬 Connect & Collaborate

- **Name**: Syed Faizan Ali
- **Email**: [faizanzafarali385@gmail.com](mailto:faizanzafarali385@gmail.com)
- **LinkedIn**: [linkedin.com/in/syed-faizan-ali-aa132a37a](https://www.linkedin.com/in/syed-faizan-ali-aa132a37a/)
- **Location**: Bhopal, Madhya Pradesh, India (23.2599° N, 77.4126° E)

---

<div align="center">

Made with passion, purpose, and code by **Syed Faizan Ali**.

</div>

# Next.js to Astro Portfolio Migration Plan

## Migration Overview

**Goal:** Migrate single-page portfolio from Next.js 15 to Astro with simplified, modern design

**User Preferences:**
- ✅ Keep single-page design with anchor navigation (#home, #about, #work, #contact)
- ✅ Replace Framer Motion with CSS animations and Astro View Transitions
- ✅ Convert contact form to Astro API endpoint (SSR/hybrid mode)
- ✅ Simplify and modernize design with Tailwind v4

**Key Architecture Change:**
- From React-heavy client-side app → Mostly static with strategic client islands
- From Framer Motion animations → CSS animations + Intersection Observer
- From Tailwind v3 config → Tailwind v4 CSS-based theming

---

## Phase 1: Project Initialization (Day 1)

### 1.1 Create Astro Project
```bash
npm create astro@latest euaell-astro-portfolio
# Choose: Empty template, Strict TypeScript
cd euaell-astro-portfolio
```

### 1.2 Install Dependencies
```bash
# Core
npm install @astrojs/tailwind @tailwindcss/vite tailwindcss@next
npm install @astrojs/node  # For SSR/hybrid mode
npm install nodemailer @types/nodemailer

# Dev
npm install -D prettier prettier-plugin-astro
```

### 1.3 Configure `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://portfolio.euaell.me',
  output: 'hybrid',  // Pre-render pages, SSR for API routes
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
});
```

### 1.4 Setup TypeScript with Path Aliases
**File:** `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/data/*": ["src/data/*"]
    }
  }
}
```

---

## Phase 2: Directory Structure & Data Migration (Day 1-2)

### 2.1 Create Directory Structure
```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.astro
│   │   ├── AboutSection.astro
│   │   ├── WorkSection.astro
│   │   └── ContactSection.astro
│   ├── ui/
│   │   ├── Navigation.astro (static nav structure)
│   │   ├── MobileMenu.tsx (React island for mobile menu)
│   │   ├── ProjectFilter.tsx (React island for filtering)
│   │   └── ContactForm.tsx (React island for form)
│   └── icons/
│       └── *.astro (SVG components)
├── data/
│   ├── projects.ts (copy as-is)
│   ├── experience.ts (copy as-is)
│   └── education.ts (copy as-is)
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   └── api/
│       └── contact.ts
├── styles/
│   └── global.css
└── env.d.ts
```

### 2.2 Copy Data Files
**Action:** Copy these files directly from Next.js project:
- `app/data/projects.ts` → `src/data/projects.ts`
- `app/data/experience.ts` → `src/data/experience.ts`
- `app/data/education.ts` → `src/data/education.ts`

---

## Phase 3: Tailwind v4 Migration (Day 2)

### 3.1 Create `src/styles/global.css`

**Key Changes from v3 → v4:**
- Remove `tailwind.config.ts` entirely
- Use `@theme` directive for custom properties
- Convert all custom colors, fonts, and animations to CSS

**Structure:**
```css
@import "tailwindcss";

@theme {
  /* Colors (from tailwind.config.ts:12-53) */
  --color-primary-*: ...;
  --color-accent-*: ...;
  --color-neutral-*: ...;

  /* Fonts (from tailwind.config.ts:55-59) */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-display: 'Cal Sans', 'Inter', system-ui;
}

/* Copy from globals.css:29-68 */
html { scroll-behavior: smooth; }
body { background: #0a0a0a; color: #ffffff; }

/* Scrollbar styles (globals.css:40-56) */
::-webkit-scrollbar { ... }

/* Glass morphism (globals.css:72-90) */
.glass { ... }
.glass-strong { ... }
.glass-card { ... }

/* Gradient text (globals.css:92-107) */
.gradient-text { ... }
.gradient-text-primary { ... }

/* Button styles (globals.css:109-143) */
.btn-primary { ... }
.btn-secondary { ... }

/* All keyframes (tailwind.config.ts:75-142 + globals.css:233-250) */
@keyframes fadeUp { ... }
@keyframes float { ... }
/* etc. */
```

**Critical Files:**
- Source: `app/globals.css` (lines 29-271)
- Source: `tailwind.config.ts` (lines 10-151)

---

## Phase 4: Base Layout with SEO (Day 2-3)

### 4.1 Create `src/layouts/Layout.astro`

**Features:**
- Comprehensive metadata (title, description, OG, Twitter)
- Font loading (Google Fonts: Inter, JetBrains Mono)
- Favicon links
- Google Analytics (G-QZW3GEJSTM)
- Structured data slot
- Theme persistence script (localStorage)

**Reference:** `app/layout.tsx` for all metadata

**Key Implementation:**
```astro
---
interface Props {
  title?: string;
  description?: string;
}

const { title = 'Default...', description = 'Default...' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- All meta tags from app/layout.tsx -->

    <!-- Inline theme script to prevent FOUC -->
    <script is:inline>
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.classList.add(theme);
    </script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

    <slot name="head" />
  </head>
  <body>
    <slot />

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QZW3GEJSTM"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QZW3GEJSTM');
    </script>
  </body>
</html>
```

---

## Phase 5: Navigation Component (Day 3-4)

### 5.1 Desktop Navigation: `src/components/ui/Navigation.astro`

**Strategy:** Static HTML + client-side `<script>` for interactivity

**Key Features to Preserve:**
- Scroll detection: navbar style changes at 50px (Navigation.tsx:23)
- Active section tracking based on scroll position (Navigation.tsx:26-38)
- Smooth scroll to sections (Navigation.tsx:45-51)
- Glass morphism effect that intensifies when scrolled (Navigation.tsx:64-66)

**Implementation:**
```astro
---
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];
---

<nav id="main-nav" class="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block glass rounded-full px-6 py-3">
  <!-- Static nav items -->
</nav>

<script>
  let scrolled = false;
  const nav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    // Scroll detection (from Navigation.tsx:22-24)
    const shouldBeScrolled = window.scrollY > 50;
    if (shouldBeScrolled !== scrolled) {
      scrolled = shouldBeScrolled;
      nav?.classList.toggle('glass-strong', scrolled);
      nav?.classList.toggle('glass', !scrolled);
    }

    // Active section tracking (from Navigation.tsx:26-38)
    const sections = ['home', 'about', 'work', 'contact'];
    const current = sections.find(section => {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (current) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
      });
    }
  });
</script>
```

### 5.2 Mobile Menu: `src/components/ui/MobileMenu.tsx`

**Strategy:** React island with `client:visible` directive

**Features to Preserve:**
- Menu toggle with open/close state (Navigation.tsx:16)
- Slide-in animation from right (Navigation.tsx:154-157)
- Staggered menu items (Navigation.tsx:162-176)
- Icons for each nav item (Navigation.tsx:8-13)

**Animation Migration:**
- Replace Framer Motion `AnimatePresence` → CSS transitions + conditional rendering
- Replace `motion.div` slide animation → CSS `transform: translateX()`
- Replace stagger delays → CSS nth-child animation delays

**Critical Reference:** `app/components/Navigation.tsx` (lines 100-196)

---

## Phase 6: Hero Section (Day 4-5)

### 6.1 Create `src/components/sections/HeroSection.astro`

**Animation Strategy:**

**From Framer Motion → CSS:**
- Initial fade-in animations (HeroSection.tsx:69-93) → CSS `@keyframes fadeUp`
- Rotating skills text (HeroSection.tsx:17-24, 101-111) → Client-side JS
- Floating background particles (HeroSection.tsx:42-63) → Simplified CSS float animation
- Floating emoji decorations (HeroSection.tsx:206-221) → CSS `animate-float` with delays
- Bouncing scroll indicator (HeroSection.tsx:184-201) → CSS keyframe animation

**Implementation:**
```astro
---
const skills = ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'AI/ML'];
const socialLinks = [
  { name: 'GitHub', icon: 'github', href: 'https://github.com/euaell' },
  // ... from HeroSection.tsx:8-12
];
---

<section id="home" class="hero-section">
  <!-- Background effects (HeroSection.tsx:36-39) -->
  <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

  <div class="container-custom">
    <!-- Greeting -->
    <div class="hero-greeting">
      <span class="glass rounded-full">👋 Hello, I'm</span>
    </div>

    <!-- Name -->
    <h1 class="hero-title">
      <span class="gradient-text">Euael M. Eshete</span>
    </h1>

    <!-- Title with rotating skills -->
    <div class="hero-subtitle">
      <span>Full Stack Developer specializing in </span>
      <span id="rotating-skill" class="gradient-text-primary"></span>
    </div>

    <!-- CTA buttons, Social links, Scroll indicator -->
  </div>

  <!-- Floating emojis (HeroSection.tsx:206-221) -->
  <div class="floating-elements">
    <div class="float-item" style="animation-delay: 0s">⚡</div>
    <div class="float-item" style="animation-delay: 2s">🚀</div>
    <div class="float-item" style="animation-delay: 4s">💡</div>
  </div>
</section>

<script>
  // Rotating skills (from HeroSection.tsx:17-24)
  const skills = ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'AI/ML'];
  let currentIndex = 0;
  const skillElement = document.getElementById('rotating-skill');

  function rotateSkill() {
    if (skillElement) {
      skillElement.classList.add('fade-out');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % skills.length;
        skillElement.textContent = skills[currentIndex];
        skillElement.classList.remove('fade-out');
        skillElement.classList.add('fade-in');
        setTimeout(() => skillElement.classList.remove('fade-in'), 500);
      }, 250);
    }
  }

  setInterval(rotateSkill, 2000);
  rotateSkill(); // Initialize
</script>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
  }

  .hero-greeting {
    animation: fadeUp 0.6s ease-out;
  }

  .hero-title {
    animation: fadeUp 0.8s ease-out 0.2s backwards;
  }

  .hero-subtitle {
    animation: fadeUp 0.8s ease-out 0.4s backwards;
  }

  #rotating-skill {
    transition: opacity 0.25s, transform 0.25s;
  }

  #rotating-skill.fade-out {
    opacity: 0;
    transform: translateY(10px);
  }

  #rotating-skill.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .float-item {
    animation: float 6s ease-in-out infinite;
  }
</style>
```

**Critical Reference:** `app/components/HeroSection.tsx` (full file)

---

## Phase 7: About Section (Day 5-6)

### 7.1 Create `src/components/sections/AboutSection.astro`

**Animation Strategy:**

**Challenge:** Stats counter animation, timeline fade-ins, skills grid animations

**Solution:** Intersection Observer API for scroll-triggered animations

**Key Features:**
- Stats counter (counts from 0 to target when in view)
- Experience timeline with fade-in animations
- Education section
- Skills grid with hover effects

**Implementation:**
```astro
---
import { experienceData } from '@/data/experience';
import { educationData } from '@/data/education';

const stats = [
  { label: 'Years Experience', value: 2 },
  { label: 'Projects Completed', value: 15 },
  { label: 'Technologies', value: 20 },
  { label: 'Happy Clients', value: 5 },
];

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  // ... etc
];
---

<section id="about" class="section-padding">
  <!-- Stats Grid -->
  <div class="stats-grid">
    {stats.map((stat) => (
      <div class="stat-card glass-card" data-target={stat.value}>
        <span class="stat-value">0</span>+
        <span class="stat-label">{stat.label}</span>
      </div>
    ))}
  </div>

  <!-- Experience Timeline -->
  <div class="timeline">
    {experienceData.map((exp, i) => (
      <div class="timeline-item" data-index={i}>
        <!-- Experience content -->
      </div>
    ))}
  </div>

  <!-- Skills Grid -->
  <div class="skills-grid">
    {skills.map((skill) => (
      <div class="skill-card">
        <span>{skill.name}</span>
        <div class="skill-bar">
          <div class="skill-fill" style={`width: ${skill.level}%`}></div>
        </div>
      </div>
    ))}
  </div>
</section>

<script>
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Trigger counter animation for stats
        if (entry.target.classList.contains('stat-card')) {
          animateCounter(entry.target);
        }

        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe all animated elements
  document.querySelectorAll('.stat-card, .timeline-item, .skill-card').forEach(el => {
    observer.observe(el);
  });

  function animateCounter(element: Element) {
    const target = parseInt(element.dataset.target || '0');
    const valueElement = element.querySelector('.stat-value');
    if (!valueElement) return;

    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      valueElement.textContent = Math.floor(current).toString();
    }, 16);
  }
</script>

<style>
  .stat-card,
  .timeline-item,
  .skill-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .stat-card.in-view,
  .timeline-item.in-view,
  .skill-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  /* Stagger timeline items */
  .timeline-item[data-index="0"].in-view { transition-delay: 0.1s; }
  .timeline-item[data-index="1"].in-view { transition-delay: 0.2s; }
  .timeline-item[data-index="2"].in-view { transition-delay: 0.3s; }
</style>
```

**Data Source:** `app/data/experience.ts`, `app/data/education.ts`

---

## Phase 8: Work Section with Project Filter (Day 6-7)

### 8.1 Create React Island: `src/components/ui/ProjectFilter.tsx`

**Strategy:** Client island with `client:visible` directive

**Features:**
- Filter buttons for technologies
- Project grid with filtered results
- Smooth filtering transitions

**Implementation:**
```tsx
import { useState } from 'react';
import type { Project } from '@/data/projects';

interface Props {
  projects: Project[];
  technologies: string[];
}

export function ProjectFilter({ projects, technologies }: Props) {
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All'
    ? projects
    : projects.filter(p => p.tags.some(tag =>
        tag.toLowerCase().includes(selected.toLowerCase())
      ));

  return (
    <div className="project-filter">
      <div className="filter-buttons">
        <button
          onClick={() => setSelected('All')}
          className={selected === 'All' ? 'active' : ''}
        >
          All
        </button>
        {technologies.map(tech => (
          <button
            key={tech}
            onClick={() => setSelected(tech)}
            className={selected === tech ? 'active' : ''}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map(project => (
          <div key={project.title} className="project-card card-hover">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener">
                  GitHub
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 8.2 Create `src/components/sections/WorkSection.astro`

```astro
---
import { projectsData } from '@/data/projects';
import { ProjectFilter } from '@/components/ui/ProjectFilter';

const featured = projectsData.filter(p => p.featured);
const others = projectsData.filter(p => !p.featured);
const allTech = [...new Set(projectsData.flatMap(p => p.tags))].slice(0, 8);
---

<section id="work" class="section-padding">
  <h2>Featured Projects</h2>

  <!-- Featured projects (static) -->
  <div class="featured-grid">
    {featured.map(project => (
      <div class="project-card card-hover">
        <!-- Featured project content -->
      </div>
    ))}
  </div>

  <h2>Other Projects</h2>

  <!-- Other projects with filtering (client island) -->
  <ProjectFilter
    client:visible
    projects={others}
    technologies={allTech}
  />
</section>
```

**Data Source:** `app/data/projects.ts`

---

## Phase 9: Contact Form (Day 7-8)

### 9.1 Create React Island: `src/components/ui/ContactForm.tsx`

**Features:**
- Client-side validation
- Form state management
- Loading/success/error states
- Accessible form with proper labels

**Implementation:**
```tsx
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Form fields with validation */}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="success-message">
          Message sent successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="error-message">
          Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
}
```

### 9.2 Create `src/components/sections/ContactSection.astro`

```astro
---
import { ContactForm } from '@/components/ui/ContactForm';
---

<section id="contact" class="section-padding">
  <h2>Get In Touch</h2>

  <div class="contact-grid">
    <div class="contact-info">
      <!-- Static contact info -->
    </div>

    <div class="contact-form-wrapper">
      <ContactForm client:visible />
    </div>
  </div>
</section>
```

---

## Phase 10: Contact API Endpoint (Day 8)

### 10.1 Create `src/pages/api/contact.ts`

**Strategy:** Direct port from Next.js with minimal changes

**Key Changes:**
- `NextRequest/NextResponse` → Astro `APIRoute`
- `process.env` → `import.meta.env`
- Keep all validation, email templates, and error handling

**Implementation:**
```typescript
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Same createTransporter, validateFormData from route.ts

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!validateFormData(body)) {
      return new Response(
        JSON.stringify({ error: 'Invalid form data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, subject, message } = body as ContactFormData;

    const transporter = createTransporter();
    await transporter.verify();

    // Same email sending logic from route.ts:88-246

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
```

### 10.2 Create `src/env.d.ts`

```typescript
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_MAILER_HOST: string;
  readonly NODE_MAILER_PORT: string;
  readonly NODE_MAILER_USER: string;
  readonly NODE_MAILER_PASS: string;
}
```

**Critical Reference:** `app/api/contact/route.ts` (full file - lines 1-290)

---

## Phase 11: Main Page Assembly (Day 9)

### 11.1 Create `src/pages/index.astro`

```astro
---
import Layout from '@/layouts/Layout.astro';
import Navigation from '@/components/ui/Navigation.astro';
import HeroSection from '@/components/sections/HeroSection.astro';
import AboutSection from '@/components/sections/AboutSection.astro';
import WorkSection from '@/components/sections/WorkSection.astro';
import ContactSection from '@/components/sections/ContactSection.astro';
---

<Layout
  title="Euael M. Eshete - Full Stack Developer & AI Engineer"
  description="Full Stack Developer & AI Engineer specializing in React, Next.js, Python, TypeScript, and machine learning."
>
  <Navigation />
  <main>
    <HeroSection />
    <AboutSection />
    <WorkSection />
    <ContactSection />
  </main>
</Layout>
```

---

## Phase 12: SEO & Metadata (Day 9-10)

### 12.1 Structured Data Component

**File:** `src/components/seo/StructuredData.astro`

```astro
---
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Euael M. Eshete",
  "jobTitle": "Full Stack Developer & AI Engineer",
  "url": "https://portfolio.euaell.me",
  "sameAs": [
    "https://github.com/Euaell",
    "https://www.linkedin.com/in/euael-eshete",
  ],
  // ... from existing StructuredData.tsx
};
---

<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

### 12.2 Sitemap Integration

**Update `astro.config.mjs`:**
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ...
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        'https://portfolio.euaell.me#about',
        'https://portfolio.euaell.me#work',
        'https://portfolio.euaell.me#contact',
      ],
    }),
  ],
});
```

### 12.3 Robots.txt

**File:** `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://portfolio.euaell.me/sitemap-index.xml
```

---

## Phase 13: Assets & Icons (Day 10)

### 13.1 Copy Public Assets
- Copy `public/icons/`, `public/images/`, `public/fonts/` from Next.js project
- Copy `public/manifest.json`

### 13.2 Icon Strategy

**Recommendation:** Pure SVG Astro components (lightest option)

**Example:** `src/components/icons/Github.astro`
```astro
---
const { class: className, size = 24 } = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  class={className}
>
  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87..."/>
</svg>
```

---

## Phase 14: Testing & Polish (Day 11-12)

### 14.1 Testing Checklist

**Functionality:**
- [ ] All anchor links scroll to correct sections
- [ ] Mobile menu opens/closes
- [ ] Project filter works correctly
- [ ] Contact form validation works
- [ ] Contact form submission sends emails
- [ ] Navigation highlights active section on scroll

**Performance:**
- [ ] Run `npm run build` successfully
- [ ] Run `npm run preview` and test
- [ ] Lighthouse score > 90 (all metrics)
- [ ] No console errors

**Responsive Design:**
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion respected

**SEO:**
- [ ] Meta tags present
- [ ] Sitemap generates
- [ ] Structured data validates

---

## Critical Files Reference

### Files to Study:
1. **Navigation logic:** `app/components/Navigation.tsx` (lines 15-199)
2. **Hero animations:** `app/components/HeroSection.tsx` (lines 16-224)
3. **API endpoint:** `app/api/contact/route.ts` (lines 1-290)
4. **Tailwind config:** `tailwind.config.ts` (lines 3-155)
5. **Global styles:** `app/globals.css` (lines 1-272)

### Data Files (copy as-is):
1. `app/data/projects.ts` → `src/data/projects.ts`
2. `app/data/experience.ts` → `src/data/experience.ts`
3. `app/data/education.ts` → `src/data/education.ts`

---

## Key Architectural Decisions

### What Stays Static (Server-rendered):
- Navigation structure
- Hero content (except rotating skills)
- About content structure
- Work featured projects
- Contact info

### What Needs Client Islands:
- **MobileMenu** (`client:visible`) - Mobile menu toggle
- **ProjectFilter** (`client:visible`) - Project filtering
- **ContactForm** (`client:visible`) - Form validation and submission

### Client Scripts (Astro `<script>` tags):
- Navigation scroll detection and active section tracking
- Hero rotating skills animation
- About section Intersection Observer for scroll animations
- Stats counter animation

---

## Animation Migration Summary

| Framer Motion Feature | Astro Replacement |
|----------------------|-------------------|
| `motion.div` with `initial/animate` | CSS animations with class names |
| `useInView` hook | Intersection Observer API |
| `AnimatePresence` | CSS transitions + conditional rendering |
| `layoutId` transitions | CSS transitions |
| `whileHover/whileTap` | CSS `:hover`, `:active` |
| Stagger children | CSS nth-child animation delays |
| Spring animations | cubic-bezier() timing functions |

---

## Deployment Configuration

### Environment Variables (Set in hosting platform):
```
NODE_MAILER_HOST=your-smtp-host
NODE_MAILER_PORT=465
NODE_MAILER_USER=your-email
NODE_MAILER_PASS=your-password
```

### Build Commands:
```bash
npm run build      # Build for production
npm run preview    # Preview build locally
```

### Recommended Platform: Vercel
- Supports SSR/hybrid mode
- Easy environment variable setup
- Automatic deployments from Git

---

## Timeline Estimate

- **Day 1-2:** Project setup, directory structure, data migration
- **Day 2-3:** Tailwind v4 migration, base layout with SEO
- **Day 3-4:** Navigation component (desktop + mobile)
- **Day 4-5:** Hero section with animations
- **Day 5-6:** About section with Intersection Observer
- **Day 6-7:** Work section with project filter
- **Day 7-8:** Contact form + API endpoint
- **Day 8-9:** Main page assembly, icons
- **Day 9-10:** SEO, metadata, structured data
- **Day 10-11:** Assets, polish
- **Day 11-12:** Testing, deployment

**Total:** ~12 days for full migration

---

## Success Criteria

✅ Single-page design preserved with anchor navigation
✅ All animations working with CSS (no Framer Motion)
✅ Contact form sending emails via Astro API endpoint
✅ Simplified, modern design with Tailwind v4
✅ Lighthouse score > 90
✅ SEO maintained (metadata, sitemap, structured data)
✅ Fully responsive across all devices
✅ Accessible (WCAG AA compliance)

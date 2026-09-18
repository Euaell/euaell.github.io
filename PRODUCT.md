# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Euael for backend, cloud, and AI
engineering roles. They arrive from a CV, a LinkedIn or GitHub profile, or a job
application, typically on desktop during a shortlisting pass and often with dozens of
other candidates open in adjacent tabs.

Their job: decide within roughly a minute whether this candidate is worth a closer look,
then find the concrete evidence and the resume to justify that decision to someone else.

## Product Purpose

A personal developer portfolio for Euael M. Eshete, a software developer based in Addis
Ababa, Ethiopia, with four or more years across backend platform, cloud infrastructure,
and AI-enabled product work.

It exists to be the canonical, self-owned record of his professional work: the place a CV
points to, that stays accurate as roles change, and that demonstrates engineering ability
through the quality of the artifact itself.

Success means a recruiter leaves with an accurate picture of the role, the stack, and the
outcomes achieved, and can act on it without hunting.

## Positioning

Not a product; a person. The claim is scope of responsibility rather than a tagline.

The credible differentiator is the evidence: production metrics from real systems
(scale from 1,250 to 58,000 monthly messages, 2,000 active users, 94 percent
infrastructure overhead reduction, 300 users onboarded) alongside shipped work that is
publicly verifiable through live links and repositories. Neighboring portfolios assert
capability; this one can show measured outcomes and working systems.

## Operating Context

- Evaluated in a fast scanning pass, frequently alongside many competing candidates.
- Reads on both desktop and mobile; recruiters may open the link on a phone.
- The CV is the entry document and remains the formal artifact. The site supports it
  rather than replacing it.
- Related properties that must stay consistent with the site: GitHub (github.com/Euaell),
  LinkedIn (linkedin.com/in/euael-eshete), and the email euaelmeko@gmail.com.
- Hosted as a static site for GitHub Pages, with a container build path also present.

## Capabilities and Constraints

Content is data-driven from typed modules: profile, experience, education, skills,
projects, and mentoring.

Routes: a single-page home covering hero, about, work, and contact; plus a dedicated
projects page with client-side tag filtering. A contact form posts to a server endpoint
that sends mail through SMTP.

Confirmed technical constraints:

- Astro 7 with Tailwind v4, React 19 islands for interactive pieces.
- The site builds with `output: "static"`, so any server-rendered contact endpoint cannot
  run on the current static deploy target. Contact delivery is therefore an open
  deployment question, not a settled capability.
- The resume button component exists but is not wired into any page, and no resume file
  is currently served. Both are incomplete, not removed.

Open product decisions, not to be invented during design work:

- The professional title to display. The user explicitly declined a positioning one-liner
  and asked for a title only; the specific title is undecided.
- Whether any availability or openness signal belongs on a passive portfolio.
- Which title, if any, to attach to each role (the source CV uses a single "Software
  Developer" label across multiple employers, including a role with substantial
  architectural ownership).

## Brand Commitments

Explicitly binding, stated by the user:

- **No gradients.** Flat color only.
- **Theme follows the operating system.** Both light and dark must be fully resolved, via
  `prefers-color-scheme`. There is no theme toggle.
- Palette is being supplied by the user and is authoritative over any default.

Existing durable identities: the name "Euael M. Eshete", the `euaell` handle across
GitHub and domain properties, and the existing logo asset.

## Evidence on Hand

- `doc/Euael_Eshete_CV_04_01_2026.md`: full CV with roles, dates, metrics, education
  (BSc Computer Engineering, Addis Ababa University, 2018 to 2023, major GPA 3.81/4.00,
  graduated with high distinction), honours, and mentoring.
- `src/data/*.ts`: experience, education, skills, projects, profile, and mentoring in
  typed form. Currently substantially in sync with the CV.
- Real project links that must not be broken or invented: macro.euaell.me,
  crypto-grapher.euaell.me, wordle.euaell.me, gol.euaell.me, and repository URLs on
  GitHub.
- Photography: `src/assets/profile.jpg`, plus larger originals in `public/images/`.

Must not be fabricated: testimonials, employer references, client names, benchmarks not
present in the CV, pricing, or press mentions.

## Product Principles

1. **The scan is the primary interaction.** A recruiter should grasp role, stack, and
   proof within a minute. Design serves that read before it serves expression.
2. **Evidence over adjectives.** Measured outcomes and working links carry the argument;
   self-description carries as little as possible.
3. **Accurate and durable.** It is a permanent record that ages well, so it stays truthful
   and free of urgency signals, rather than optimized for a single job search.
4. **The craft is the proof.** For an engineering portfolio, the build quality, speed, and
   accessibility are themselves a work sample.
5. **Respect the visitor's system.** Theme, motion, and transparency preferences are
   honored without asking the visitor to configure anything.

## Accessibility & Inclusion

No product-specific standard was established by the user. The incumbent implementation
already handles focus-visible outlines and `prefers-reduced-motion`, and those wins must
not regress. Given the audience, WCAG AA contrast and full keyboard operability are
treated as the working baseline.

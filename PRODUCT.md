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

Not a product; a person. The user explicitly declined a positioning one-liner and asked
for a title, so the site leads with a title, not a slogan.

The credible differentiator is that he both founds and builds: he owns products end to end
as founder of a studio, and operates as the deepest contributor on large production systems
for an employer. That combination is rare and is the through-line the site should carry.

Evidence supporting it, all verifiable:

- Founder and lead engineer of ZafTech, a product studio. Flagship product Convia, a
  conversational AI form and document-intake SaaS, accepted into the Google Africa
  Applied AI Lab.
- Lead engineer on a production multi-tenant PKI SaaS (Securetron): 574 commits over
  18 months, 77 merged PRs, sole or lead developer across six services.
- Measured production outcomes at AfroChat: scale from 1,250 to 58,000 monthly messages,
  2,000 active users, 94 percent infrastructure overhead reduction.
- International finalist, CASE-IN Engineering Championship, BRICS track, Moscow.
- Self-directed systems work: DistroKV, a distributed key-value store in Go.

Neighboring portfolios assert capability; this one can show measured outcomes and working
systems.

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
- `doc/staging/resume/securetron_work.md`: contribution extract from full git history
  (2025-03-21 to 2026-09-10) for the PKI Trust Manager platform. 574 commits, roughly
  59 percent of all commits in that repository, +615,807 / -249,242 lines, 77 merged PRs,
  sole or lead developer across six services. Contains security-remediation detail
  (SSRF redirect bypass, hardcoded credentials removed and rotated, a superadmin
  authorization bypass), the licensing engine, a production AI assistant, DigiCert and
  EJBCA integrations, a Tailwind plus HTMX/Alpine frontend migration, a company-wide
  design-system rollout, and Azure Pipelines CI/CD.
- `doc/staging/resume/zaftech_work.md`: founder and lead engineer extract for ZafTech,
  covering Convia (conversational AI form engine, multi-tenant workspaces, MCP server,
  Google Africa Applied AI Lab selection), DistroKV, RAG pipelines on PostgreSQL with
  pgvector, and hybrid cloud work on Hetzner and GCP.
- `doc/staging/resume/casein.md`: earlier duplicate of the ZafTech extract, superseded.
  Its CASE-IN competition content (international finalist, BRICS track, Moscow) is not
  covered by the updated file and should be preserved.
- Screenshots of Mizan and Convia work in `doc/staging/images/`, pending triage for
  confidentiality before publication.
- An open-source project, `github.com/zaftec/relay`, created from scratch, currently work
  in progress and not deployed. The CI/CD setup, specifically Google release-please based
  versioning, is an emphasis point.
- `src/data/*.ts`: experience, education, skills, projects, profile, and mentoring in
  typed form.
- Real project links that must not be broken or invented: macro.euaell.me,
  crypto-grapher.euaell.me, wordle.euaell.me, gol.euaell.me, and repository URLs on
  GitHub.
- Photography: `src/assets/profile.jpg`, plus larger originals in `public/images/`.

Must not be fabricated: testimonials, employer references, client names, benchmarks not
present in the source extracts, pricing, or press mentions. Securetron and ZafTech work
may contain customer or tenant information, so nothing from those extracts or screenshots
is published without confirming it is safe to disclose.

## Open Questions

- No updated resume file has been provided. `public/` contains no resume, and
  `FloatingResumeButton.astro` is imported but unused. The resume artifact is required
  before that path can be completed.
- Which title to display, given that founder and lead-engineer scope sits alongside
  employed roles.
- Whether the studio (ZafTech) and its products are presented as a distinct entity or
  folded into the same personal narrative.
- Whether Securetron work can be shown with screenshots and named metrics, or only
  described generically, since it is an employer's product.

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

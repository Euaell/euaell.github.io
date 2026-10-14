import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib import colors
from reportlab.lib.units import inch
import pypdf

def build_cv(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch
    )

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0f172a'),
        alignment=1
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#475569'),
        alignment=1
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=2,
        keepWithNext=True
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#1e293b')
    )

    item_date = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#64748b'),
        alignment=2
    )

    body = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#334155')
    )

    bullet = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=1.5
    )

    def section_header(title):
        return [
            Spacer(1, 5),
            Paragraph(title.upper(), section_heading),
            HRFlowable(width='100%', thickness=0.6, color=colors.HexColor('#cbd5e1'), spaceBefore=1, spaceAfter=4)
        ]

    def job_header(title_company, date_loc):
        t = Table([[Paragraph(title_company, item_title), Paragraph(date_loc, item_date)]], colWidths=['68%', '32%'])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        return t

    story = []
    story.append(Paragraph('EUAEL MEKONEN ESHETE', name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        '<a href="mailto:euaelmeko@gmail.com"><font color="#0284c7">euaelmeko@gmail.com</font></a> &nbsp;·&nbsp; '
        '<a href="https://github.com/euaell"><font color="#0284c7">github.com/euaell</font></a> &nbsp;·&nbsp; '
        '<a href="https://linkedin.com/in/euael-eshete"><font color="#0284c7">linkedin.com/in/euael-eshete</font></a> &nbsp;·&nbsp; '
        '<a href="https://portfolio.euaell.me"><font color="#0284c7">portfolio.euaell.me</font></a> &nbsp;·&nbsp; Addis Ababa, Ethiopia',
        contact_style
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph(
        'Software engineer working on PKI and multi-tenant SaaS at Securetron. I build the licensing, tenant isolation, certificate lifecycle, and the auth around them. Most of my work is C# and .NET, with Python, Go, and TypeScript where they fit. I also run my own infrastructure and a small software studio, ZafTech.',
        body
    ))

    # WORK EXPERIENCE
    story.extend(section_header('Work Experience'))

    # Securetron
    story.append(job_header('<b>Software Developer</b> · Securetron', 'Mar 2025 – Present · Addis Ababa / remote'))
    story.append(Paragraph('<i>PKI Trust Manager is a multi-tenant certificate lifecycle management (CLM) SaaS.</i>', body))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph('• Built the licensing engine that handles online and offline activation, grace periods, certificate limits, and read-only mode when a license lapses. Offline licenses verify with a signature check, so the product needs no server call.', bullet))
    story.append(Paragraph('• Led the multi-tenant refactor. Licenses load per organisation, queries scope to the customer, and middleware enforces tenant scope.', bullet))
    story.append(Paragraph('• Shipped DigiCert CertCentral end-to-end: orders, webhooks, API keys encrypted at rest, and a feature-flagged rollout. Integrated EJBCA and hardened its credential handling. Wrote CA abstractions so a new provider plugs into the existing flows.', bullet))
    story.append(Paragraph('• Built an assistant inside the product. It stores conversations, respects roles, writes to the audit log, and uses versioned system prompts.', bullet))
    story.append(Paragraph('• Moved the portal from legacy CSS to Tailwind, then to server-rendered HTMX and Alpine.js partials.', bullet))
    story.append(Paragraph('• Set up Azure Pipelines and Docker builds for every service, and Azure Bicep for multi-tenant provisioning.', bullet))
    story.append(Paragraph('<b>Stack:</b> <i>ASP.NET Core · EF Core · SQL Server · HTMX · Alpine.js · Tailwind · Azure Pipelines · Bicep · Docker</i>', bullet))
    story.append(Spacer(1, 3))

    # ZafTech
    story.append(job_header('<b>Founder</b> · ZafTech', '2025 – Present · zaftech.co'))
    story.append(Paragraph('<i>A small software studio. I design, build, and host client work and our own products on a self-managed stack.</i>', body))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph('• Products include Convia (conversational forms with strict schema compilation) and Mizan (nutrition and training tracking with first-class Model Context Protocol integration).', bullet))
    story.append(Paragraph('<b>Stack:</b> <i>Astro, Next.js, Tailwind, Bun, Node.js, Go, PostgreSQL and PostGIS, Redis, BullMQ, Docker, BetterAuth</i>', bullet))
    story.append(Spacer(1, 3))

    # AfroChat
    story.append(job_header('<b>Software Developer</b> · AfroChat (A2SV)', 'Sep 2023 – Mar 2025 · Addis Ababa'))
    story.append(Paragraph('• Built async backend APIs in FastAPI and Litestar, and shipped features to real users.', bullet))
    story.append(Paragraph('• Moved media assets to Google Cloud Storage with no downtime and rewrote asset delivery, dropping infrastructure costs by 94%.', bullet))
    story.append(Paragraph('• Built a retrieval-augmented generation (RAG) pipeline with a vector database and the OpenAI API.', bullet))
    story.append(Paragraph('• Moved the monolith to containers on Cloud Run, with autoscaling on CPU and request latency.', bullet))
    story.append(Paragraph('<b>Stack:</b> <i>Python · FastAPI · Litestar · GCP · Cloud Run · PostgreSQL · Docker</i>', bullet))
    story.append(Spacer(1, 3))

    # New Era
    story.append(job_header('<b>Full-Stack Intern</b> · New Era Research and Development', 'Mar 2022 – Jun 2022 · Addis Ababa'))
    story.append(Paragraph('• Built a control prototype for a 3-axis CNC machine on Arduino.', bullet))
    story.append(Paragraph('• Built an internet onboarding app with C# and ASP.NET.', bullet))

    # PROJECTS
    story.extend(section_header('Projects'))
    story.append(job_header('<b>DistroKV</b> (In Progress)', 'Go · Raft · Kubernetes'))
    story.append(Paragraph('A distributed key-value store. Raft handles leader election and replication. An LSM-tree engine handles storage. The cluster runs across three regions to test real network partitions.', body))

    # EDUCATION (NO MASTERS AS REQUESTED)
    story.extend(section_header('Education'))
    story.append(job_header('<b>BSc in Computer Engineering</b> · Addis Ababa University', 'Sept 2018 – Jun 2023 · Addis Ababa, Ethiopia'))
    story.append(Paragraph('• <b>Major GPA: 3.81/4.00</b> · Graduated with High Distinction', bullet))
    story.append(Paragraph('• <b>Thesis:</b> IoT-based Water Distribution Monitoring System – Developed an IoT solution to monitor and optimise water distribution in resource-constrained environments.', bullet))
    story.append(Paragraph('• <b>Relevant Coursework:</b> Database Systems, Digital Logic Design, Digital Signal Processing, Software Engineering, Computer Architecture and Organisation, Object-Oriented Programming', bullet))

    # SKILLS
    story.extend(section_header('Technical Skills'))
    story.append(Paragraph('• <b>Languages:</b> C#, Python, Go, TypeScript, SQL', bullet))
    story.append(Paragraph('• <b>Backend:</b> ASP.NET Core, EF Core, FastAPI, Litestar, Node.js, gRPC, REST', bullet))
    story.append(Paragraph('• <b>Frontend:</b> HTMX, Alpine.js, React, Next.js, Tailwind', bullet))
    story.append(Paragraph('• <b>Security:</b> PKI and X.509, CA integration (DigiCert, EJBCA), mTLS, OAuth 2.0 & OIDC, secrets handling', bullet))
    story.append(Paragraph('• <b>Infrastructure:</b> Docker, Azure Pipelines, Azure Bicep, GCP (Cloud Run, Cloud Storage), GitHub Actions, Linux, Nginx, Kubernetes (learning)', bullet))
    story.append(Paragraph('• <b>Data & AI:</b> PostgreSQL, SQL Server, Redis, vector databases, RAG, embeddings, LLM tool use, prompt versioning', bullet))
    story.append(Paragraph('• <b>Spoken Languages:</b> Amharic (Native), English (Fluent / IELTS 7.5), German (Beginner)', bullet))

    # MENTORING
    story.extend(section_header('Mentoring & Leadership'))
    story.append(job_header('<b>Mentor</b> · Africa to Silicon Valley (A2SV)', 'Sep 2023 – Mar 2025'))
    story.append(Paragraph('Mentored more than 150 students in full-stack development, LLM integration, and cloud.', body))
    story.append(Spacer(1, 2))
    story.append(job_header('<b>Mentor</b> · Solvers Club, Addis Ababa University', 'Mar 2022 – Jun 2022'))
    story.append(Paragraph('Helped first-year students with university life and STEM courses.', body))

    doc.build(story)

def merge_documents(cv_pdf, transcript_pdf, ielts_pdf, output_pdf):
    writer = pypdf.PdfWriter()

    # 1. CV
    print(f"Reading CV: {cv_pdf}")
    cv_reader = pypdf.PdfReader(cv_pdf)
    for i, page in enumerate(cv_reader.pages):
        writer.add_page(page)
        print(f"  Added CV page {i+1}")

    # 2. Unofficial transcripts
    print(f"Reading Transcript: {transcript_pdf}")
    transcript_reader = pypdf.PdfReader(transcript_pdf)
    for i, page in enumerate(transcript_reader.pages):
        writer.add_page(page)
        print(f"  Added Transcript page {i+1}")

    # 3. English test results
    print(f"Reading English test results (IELTS): {ielts_pdf}")
    ielts_reader = pypdf.PdfReader(ielts_pdf)
    for i, page in enumerate(ielts_reader.pages):
        writer.add_page(page)
        print(f"  Added IELTS page {i+1}")

    with open(output_pdf, "wb") as f_out:
        writer.write(f_out)
    print(f"Successfully generated merged PDF: {output_pdf}")
    print(f"Total pages in merged document: {len(writer.pages)}")

if __name__ == '__main__':
    temp_cv = r"G:\_Projects\euaell.github.io\Euael_Eshete_CV.pdf"
    transcript = r"G:\Grad application\01\Euael_Eshete_Transcript_Student_Copy.pdf"
    ielts = r"G:\Grad application\01\ET00123500848-03-11-2023-ETRF.pdf"
    
    out_grad = r"G:\Grad application\01\Euael_Eshete_Application_Documents.pdf"
    out_local = r"G:\_Projects\euaell.github.io\Euael_Eshete_Application_Documents.pdf"

    print("Building CV PDF...")
    build_cv(temp_cv)

    print("\nMerging into Graduate Application Document in G:\\Grad application\\01...")
    merge_documents(temp_cv, transcript, ielts, out_grad)

    print("\nAlso saving a copy in the workspace root...")
    merge_documents(temp_cv, transcript, ielts, out_local)

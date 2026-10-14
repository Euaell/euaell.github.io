import argparse
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib import colors
from reportlab.lib.units import inch
import pypdf

def build_cv(output_path):
    doc = SimpleDocTemplate(
        str(output_path),
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
        textColor=colors.HexColor('#334155'),
        alignment=1
    )

    summary_style = ParagraphStyle(
        'SummaryStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor('#1e293b')
    )

    sec_title = ParagraphStyle(
        'SecTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#0f172a'),
        textTransform='uppercase'
    )

    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        textColor=colors.HexColor('#0f172a')
    )

    job_date = ParagraphStyle(
        'JobDate',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor('#475569'),
        alignment=2
    )

    body = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#1e293b')
    )

    bullet = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        leftIndent=10,
        firstLineIndent=-8,
        textColor=colors.HexColor('#1e293b')
    )

    stack_style = ParagraphStyle(
        'StackStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#334155')
    )

    story = []

    # Header
    story.append(Paragraph('<b>Euael M. Eshete</b>', name_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        'euaelmeko@gmail.com &nbsp;|&nbsp; '
        '<font color="#0284c7">github.com/euaell</font> &nbsp;|&nbsp; '
        '<font color="#0284c7">linkedin.com/in/euael-eshete</font> &nbsp;|&nbsp; '
        '<font color="#0284c7">portfolio.euaell.me</font> &nbsp;|&nbsp; Addis Ababa, Ethiopia',
        contact_style
    ))
    story.append(Spacer(1, 6))

    # Summary
    story.append(Paragraph(
        '<b>Software Engineer</b> with expertise in PKI and multi-tenant SaaS architectures at Securetron. '
        'I build licensing engines, tenant isolation boundaries, certificate lifecycles, and authentication around them. '
        'Most of my work is in C# and .NET, with Python, Go, and TypeScript where they fit. '
        'Founder of ZafTech software studio, self-hosting scalable web products and distributed services.',
        summary_style
    ))
    story.append(Spacer(1, 4))

    def section_header(title):
        return [
            Spacer(1, 4),
            Table(
                [[Paragraph(title, sec_title)]],
                colWidths=[7.5 * inch],
                style=[
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
                    ('TOPPADDING', (0, 0), (-1, -1), 0),
                    ('LEFTPADDING', (0, 0), (-1, -1), 0),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                    ('LINEBELOW', (0, 0), (-1, -1), 0.75, colors.HexColor('#94a3b8'))
                ]
            ),
            Spacer(1, 4)
        ]

    def job_header(left, right):
        return Table(
            [[Paragraph(left, job_title), Paragraph(right, job_date)]],
            colWidths=[5.5 * inch, 2.0 * inch],
            style=[
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
                ('TOPPADDING', (0, 0), (-1, -1), 1),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ]
        )

    # EXPERIENCE
    story.extend(section_header('Work Experience'))

    # Securetron
    story.append(job_header('<b>Software Developer</b> · Securetron (PKI Trust Manager)', 'Mar 2025 – Present'))
    story.append(Paragraph('<i>PKI Trust Manager is a multi-tenant certificate lifecycle management (CLM) SaaS.</i>', body))
    story.append(Spacer(1, 2))
    story.append(Paragraph('• Built licensing engine for online/offline activation, grace periods, certificate limits, and read-only mode upon lapse; verified offline licenses with cryptographic signature checks.', bullet))
    story.append(Paragraph('• Led multi-tenant refactor: licenses load per organization, queries strictly scope to tenant, and middleware enforces isolation.', bullet))
    story.append(Paragraph('• Shipped DigiCert CertCentral end-to-end (orders, webhooks, encrypted keys at rest, feature flags). Integrated EJBCA and abstracted CA provider flows.', bullet))
    story.append(Paragraph('• Built an embedded AI assistant supporting persistent conversations, role-based access, audit logging, and versioned system prompts.', bullet))
    story.append(Paragraph('• Migrated UI from legacy CSS to Tailwind, then to server-rendered HTMX and Alpine.js partials.', bullet))
    story.append(Paragraph('• Set up Azure Pipelines CI/CD, multi-stage Docker builds, and Azure Bicep for multi-tenant provisioning.', bullet))
    story.append(Spacer(1, 1))
    story.append(Paragraph('<b>Stack:</b> ASP.NET Core · EF Core · SQL Server · HTMX · Alpine.js · Tailwind · Azure Pipelines · Bicep · Docker', stack_style))
    story.append(Spacer(1, 4))

    # ZafTech
    story.append(job_header('<b>Founder & Lead Engineer</b> · ZafTech (zaftech.co)', '2025 – Present'))
    story.append(Paragraph('• Founded software studio designing, building, and hosting client work and internal products on a self-managed stack.', bullet))
    story.append(Paragraph('• Products include Convia (conversational AI form builder) and Mizan (nutrition and training tracker with MCP tools).', bullet))
    story.append(Spacer(1, 1))
    story.append(Paragraph('<b>Stack:</b> Astro · Next.js · Tailwind · Bun · Node.js · Go · PostgreSQL · Redis · Docker · BetterAuth', stack_style))
    story.append(Spacer(1, 4))

    # AfroChat
    story.append(job_header('<b>Software Developer</b> · AfroChat (A2SV)', 'Sep 2023 – Mar 2025'))
    story.append(Paragraph('• Built asynchronous backend APIs in FastAPI and Litestar serving live production traffic.', bullet))
    story.append(Paragraph('• Executed zero-downtime migration of media assets to Google Cloud Storage with optimized delivery, cutting infrastructure cost by 94%.', bullet))
    story.append(Paragraph('• Built a retrieval-augmented generation (RAG) pipeline leveraging vector databases and OpenAI APIs.', bullet))
    story.append(Paragraph('• Migrated monolith to containers on GCP Cloud Run with autoscaling on CPU and latency.', bullet))
    story.append(Spacer(1, 1))
    story.append(Paragraph('<b>Stack:</b> Python · FastAPI · Litestar · GCP · Cloud Run · PostgreSQL · Docker', stack_style))
    story.append(Spacer(1, 4))

    # New Era
    story.append(job_header('<b>Full-Stack Intern</b> · New Era Research and Development', 'Mar 2022 – Jun 2022'))
    story.append(Paragraph('• Built a 3-axis CNC machine control system prototype on Arduino microcontrollers.', bullet))
    story.append(Paragraph('• Built an internet onboarding web application using C# and ASP.NET.', bullet))

    # PROJECTS
    story.extend(section_header('Selected Projects'))
    story.append(job_header('<b>DistroKV</b> – Distributed Key-Value Store', 'Go · Raft · Kubernetes'))
    story.append(Paragraph('Distributed key-value store with Raft consensus for leader election/replication and an LSM-tree persistence engine. Deployed across three Kubernetes regions to evaluate network partition resilience.', bullet))

    # EDUCATION
    story.extend(section_header('Education'))
    story.append(job_header('<b>BSc in Computer Engineering</b> · Addis Ababa University', 'Sep 2018 – Jun 2023'))
    story.append(Paragraph('• <b>Major GPA:</b> 3.81 / 4.00 · Graduated with <b>High Distinction</b>', bullet))
    story.append(Paragraph('• <b>Thesis:</b> IoT-based Water Distribution Monitoring System – Developed an IoT solution to monitor and optimise water distribution in resource-constrained environments.', bullet))
    story.append(Paragraph('• <b>Relevant Coursework:</b> Database Systems, Digital Logic Design, Digital Signal Processing, Software Engineering, Computer Architecture and Organisation, Object-Oriented Programming', bullet))

    # SKILLS
    story.extend(section_header('Technical Skills'))
    story.append(Paragraph('• <b>Languages:</b> C#, Python, Go, TypeScript, SQL', bullet))
    story.append(Paragraph('• <b>Backend:</b> ASP.NET Core, EF Core, FastAPI, Litestar, Node.js, gRPC, REST', bullet))
    story.append(Paragraph('• <b>Frontend:</b> HTMX, Alpine.js, React, Next.js, Tailwind', bullet))
    story.append(Paragraph('• <b>Security:</b> PKI and X.509, CA integration (DigiCert, EJBCA), mTLS, OAuth 2.0 &amp; OIDC, secrets handling', bullet))
    story.append(Paragraph('• <b>Infrastructure:</b> Docker, Azure Pipelines, Azure Bicep, GCP (Cloud Run, Cloud Storage), GitHub Actions, Linux, Nginx, Kubernetes (learning)', bullet))
    story.append(Paragraph('• <b>Data &amp; AI:</b> PostgreSQL, SQL Server, Redis, vector databases, RAG, embeddings, LLM tool use, prompt versioning', bullet))
    story.append(Paragraph('• <b>Spoken Languages:</b> Amharic (Native), English (Fluent), German (Beginner)', bullet))

    # MENTORING
    story.extend(section_header('Mentoring &amp; Leadership'))
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
    cv_reader = pypdf.PdfReader(str(cv_pdf))
    for i, page in enumerate(cv_reader.pages):
        writer.add_page(page)
        print(f"  Added CV page {i+1}")

    # 2. Unofficial transcripts
    print(f"Reading Transcript: {transcript_pdf}")
    transcript_reader = pypdf.PdfReader(str(transcript_pdf))
    for i, page in enumerate(transcript_reader.pages):
        writer.add_page(page)
        print(f"  Added Transcript page {i+1}")

    # 3. English test results
    print(f"Reading English test results (IELTS): {ielts_pdf}")
    ielts_reader = pypdf.PdfReader(str(ielts_pdf))
    for i, page in enumerate(ielts_reader.pages):
        writer.add_page(page)
        print(f"  Added IELTS page {i+1}")

    output_path = Path(output_pdf)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "wb") as f_out:
        writer.write(f_out)
    print(f"Successfully generated merged PDF: {output_pdf}")
    print(f"Total pages in merged document: {len(writer.pages)}")

def parse_args():
    parser = argparse.ArgumentParser(description="Generate and merge application documents.")
    parser.add_argument("--cv", default=r"G:\_Projects\euaell.github.io\Euael_Eshete_CV.pdf", help="Output path for generated CV PDF")
    parser.add_argument("--transcript", default=r"G:\Grad application\01\Euael_Eshete_Transcript_Student_Copy.pdf", help="Path to transcript PDF")
    parser.add_argument("--ielts", default=r"G:\Grad application\01\ET00123500848-03-11-2023-ETRF.pdf", help="Path to IELTS report PDF")
    parser.add_argument("--output", default=r"G:\Grad application\01\Euael_Eshete_Application_Documents.pdf", help="Output path for merged PDF")
    return parser.parse_args()

if __name__ == '__main__':
    args = parse_args()
    print("Building CV PDF...")
    build_cv(args.cv)

    if Path(args.transcript).exists() and Path(args.ielts).exists():
        print(f"\nMerging documents into {args.output}...")
        merge_documents(args.cv, args.transcript, args.ielts, args.output)
    else:
        print("\nTranscript or IELTS document not found at specified paths. Built CV only.")

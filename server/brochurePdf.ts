/** Builds the static 4-page Multistrata brochure as a minimal PDF 1.4 binary. */

export function generateBrochurePdfBuffer(): Buffer {
  const pages = [
    // Page 1: Cover
    [
      'BT',
      '/F1 12 Tf',
      '0.83 0.68 0.21 rg',
      '50 780 Td',
      '(MULTISTRATA AI / PRODUCT BROCHURE) Tj',
      '0 g',
      '0.83 0.68 0.21 rg',
      '/F1 32 Tf',
      '0 -240 Td',
      '(MULTISTRATA AI) Tj',
      '1 1 1 rg',
      '/F2 16 Tf',
      '0 -35 Td',
      '(Ship smarter. Automate more. Operate with confidence.) Tj',
      '0.83 0.68 0.21 rg',
      '/F1 16 Tf',
      '0 -90 Td',
      '(AI DevOps & Services Marketplace) Tj',
      '0.75 0.75 0.75 rg',
      '/F2 12 Tf',
      '0 -25 Td',
      '(Explore, customize, and deploy enterprise AI solutions, autonomous agents, and workflow) Tj',
      '0 -18 Td',
      '(automations from one focused workspace.) Tj',
      '0 -50 Td',
      '(Built for teams that want practical AI - connected to real work, measurable outcomes, and the) Tj',
      '0 -18 Td',
      '(systems they already use.) Tj',
      'ET',
    ].join('\n'),

    // Page 2: What Multistrata AI Offers & Core Capabilities
    [
      'BT',
      '/F1 10 Tf',
      '0.83 0.68 0.21 rg',
      '50 780 Td',
      '(MULTISTRATA AI / PRODUCT BROCHURE                                                                           PAGE 2) Tj',
      '/F1 22 Tf',
      '0 -60 Td',
      '(What Multistrata AI Offers) Tj',
      '0.85 0.85 0.85 rg',
      '/F2 12 Tf',
      '0 -30 Td',
      '(Multistrata AI is a curated marketplace and deployment layer for organizations adopting AI across) Tj',
      '0 -18 Td',
      '(development, operations, support, and business workflows.) Tj',
      '0 -30 Td',
      '([*] Discover ready-to-use AI DevOps solutions and autonomous agents.) Tj',
      '0 -20 Td',
      '([*] Customize workflows to match your processes, data, and integrations.) Tj',
      '0 -20 Td',
      '([*] Deploy automations designed for repeatable, high-value work.) Tj',
      '0 -20 Td',
      '([*] Bring teams and AI capabilities together in a single operating layer.) Tj',
      '0.83 0.68 0.21 rg',
      '/F1 20 Tf',
      '0 -60 Td',
      '(Core Capabilities) Tj',
      '1 1 1 rg',
      '/F1 13 Tf',
      '0 -30 Td',
      '(AI Agents                                                      Workflow Automation) Tj',
      '0.75 0.75 0.75 rg',
      '/F2 11 Tf',
      '0 -18 Td',
      '(Automate multi-step tasks with specialized      Connect actions, tools, and approvals into) Tj',
      '0 -15 Td',
      '(agents.                                                         repeatable flows.) Tj',
      '1 1 1 rg',
      '/F1 13 Tf',
      '0 -35 Td',
      '(DevOps Enablement                                  Enterprise-Ready Approach) Tj',
      '0.75 0.75 0.75 rg',
      '/F2 11 Tf',
      '0 -18 Td',
      '(Support delivery, operations, monitoring,        Start with focused use cases and scale with) Tj',
      '0 -15 Td',
      '(and incident workflows.                                  control and mathematical certainty.) Tj',
      'ET',
    ].join('\n'),

    // Page 3: Why teams choose Multistrata AI
    [
      'BT',
      '/F1 10 Tf',
      '0.83 0.68 0.21 rg',
      '50 780 Td',
      '(MULTISTRATA AI / PRODUCT BROCHURE                                                                           PAGE 3) Tj',
      '/F1 22 Tf',
      '0 -60 Td',
      '(Why Teams Choose Multistrata AI) Tj',
      '0.85 0.85 0.85 rg',
      '/F2 12 Tf',
      '0 -30 Td',
      '([*] Move from AI experimentation to deployable solutions.) Tj',
      '0 -20 Td',
      '([*] Reduce manual handoffs across engineering and operations.) Tj',
      '0 -20 Td',
      '([*] Give teams a practical way to evaluate, adapt, and launch AI workflows.) Tj',
      '0 -20 Td',
      '([*] Create a foundation for responsible, measurable automation.) Tj',
      '0.83 0.68 0.21 rg',
      '/F1 20 Tf',
      '0 -50 Td',
      '(A Simple Path to Value) Tj',
      '1 1 1 rg',
      '/F2 11 Tf',
      '0 -25 Td',
      '(1. Explore: Find an agent, automation, or solution aligned with your goal.) Tj',
      '0 -18 Td',
      '(2. Customize: Adapt prompts, tools, rules, data sources, and approvals.) Tj',
      '0 -18 Td',
      '(3. Deploy: Put the workflow into operation and monitor its real-time impact.) Tj',
      '0.83 0.68 0.21 rg',
      '/F1 18 Tf',
      '0 -45 Td',
      '(Ideal For) Tj',
      '0.8 0.8 0.8 rg',
      '/F2 11 Tf',
      '0 -22 Td',
      '(Engineering and DevOps teams | Platform teams | Operations leaders | Digital transformation groups) Tj',
      '0 -16 Td',
      '(Businesses building practical, verifiable AI capabilities.) Tj',
      '1 1 1 rg',
      '/F1 14 Tf',
      '0 -45 Td',
      '(Ready to turn AI into action?) Tj',
      '0.83 0.68 0.21 rg',
      '/F2 12 Tf',
      '0 -20 Td',
      '(Explore Multistrata AI and find the next workflow worth automating.) Tj',
      'ET',
    ].join('\n'),

    // Page 4: Call to action
    [
      'BT',
      '/F1 10 Tf',
      '0.83 0.68 0.21 rg',
      '50 780 Td',
      '(MULTISTRATA AI / PRODUCT BROCHURE                                                                           PAGE 4) Tj',
      '1 1 1 rg',
      '/F1 30 Tf',
      '0 -180 Td',
      '(YOUR NEXT WORKFLOW) Tj',
      '0 -38 Td',
      '(STARTS HERE.) Tj',
      '0.8 0.8 0.8 rg',
      '/F2 13 Tf',
      '0 -45 Td',
      '(Meet Multistrata AI - the enterprise platform for autonomous agents, DevOps solutions, and) Tj',
      '0 -20 Td',
      '(workflow automations.) Tj',
      '0.83 0.68 0.21 rg',
      '/F1 14 Tf',
      '0 -60 Td',
      '(DISCOVER.  Customize solutions for real work.) Tj',
      '0 -28 Td',
      '(DEPLOY.     Automate the repetitive.) Tj',
      '0 -28 Td',
      '(DELIVER.     Help your team move faster.) Tj',
      '0.83 0.68 0.21 rg',
      '/F1 24 Tf',
      '0 -70 Td',
      '(MULTISTRATA AI) Tj',
      '1 1 1 rg',
      '/F2 14 Tf',
      '0 -25 Td',
      '(Explore. Customize. Deploy.) Tj',
      '0.7 0.7 0.7 rg',
      '/F2 11 Tf',
      '0 -50 Td',
      '(Visit https://multistrata.dev or reply to your brochure dispatch email to initiate a pilot.) Tj',
      'ET',
    ].join('\n'),
  ];

  // Build PDF Objects
  const objects: string[] = [];

  // Object 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');

  // Object 2: Pages container
  const pageRefs = pages.map((_, i) => `${4 + i * 2} 0 R`).join(' ');
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>\nendobj`);

  // Object 3: Font Resources
  objects.push(
    '3 0 obj\n<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>\nendobj'
  );

  // Pages and Content Streams
  pages.forEach((pageContent, idx) => {
    const pageObjNum = 4 + idx * 2;
    const streamObjNum = 5 + idx * 2;

    // Dark background rectangle + content
    const fullStream = `q 0.04 0.04 0.04 rg 0 0 612 792 re f Q\n${pageContent}`;
    const streamLength = Buffer.byteLength(fullStream, 'utf-8');

    // Page object
    objects.push(
      `${pageObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources 3 0 R /Contents ${streamObjNum} 0 R >>\nendobj`
    );

    // Content Stream object
    objects.push(
      `${streamObjNum} 0 obj\n<< /Length ${streamLength} >>\nstream\n${fullStream}\nendstream\nendobj`
    );
  });

  // Assemble PDF document
  let pdfOutput = '%PDF-1.4\n';
  const offsets: number[] = [];

  objects.forEach((obj) => {
    offsets.push(Buffer.byteLength(pdfOutput, 'utf-8'));
    pdfOutput += obj + '\n';
  });

  const xrefStart = Buffer.byteLength(pdfOutput, 'utf-8');
  pdfOutput += 'xref\n';
  pdfOutput += `0 ${objects.length + 1}\n`;
  pdfOutput += '0000000000 65535 f \n';

  offsets.forEach((offset) => {
    pdfOutput += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  });

  pdfOutput += 'trailer\n';
  pdfOutput += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdfOutput += 'startxref\n';
  pdfOutput += `${xrefStart}\n`;
  pdfOutput += '%%EOF\n';

  return Buffer.from(pdfOutput, 'utf-8');
}

export const BROCHURE_SUBJECT = 'Your Multistrata AI Brochure — Automate Smarter, Not Harder';
export const BROCHURE_FILENAME = 'Multistrata-AI-Brochure.pdf';

export function buildBrochureEmail(appUrl: string, downloadUrl: string) {
  const text = `Hi there,

Thanks for your interest in Multistrata AI. Attached is our brochure covering how our platform automates enterprise workflows — from compliance audits to supply chain dispatch — with our multi-agent 'strata' architecture.

What's inside:
\t•\tHow our AI agents handle cross-border compliance, audits, and reporting
\t•\tReal deployment results (e.g. compliance overhead reduced from days to minutes)
\t•\tOur tier structure — Fintech, Enterprise, Logistics, Sovereign
\t•\tHow to get started with a pilot deployment

Download Brochure: ${downloadUrl}

If you'd like a walkthrough of how this fits your specific workflow, just reply to this email.

— The Multistrata AI Team`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Multistrata AI Brochure</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0A0A; color: #F8F5F0; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 20px; background-color: #0E0E0E; border: 1px solid #332B18; border-radius: 16px; }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 1px solid #262114; }
    .logo { color: #D4AF37; font-size: 20px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
    .content { padding: 24px 0; line-height: 1.65; color: #D5D1C8; font-size: 15px; }
    .bullets { margin: 16px 0 24px 0; padding-left: 20px; color: #EDEAE2; }
    .bullets li { margin-bottom: 10px; }
    .cta-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #F5D76E 100%); color: #0A0A0A !important; text-decoration: none; padding: 14px 32px; font-weight: 700; font-size: 15px; border-radius: 10px; box-shadow: 0 4px 20px rgba(212,175,55,0.3); }
    .footer { border-top: 1px solid #262114; padding-top: 20px; font-size: 13px; color: #8E8A82; text-align: center; line-height: 1.5; }
  </style>
</head>
<body style="background-color: #0A0A0A; margin: 0; padding: 20px;">
  <div class="wrapper">
    <div class="header">
      <div class="logo">⚡ MULTISTRATA AI</div>
      <p style="margin: 6px 0 0 0; color: #8E8A82; font-size: 13px;">Cognitive Multi-Strata Enterprise Architecture</p>
    </div>
    <div class="content">
      <p style="color: #F8F5F0; font-size: 16px; font-weight: 600;">Hi there,</p>
      <p>Thanks for your interest in <strong>Multistrata AI</strong>. Attached is our brochure covering how our platform automates enterprise workflows — from compliance audits to supply chain dispatch — with our multi-agent 'strata' architecture.</p>
      
      <p style="color: #F5D76E; font-weight: 600; margin-top: 20px;">What's inside:</p>
      <ul class="bullets">
        <li><strong>How our AI agents handle cross-border compliance, audits, and reporting</strong></li>
        <li><strong>Real deployment results</strong> (e.g. compliance overhead reduced from days to minutes)</li>
        <li><strong>Our tier structure</strong> — Fintech, Enterprise, Logistics, Sovereign</li>
        <li><strong>How to get started</strong> with a pilot deployment</li>
      </ul>

      <div class="cta-container">
        <a href="${downloadUrl}" class="btn" target="_blank">Download Brochure (PDF)</a>
      </div>

      <p>If you'd like a walkthrough of how this fits your specific workflow, just reply to this email.</p>
      
      <p style="margin-top: 24px; color: #F5D76E; font-weight: 600;">— The Multistrata AI Team</p>
    </div>
    <div class="footer">
      <p>Multistrata AI • Sovereign Enterprise Process Automation<br>
      <a href="${appUrl}" style="color: #D4AF37; text-decoration: none;">multistrata.dev</a></p>
    </div>
  </div>
</body>
</html>
`;

  return { subject: BROCHURE_SUBJECT, text, html };
}

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Jay H. Kalathiya — Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.45;
      font-size: 10pt;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      height: 297mm;
      padding: 16mm 18mm;
      position: relative;
      background: #ffffff;
      page-break-after: always;
      display: flex;
      flex-direction: column;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Header styling */
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }

    .name {
      font-size: 24pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .title {
      font-size: 12.5pt;
      font-weight: 600;
      color: #2563eb;
      margin-top: 4px;
      letter-spacing: -0.01em;
    }

    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 8px;
      font-size: 9pt;
      color: #475569;
      font-weight: 500;
    }

    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .contact-item strong {
      color: #0f172a;
    }

    /* Section Styling */
    .section {
      margin-bottom: 13px;
    }

    .section-title {
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .summary-text {
      font-size: 9.3pt;
      color: #334155;
      line-height: 1.5;
      text-align: justify;
    }

    /* Skills Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 16px;
      font-size: 9pt;
    }

    .skill-category {
      display: flex;
      gap: 6px;
    }

    .skill-cat-name {
      font-weight: 700;
      color: #0f172a;
      min-width: 115px;
    }

    .skill-cat-items {
      color: #475569;
    }

    /* Experience Card */
    .exp-item {
      margin-bottom: 10px;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .exp-role {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
    }

    .exp-company {
      font-size: 9.5pt;
      font-weight: 600;
      color: #2563eb;
    }

    .exp-period {
      font-size: 8.5pt;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .exp-bullets {
      margin-top: 4px;
      padding-left: 16px;
      font-size: 9pt;
      color: #334155;
    }

    .exp-bullets li {
      margin-bottom: 3px;
      line-height: 1.4;
    }

    /* Project Item */
    .proj-item {
      margin-bottom: 11px;
    }

    .proj-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .proj-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
    }

    .proj-tag {
      font-size: 8pt;
      font-weight: 600;
      color: #0369a1;
      background: #e0f2fe;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .proj-tech {
      font-size: 8.5pt;
      font-weight: 600;
      color: #2563eb;
      margin-bottom: 3px;
    }

    .proj-desc {
      font-size: 9pt;
      color: #334155;
      line-height: 1.45;
      margin-bottom: 4px;
    }

    .proj-bullets {
      padding-left: 16px;
      font-size: 8.8pt;
      color: #475569;
    }

    .proj-bullets li {
      margin-bottom: 2px;
    }

    /* Education styling */
    .edu-item {
      margin-bottom: 8px;
    }

    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .edu-degree {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
    }

    .edu-inst {
      font-size: 9pt;
      font-weight: 600;
      color: #2563eb;
    }

    .edu-period {
      font-size: 8.5pt;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .edu-status {
      display: inline-block;
      font-size: 8pt;
      font-weight: 700;
      color: #047857;
      background: #d1fae5;
      padding: 1px 6px;
      border-radius: 3px;
      margin-left: 6px;
    }

    .edu-desc {
      font-size: 8.8pt;
      color: #475569;
      margin-top: 2px;
    }

    .page-footer {
      margin-top: auto;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page">
    <header class="header">
      <h1 class="name">Jay H. Kalathiya</h1>
      <p class="title">Flutter Developer | Mobile Application Developer</p>
      <div class="contact-bar">
        <span class="contact-item"><strong>Location:</strong> Surat, Gujarat, India</span>
        <span class="contact-item"><strong>Email:</strong> jayhkalathiya2006@gmail.com</span>
        <span class="contact-item"><strong>Phone:</strong> +91 9054181276</span>
      </div>
    </header>

    <!-- Professional Summary -->
    <section class="section">
      <h2 class="section-title">Professional Summary</h2>
      <p class="summary-text">
        Results-driven Flutter Developer with 1 year of professional experience at Visyom AI, specializing in cross-platform mobile application development, frontend development, and UI/UX implementation. Skilled in Flutter, Dart, Firebase, HTML, CSS, and AI-powered development tools. Experienced in developing real-world applications, implementing modern interfaces, integrating third-party services, and delivering high-quality mobile applications.
      </p>
    </section>

    <!-- Technical Skills -->
    <section class="section">
      <h2 class="section-title">Technical Skills</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <span class="skill-cat-name">Frameworks:</span>
          <span class="skill-cat-items">Flutter</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">Programming:</span>
          <span class="skill-cat-items">Dart, HTML, CSS</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">Backend / DB:</span>
          <span class="skill-cat-items">Firebase</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">Mobile & Web:</span>
          <span class="skill-cat-items">Mobile App Dev, Frontend Dev, API Integration</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">Design & UI:</span>
          <span class="skill-cat-items">UI/UX Design, Responsive UI, Figma to Flutter</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">Tools & Store:</span>
          <span class="skill-cat-items">AI Dev Tools, Google AdMob, Google Play Store</span>
        </div>
      </div>
    </section>

    <!-- Professional Experience -->
    <section class="section">
      <h2 class="section-title">Professional Experience</h2>
      <div class="exp-item">
        <div class="exp-header">
          <div>
            <span class="exp-role">Flutter Developer</span> &bull; <span class="exp-company">Visyom AI</span>
          </div>
          <span class="exp-period">1 Year | Surat, Gujarat</span>
        </div>
        <ul class="exp-bullets">
          <li>Developing cross-platform mobile applications using Flutter and Dart.</li>
          <li>Implementing modern and responsive UI/UX designs from wireframes and prototypes.</li>
          <li>Converting Figma designs into functional, high-performance Flutter interfaces.</li>
          <li>Integrating Firebase authentication, cloud storage, real-time database, and third-party RESTful APIs.</li>
          <li>Testing mobile applications, resolving performance bottlenecks, and fixing critical bugs.</li>
          <li>Improving application performance, loading efficiency, and user experience.</li>
          <li>Leveraging AI-powered development tools for accelerated coding, debugging, and testing workflows.</li>
          <li>Working on real-world mobile and web application projects for production deployment.</li>
        </ul>
      </div>
    </section>

    <!-- Projects (First 2) -->
    <section class="section">
      <h2 class="section-title">Key Projects</h2>
      
      <div class="proj-item">
        <div class="proj-header">
          <span class="proj-title">1. Sudoku Puzzle Game</span>
          <span class="proj-tag">Google Play Store &bull; Production</span>
        </div>
        <div class="proj-tech">Flutter &bull; Dart &bull; Google AdMob</div>
        <p class="proj-desc">A Flutter-based Sudoku puzzle game designed to provide an engaging and user-friendly gaming experience with responsive layout.</p>
        <ul class="proj-bullets">
          <li>Flutter-based mobile game development with smooth gameplay and animations.</li>
          <li>Game UI/UX design with responsive grid layouts across varying device sizes.</li>
          <li>Integrated Google AdMob monetization and performance optimizations.</li>
          <li>Deployed to Google Play Store with comprehensive quality assurance and debugging.</li>
        </ul>
      </div>

      <div class="proj-item">
        <div class="proj-header">
          <span class="proj-title">2. BuilderCRM &mdash; Real Estate CRM Platform</span>
          <span class="proj-tag">Real Estate Platform</span>
        </div>
        <div class="proj-tech">Frontend Development &bull; UI/UX &bull; Web Technologies &bull; AI Tools</div>
        <p class="proj-desc">A multi-panel Real Estate CRM platform designed to manage builders, brokers, employees, customers, properties, and business operations.</p>
        <ul class="proj-bullets">
          <li>Architected multi-panel ecosystem: Super Admin, Builder, Broker, and Employee Panels.</li>
          <li>Engineered role-based permission management, lead pipelines, and customer follow-up tracking.</li>
          <li>Built property & inventory management, site visit scheduling, and analytical reporting dashboards.</li>
        </ul>
      </div>
    </section>

    <div class="page-footer">
      <span>Jay H. Kalathiya &bull; Resume</span>
      <span>Page 1 of 2</span>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <!-- Projects Continued -->
    <section class="section">
      <h2 class="section-title">Key Projects (Continued)</h2>

      <div class="proj-item">
        <div class="proj-header">
          <span class="proj-title">3. Food Delivery Application</span>
          <span class="proj-tag">Multi-Platform Ecosystem</span>
        </div>
        <div class="proj-tech">Flutter &bull; Web Development &bull; UI/UX &bull; API Integration</div>
        <p class="proj-desc">A multi-platform food delivery ecosystem connecting customers, restaurants, delivery partners, and administrators.</p>
        <ul class="proj-bullets">
          <li>Built Super Admin Web Panel and Restaurant Management Web Panel for operations.</li>
          <li>Developed responsive Flutter Mobile Application for customers with real-time food catalog.</li>
          <li>Engineered dedicated Delivery Partner Flutter Application with live order tracking.</li>
          <li>Integrated multi-panel pipelines for order processing, dispatching, and delivery state tracking.</li>
        </ul>
      </div>

      <div class="proj-item">
        <div class="proj-header">
          <span class="proj-title">4. Umbrella App &mdash; Social Media Application</span>
          <span class="proj-tag">Mobile Application</span>
        </div>
        <div class="proj-tech">Flutter &bull; Dart &bull; Figma &bull; UI/UX</div>
        <p class="proj-desc">A social media mobile application inspired by modern social networking platforms with interactive communication and media-sharing features.</p>
        <ul class="proj-bullets">
          <li>Converted Figma design prototypes into pixel-perfect Flutter interface widgets.</li>
          <li>Implemented Instagram-like stories, reels, posts, feed interactions, and dark mode theme.</li>
          <li>Integrated real-time live chat messaging, voice/video calling layouts, and profile management.</li>
          <li>Ensured smooth 60fps micro-animations and gesture interactions.</li>
        </ul>
      </div>
    </section>

    <!-- Education Section -->
    <section class="section">
      <h2 class="section-title">Education</h2>
      
      <div class="edu-item">
        <div class="edu-header">
          <div>
            <span class="edu-degree">Master of Computer Applications (MCA)</span>
            <span class="edu-status">Currently Pursuing</span>
          </div>
          <span class="edu-period">2026 &ndash; 2028</span>
        </div>
        <div class="edu-inst">Parul University</div>
        <p class="edu-desc">
          Focusing on advanced computer applications, software engineering principles, enterprise architecture, and mobile/cloud computing technologies.
        </p>
      </div>

      <div class="edu-item" style="margin-top: 10px;">
        <div class="edu-header">
          <div>
            <span class="edu-degree">Bachelor of Computer Applications (BCA)</span>
          </div>
          <span class="edu-period">Completed / Previous Qualification</span>
        </div>
        <div class="edu-inst">Previous Qualification</div>
        <p class="edu-desc">
          Solid foundational coursework in computer science, software development, object-oriented programming, data structures, and mobile interface design.
        </p>
      </div>
    </section>

    <!-- Professional Attributes -->
    <section class="section">
      <h2 class="section-title">Key Competencies</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <span class="skill-cat-name">&bull; Cross-Platform:</span>
          <span class="skill-cat-items">Flutter & Dart architecture, reactive state management</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">&bull; UI / UX Translation:</span>
          <span class="skill-cat-items">Pixel-perfect Figma-to-Flutter conversion & animations</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">&bull; Backend & APIs:</span>
          <span class="skill-cat-items">Firebase integration, authentication, RESTful services</span>
        </div>
        <div class="skill-category">
          <span class="skill-cat-name">&bull; AI Development:</span>
          <span class="skill-cat-items">AI-assisted development, optimization, and debugging</span>
        </div>
      </div>
    </section>

    <div class="page-footer">
      <span>Jay H. Kalathiya &bull; Resume</span>
      <span>Page 2 of 2</span>
    </div>
  </div>

</body>
</html>`;

const tempHtmlPath = path.join(__dirname, 'temp_resume.html');
const outputPath = path.join(__dirname, 'client', 'public', 'Jay_H_Kalathiya_Resume.pdf');
const distPath = path.join(__dirname, 'client', 'dist', 'Jay_H_Kalathiya_Resume.pdf');

fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

// Edge headless command to render PDF
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const command = `"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputPath}" --no-pdf-header-footer "${tempHtmlPath}"`;

try {
  console.log('Generating PDF using:', edgePath);
  execSync(command);
  console.log('Resume PDF generated successfully at:', outputPath);

  if (fs.existsSync(path.dirname(distPath))) {
    fs.copyFileSync(outputPath, distPath);
    console.log('Copied to dist as well.');
  }
} catch (err) {
  console.error('Error generating PDF:', err.message);
} finally {
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }
}


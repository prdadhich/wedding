export default function renderLayout(data) {
  const { 
    title, 
    description, 
    heroImage, 
    contentHtml, 
    canonical, 
    schemaType = 'WebPage', 
    schemaData = '{}',
    seo
  } = data;

  const pageTitle = seo?.title || `${title} | Pratyush Dadhich`;
  const pageDescription = seo?.description || description;
  const pageKeywords = seo?.keywords ? `<meta name="keywords" content="${seo.keywords.join(', ')}">` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDescription}">
  ${pageKeywords}

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDescription}">
  <meta property="og:image" content="${heroImage}">
  <meta property="og:type" content="website">

  <!-- Google Site Verification -->
  <meta name="google-site-verification" content="bfkv1-L_m8f9-jKDYjvnCEmEwlUOGy4vBRlJkm36n08" />
  
  <link rel="canonical" href="${canonical}">

  <!-- Typography: Cormorant Garamond (Serif) & Inter (Sans-Serif) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/style.css">

  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"${schemaType}",
    "name":"${title}",
    "image":"${heroImage}",
    "description":"${description}",
    ${schemaData}
  }
  </script>
</head>
<body>
  <!-- Navigation -->
  <header class="site-header">
    <div class="logo">
      <a href="/" id="nav-logo">Pratyush Dadhich</a>
    </div>
    <button class="nav-toggle" aria-label="Toggle Menu" id="nav-toggle-btn">
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <nav class="main-nav" id="main-navigation">
      <ul>
        <li><a href="/services/">Services</a></li>
        <li><a href="/sessions/">Sessions</a></li>
        <li><a href="/experiences/">Experiences</a></li>
        <li><a href="/locations/">Locations</a></li>
        <li><a href="/resources/">Resources</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="#contact">Inquire</a></li>
      </ul>
    </nav>
  </header>

  <main>
    ${contentHtml}
  </main>

  <!-- Global Contact/Inquiry Section -->
  <section class="section contact-section" id="contact">
    <div class="container contact-container">
      <div class="contact-header">
        <span class="section-label">Inquire</span>
        <h2 class="contact-title">Let's talk about your journey.</h2>
        <p class="contact-subtitle">Currently accepting commissions for 2026 and 2027.</p>
      </div>
      <div class="contact-form-wrapper">
        <form action="https://formspree.io/f/mqevaebn" method="POST" class="contact-form" id="inquiry-form">
          <div class="form-group">
            <label for="name" class="form-label">Names</label>
            <input type="text" id="name" name="name" class="form-input" placeholder="e.g. Barbara" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="date" class="form-label">Date of Event</label>
              <input type="date" id="date" name="date" class="form-input">
            </div>
            <div class="form-group">
              <label for="location" class="form-label">Location / Venue</label>
              <input type="text" id="location" name="location" class="form-input" placeholder="e.g. Trento, Italy">
            </div>
          </div>
          <div class="form-group">
            <label for="details" class="form-label">Tell me about yourselves and your plans</label>
            <textarea id="details" name="details" rows="5" class="form-input" placeholder="Describe the atmosphere, the people, and what matters most to you..." required></textarea>
          </div>
          <button type="submit" class="btn btn-submit" id="submit-btn">Send Inquiry</button>
          <div class="form-message" id="form-success-msg">Thank you. Your inquiry has been sent. I'll get back to you as soon as possible.</div>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <span class="footer-logo">Pratyush Dadhich</span>
        <p class="footer-tagline">Wedding stories by Pratyush Dadhich.</p>
      </div>
      <div class="footer-meta">
        <span class="footer-copy">&copy; 2026 Pratyush Dadhich. All rights reserved.</span>
      </div>
    </div>
  </footer>

  <script src="/main.js"></script>
</body>
</html>`;
}

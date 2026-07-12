export default function renderCta(sectionData) {
  if (!sectionData) return '';

  return `
    <section class="section page-cta-section" style="background-color: #f9f9f9; padding: 6rem 0; text-align: center; margin-top: 4rem;">
      <div class="container" style="max-width: 600px; margin: 0 auto;">
        ${sectionData.title ? `<h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom: 1rem;">${sectionData.title}</h2>` : ''}
        ${sectionData.text ? `<p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #555; margin-bottom: 2rem;">${sectionData.text}</p>` : ''}
        ${sectionData.button ? `<a href="#contact" class="btn btn-primary" style="display: inline-block; padding: 1rem 2rem; background: #111; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">${sectionData.button}</a>` : ''}
      </div>
    </section>
  `;
}

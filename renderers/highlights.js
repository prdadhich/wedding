export default function renderHighlights(sectionData, pageData) {
  const highlights = sectionData.items || pageData.experienceHighlights;
  if (!highlights || !highlights.length) return '';

  const itemsHtml = highlights.map(item => `
    <li style="margin-bottom: 0.5rem;">
      <span style="color: #666; margin-right: 10px;">&mdash;</span> ${item}
    </li>
  `).join('');

  return `
    <section class="section page-highlights-section" style="padding: 2rem 0; background: #fafafa;">
      <div class="container" style="max-width: 600px; margin: 0 auto;">
        <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; margin-bottom: 1.5rem;">Experience Highlights</h3>
        <ul style="font-family: 'Inter', sans-serif; font-size: 1rem; color: #333; list-style: none; padding: 0;">
          ${itemsHtml}
        </ul>
      </div>
    </section>
  `;
}

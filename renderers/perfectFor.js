export default function renderPerfectFor(sectionData, pageData) {
  const perfectFor = pageData.perfectFor;
  if (!perfectFor || !perfectFor.length) return '';

  const itemsHtml = perfectFor.map(item => `
    <span style="display: inline-block; padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 20px; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #555; margin: 0 0.5rem 0.5rem 0;">
      ${item}
    </span>
  `).join('');

  return `
    <section class="section page-perfect-for-section" style="padding: 2rem 0; text-align: center;">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <h3 style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 1.5rem;">Perfect For</h3>
        <div class="tags-container">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

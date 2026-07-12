export default function renderDetails(sectionData) {
  if (!sectionData || !sectionData.items || !sectionData.items.length) return '';

  const itemsHtml = sectionData.items.map(item => `
    <div class="detail-item" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.1); padding: 1rem 0;">
      <strong class="detail-label" style="font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: #666;">${item.label}</strong>
      <span class="detail-value" style="font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic;">${item.value}</span>
    </div>
  `).join('');

  return `
    <section class="section page-details-section">
      <div class="container" style="max-width: 600px; margin: 0 auto 4rem auto;">
        <div class="details-list">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

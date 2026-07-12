export default function renderValues(sectionData) {
  if (!sectionData || !sectionData.items || !sectionData.items.length) return '';

  const itemsHtml = sectionData.items.map(item => `
    <div class="value-item" style="flex: 1; min-width: 250px;">
      <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; margin-bottom: 0.75rem;">${item.title}</h3>
      <p style="font-family: 'Inter', sans-serif; font-size: 1rem; color: #555; line-height: 1.6;">${item.text}</p>
    </div>
  `).join('');

  return `
    <section class="section page-values-section" style="padding: 6rem 0; background-color: #fafafa;">
      <div class="container" style="max-width: 1000px; margin: 0 auto;">
        <div class="values-grid" style="display: flex; flex-wrap: wrap; gap: 3rem;">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

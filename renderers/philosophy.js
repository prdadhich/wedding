export default function renderPhilosophy(sectionData) {
  if (!sectionData || !sectionData.items || !sectionData.items.length) return '';

  const itemsHtml = sectionData.items.map((item, index) => `
    <div class="philosophy-item" style="border-top: 1px solid rgba(0,0,0,0.1); padding: 2rem 0; display: flex; flex-wrap: wrap; gap: 2rem;">
      <div class="philosophy-title" style="flex: 1; min-width: 250px;">
        <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; margin: 0;">${item.title}</h3>
      </div>
      <div class="philosophy-text" style="flex: 2; min-width: 300px;">
        <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #555; line-height: 1.8; margin: 0;">${item.text}</p>
      </div>
    </div>
  `).join('');

  return `
    <section class="section page-philosophy-section" style="padding: 6rem 0;">
      <div class="container" style="max-width: 900px; margin: 0 auto;">
        <h2 style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 2rem;">Philosophy</h2>
        <div class="philosophy-list">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

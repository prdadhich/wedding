export default function renderQuickFacts(sectionData, pageData) {
  const facts = pageData.quickFacts || [];
  if (!facts.length) return '';

  const itemsHtml = facts.map(fact => `
    <div class="quick-fact-item" style="flex: 1; min-width: 200px; padding: 1.5rem; background: #fff; border: 1px solid rgba(0,0,0,0.05); text-align: center; border-radius: 4px;">
      <strong class="fact-label" style="display: block; font-family: 'Inter', sans-serif; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 0.5rem;">${fact.label}</strong>
      <span class="fact-value" style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: #111;">${fact.value}</span>
    </div>
  `).join('');

  return `
    <section class="section page-quick-facts-section" style="padding: 2rem 0 4rem 0; background-color: #fafafa;">
      <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div class="quick-facts-grid" style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center;">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

export default function renderFaq(sectionData) {
  if (!sectionData || !sectionData.items || !sectionData.items.length) return '';

  const itemsHtml = sectionData.items.map(item => `
    <div class="faq-item" style="margin-bottom: 2rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 1rem;">
      <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem;">${item.question}</h3>
      <p style="font-family: 'Inter', sans-serif; font-size: 1rem; color: #555; line-height: 1.6;">${item.answer}</p>
    </div>
  `).join('');

  return `
    <section class="section page-faq-section" style="padding: 4rem 0;">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; text-align: center; margin-bottom: 3rem;">Frequently Asked Questions</h2>
        <div class="faq-list">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

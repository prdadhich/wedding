export default function renderQuote(sectionData) {
  if (!sectionData || !sectionData.text) return '';

  return `
    <section class="section page-quote-section" style="padding: 4rem 0;">
      <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <blockquote style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-style: italic; color: #333; margin: 0 0 2rem 0; line-height: 1.4;">
          "${sectionData.text}"
        </blockquote>
        ${sectionData.author ? `<cite style="font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: #777; font-style: normal;">&mdash; ${sectionData.author}</cite>` : ''}
      </div>
    </section>
  `;
}

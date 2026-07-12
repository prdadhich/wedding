export default function renderBelief(sectionData) {
  if (!sectionData || !sectionData.quote) return '';

  return `
    <section class="section page-belief-section" style="padding: 6rem 0; background-color: #111; color: #fff; text-align: center;">
      <div class="container" style="max-width: 900px; margin: 0 auto;">
        <blockquote style="font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-style: italic; font-weight: 300; line-height: 1.3; margin: 0;">
          "${sectionData.quote}"
        </blockquote>
      </div>
    </section>
  `;
}

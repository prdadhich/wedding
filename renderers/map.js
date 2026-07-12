export default function renderMap(sectionData) {
  if (!sectionData || !sectionData.locations || !sectionData.locations.length) return '';

  const locationsHtml = sectionData.locations.map(loc => `
    <li style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.5rem;">
      ${loc}
    </li>
  `).join('');

  return `
    <section class="section page-map-section" style="padding: 6rem 0; background-color: #fafafa;">
      <div class="container" style="max-width: 600px; margin: 0 auto; text-align: center;">
        ${sectionData.title ? `<h2 style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 2rem;">${sectionData.title}</h2>` : ''}
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${locationsHtml}
        </ul>
      </div>
    </section>
  `;
}

export default function renderLocationsGrid(sectionData, pageData) {
  const locations = pageData.relatedLocations || [];
  if (!locations.length) return '';

  const itemsHtml = locations.map(loc => `
    <div class="archive-item">
      <div class="archive-image-wrapper">
        <img src="${loc.coverImage || loc.heroImage}" alt="${loc.title}" class="archive-image" loading="lazy">
      </div>
      <div class="archive-meta" style="text-align: center; margin-top: 1rem;">
        <h3 class="archive-title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem;">${loc.title}</h3>
        <div style="margin-top: 1rem;">
          <a href="/locations/${loc.slug}/" class="archive-link" style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #111; text-decoration: underline;">Explore &rarr;</a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="section page-locations-grid-section" style="padding: 4rem 0;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="section-label" style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #999;">Destinations</span>
          <h2 class="section-title-serif" style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-top: 0.5rem;">Locations</h2>
        </div>
        <div class="archive-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

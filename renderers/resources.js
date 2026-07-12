export default function renderResourcesGrid(sectionData, pageData) {
  const resources = pageData.relatedResources || [];
  if (!resources.length) return '';

  const itemsHtml = resources.map(resource => `
    <div class="archive-item">
      <div class="archive-meta" style="text-align: left; padding: 1.5rem; background: #f9f9f9; border-left: 3px solid #ccc;">
        <h3 class="archive-title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem;">${resource.title}</h3>
        <p style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #555; margin-bottom: 1rem;">${resource.description || ''}</p>
        <a href="/resources/${resource.slug}/" class="archive-link" style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #111; text-decoration: underline;">Read Article &rarr;</a>
      </div>
    </div>
  `).join('');

  return `
    <section class="section page-resources-grid-section" style="padding: 4rem 0;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="section-label" style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #999;">Helpful</span>
          <h2 class="section-title-serif" style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-top: 0.5rem;">Resources</h2>
        </div>
        <div class="archive-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

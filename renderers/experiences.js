export default function renderExperiencesGrid(sectionData, pageData) {
  const experiences = pageData.relatedExperiences || [];
  if (!experiences.length) return '';

  const itemsHtml = experiences.map(item => `
    <div class="archive-item">
      <div class="archive-image-wrapper">
        <a href="/experiences/${item.slug}/">
          <img src="${item.coverImage || item.heroImage}" alt="${item.title}" class="archive-image" loading="lazy">
        </a>
      </div>
      <div class="archive-meta" style="text-align: center; margin-top: 1.5rem;">
        <h3 class="archive-title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem;">${item.title}</h3>
        <span class="archive-location" style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #777;">${item.duration || ''}</span>
        <div style="margin-top: 1rem;">
          <a href="/experiences/${item.slug}/" class="archive-link" style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #111; text-decoration: underline;">Explore &rarr;</a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="section page-experiences-grid-section" style="padding: 4rem 0;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="section-label" style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #999;">Explore</span>
          <h2 class="section-title-serif" style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-top: 0.5rem;">Experiences</h2>
        </div>
        <div class="archive-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

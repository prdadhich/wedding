export default function renderSessionsGrid(sectionData, pageData) {
  const sessions = pageData.relatedSessions || [];
  if (!sessions.length) return '';

  const itemsHtml = sessions.map(session => `
    <div class="archive-item">
      <div class="archive-image-wrapper">
        <img src="${session.coverImage || session.heroImage}" alt="${session.title}" class="archive-image" loading="lazy">
      </div>
      <div class="archive-meta" style="text-align: center; margin-top: 1rem;">
        <h3 class="archive-title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.25rem;">${session.title}</h3>
        <span class="archive-date" style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #777;">${session.date || ''}</span>
        <div style="margin-top: 1rem;">
          <a href="/sessions/${session.slug}/" class="archive-link" style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #111; text-decoration: underline;">View Session &rarr;</a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="section page-sessions-grid-section" style="padding: 4rem 0; background-color: #fafafa;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="section-label" style="font-family: 'Inter', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #999;">Documented</span>
          <h2 class="section-title-serif" style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-top: 0.5rem;">Sessions</h2>
        </div>
        <div class="archive-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

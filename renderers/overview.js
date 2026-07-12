export default function renderOverview(sectionData, pageData) {
  if (!sectionData || !sectionData.content) return '';

  const hasIntroImage = pageData && pageData.introImage;

  if (hasIntroImage) {
    return `
      <section class="section page-overview-section" style="padding: 4rem 0;">
        <div class="container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 4rem;">
          <div class="overview-text" style="flex: 1; min-width: 300px; font-size: 1.2rem; line-height: 1.8;">
            <p>${sectionData.content}</p>
          </div>
          <div class="overview-image" style="flex: 1; min-width: 300px;">
            <img src="${pageData.introImage}" alt="Introduction" style="width: 100%; height: auto; max-height: 700px; object-fit: cover;">
          </div>
        </div>
      </section>
    `;
  }

  // Fallback to centered layout if no introImage
  return `
    <section class="section page-overview-section">
      <div class="container">
        <div class="page-overview-content" style="max-width: 800px; margin: 0 auto; text-align: center; font-size: 1.2rem; line-height: 1.8; margin-bottom: 4rem;">
          <p>${sectionData.content}</p>
        </div>
      </div>
    </section>
  `;
}

export default function renderSplit(sectionData) {
  if (!sectionData) return '';

  return `
    <section class="section page-split-section" style="padding: 6rem 0;">
      <div class="container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 4rem;">
        <div class="split-image" style="flex: 1; min-width: 300px;">
          <img src="${sectionData.image}" alt="${sectionData.title}" style="width: 100%; height: auto; max-height: 800px; object-fit: cover;">
        </div>
        <div class="split-text" style="flex: 1; min-width: 300px;">
          <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom: 1.5rem;">${sectionData.title}</h2>
          <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; line-height: 1.8; color: #444;">${sectionData.content}</p>
        </div>
      </div>
    </section>
  `;
}

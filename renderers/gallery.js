// Layout Compiler Algorithm extracted from main.js
function compileLayout(images) {
  const rows = [];
  let i = 0;

  while (i < images.length) {
    const img1 = images[i];
    const img2 = images[i + 1];
    const img3 = images[i + 2];

    // Try Triptych (3 portraits)
    if (img1 && img2 && img3 &&
      img1.orientation === 'portrait' &&
      img2.orientation === 'portrait' &&
      img3.orientation === 'portrait') {
      rows.push({ type: 'triptych', images: [img1, img2, img3] });
      i += 3;
      continue;
    }

    // Try Double combinations
    if (img1 && img2) {
      if (img1.orientation === 'portrait' && img2.orientation === 'portrait') {
        rows.push({ type: 'double-portrait', images: [img1, img2] });
        i += 2;
        continue;
      }

      if (img1.orientation === 'landscape' && img2.orientation === 'landscape') {
        rows.push({ type: 'double-landscape', images: [img1, img2] });
        i += 2;
        continue;
      }

      if (img1.orientation === 'portrait' && img2.orientation === 'landscape') {
        rows.push({ type: 'offset-portrait-landscape', images: [img1, img2] });
        i += 2;
        continue;
      }

      if (img1.orientation === 'landscape' && img2.orientation === 'portrait') {
        rows.push({ type: 'offset-landscape-portrait', images: [img1, img2] });
        i += 2;
        continue;
      }
    }

    // Single Fallback
    if (img1) {
      if (img1.orientation === 'landscape') {
        rows.push({ type: 'single-landscape', images: [img1] });
      } else {
        rows.push({ type: 'single-portrait', images: [img1] });
      }
      i += 1;
    }
  }

  return rows;
}

export default function renderGallery(sectionData, pageData) {
  // If the section specifies images, use them. Otherwise, pull from pageData.gallery
  const images = sectionData.images || pageData.gallery || [];
  if (!images.length) return '';

  const layoutRows = compileLayout(images);

  let html = `<div class="modal-gallery-grid editorial-gallery">`;

  layoutRows.forEach(row => {
    html += `<div class="modal-row modal-row-${row.type}">`;

    row.images.forEach(img => {
      // Build the semantic image HTML
      let captionHtml = '';
      if (img.showCaption !== false && (img.title || img.caption)) {
        captionHtml = `<figcaption class="modal-figcaption">`;
        if (img.title) captionHtml += `<strong class="modal-figtitle">${img.title}</strong>`;
        if (img.caption) captionHtml += `<p class="modal-figdesc">${img.caption}</p>`;
        captionHtml += `</figcaption>`;
      }
        
      html += `
        <figure class="modal-image-wrapper" style="margin: 0;">
          <img src="${img.src}" alt="${img.alt || img.title || img.caption || 'Editorial photography'}" class="modal-img loaded" loading="lazy">
          ${captionHtml}
        </figure>
      `;
    });

    html += `</div>`;
  });

  html += `</div>`;
  return html;
}

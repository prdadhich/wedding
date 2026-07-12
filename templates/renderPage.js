import renderOverview from '../renderers/overview.js';
import renderGallery from '../renderers/gallery.js';
import renderDetails from '../renderers/details.js';
import renderCta from '../renderers/cta.js';
import renderQuote from '../renderers/quote.js';
import renderFaq from '../renderers/faq.js';
import renderHighlights from '../renderers/highlights.js';
import renderPerfectFor from '../renderers/perfectFor.js';
import renderExperiencesGrid from '../renderers/experiences.js';
import renderSessionsGrid from '../renderers/sessions.js';
import renderResourcesGrid from '../renderers/resources.js';
import renderQuickFacts from '../renderers/quickFacts.js';
import renderLocationsGrid from '../renderers/locations.js';
import renderServicesGrid from '../renderers/services.js';
import renderBelief from '../renderers/belief.js';
import renderSplit from '../renderers/split.js';
import renderValues from '../renderers/values.js';
import renderPhilosophy from '../renderers/philosophy.js';
import renderMap from '../renderers/map.js';

const sectionRenderers = {
  overview: renderOverview,
  gallery: renderGallery,
  details: renderDetails,
  cta: renderCta,
  quote: renderQuote,
  faq: renderFaq,
  highlights: renderHighlights,
  perfectFor: renderPerfectFor,
  experiences: renderExperiencesGrid,
  sessions: renderSessionsGrid,
  resources: renderResourcesGrid,
  quickFacts: renderQuickFacts,
  locations: renderLocationsGrid,
  services: renderServicesGrid,
  belief: renderBelief,
  split: renderSplit,
  values: renderValues,
  philosophy: renderPhilosophy,
  map: renderMap
};

export default function renderPage(pageType, pageData) {
  let contentHtml = `
    <!-- Hero Section -->
    <section class="page-hero" style="position: relative; z-index: 0; height: 100vh; min-height: 700px; display: flex; align-items: center; justify-content: center; text-align: center; color: white; background-color: #111; overflow: hidden;">
      
      <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -2;">
        <img src="${pageData.heroImage}" alt="${pageData.title}" style="width: 100%; height: 100%; object-fit: cover; object-position: ${pageData.heroPosition || 'center center'}; filter: brightness(0.6);">
      </div>

      <div class="hero-content" style="z-index: 1; padding: 0 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
        ${pageType === 'Service' ? `<span class="section-label" style="color: white; border-color: rgba(255,255,255,0.3); margin-bottom: 1rem; display: inline-block;">Service</span>` : ''}
        ${pageType === 'Session' && pageData.date && pageData.location ? `
          <p class="hero-meta" style="font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 1rem;">
            ${pageData.date} &mdash; ${pageData.location}
          </p>
        ` : ''}
        <h1 class="hero-title" style="font-family: 'Cormorant Garamond', serif; font-size: 4.5rem; font-weight: 400; margin: 0; line-height: 1.1;">${pageData.title}</h1>
      </div>
    </section>

    <!-- Main Content Flow -->
    <article class="page-content" style="padding-top: 4rem;">
  `;

  // Render each modular section
  if (pageData.sections && Array.isArray(pageData.sections)) {
    pageData.sections.forEach(section => {
      const renderer = sectionRenderers[section.type];
      if (renderer) {
        contentHtml += renderer(section, pageData);
      } else {
        console.warn(`No renderer found for section type: ${section.type}`);
      }
    });
  }

  contentHtml += `
    </article>
  `;

  return contentHtml;
}

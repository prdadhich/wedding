import renderExperiencesGrid from '../renderers/experiences.js';
import renderSessionsGrid from '../renderers/sessions.js';
import renderLocationsGrid from '../renderers/locations.js';
import renderServicesGrid from '../renderers/services.js';
import renderCta from '../renderers/cta.js';

export default function renderHome({ services, experiences, locations, sessions, resources }) {
  // Construct a pseudo pageData object with featured items for the grid renderers
  const pageData = {
    relatedSessions: sessions.filter(s => s.featured).slice(0, 6),
    relatedExperiences: experiences.filter(e => e.featured).slice(0, 6),
    relatedServices: services.filter(s => s.featured).slice(0, 6),
    relatedLocations: locations.filter(l => l.featured).slice(0, 6),
  };

  // Curated landscape images for the hero slideshow (prevents harsh desktop cropping)
  const heroImages = [
    "https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5619_ofCJt64dmL.jpg", // Final Dance (Landscape) - Guaranteed working
    "https://ik.imagekit.io/prdadhich/Images/Photography/IMG_2727-Enhanced-NR_OuQrEiTuP.jpg", // Milan Duomo (Landscape)
    "https://ik.imagekit.io/prdadhich/Images/Photography/IMG_1716_jiPTkzLae.jpg", // Tre Cime Sunrise (Landscape)
    "https://ik.imagekit.io/prdadhich/Images/Photography/IMG_4765_R7hY2a7YW.jpg" // Milan Candid (Landscape)
  ];

  return `
    <!-- Hero Section -->
    <section class="hero-section" id="hero" style="position: relative; z-index: 0; height: 100vh; min-height: 700px; display: flex; align-items: center; justify-content: center; text-align: center; color: white; background-color: #111;">
      <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; overflow: hidden; background-color: #000;">
        ${heroImages.map((src, index) => `
          <img class="slideshow-img" src="${src}" alt="Cinematic photograph" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 40%; filter: brightness(0.6); transition: opacity 2s ease-in-out; opacity: ${index === 0 ? 1 : 0};">
        `).join('')}
      </div>
      
      <script>
        (function() {
          setTimeout(() => {
            const images = document.querySelectorAll('.slideshow-img');
            let currentIndex = 0;
            
            if (images.length > 1) {
              setInterval(() => {
                images[currentIndex].style.opacity = 0;
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].style.opacity = 1;
              }, 5000); // 5 seconds per slide
            }
          }, 100);
        })();
      </script>

      <div class="hero-content" style="z-index: 1; padding: 0 20px;">
        <p class="hero-subtitle" style="font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 1rem;">Photography Experiences in Italy</p>
        <h1 class="hero-title" style="font-family: 'Cormorant Garamond', serif; font-size: 4.5rem; font-weight: 400; margin: 0 0 2rem 0; line-height: 1.1; max-width: 800px;">Documenting people in extraordinary places.</h1>
        <a href="#featured-sessions" class="btn btn-outline" style="display: inline-block; padding: 1rem 2rem; border: 1px solid white; color: white; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; transition: background-color 0.3s, color 0.3s;">View Portfolio</a>
      </div>
    </section>

    <!-- Homepage Content Flow -->
    <div id="featured-sessions">
      ${renderSessionsGrid({}, pageData)}
    </div>

    <div>
      ${renderExperiencesGrid({}, pageData)}
    </div>

    <div>
      ${renderServicesGrid({}, pageData)}
    </div>

    <div>
      ${renderLocationsGrid({}, pageData)}
    </div>

    <!-- Brief About Section -->
    <section class="section" style="padding: 6rem 0; background-color: #fafafa; text-align: center;">
      <div class="container" style="max-width: 700px; margin: 0 auto;">
        <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom: 1.5rem;">Honest, timeless photography.</h2>
        <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 2rem;">
          I'm Pratyush Dadhich, a documentary photographer based in Italy. I photograph weddings, proposals, couples, and people exploring new places. My work isn't about perfect poses it's about creating photographs that feel honest and true to the experience.
        </p>
        <a href="/about/" style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #111; text-decoration: underline; text-transform: uppercase; letter-spacing: 1px;">More About My Approach</a>
      </div>
    </section>
  `;
}

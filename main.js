/**
 * Pratyush Dadhich Wedding Photography Portfolio
 * Custom Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initTestimonialSlider();
  initStoryViewer();
  initContactForm();
});

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('.hero-section');

  if (!header || !heroSection) return;

  const checkScroll = () => {
    const heroHeight = heroSection.offsetHeight;
    // Add scrolled class after scrolling past 80px
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  // Check initially on load
  checkScroll();
}

/* ==========================================================================
   Mobile Nav Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const mainNav = document.getElementById('main-navigation');

  if (!toggleBtn || !mainNav) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('active');
    mainNav.classList.toggle('active');

    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking nav links
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================================================
   Testimonial Slider
   ========================================================================== */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('test-prev');
  const nextBtn = document.getElementById('test-next');
  const indicator = document.getElementById('test-indicator');

  if (slides.length === 0 || !prevBtn || !nextBtn || !indicator) return;

  let currentSlide = 0;

  const updateSlides = () => {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === currentSlide) {
        slide.classList.add('active');
      }
    });
    indicator.textContent = `${currentSlide + 1} / ${slides.length}`;
  };

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  });
}

/* ==========================================================================
   Dynamic Story Engine & Archive
   ========================================================================== */
const storiesArchive = [
  {
    id: 'barbara-martin',
    title: 'Barbara',
    location: 'Trento, Italy',
    date: 'May 2026',
    description: 'A day shared with family, friends, and the quiet moments in between.',
    coverImage: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5698_qkRgKZ926b.jpg',
    images: [
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5306_iNsBwX5KfP.jpg', orientation: 'landscape', caption: 'Barbara & her father.' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5380_x6677_Vot.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5635_lRlaj4jczm.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5515_M9XETD6z9.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5626_H6wJ6gmulM.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5733_slaZnFng7.jpg', orientation: 'portrait', caption: 'With her father' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5718_kxhlxwkqtF.jpg', orientation: 'portrait', caption: 'Barbara & her mother' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5533_XejHNn3HR.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5527_idNWRoE8i.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5674_hDbqiu-0PI.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5375_OUbzvWAzim.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5413_Jgtk7WPr_.jpg', orientation: 'landscape', caption: '' },

      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5506_EmRAOI3kSr.jpg', orientation: 'landscape', caption: 'Among friends' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5757_lgjYf3t5i7.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5732_H_8kRSRZza.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5720_bBtG0XyID.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5698_qkRgKZ926b.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5695%20(1)_YeZIfib31_.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5680_uH6NDoaVP.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5648_4Kn8LHUucN.jpg', orientation: 'portrait', caption: '' },

      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5628_MdLaCsVXhA.jpg', orientation: 'portrait', caption: '' },

      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5612_yGy5wfFYtj.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5502_86hpnh95u.jpg', orientation: 'landscape', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5575_10uACF_Zf.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5613_PhiXu3QwZ.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5524_zPZ_T57rms.jpg', orientation: 'portrait', caption: '' },
      { url: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5619_ofCJt64dmL.jpg', orientation: 'portrait', caption: '' }

    ]
  }
];

// Layout Compiler Algorithm
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

function initStoryViewer() {
  const archiveList = document.getElementById('archive-list');
  const modal = document.getElementById('story-modal-viewer');
  const closeBtn = document.getElementById('modal-close');
  const modalLoc = document.getElementById('modal-loc');
  const modalTitle = document.getElementById('modal-title-text');
  const modalDate = document.getElementById('modal-date');
  const modalDesc = document.getElementById('modal-desc');
  const galleryGrid = document.getElementById('modal-gallery-images');

  if (!archiveList || !modal || !closeBtn) return;

  // 1. Render Archive Cards Dynamically
  archiveList.innerHTML = '';

  storiesArchive.forEach(story => {
    const card = document.createElement('article');
    card.className = 'archive-card';
    card.setAttribute('data-story', story.id);

    card.innerHTML = `
      <div class="archive-image-wrapper">
        <img src="${story.coverImage}" alt="${story.title}" class="archive-image" loading="lazy">
      </div>
      <div class="archive-meta">
        <h3 class="archive-title">${story.title}</h3>
        <span class="archive-location">${story.location}</span>
        <span class="archive-date">${story.date}</span>
        <span class="archive-link">View Narrative &rarr;</span>
      </div>
    `;

    archiveList.appendChild(card);
  });

  // 2. Setup Modal Viewer Logic
  const openStory = (storyId) => {
    const story = storiesArchive.find(s => s.id === storyId);
    if (!story) return;

    // Populating modal metadata
    if (modalLoc) modalLoc.textContent = story.location;
    if (modalTitle) modalTitle.textContent = story.title;
    if (modalDate) modalDate.textContent = story.date;
    if (modalDesc) modalDesc.textContent = story.description;

    galleryGrid.innerHTML = '';

    // Compile dynamic layout based on image sequence
    const layoutRows = compileLayout(story.images);

    // Build the editorial DOM
    layoutRows.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = `modal-row modal-row-${row.type}`;

      row.images.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'modal-image-wrapper';

        const image = document.createElement('img');
        image.src = img.url;
        image.alt = img.caption;
        image.className = 'modal-img';
        image.loading = 'lazy';

        // Add fade-in animation trigger and error handling
        image.onload = () => { image.classList.add('loaded'); };
        image.onerror = () => { wrapper.style.display = 'none'; };
        if (image.complete) { image.classList.add('loaded'); }

        if (img.caption && img.caption.trim() !== '') {
          const caption = document.createElement('p');
          caption.className = 'modal-caption';
          caption.textContent = img.caption;
          wrapper.appendChild(caption);
        }

        wrapper.appendChild(image);
        rowEl.appendChild(wrapper);
      });

      galleryGrid.appendChild(rowEl);
    });

    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeStory = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  };

  // Bind click events dynamically created cards
  const storyCards = archiveList.querySelectorAll('.archive-card');
  storyCards.forEach(card => {
    card.addEventListener('click', () => {
      const storyId = card.getAttribute('data-story');
      openStory(storyId);
    });
  });

  // Close bindings
  closeBtn.addEventListener('click', closeStory);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeStory();
    }
  });

  const ctaLinks = modal.querySelectorAll('.close-and-scroll');
  ctaLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeStory();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeStory();
    }
  });
}

/* ==========================================================================
   Contact Form Simulation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const successMsg = document.getElementById('form-success-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !successMsg || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Visual loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Revert loading state
        submitBtn.textContent = 'Send Inquiry';
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;

        // Show success message and clear form
        successMsg.style.display = 'block';
        successMsg.textContent = 'Thank you. Your inquiry has been sent. We will respond within 48 hours.';
        form.reset();

        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Fade out success message after 7 seconds
        setTimeout(() => {
          successMsg.style.animation = 'fadeOut 1s ease forwards';
          setTimeout(() => {
            successMsg.style.display = 'none';
            successMsg.style.animation = 'fadeIn 0.5s ease forwards'; // Reset animations
          }, 1000);
        }, 7000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Revert loading state on error
      submitBtn.textContent = 'Send Inquiry';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;

      // Show error message
      successMsg.style.display = 'block';
      successMsg.style.color = '#B22222'; // Subtle red
      successMsg.textContent = 'Oops! There was a problem sending your inquiry. Please try again.';

      setTimeout(() => {
        successMsg.style.animation = 'fadeOut 1s ease forwards';
        setTimeout(() => {
          successMsg.style.display = 'none';
          successMsg.style.animation = 'fadeIn 0.5s ease forwards';
          successMsg.style.color = ''; // Reset color
        }, 1000);
      }, 7000);
    }
  });
}

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, 'content');
const DIST_DIR = path.join(__dirname, 'dist');
const TEMPLATES_DIR = path.join(__dirname, 'templates');

// Utility: Ensure directory exists
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

// Utility: Read all JS files in a directory
async function readContentFiles(type) {
  const dirPath = path.join(CONTENT_DIR, type);
  const files = [];
  try {
    const entries = await fs.readdir(dirPath);
    for (const entry of entries) {
      if (entry.endsWith('.js')) {
        const filePath = path.join(dirPath, entry);
        // Using dynamic import
        const module = await import(`file://${filePath}`);
        if (module.default) {
          const data = module.default;
          // Add metadata
          data._type = type;
          data._source = filePath;
          
          if (!data.draft) {
             validateContent(data);
             files.push(data);
          }
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') console.error(`Error reading ${type}:`, err);
  }
  return files;
}

// Validation logic
function validateContent(data) {
  const warnings = [];
  if (!data.title) warnings.push('Missing title');
  if (!data.slug) warnings.push('Missing slug');
  if (!data.heroImage) warnings.push('Missing heroImage');
  if (!data.description) warnings.push('Missing description');
  
  if (data.gallery && Array.isArray(data.gallery)) {
    data.gallery.forEach((img, idx) => {
      if (!img.src) warnings.push(`Missing src in gallery item ${idx}`);
      if (!img.alt) warnings.push(`Missing alt text in gallery item ${idx}`);
    });
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️  [Warning] ${data._type}/${data.slug || 'unknown'}.js:`);
    warnings.forEach(w => console.warn(`   - ${w}`));
  }
}

import renderLayout from './templates/layout.js';
import renderHome from './templates/home.js';

async function build() {
  console.log('Starting build process...');
  await ensureDir(DIST_DIR);

  // 1. Load Content
  const services = await readContentFiles('services');
  const locations = await readContentFiles('locations');
  const experiences = await readContentFiles('experiences');
  const sessions = await readContentFiles('sessions');
  const resources = await readContentFiles('resources');

  // Load centralized photo assets
  let allPhotos = [];
  try {
    const photosDir = path.join(CONTENT_DIR, 'assets', 'photos');
    const photoFiles = await fs.readdir(photosDir);
    for (const file of photoFiles) {
      if (file.endsWith('.js')) {
        const { default: photos } = await import(`file://${path.join(photosDir, file)}`);
        allPhotos = allPhotos.concat(photos);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Error reading photos:', err);
  }

  console.log(`Loaded ${services.length} services, ${locations.length} locations, ${experiences.length} experiences, ${sessions.length} sessions, ${resources.length} resources, and ${allPhotos.length} photos.`);

  // 2. Build Homepage
  console.log('Building Homepage...');
  const homeHtmlContent = renderHome({ services, experiences, locations, sessions, resources });
  const homeFullHtml = renderLayout({
    title: 'Documenting people in extraordinary places',
    description: 'Photography experiences across Italy. Wedding, proposal, and portrait photography.',
    heroImage: 'https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5619_ofCJt64dmL.jpg',
    canonical: 'https://wedding.pratyushdadhich.com/',
    schemaType: 'WebSite',
    contentHtml: homeHtmlContent
  });
  
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), homeFullHtml, 'utf8');

  // 3. Build Individual Pages
  const collections = { services, locations, experiences, sessions, resources };
  for (const [type, items] of Object.entries(collections)) {
    for (const item of items) {
      const typeDir = path.join(DIST_DIR, type, item.slug);
      await ensureDir(typeDir);
      
      // Auto-Relations Engine
      if (type === 'locations') {
        item.relatedExperiences = experiences.filter(e => e.location === item.slug);
        item.relatedSessions = sessions.filter(s => s.location === item.slug);
      } else if (type === 'experiences') {
        item.relatedSessions = sessions.filter(s => s.experience === item.slug || (s.tags && s.tags.includes(item.slug)));
      } else if (type === 'services') {
        item.relatedExperiences = experiences.filter(e => e.tags && e.tags.some(t => item.tags && item.tags.includes(t)));
        item.relatedSessions = sessions.filter(s => s.tags && s.tags.some(t => item.tags && item.tags.includes(t)));
      }

      // Process Asset Gallery Query
      if (item.galleryQuery) {
        item.gallery = allPhotos.filter(photo => {
          for (const key in item.galleryQuery) {
            const queryValue = item.galleryQuery[key];
            const photoValue = photo[key];
            
            // Normalize query to array
            const qArr = Array.isArray(queryValue) ? queryValue : [queryValue];
            
            if (Array.isArray(photoValue)) {
               // Photo has multiple values (e.g. services: ['wedding', 'portrait'])
               // Check if there is an intersection
               const hasMatch = qArr.some(val => photoValue.includes(val));
               if (!hasMatch) return false;
            } else {
               // Photo has a single value (e.g. location: 'dolomites')
               if (!qArr.includes(photoValue)) return false;
            }
          }
          return true;
        });
      }

      let pageContentHtml = `<div class="container"><h1 style="padding-top:120px">${item.title}</h1><p>${item.description}</p></div>`;
      
      // Use the unified page renderer
      try {
        const { default: renderPage } = await import('./templates/renderPage.js');
        const typeMap = {
          sessions: 'Session',
          services: 'Service',
          experiences: 'Experience',
          locations: 'Location',
          resources: 'Resource'
        };
        pageContentHtml = renderPage(typeMap[type], item);
      } catch (err) {
        console.error(`Error rendering ${type}/${item.slug}:`, err);
      }
      
      const itemHtml = renderLayout({
        title: item.title,
        description: item.description,
        heroImage: item.heroImage,
        canonical: `https://wedding.pratyushdadhich.com/${type}/${item.slug}/`,
        schemaType: type === 'services' ? 'Service' : type === 'experiences' ? 'TouristTrip' : type === 'locations' ? 'Place' : 'ImageGallery',
        seo: item.seo,
        contentHtml: pageContentHtml
      });
      
      await fs.writeFile(path.join(typeDir, 'index.html'), itemHtml, 'utf8');
      console.log(`Generated /${type}/${item.slug}/`);
    }

    // --- NEW: Generate Archive Index Page ---
    // This creates /sessions/index.html, /experiences/index.html, etc.
    const archiveDir = path.join(DIST_DIR, type);
    await ensureDir(archiveDir);

    const archiveTitle = type.charAt(0).toUpperCase() + type.slice(1); // e.g., "Sessions"
    
    // We reuse our grid renderers by passing the full collections as 'related' data
    const archiveData = {
      title: archiveTitle,
      heroImage: "https://ik.imagekit.io/prdadhich/Images/Barbara/IMG_5698_qkRgKZ926b.jpg", // default archive cover
      sections: [{ type: type }], // this will call renderSessionsGrid if type is 'sessions'
      [`related${archiveTitle}`]: items // dynamically pass relatedSessions, relatedExperiences, etc.
    };

    let archiveContentHtml = `<div class="container"><h1 style="padding-top:120px">${archiveTitle} Archive</h1></div>`;
    try {
      const { default: renderPage } = await import('./templates/renderPage.js');
      // Pass the collection name so renderPage knows what to do
      archiveContentHtml = renderPage('Archive', archiveData);
    } catch (err) {
      console.error(`Error rendering archive for ${type}:`, err);
    }

    const archiveHtml = renderLayout({
      title: archiveTitle,
      description: `Browse all ${archiveTitle.toLowerCase()} by Pratyush Dadhich.`,
      heroImage: archiveData.heroImage,
      canonical: `https://wedding.pratyushdadhich.com/${type}/`,
      schemaType: 'CollectionPage',
      contentHtml: archiveContentHtml
    });

    await fs.writeFile(path.join(archiveDir, 'index.html'), archiveHtml, 'utf8');
    console.log(`Generated /${type}/ (Archive)`);
  }

  // --- NEW: Process Top-Level Pages (e.g. About) ---
  const aboutPath = path.join(CONTENT_DIR, 'about.js');
  try {
    if (await fs.stat(aboutPath).catch(() => false)) {
      const { default: aboutData } = await import('./content/about.js');
      if (!aboutData.draft) {
        const aboutDir = path.join(DIST_DIR, 'about');
        await ensureDir(aboutDir);
        
        // Process Asset Gallery Query
        if (aboutData.galleryQuery) {
          aboutData.gallery = allPhotos.filter(photo => {
            for (const key in aboutData.galleryQuery) {
              const queryValue = aboutData.galleryQuery[key];
              const photoValue = photo[key];
              
              const qArr = Array.isArray(queryValue) ? queryValue : [queryValue];
              
              if (Array.isArray(photoValue)) {
                 const hasMatch = qArr.some(val => photoValue.includes(val));
                 if (!hasMatch) return false;
              } else {
                 if (!qArr.includes(photoValue)) return false;
              }
            }
            return true;
          });
        }

        let aboutContentHtml = `<div class="container"><h1 style="padding-top:120px">${aboutData.title}</h1></div>`;
        const { default: renderPage } = await import('./templates/renderPage.js');
        aboutContentHtml = renderPage('Page', aboutData);

        const aboutHtml = renderLayout({
          title: aboutData.title,
          description: aboutData.description,
          heroImage: aboutData.heroImage,
          canonical: `https://wedding.pratyushdadhich.com/about/`,
          schemaType: 'AboutPage',
          seo: aboutData.seo,
          contentHtml: aboutContentHtml
        });

        await fs.writeFile(path.join(aboutDir, 'index.html'), aboutHtml, 'utf8');
        console.log(`Generated /about/`);
      }
    }
  } catch (err) {
    console.error("Error generating About page:", err);
  }

  // 4. Copy Static Assets
  console.log('Copying static assets...');
  try {
    await fs.copyFile(path.join(__dirname, 'style.css'), path.join(DIST_DIR, 'style.css'));
    await fs.copyFile(path.join(__dirname, 'main.js'), path.join(DIST_DIR, 'main.js'));
    await fs.cp(path.join(__dirname, 'assets'), path.join(DIST_DIR, 'assets'), { recursive: true });
  } catch (err) {
    console.log('Note: Some assets could not be copied (they might not exist yet).');
  }

  console.log('Build complete!');
}

build().catch(console.error);

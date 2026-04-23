const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// ── Blog articles ──
const blogDir = path.join(root, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

const articles = files.map(filename => {
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf8');
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : filename;
  const metaDate = content.match(/<meta\s+name=["']date["']\s+content=["']([^"']+)["']/i);
  const date = metaDate
    ? metaDate[1]
    : fs.statSync(path.join(blogDir, filename)).mtime.toISOString().slice(0, 10);
  return { filename, title, date };
});
articles.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(blogDir, 'articles.json'), JSON.stringify(articles, null, 2));
console.log(`✓ articles.json updated (${articles.length} articles)`);

// ── Gallery images — inline into index.html ──
const galleryDir = path.join(root, 'gallery');
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
const images = fs.readdirSync(galleryDir)
  .filter(f => imageExts.includes(path.extname(f).toLowerCase()));

const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const newList = JSON.stringify(images);
html = html.replace(
  /\/\* GALLERY_IMAGES_START \*\/[\s\S]*?\/\* GALLERY_IMAGES_END \*\//,
  `/* GALLERY_IMAGES_START */ ${newList} /* GALLERY_IMAGES_END */`
);
fs.writeFileSync(indexPath, html);
console.log(`✓ index.html gallery images updated (${images.length} images)`);

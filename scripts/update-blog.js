const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'blog');

function gitFirstCommitDate(filepath) {
  try {
    const rel = path.relative(root, filepath).replace(/\\/g, '/');
    const result = execSync(
      `git log --follow --format="%as" -- "${rel}"`,
      { cwd: root, encoding: 'utf8' }
    ).trim();
    const lines = result.split('\n').filter(Boolean);
    // 取最早一次（最后一行）
    return lines[lines.length - 1] || null;
  } catch {
    return null;
  }
}

function extractArticle(filepath, relpath) {
  const content = fs.readFileSync(filepath, 'utf8');

  const ogTitle = content.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
    || content.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
  const titleTag = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = (ogTitle ? ogTitle[1] : titleTag ? titleTag[1] : relpath).trim();

  const metaDate = content.match(/<meta\s+name=["']date["']\s+content=["']([^"']+)["']/i);
  const date = metaDate
    ? metaDate[1]
    : gitFirstCommitDate(filepath) || fs.statSync(filepath).mtime.toISOString().slice(0, 10);

  return { filename: relpath, title, date };
}

const articles = [];

// 根目录下的 .html 文件
for (const f of fs.readdirSync(blogDir)) {
  if (f.endsWith('.html')) {
    articles.push(extractArticle(path.join(blogDir, f), f));
  }
}

// 子目录下的 index.html
for (const f of fs.readdirSync(blogDir)) {
  const sub = path.join(blogDir, f);
  if (fs.statSync(sub).isDirectory()) {
    const indexFile = path.join(sub, 'index.html');
    if (fs.existsSync(indexFile)) {
      articles.push(extractArticle(indexFile, `${f}/index.html`));
    }
  }
}

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
html = html.replace(
  /\/\* GALLERY_IMAGES_START \*\/[\s\S]*?\/\* GALLERY_IMAGES_END \*\//,
  `/* GALLERY_IMAGES_START */ ${JSON.stringify(images)} /* GALLERY_IMAGES_END */`
);
fs.writeFileSync(indexPath, html);
console.log(`✓ index.html gallery images updated (${images.length} images)`);

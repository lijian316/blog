const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'blog');

// 这些子目录作为独立分类，不计入主 Notes 列表
const SPECIAL_DIRS = ['Daily-english'];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function gitFirstCommitDate(filepath) {
  try {
    const rel = path.relative(root, filepath).replace(/\\/g, '/');
    const result = execSync(
      `git log --follow --format="%as" -- "${rel}"`,
      { cwd: root, encoding: 'utf8' }
    ).trim();
    const lines = result.split('\n').filter(Boolean);
    // 有历史取最早，没历史（新文件首次提交）用今天
    return lines[lines.length - 1] || today();
  } catch {
    return today();
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
    : gitFirstCommitDate(filepath);
  return { filename: relpath, title, date };
}

// ── Notes（排除特殊目录）──
const notes = [];
for (const f of fs.readdirSync(blogDir)) {
  const full = path.join(blogDir, f);
  const stat = fs.statSync(full);
  if (stat.isFile() && f.endsWith('.html')) {
    notes.push(extractArticle(full, f));
  } else if (stat.isDirectory() && !SPECIAL_DIRS.includes(f)) {
    const idx = path.join(full, 'index.html');
    if (fs.existsSync(idx)) notes.push(extractArticle(idx, `${f}/index.html`));
  }
}
notes.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(blogDir, 'articles.json'), JSON.stringify(notes, null, 2));
console.log(`✓ articles.json updated (${notes.length} articles)`);

// ── Daily（Daily-english 目录下所有 html）──
const dailyDir = path.join(blogDir, 'Daily-english');
const daily = [];
if (fs.existsSync(dailyDir)) {
  for (const f of fs.readdirSync(dailyDir)) {
    if (f.endsWith('.html')) {
      daily.push(extractArticle(path.join(dailyDir, f), `Daily-english/${f}`));
    }
  }
}
daily.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(blogDir, 'daily.json'), JSON.stringify(daily, null, 2));
console.log(`✓ daily.json updated (${daily.length} articles)`);

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

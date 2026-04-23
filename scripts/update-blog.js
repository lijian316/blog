const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'blog');
const outputFile = path.join(blogDir, 'articles.json');

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

fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
console.log(`✓ articles.json updated (${articles.length} articles)`);

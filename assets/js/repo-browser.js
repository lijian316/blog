(function () {
  const GH_OWNER = 'lijian316';
  const cache = {};
  const loadedTabs = new Set();

  function isImage(name) { return /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(name); }
  function isMarkdown(name) { return /\.(md|markdown)$/i.test(name); }
  function fmtSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }
  function b64DecodeUnicode(str) {
    const binary = atob(str.replace(/\n/g, ''));
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  }

  async function ghFetchContents(repo, path) {
    const key = repo + ':' + path;
    if (cache[key]) return cache[key];
    const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${repo}/contents/${encodeURI(path || '')}`);
    if (!res.ok) {
      if (res.status === 403) throw new Error('GitHub API 请求超限，请稍后再试');
      if (res.status === 404) throw new Error('未找到内容');
      throw new Error('请求失败 (' + res.status + ')');
    }
    const data = await res.json();
    cache[key] = data;
    return data;
  }

  function renderBreadcrumb(repo, path, containerId) {
    const segments = path ? path.split('/') : [];
    let html = `<div class="repo-crumb">`;
    html += `<a href="#" data-repo="${repo}" data-path="" data-target="${containerId}" class="repo-crumb-link">${repo}</a>`;
    let acc = '';
    segments.forEach((seg, i) => {
      acc += (i > 0 ? '/' : '') + seg;
      html += ` / <a href="#" data-repo="${repo}" data-path="${encodeURIComponent(acc)}" data-target="${containerId}" class="repo-crumb-link">${seg}</a>`;
    });
    html += `</div>`;
    return html;
  }

  function bindRepoEvents(containerId) {
    const container = document.getElementById(containerId);
    container.querySelectorAll('.repo-crumb-link').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        renderRepoPath(containerId, a.dataset.repo, decodeURIComponent(a.dataset.path || ''));
      });
    });
    container.querySelectorAll('.repo-dir').forEach(el => {
      const open = () => renderRepoPath(containerId, el.dataset.repo, decodeURIComponent(el.dataset.path));
      el.addEventListener('click', open);
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    container.querySelectorAll('.repo-md-link').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        renderMarkdownFile(containerId, el.dataset.repo, decodeURIComponent(el.dataset.path), decodeURIComponent(el.dataset.back || ''));
      });
    });
  }

  async function renderMarkdownFile(containerId, repo, path, backPath) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="repo-loading">加载中…</div>`;
    try {
      const data = await ghFetchContents(repo, path);
      const text = b64DecodeUnicode(data.content);
      const html = window.marked ? marked.parse(text) : `<pre>${text.replace(/</g, '&lt;')}</pre>`;
      container.innerHTML = `
        <a href="#" class="repo-back">← 返回</a>
        <div class="repo-markdown">${html}</div>
      `;
      container.querySelector('.repo-back').addEventListener('click', e => {
        e.preventDefault();
        renderRepoPath(containerId, repo, backPath || '');
      });
    } catch (e) {
      container.innerHTML = `<p class="repo-error">加载失败：${e.message}</p>`;
    }
  }

  async function renderRepoPath(containerId, repo, path) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="repo-loading">加载中…</div>`;
    try {
      const data = await ghFetchContents(repo, path || '');
      if (!Array.isArray(data)) {
        container.innerHTML = `<p class="repo-error">不是文件夹</p>`;
        return;
      }
      const dirs = data.filter(i => i.type === 'dir').sort((a, b) => a.name.localeCompare(b.name));
      const files = data.filter(i => i.type === 'file');
      const images = files.filter(i => isImage(i.name));
      const mds = files.filter(i => isMarkdown(i.name));
      const others = files.filter(i => !isImage(i.name) && !isMarkdown(i.name));

      let html = renderBreadcrumb(repo, path || '', containerId);

      if (dirs.length) {
        html += `<div class="repo-grid">` + dirs.map(d => `
          <div class="repo-card repo-dir" role="button" tabindex="0" data-repo="${repo}" data-path="${encodeURIComponent(d.path)}">
            <span class="repo-card-icon">📁</span><span class="repo-card-name">${d.name}</span>
          </div>`).join('') + `</div>`;
      }

      if (images.length) {
        html += `<div class="repo-image-grid">` + images.map(f => `
          <a class="repo-image-item" href="${f.html_url}" target="_blank" rel="noopener" title="${f.name}">
            <img loading="lazy" src="${f.download_url}" alt="${f.name}">
          </a>`).join('') + `</div>`;
      }

      if (mds.length || others.length) {
        html += `<div class="link-list">`;
        html += mds.map(f => `
          <a href="#" class="link-item repo-md-link" data-repo="${repo}" data-path="${encodeURIComponent(f.path)}" data-back="${encodeURIComponent(path || '')}">
            <span class="link-host">${fmtSize(f.size)}</span>
            <span class="link-title">📄 ${f.name}</span>
          </a>`).join('');
        html += others.map(f => `
          <a href="${f.html_url}" target="_blank" rel="noopener" class="link-item">
            <span class="link-host">${fmtSize(f.size)}</span>
            <span class="link-title">${f.name}</span>
          </a>`).join('');
        html += `</div>`;
      }

      if (!dirs.length && !files.length) html += `<p class="repo-empty">这个仓库是空的</p>`;

      container.innerHTML = html;
      bindRepoEvents(containerId);
    } catch (e) {
      container.innerHTML = `<p class="repo-error">加载失败：${e.message}</p>`;
    }
  }

  window.loadRepoTab = function (cfg) {
    if (loadedTabs.has(cfg.id)) return;
    loadedTabs.add(cfg.id);
    renderRepoPath('repo-' + cfg.id, cfg.repo, '');
  };
})();

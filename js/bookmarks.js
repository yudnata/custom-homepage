const bookmarks = [
  { name: 'YouTube', url: 'https://youtube.com', domain: 'youtube.com' },
  { name: 'Gmail', url: 'https://gmail.com', domain: 'gmail.com' },
  {
    name: 'GitHub',
    url: 'https://github.com/yudnata',
    domain: 'github.com',
    icon: 'https://cdn.simpleicons.org/github/white',
  },
  { name: 'Claude', url: 'https://claude.ai', domain: 'claude.ai' },
  { name: 'Gemini', url: 'https://gemini.google.com', domain: 'gemini.google.com' },
  { name: 'ChatGPT', url: 'https://chatgpt.com', domain: 'chatgpt.com' },
  { name: 'Drive', url: 'https://drive.google.com', domain: 'drive.google.com' },
  {
    name: 'Google Credit',
    url: 'https://one.google.com/ai/activity',
    domain: 'one.google.com',
  },
  {
    name: 'Github Credit',
    url: 'https://github.com/settings/billing/premium_requests_usage',
    domain: 'github.com',
  },
  {
    name: 'SIMAK-NG',
    url: 'https://simak-ng.unud.ac.id/home',
    domain: 'simak.unud.ac.id',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Udayana_University_Logo.png/600px-Udayana_University_Logo.png',
  },
  {
    name: 'CodeCamp',
    url: 'https://www.freecodecamp.org/learn',
    domain: 'freecodecamp.org',
  },
  { name: 'Codédex', url: 'https://www.codedex.io/home', domain: 'codedex.io' },
  { name: 'Dicoding', url: 'https://www.dicoding.com/academies/my', domain: 'dicoding.com' },
  {
    name: 'Neon',
    url: 'https://console.neon.tech/app/projects/late-rain-11239270',
    domain: 'neon.tech',
  },
  { name: 'Azure', url: 'https://portal.azure.com', domain: 'azure.com' },
  { name: 'Vercel', url: 'https://vercel.com/yudhi-adinatas-projects', domain: 'vercel.com' },
  { name: 'Google', url: 'https://myaccount.google.com', domain: 'google.com' },
  {
    name: 'Google One',
    url: 'https://one.google.com',
    domain: 'one.google.com',
  },
  {
    name: 'WhatsApp',
    url: 'https://web.whatsapp.com',
    domain: 'web.whatsapp.com',
    icon: 'https://cdn.simpleicons.org/whatsapp/%2325D366',
  },
];

function renderBookmarks() {
  const grid = document.getElementById('bookmarks-grid');

  bookmarks.forEach((site) => {
    const a = document.createElement('a');
    a.className = 'bookmark-card';
    a.href = site.url;

    const img = document.createElement('img');
    img.src = site.icon || `https://www.google.com/s2/favicons?domain=${site.domain}&sz=128`;
    img.alt = site.name;

    img.onerror = function () {
      this.src = 'https://www.google.com/s2/favicons?domain=example.com&sz=64';
    };

    const span = document.createElement('span');
    span.textContent = site.name;

    a.appendChild(img);
    a.appendChild(span);
    grid.appendChild(a);
  });
}

renderBookmarks();

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const query = this.value.trim();
    if (query !== '') {
      this.value = '';
      window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }
  }
});

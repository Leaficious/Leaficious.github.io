/* ============================================================
   Leaficious — main.js
   Builds the page from the values in content.js and runs the
   light/dark toggle. You normally don't need to edit this file —
   to change what's on the site, edit content.js.
   ============================================================ */

/* -------- Small inline SVG icons (kept here so they stay crisp
   and consistent on every device, unlike emoji) -------- */
const ICONS = {
  gamepad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.152A4 4 0 0 0 17.32 5z"/></svg>',
  sprout:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M12 20c0-6 0-8 0-10"/><path d="M12 10C12 6 9 4 5 4c0 4 3 6 7 6z"/><path d="M12 12c0-3 2-5 6-5 0 3-2 5-6 5z"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.211.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"/></svg>',
  moon:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>',
  sun:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
};

/* Escape user text before putting it in HTML (safety + correctness) */
function esc(s){
  return String(s).replace(/[&<>"']/g, c => (
    { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]
  ));
}

/* Like esc(), but keeps <b>...</b> working so the lead paragraph can have
   bold words. Everything else (a stray < or &) is shown as plain text. */
function richText(s){
  return esc(s).replace(/&lt;(\/?b)&gt;/g, "<$1>");
}

/* -------- Component: Hero -------- */
function renderHero(hero){
  return `
    <header class="hero node">
      <span class="hi">${esc(hero.kicker)}</span>
      <h1>${esc(hero.title)} <span class="wig">${esc(hero.accent)}</span></h1>
      <p class="lead">${richText(hero.lead)}</p>
    </header>`;
}

/* -------- Component: Projects -------- */
function renderProjects(projects){
  const cards = projects.map(p => {
    const href = `https://leaficious.github.io/${esc(p.slug)}`;
    const badge = p.live ? `<span class="badge live">Live</span>` : "";
    return `
      <a class="leaf-card" href="${href}">
        ${badge}
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <span class="url">leaficious.github.io/${esc(p.slug)} →</span>
      </a>`;
  }).join("");

  // Always show a friendly "more coming" placeholder card at the end.
  const sprout = `
    <div class="leaf-card sprout">
      <span class="sprout-mark">${ICONS.sprout}</span>
      <p>more sprouting soon</p>
    </div>`;

  return `
    <section class="node" id="projects">
      <span class="eyebrow">// what I'm growing</span>
      <h2>Projects</h2>
      <div class="grid">${cards}${sprout}</div>
    </section>`;
}

/* -------- Component: Games -------- */
function renderGames(games){
  const chips = games.map(g => {
    const tint = { petal:"var(--petal)", leaf:"var(--leaf)", sun:"var(--sun)" }[g.accent] || "var(--leaf)";
    // Sun is light, so use dark ink for its icon; others get white.
    const iconColor = g.accent === "sun" ? "#3a2b00" : "#fff";
    const inner = `
      <span class="dot" style="background:${tint}; color:${iconColor}">${ICONS.gamepad}</span>
      ${esc(g.name)}`;
    // Link if a url is provided, otherwise a plain (non-link) chip.
    return g.url
      ? `<a class="chip" href="${esc(g.url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<span class="chip">${inner}</span>`;
  }).join("");

  return `
    <section class="node" id="games">
      <span class="eyebrow">// currently playing</span>
      <h2>Games I'm into</h2>
      <div class="chips">${chips}</div>
    </section>`;
}

/* -------- Component: Connect (Discord) -------- */
function renderConnect(d){
  return `
    <section class="node" id="connect">
      <div class="connect">
        <span class="eyebrow">// say hi</span>
        <h2>${esc(d.heading)}</h2>
        <p>${esc(d.blurb)}</p>
        <span class="discord-pill">${ICONS.discord} @${esc(d.username)}</span>
      </div>
    </section>`;
}

/* -------- Theme toggle (default dark, remembers your choice) -------- */
function setupTheme(){
  const root = document.documentElement;
  const btn  = document.getElementById("themeToggle");
  const paint = t => {
    btn.innerHTML = (t === "dark" ? ICONS.moon : ICONS.sun) +
                    `<span>${t}</span>`;
    btn.setAttribute("aria-label", `Switch to ${t === "dark" ? "light" : "dark"} theme`);
  };
  paint(root.getAttribute("data-theme") || "dark");
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try{ localStorage.setItem("leaf-theme", next); }catch(e){}
    paint(next);
  });
}

/* -------- Build the page -------- */
function build(){
  // Browser-tab title + description come from content.js too, so the whole
  // site really is editable from that one file.
  if(CONTENT.tabTitle){ document.title = CONTENT.tabTitle; }
  if(CONTENT.description){
    var m = document.querySelector('meta[name="description"]');
    if(m){ m.setAttribute("content", CONTENT.description); }
  }

  document.getElementById("app").innerHTML =
    renderHero(CONTENT.hero) +
    renderProjects(CONTENT.projects) +
    renderGames(CONTENT.games) +
    renderConnect(CONTENT.discord);
  document.getElementById("footer").textContent = CONTENT.footer;
  setupTheme();
}

/* Run build(), but if content.js has a typo, show a plain, friendly message
   instead of a blank white page. (content.js is the file you hand-edit, so a
   stray missing quote or comma is the most likely thing to go wrong.) */
document.addEventListener("DOMContentLoaded", function(){
  try{
    if(typeof CONTENT === "undefined"){ throw new Error("content.js didn't load"); }
    build();
  }catch(err){
    document.getElementById("app").innerHTML =
      '<div style="max-width:52ch;margin:80px auto;padding:0 24px;font-family:sans-serif;line-height:1.6">' +
      '<h1 style="font-size:28px;margin-bottom:12px">🌱 Something in content.js has a typo</h1>' +
      '<p>The site couldn\'t load your content. This almost always means a missing ' +
      '<b>"quote"</b> or <b>,</b> comma in <code>assets/content.js</code>. ' +
      'Check your most recent edit and make sure every value looks like the ones around it.</p>' +
      '<p style="color:#888;margin-top:16px;font-size:13px">Technical detail: ' + esc(String(err)) + '</p>' +
      '</div>';
    console.error(err);
  }
});

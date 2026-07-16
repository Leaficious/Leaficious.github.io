/* ============================================================
   Leaficious — content.js  ★ THIS IS THE FILE YOU EDIT ★
   ------------------------------------------------------------
   Everything you see on the site comes from the values below.
   To change your site, edit the text between the "quotes", save,
   and (once it's live) push to GitHub. You never have to touch
   the HTML or CSS.

   Quick rules:
   • Keep the "quotes" and the commas — only change what's inside.
   • To ADD a project or game, copy one { ... } block, paste it,
     and edit it. Blocks are separated by commas.
   ============================================================ */

const CONTENT = {

  /* -------- Browser tab -------- */
  tabTitle:    "Leaficious",  // the little name on the browser tab
  description: "Leaficious' library",

  /* -------- Hero (the big intro at the top) -------- */
  hero: {
    // Small line above the title:
    kicker: "🌱 Leaficious' library zzZ",
    // The big title. `accent` is the word that gets the pink underline.
    title:  "This is",
    accent: "Leaficious",
    // The paragraph under the title. You can wrap words in <b>...</b> to make
    // them bold — that's the only tag that works here. Plain < or & is fine;
    // it'll just show as text.
    lead:   "Just a random place on the internet where I plant <b>random projects</b>, basically just my 'About Me'. nothing serious.",
  },

  /* -------- Projects (your leaf-shaped cards) --------
     `slug` is the repo name. A project at slug "weather" links to
     leaficious.github.io/weather automatically.
     `live: true` shows the green "Live" dot. Use false for a WIP. */
  projects: [
    {
      title: "Aloft",
      desc:  "A little app to check the weather. My first thing planted here.",
      slug:  "weather",
      live:  true,
    },
    // ── To add another project, copy the block above and edit it ──
  ],

  /* -------- Games you play --------
     `accent` tints the little icon. Options: "petal", "leaf", "sun".
     `url` is optional — leave it "" for no link. */
  games: [
    { name: "florr.io",     accent: "petal", url: "https://florr.io" },
    { name: "Bloons TD 6",  accent: "leaf",  url: "" },
    { name: "Roblox",       accent: "sun",   url: "https://www.roblox.com/users/1418612844/profile" },
  ],

  /* -------- Discord (shown as your username) --------
     ✏️ Replace this with your real Discord handle. */
  discord: {
    heading:  "My Discord",
    blurb:    "you can find me here",
    username: "leaficious",   // ← put your handle here (no @ needed)
  },

  /* -------- Footer -------- */
  footer: "🍃 leaficious.github.io",
};

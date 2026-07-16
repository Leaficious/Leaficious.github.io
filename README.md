# Leaficious

My personal hub — the site at [leaficious.github.io](https://leaficious.github.io).
Built as plain HTML/CSS/JS (no build step) so it hosts directly on GitHub Pages.

## How to change the site

**You only ever edit one file: [`assets/content.js`](assets/content.js).**

Open it, change the text between the `"quotes"`, save. That's it — the title,
your projects, your games, and your Discord handle all live in there.

- **Add a project:** copy a `{ ... }` block inside `projects`, paste it, edit it.
  A project with `slug: "weather"` links to `leaficious.github.io/weather`.
- **Add a game:** copy a line inside `games`. `accent` can be `"petal"`, `"leaf"`, or `"sun"`.
- **Switch a project between live/WIP:** set `live: true` or `live: false`.

## Files

| File | What it is |
|------|------------|
| `index.html` | The page shell. Rarely needs editing. |
| `assets/content.js` | **← your content. Edit this.** |
| `assets/main.js` | Builds the page from `content.js`. Also the light/dark toggle. |
| `assets/styles.css` | Colors, fonts, layout (the "Greenhouse" look). |

## Preview it locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Publishing changes

Once it's on GitHub, edit `content.js`, then:

```bash
git add . && git commit -m "update content" && git push
```

GitHub Pages redeploys automatically (give it a minute).

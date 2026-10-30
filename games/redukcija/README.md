# Redukcija — playable prototype

A narrative household game about a family, a broken water supply and the promises they keep. Seven days, six decisions a day, Reigns-style two-choice cards.
Web prototype (v2.1): phone portrait, plus a landscape layout for desktop (HUD moves to a left column at 900 px and wider). Open `index.html` in any browser; on a phone, Share → Add to Home Screen plays it full-screen.

**Version:** the bottom-right of the title screen shows `v2.1 · build N`. N is the commit number, stamped into `index.html` automatically by `.githooks/pre-commit` on every commit (run `git config core.hooksPath .githooks` once per clone to turn it on). Bump `GAME_VERSION` by hand for a new prototype version.

**Changes and releases:** every version is listed in `CHANGELOG.md` (newest first) and tagged in git (`v1`, …). The release steps are at the bottom of the changelog. Full design notes live in the game design doc, `GDD.md` in this folder. **Every change to the game also updates `GDD.md`** (current-build section, change log, and any section the change touches).

**Where things are in `index.html`** (one file, three parts in the script):
- `story.js` — the cast (`people`) and the seven days (`days`), each with six cards. Cards and options are plain data; any text or cost can be a function of the state for things that depend on earlier choices.
- `engine.js` — rules and numbers: tank size, reserve, nightly needs, strain, supply schedules, promises, save.
- `ui.js` — screens, the swipe card, dialogs, keys, and the placeholder pixel icons (`PIX`, 10×10 bitmaps; swap for the asset sheet later).

**Look:** each resource has one colour (CSS variables at the top of the style: `--water`, `--food`, `--hygiene`, `--spirits`, `--cash`, `--errands`, `--strain`, `--file`, `--promise`) and one icon; change them there and every tile, chip and icon follows. Fonts load from Google Fonts (Barlow Condensed, Atkinson Hyperlegible) with system fallbacks offline.

**Icons:** `apple-touch-icon.png` (180×180, iPhone home screen) sits next to `index.html`; it and the 32×32 browser-tab icon are also embedded in `index.html`, so a single-file copy still has both. Placeholder pixel drop until the asset sheet arrives.

**Publishing:** the game goes live at `games/redukcija/` in the Experiments repo (github.com/neshill/Experiments). Copy `index.html` and `apple-touch-icon.png` there; every path is relative, so it works in a subfolder. Commit here first so the build number is stamped (the Experiments hook only stamps FT1P's root `index.html`). Saves use the `redukcija.*` key, separate from FT1P's `ft1p.*` on the same site.

**ChatGPT originals:** `Until_the_Taps_Return.html` and `Until_the_Taps_Return_Game_Design.docx` are the first concept (v0). Kept for reference, not used by the game.

**How to play (touch):** swipe the card left or right, or tap a choice. Dragging the card previews its costs on the water bar and meters.
**Mouse:** hover a choice to preview, click to choose.
**Keyboard:** ← / → (or 1 / 2) choose, Enter continue, F family and promises, H this week so far, Esc or P pause.

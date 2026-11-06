# Redukcija — playable prototype

A narrative household game about a water reduction the city keeps extending. Get your household through it while acting as if everything is fine; get through and the next run is a bigger household. Reigns-style two-choice cards, four two-edged meters.
Web prototype (v5.0): phone portrait, plus a landscape layout for desktop (HUD moves to a left column at 900 px and wider). Open `index.html` in any browser; on a phone, Share → Add to Home Screen plays it full-screen.

**Version:** the bottom-right of the title screen shows `v5.0 · build N`. N is the commit number, stamped into `index.html` automatically by `.githooks/pre-commit` on every commit (run `git config core.hooksPath .githooks` once per clone to turn it on). Bump `GAME_VERSION` by hand for a new prototype version.

**Changes and releases:** every version is listed in `CHANGELOG.md` (newest first) and tagged in git (`v1`, …, `v4.4`, `v5.0`). The release steps are at the bottom of the changelog. Full design notes live in the game design doc, `GDD.md` in this folder; the plan for v5.0–v5.2 is `PROPOSAL-v5.md`. **Every change to the game also updates `GDD.md`** (current-build section, change log, and any section the change touches).

**Where things are in `index.html`** (one file; the script is in this order):
- `content.js` — everything the game says, as data. Names and looks (`NAMES`, `LOOK`), the neighbour archetypes (`ARCHETYPES`), the city's people (`CITY`), the levels (`LEVELS`: household size, announced length, nightly drain, deliveries, extensions), story contexts with their beats (`CONTEXTS`), circumstances (`CIRCS`), events (`EVENTS`), the radio (`RADIO`), the cards (`CARDS`) and the endings (`EDGES`, `EPILOGUE`). A card is `card(id, family, speaker, place, title, text, optionA, optionB, {when, w, cd, once, boost})`; an option is `opt(label, pictogram, arrows, response, extras)`. The comment at the top of the section lists every field and text slot. **A new card is only text:** add a line to `CARDS`.
- `engine.js` — rules and numbers, no drawing: rolling a run (`newRun`), the morning (`startDay`: extensions, events, the delivery, the deck), the bag (`buildDeck`, `cardOK`, `weight`), a choice (`optionView`, `choose`), the night and time jumps (`nightfall`), the ladder (`ladderAfter`). Constants at the top: arrow sizes, warning lines, the Face drift, the promise penalty, the event chance.
- The illustrations (from v4.4): `person()` and `CAST`, `ITEMS`, `ROOMS`, `STREET`, `sceneSVG`. Now used for portraits, the title and the endings.
- `ui.js` — screens (`titleScreen`, `brief` (the morning), `cardScreen`, `afterScreen`, `nightScreen`, `endingScreen`), the HUD (`hud`, `bar`, `animateBars`), the arrow chips (`achip`, `arrowChips`), the 16 pictograms (`PICT`), portraits (`portrait`, `castSync`), the ending pictures (`endScene`), dialogs (`rulesHTML`, `familyHTML`, `historyHTML`, `endingsHTML`), the swipe.
- `sound` and `input` — as in v4.2: music, card sounds, clicks and keys.

**Sound:** music and card sounds are MP3s in `audio/` (`menu-before-the-taps.mp3`, `game-six-cards-a-day.mp3`, `card-swipes.mp3`). The code is the `sound` section: file names, volumes and loop length in `MUSIC`, the eight cut points inside the swipe file in `SWIPES`. To swap a track, replace the file under the same name (or change the path in `MUSIC`). Opened straight from disk the game still plays sound; from a server (or GitHub Pages) the loops are gapless.

**HUD:** `hud()` draws one bar per meter with `bar()`: the exact number, a notch and a hatched danger zone at 20 (and at 80 from level 2), and on preview an arrow badge and the range the meter could land in. `animateBars()` animates every bar from what was last on screen (`shown`) to now. The night (`nightScreen`) has no HUD and its own bars. Themes: `body[data-theme]` is `day`, `morning` or `night`.

**Look:** each meter has one colour (CSS variables: `--water`, `--spirits`, `--face`, `--cash` for Money, `--promise`) and one icon (`PIX`); change them there and every bar, chip and icon follows. Fonts load from Google Fonts (Barlow Condensed, Atkinson Hyperlegible) with system fallbacks offline.

**Icons:** `apple-touch-icon.png` (180×180, iPhone home screen) sits next to `index.html`; it and the 32×32 browser-tab icon are also embedded in `index.html`, so a single-file copy still has both. Placeholder drop until the asset sheet arrives.

**Publishing:** this folder (`~/Desktop/Projects/Redukcija`) is the working copy; edit and commit here first so the build number is stamped. Then run `./deploy.sh`: it copies only the playable files (`index.html`, `apple-touch-icon.png`, `audio/`, README, CHANGELOG, GDD) to `games/redukcija/` in the Experiments repo (github.com/neshill/Experiments); commit and push there. Work files (`Claude outputs/`, `screenshots/`, `prompts/`, `tools/`, style tests, proposals, the ChatGPT originals) never go to the repo, and the game is never edited inside the repo. Saves use the `redukcija.*` key, separate from FT1P's `ft1p.*` on the same site.

**Balance tools** (need Node): `node tools/sim.js index.html 400` plays 400 runs per level and play style with the game's own rules and prints the table that goes in the GDD (clear rate, which edge ended the run, days, extensions), then card frequency, repeats and any card that never comes up; `node tools/dominance.js index.html` lists any card with identical arrows, an option that does nothing, or an option that's ▲-or-equal on every meter (should print none).

**ChatGPT originals:** `Until_the_Taps_Return.html` and `Until_the_Taps_Return_Game_Design.docx` are the first concept (v0). Kept for reference, not used by the game.

**How to play (touch):** swipe the card left or right, or tap one of its two bottom halves (the left choice is on the left). Dragging the card previews which meters move on the bars.
**Mouse:** hover a choice to preview, click to choose.
**Keyboard:** ← / → (or 1 / 2) choose, Enter continue, F household, H this run so far, Esc or P pause, M sound on/off.

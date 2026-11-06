# Fali Ti Jedan Papir — playable prototype

A bureaucratic roguelike deck-builder about paperwork, patience and "you're missing one paper".
Web prototype (v30): phone portrait plus a landscape layout for desktop and handheld screens (designed at 1100×690, scales up). Open `index.html` in any browser; on a phone, Share → Add to Home Screen plays it full-screen.

**Version:** the bottom-right of the title screen shows `v24 · build N`. N is the commit number, stamped into `js/version.js` automatically by `.githooks/pre-commit` on every commit (run `git config core.hooksPath .githooks` once per clone to turn it on). Compare it with the commit count on GitHub to see whether the live page is the latest. Bump `GAME_VERSION` (in `js/version.js`) by hand for a new prototype version.

**Working copy and publishing:** this folder (`~/Desktop/Projects/FT1P`) is the working copy and its own git repo: edit and commit here (the pre-commit hook stamps the build number). Work files stay here: `Claude outputs/`, source art in `assets-*/`, the `ASSETS-*.md` briefs, `ft1p_icon.png`, `feedback-apps-script.gs`, and the translation sources in `i18n/` (`*.json`, `bake.py`, `check_tr.py`). To publish, run `./deploy.sh`: it copies only the playable files (`index.html`, icon, music, `art/`, `css/`, `data/`, `js/`, `i18n/*.js`, README, CHANGELOG) to `games/ft1p/` in the Experiments repo (github.com/neshill/Experiments), then commit and push there. Never edit the game inside the Experiments repo. History up to v32 came over from the Experiments repo, where FT1P used to sit at the root.

**Changes and releases:** every version is listed in `CHANGELOG.md` (newest first) and tagged in git (`v24`, `v22`, …), so `git checkout v22` gets that build back. The release steps are at the bottom of the changelog.

## Where things live (v30)

The game is a plain web page split into small files, so it still opens straight from disk (double-click `index.html`) and can be hosted anywhere as is. No build step.

| Folder | What's in it | Edit it when you want to… |
| --- | --- | --- |
| `data/` | Game content: `cards.js` (documents, action cards, play styles, reward pool), `chapters.js` (the three chapters and their offices), `bosses.js`, `characters.js`, `reforms.js` (difficulty levels), `moods.js`, `places.js` (errands, strange papers), `trinkets.js` (Vitrina, pocket items), `map-nodes.js` (map stops, events), `story.js` (clerk gossip), `art.js` (which picture each thing uses) | add or tune a card, office, mood, character |
| `js/` | Game code: `run.js` (the office loop), `campaign.js` (chapters, bosses, characters, Favours/Traces), `forms.js`, `map.js`, `citymap.js`, `ui.js` (screens), `input.js`, `render.js`, `puppets.js`, `tutorial.js`, `i18n.js`, `localize.js`, `version.js` | change how something works |
| `css/game.css` | All styling | change the look |
| `art/` | Every picture (cards `doc_*`/`act_*`, offices `office_*`/`ext_*`, clerk puppets in `art/pup/`) | swap in new art (keep the file name, or point `data/art.js` at the new one) |
| `i18n/` | `*.json` translation tables (edit these), `*.js` (made from them: run `python3 i18n/bake.py`) | fix a translation |

Placeholder offices (Health Centre, Grammar School, University Admissions, and all of Old age) borrow an existing clerk and backdrop through `look:` in `data/chapters.js`. When their own art exists, add `office_<Name>`, `ext_<Name>` and a puppet under that name and remove `look`.

**Feedback:** pause menu → Send feedback posts a row (type, message, optional name, version, office, device) to a Google Sheet. Setup steps are at the top of `feedback-apps-script.gs`; paste the deployed web app URL into `FEEDBACK_URL` in `js/menus.js`.

**v24** (includes v23): the route map is one scrolling city drawn like a phone street map, each route a destination plus possible trouble on the way, balanced so no route is clearly better, with a tram shortcut; the Vitrina is a glass cabinet you pack your bag from; new card layout and a straight ±5° hand from Figma. Details in `CHANGELOG.md`; art brief in `ASSETS-map.md`.

**v22:** days and freshness, a route map, and permanent progression.
- Every document shows how old it is. Some checklist lines want a fresh paper ("max 4 days old"). New cards: Re-issue (dates a paper today) and Backdate (shady, never too old). Photocopies now stay in your cards and keep the date of their original; Notarize dates the certified copy today. A certified copy also counts where a plain copy is asked for.
- Later clerks get stricter: they can demand a certified copy, tighten a date limit, or their system goes down (−1 time). Closing time moves the calendar on a day.
- Between offices you pick a route on a map. Every step is a day. Good stops (café, kafana, copy shop, citizen service centre, cousin, aunt's drawer, clean out your cards), bad ones (bus, renovation, burst pipe, mother-in-law, strike), "?" choices, and a rare attic.
- Pocket items (rakija, pita, priority ticket): one use, 2 slots.
- The Vitrina: trinkets earned by milestones stay between runs (saved in the browser on that device). Equip 1 before a run; a second slot after the first win. Replaces "keep one paper".
- v21 runs in progress don't carry over (the save format changed).
- New art goes into ART under trk_*, pkt_*, ext_* and act_* keys; until then the game draws placeholder icons. See ASSETS-v22.md.

**v20:** the five clerks are animated puppets: they breathe, blink, glance around, move their mouths while they talk, look over at the next window when your neighbour speaks, and pull faces that match their next action and react to what you play (a small envelope gets a raised eyebrow, then a smirk).

**v18:** large cut-out clerk portraits whose speech bubbles point at their mouths; the clerks gossip continuously, and one story runs through all five offices; menu and in-game music (`waiting-room-shuffle.mp3`, `ingame-music.mp3`, keep them next to `index.html`); a pause menu (gear button, Esc or P) with End run; a bigger, centred desktop layout; floating cards and springy buttons on the title screen.

**v17:** new title screen (Start game / Rules / Quit), you choose which cards to keep at the end of every turn (keep none to redraw all 5), and gossip pops up as speech bubbles from the clerk.

**How to play (touch):** tap a card to play it, hold to preview, slide across the hand to browse, slide up out of the hand to play the previewed card. Tap the round button to end your turn; the red segments around it are the turns left before the window closes.

**Mouse:** hover to preview, click to play.
**Keyboard:** 1–9 play a card, Space/E end turn, Esc cancel/close/pause, P pause, M map, C cards.

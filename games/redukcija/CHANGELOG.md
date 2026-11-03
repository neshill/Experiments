# Changelog

Newest first. Each version is a git tag (`v1`, …) on the last commit of that version, so `git checkout v1` gives you that build exactly (v4.2–v4.4 landed in one commit, tagged `v4.4`). The build number is the commit count, shown on the title screen as `v1 · build N`. Full design notes for every version live in `GDD.md` (its change log).

## v5.0 — 2026-11-03 · build 10
The new core from `PROPOSAL-v5.md`: a replayable game you climb, instead of one authored week. v4.4's week is tagged `v4.4`.
- **One reduction per run:** the city announces it for a fixed number of days (5 at level 1, 7 at level 2) and usually extends it. Reach the end, however far it moved, and you move up a level. Hit an edge and you replay the level with a new household.
- **Four two-edged meters:** Water, Spirits, Face, Money (0–100, start 50) replace water, Food, Hygiene, Spirits, credits, errands and strain. Run out and the run ends; from level 2, too much ends it too. Eight endings, each with its own picture; *Endings found* on the title.
- **Arrows on the chips** (▲ / ▲▲ / ▼ / ▼▼) instead of numbers; the bars keep the exact numbers. Hovering a choice shows the range a meter could land in.
- **Levels 1–2:** single person, couple. Levels 3–5 show on the title, locked until v5.1.
- **Rolled households:** names and looks, one story context (the wedding, the exam, just moved in) with beats placed in time, one or two circumstances (top floor, ground floor, night shift, works from home).
- **The building:** four neighbours rolled from archetypes (the retired driver, the elder upstairs, the gossip, the spiteful one), each with a hidden feeling about you; favours and revenge come back days later; they react to your meters.
- **The city's people** recur in every run: Mr Begić at counter A17, Zoran the foreman, Spokesman Kovač, Mira the tanker driver, Lana from City TV. The radio goes from reassuring to defensive to silent.
- **The bag:** 79 cards drawn by conditions, weights and cooldowns, with name slots and text variants; story beats and scheduled consequences come first. 5 cards a day; from day 4 a night can skip a day or two.
- **Events:** heatwave, tanker strike, election week, burst main.
- **New card layout:** the speaker's portrait on a band coloured by place, the text, two choices with a pictogram each (16 pictograms) and arrow chips. Illustrated scenes now only on the title and the endings.
- **Morning:** a strip of the reduction's days (added days hatched), official notices, the delivery, events, the radio; day 1 introduces the household and the building. **Night:** *Running low* and *Running high*.
- **Tools:** `sim.js` reports clear rate and endings per level and play style, card frequency, repeats, and cards that never come up; `dominance.js` checks arrows.
- Save format v3: a v4 week in progress starts over. The ladder is saved separately (`redukcija.ladder`).

## v4.4 — 2026-11-03 · build 9
A new look: illustrated, muted, human. Story, rules and numbers unchanged.
- **Illustrated scenes:** flat vector illustration drawn in code (SVG), with soft shapes and short hatching strokes for texture, replaces the voxel renderer. Every card, brief, night, dawn, title and epilogue scene is redrawn from the same scene data.
- **Humans again:** the animals are gone. Almir (beard, sage jumper, pencil), Sanja (long dark hair, brick turtleneck, tape measure), Aida (bob, headphones, blue hoodie), Selma (pigtails, mustard dress, paper boat hat), Vesna (grey bun, glasses, plum cardigan); officials in suits, the developer on the AQUA RESIDENCES billboard, the crew in hi-vis.
- **Muted palette everywhere:** cream, brick, sand, sage, slate blue, charcoal. Resource colours are muted but stay distinct.
- **No more pixel UI:** rounded panels and chips, soft shadows, smooth icons, eased motion. Morning and night screens retinted.
- **Camera:** each scene frames the people in it, so faces read on a phone; people sit side-on at the table.
- `style-test-v5.html` was the style test for this; it can be deleted.

## v4.3 — 2026-11-03 · build 9
Easier to read at a glance; a new day feels like a new day. Story, rules and numbers unchanged (`tools/sim.js` and `tools/dominance.js` give the same results).
- **Health bars instead of blocks:** water, Food, Hygiene and Spirits are bars with the exact number beside them (24/40, 67/100). Faint notches every 10, a dark notch at LOW (25) and at the drinking line (8). Tags: *Low tonight* (amber) when tonight's drop would take a need under 25, *Low* (red) when it is; otherwise *tonight −28*. Errands and strain show 2/2, 0/3.
- **Animated changes:** a loss drops fast and leaves a red chunk that drains (the tile shakes); a gain shows a light chunk that the fill grows into. Numbers count, the change floats up (−3, +30). Also overnight and for the morning delivery. Off with reduced motion.
- **Card order:** the two choices with their effects come first, right under the HUD; then the situation; the scene is at the bottom. The result card shows what changed before the prose.
- **Night screen:** dark and starry, no HUD. *Running low* first (what's low now, what will be by tomorrow night, water short for tomorrow), then a bar per resource draining overnight with what tomorrow night leaves, strain as big pips, the scene, *Sleep →*.
- **Morning screen:** a sunrise card names the day (*Day 2 of 7 · Tuesday*) and lifts away; warm background, the weekday big in a sunrise header, then the brief and *Today*.

## v4.2 — 2026-11-03 · build 9
Sound.
- **Music:** *Before the taps* (a new, longer take; the first short loop didn't loop cleanly) plays on the title, the quit screen and the epilogue; *Six cards a day* plays through the week. Both are loops made in Suno, crossfading over 1.2 s, played with Web Audio so they loop without a gap.
- **Card sounds:** one of eight swipe sounds plays at random on every choice (never the same twice in a row): on release of a swipe, or on a tap or key.
- **On/off:** a speaker button on the title (bottom left) and in the top bar; separate *Music* and *Card sounds* in the pause menu; **M** anywhere. Remembered on the device.
- Sound starts on the first tap or key press (browsers block sound before that) and pauses when the tab is hidden. Files live in `audio/`; without them the game plays silent.

## v4.1 — 2026-11-02 · build 8
- **The family is renamed:** Almir (you, father), Sanja (partner), Aida (daughter, 15), Selma (the youngest, turning 7). Selma is now a daughter; her cards, promise, memories and epilogue lines are rewritten (she/her). Vesna and Sara keep their names.
- Selma's fox wears a little skirt. Save format bumped (v2), so a week saved in v4 starts over.

## v4 — 2026-11-02 · build 7
New art and a city of animals. Story, rules and numbers are unchanged (`tools/sim.js` and `tools/dominance.js` give the same results as v3).
- **Soft-lit voxels:** a new renderer drawn in code (no image files, no libraries) replaces the rough pixel voxels: smooth faces, soft shadows in corners, sun shadows, warm lamp light at night, antialiased edges. Time of day changes the light.
- **A scene on every card:** each of the 42 cards opens with the room it happens in, the people there, what they're holding and the time of day: kitchen, bathroom, the children's room, the stairwell, the street (tanker, depot, leak, trench, loudspeaker), the depot office, the river. Also one per morning brief, the night, the dawn emergency and the epilogue (and one for moving out). The kitchen still follows the week (containers, bowl, boats, kettle, lamp, notebook, cake).
- **Animal families:** the family are foxes, Vesna is a badger, Sara and the residents are rabbits and a goat, the clerk and officials are wolves in suits, the private tower is lions (the AQUA RESIDENCES billboard), the crew are bears in hi-vis.
- **Living scenes:** everyone blinks now and then (a second frame drawn when the browser is idle); reduced motion turns it off.
- **Card layout:** the speaker is a name tag with a portrait on the scene; the portraits are busts from the same models. The title screen shows the family outside the building, under the lion's billboard.

## v4 — 2026-11-02 · build 7
New art and a city of animals. Story, rules and numbers are unchanged (`tools/sim.js` and `tools/dominance.js` give the same results as v3).
- **Soft-lit voxels:** a new renderer drawn in code (no image files, no libraries) replaces the rough pixel voxels: smooth faces, soft shadows in corners, sun shadows, warm lamp light at night, antialiased edges. Time of day changes the light.
- **A scene on every card:** each of the 42 cards opens with the room it happens in, the people there, what they're holding and the time of day: kitchen, bathroom, the children's room, the stairwell, the street (tanker, depot, leak, trench, loudspeaker), the depot office, the river. Also one per morning brief, the night, the dawn emergency and the epilogue (and one for moving out). The kitchen still follows the week (containers, bowl, boats, kettle, lamp, notebook, cake).
- **Animal families:** the family are foxes, Vesna is a badger, Sara and the residents are rabbits and a goat, the clerk and officials are wolves in suits, the private tower is lions (the AQUA RESIDENCES billboard), the crew are bears in hi-vis.
- **Living scenes:** everyone blinks now and then (a second frame drawn when the browser is idle); reduced motion turns it off.
- **Card layout:** the speaker is a name tag with a portrait on the scene; the portraits are busts from the same models. The title screen shows the family outside the building, under the lion's billboard.

## v3 — 2026-10-30 · build 6
Voxel art drawn in code, a clearer card layout, and a rebalance so no choice is obviously better.
- **Voxel art, made in-house:** small block models rendered by the game in isometric and scaled up crisp (`VOX` section in `ui.js`, no image files or libraries). Busts for Samir, Lejla, Iman, Niko and Vesna and a loudspeaker for the City, with a slow stepped blink. A kitchen-corner scene on the morning brief, the night summary and the title that changes with the week: containers by the door fill with the tank, the blue bowl, paper boats on the sill, the lamp lighthouse, Vesna's kettle, Iman's phone, the shared notebook, the cake. Resource icons and the water tank stay flat (a voxel tank was tried and read slower).
- **Action tray:** the two choices sit in a darker, flatter tray under the card, with a key cap (← / →) on each outer edge; they lift only on hover, focus or drag.
- **Tap the result to continue:** the whole result card is the Continue button, with *Continue →* inside it; Enter and Space work; taps in the first 250 ms are ignored.
- **Every trade is visible:** chips for *Promise · due Sun*, *Keeps promise*, *Breaks promise*, the complaint file (+1) and *Valve repair*.
- **Rebalance:** 16 cards had an option that was better or equal on every chip and 2 had identical options; now none do (`tools/dominance.js`). Credits run short: start 6, Lejla's work +1 a day, shop food one dearer from Thursday, jobs pay 4. A repaired valve makes Sunday's collection 14. Always picking the generous option now fails about a quarter of weeks; a careful player still finishes clean (`tools/sim.js`, table in the GDD).
- No relationship score; that stays an open question.

## v2.1 — 2026-10-30 · build 3
- **Renamed to Redukcija.** Title screen, browser tab and home-screen name; *until the taps return* stays as the subtitle.
- **Icons:** placeholder pixel water drop on a blue tile for the iPhone home screen (`apple-touch-icon.png`, 180×180, also embedded) and the browser tab (32×32, embedded).
- Save key is now `redukcija.save` (older saves don't carry over), so it can live next to FT1P on the same site.
- README: how to publish to `games/redukcija/` in the Experiments repo.
- The GDD moved into the folder as `GDD.md` (it was a Claude Doc).

## v2 — 2026-10-30 · build 2
Visual pass: costs and resources readable at a glance. Light, neutral palette with a pixel feel (notched corners, hard offset shadows, dithered shading), readable fonts (Barlow Condensed for numbers and labels, Atkinson Hyperlegible for text; no pixel fonts).
- **One colour + one icon per resource,** used everywhere: water blue, Food orange, Hygiene teal, Spirits pink, credits gold, errands purple, strain red, complaint file slate, promises amber. Icons are 10×10 pixel placeholders drawn in code until the asset sheet arrives.
- **HUD as tiles:** a big water tile with the tank drawn as 40 blocks (pale = kept for drinking, white = free, dark = empty); Food, Hygiene and Spirits tiles with 10 blocks each that turn red with a LOW tag under 25; small counters for credits, errands and strain.
- **Cost chips:** every effect is an icon + signed number. Gains are filled with the resource colour, costs are white with a coloured frame, chances are dashed with their odds (e.g. +10? 50%).
- **Preview:** hovering or dragging a choice makes the blocks that would go blink striped and the blocks that would come blink outlined, with a +/− tag on the tile. The HUD no longer shifts when a preview appears.
- **Portrait slot:** a 64 px dithered frame in the speaker's colour, ready for portraits.
- Chunky buttons (green = continue), day tile, tagged morning notices, night summary and epilogue rows with icons, an icon legend in How to play.

## v1 — 2026-10-30 · build 1
First Claude version, rebuilt from the ChatGPT concept (v0, kept in the folder as `Until_the_Taps_Return.html` / `.docx`). Same family, same city, same 42 scenes; new rules and shell.
- **Swipe cards:** portrait-first card you drag left or right (Reigns style); the choices sit under it with every cost shown. Dragging or hovering previews the result on the water bar and meters. Keys ← → / 1 2.
- **Water you can read:** big "free water" number, 8 reserved for drinking every night, the tank out of 40. Building deliveries are confirmed the night before; the depot tanker on Wednesday is *expected* (about even odds, fixed at the start of the week so reloading never changes it).
- **Two supply schedules** (The usual promises / A dry middle), one picked per week.
- **Strain replaces Health:** Food, Hygiene and Spirits each under 25 at bedtime add a point; all three at 50+ remove one. At 3 the family goes to the community centre (once); the next time they stay with relatives. Spirits now count, so joy has a mechanical job.
- **Promises:** Niko's little sea (due Sunday) and Sara's visit (due Saturday, new card *Another time*). Kept or broken on a card; still open on the due night = broken, −8 Spirits. Shown with a badge on the Family button.
- **People remember:** the Family dialog lists what each person remembers from your choices.
- **Complaint file:** documenting the leak, re-filing the ticket and sharing Iman's recording add to it; 2+ and walking the crew to the pipe gets the valve repaired.
- **Shell:** title screen (Continue / Begin Monday / How to play / Quit), pause menu (Resume, How to play, This week so far, Replay this morning, Save and go to title, End this week), version + build stamp, autosave after every decision.
- **Balance** (400 simulated weeks per play style): always picking the generous option finishes clean; hoarding water ends with full tanks and the family at the community centre; random play needs help in about a third of weeks and moves out in 1 in 20.

---

## How to make a release
1. Bump `GAME_VERSION` in `index.html` (e.g. `'v2'`).
2. Add a section at the top of this file and update `GDD.md`: a row in its change log, the current-build section, and every section the change touches.
3. Commit (the pre-commit hook stamps the build number), then tag: `git tag -a v2 -m "v2"`.
4. Push with tags. GitHub Desktop sends annotated tags along with the next push; in a terminal use `git push --follow-tags`.

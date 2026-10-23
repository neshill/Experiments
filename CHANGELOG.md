# Changelog

Newest first. Each version is a git tag (`v24`, `v22`, …) on the last commit of that version, so `git checkout v22` gives you that build exactly. The build number is the commit count, shown on the title screen as `v24 · build N`. Full design notes for every version live in the game design doc's change log.

## v24 — 2026-10-23 · build 36
Includes v23, which was never committed on its own.
- **City map (v23):** the 3-lane route list is replaced by one sideways-scrolling top-down city for the whole run, offices as landmarks, one named district (fork of 2–3 stops) between each pair. Tap a stop to preview, Go to confirm. Your red Yugo parks illegally with its hazards blinking; the trail is drawn in ink; past and skipped stops fade. Fixes the v22 bug where first-row stops of every leg could be tapped. Save format v11 (v22 runs restart).
- **Street map look (v24):** drawn like a phone map: cream land, white side streets, parks, the Miljacka along the bottom, routes in pale yellow, options in navy, the tram in orange. Building tiles removed.
- **Fairer routes (v24):** every route is a destination plus, sometimes, trouble on the way (red ! on the street). Better stops carry more risk; a district is rerolled until no route is clearly better. The route card shows Get / On the way / For you. 25% of districts offer the tram (no stop, no trouble, a day saved).
- **Vitrina cabinet (v24):** the trinkets sit in grandma's glass cabinet; tap one to put it in "In your bag for this run" (it leaves a faded outline). What you took shows in the office HUD, on the map, and in a "Packed" note at the start of the run.
- **Cards (v24, from Figma):** art on top, type band, coloured body, cost badge top-left.
- **Hand (v24, Figma "lane fan"):** a straight row 84 px apart, alternately tilted ±5°, the left-tilted cards raised 8 px (replaces the 15° arc).
- New art brief: `ASSETS-map.md`.

## v22 — 2026-10-23 · build 35
Days and document freshness (Re-issue, Backdate, permanent photocopies), stricter later clerks, a branching route map between offices, pocket items, and the Vitrina (permanent trinkets between runs). Save format v10. Art brief: `ASSETS-v22.md`.

## v21 — 2026-10-21/22 · build 34
Figma redesign of the office: full-bleed stage with floating Patience/Time, sliding fan hand, cost badge on each card, Map/Settings in the bottom row; home-screen icon; version and build number on the title screen; iOS scrolling fixes.

## v20 — 2026-10-20 · build 20
Animated clerk puppets (breathing, blinking, faces that react to your cards) and a feedback form in the pause menu.

## v19 — 2026-10-19 · build 17
New card My Friend Went Last Week: reveals the next hidden rule or FT1P paper.

## v18 — 2026-10-19 · build 16
Large clerk portraits with speech bubbles, one gossip story across all five offices, menu and in-game music, pause menu.

## v17 — 2026-10-19 · build 14
Title screen, rules page, choose cards to keep every turn, gossip as bubbles.

## v16 — 2026-10-19 · build 3
Landscape layout for desktop and handhelds, mouse and keyboard controls.

## v15.1 — 2026-10-18 · build 2
First version in this repo.

---

## How to make a release
1. Bump `GAME_VERSION` in `index.html` (e.g. `'v25'`).
2. Add a section at the top of this file and a row in the GDD change log.
3. Commit (the pre-commit hook stamps the build number), then tag: `git tag -a v25 -m "v25"`.
4. Push with tags. GitHub Desktop sends annotated tags along with the next push; in a terminal use `git push --follow-tags`.

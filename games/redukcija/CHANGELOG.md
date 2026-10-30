# Changelog

Newest first. Each version is a git tag (`v1`, …) on the last commit of that version, so `git checkout v1` gives you that build exactly. The build number is the commit count, shown on the title screen as `v1 · build N`. Full design notes for every version live in `GDD.md` (its change log).

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

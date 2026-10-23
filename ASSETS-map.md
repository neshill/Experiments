# FT1P v23: art for the city map

The map is now one top-down city for the whole run, a wide strip you scroll sideways from left to right: offices on the left and right of each district, a fork of 2–3 stops between them, and a little red Yugo that is you.

**Orientation matters:** you travel left to right, so anything with a direction (the Yugo, the tram, footprints) points **right**, and the river runs **top to bottom** across the strip. Right now the city is drawn with flat coloured rectangles. This brief replaces those with real art, so it looks like a SimCity-style town plan printed on a riso.

Nothing breaks without these: whatever is missing keeps its current flat drawing.

## How to hand them over

- One folder named `assets-map/`, exact file names below, lowercase `.png`.
- Minimum sizes are listed per item. I'll resize and compress them when I build them in.
- **No text, letters or numbers** in any image. District names, labels and signs are drawn by the game.
- **Straight top-down view** (looking straight down from above, like a satellite or SimCity 2000 without the tilt). No perspective, no isometric angle. Light comes from the top-left, so shadows fall down-right, short and hard.
- Everything sits on a city that is mostly cream and warm grey, so keep tiles calm. The stops, the red route and the Yugo must stay the loudest things on screen.

## Shared style (paste this at the start of every prompt)

> Top-down orthographic town-plan view, looking straight down. Riso-print and carbon-copy look: flat ink layers, slight misregistration, visible paper grain, stamp-like edges. Light cubist influence: faceted, angular roof shapes. Muted 1980s Yugoslav palette: paper cream #f2e5c8, wall beige #e7d7b4, ink #18283a, navy #153c62, terracotta roofs, concrete grey, sage #7d9d80, turquoise #4c9e9b, small touches of orange #e76a36 and gold #e8b44b. Calm and low-contrast, short hard shadows to the lower right. No text, no letters, no numbers, no logos, no people.

---

## 1. City blocks (12)

These fill the city between the streets. The game tiles them in a grid with thin gaps that read as side streets, so **each block is one self-contained city block seen from above, filling the whole image edge to edge**, no street around it.
**Format:** 256 × 240 (a little wider than tall), opaque. Make at least the first 8; the rest add variety.

| File | What to show |
|---|---|
| `map_block_panel1.png` | A long socialist housing block (panelka) roof: flat grey roof with rows of vents and a lift housing, a strip of grass beside it. |
| `map_block_panel2.png` | Two shorter panel blocks at a right angle around a small courtyard with a sandbox. |
| `map_block_tower.png` | One square high-rise roof with a big shadow, surrounded by parking with tiny cars (no plates). |
| `map_block_houses.png` | Four small family houses with terracotta tile roofs and little gardens, fences between them. |
| `map_block_oldtown.png` | Dense old-town roofs: small tiled roofs packed together, a courtyard with a tree. |
| `map_block_market.png` | An open-air market (pijaca): rows of stalls with striped awnings seen from above. |
| `map_block_school.png` | A school roof with a fenced asphalt sports court (basketball lines, no numbers). |
| `map_block_garages.png` | A row of tin garages with corrugated roofs, one door open, and a parked car. |
| `map_block_factory.png` | A small factory hall with sawtooth roof and a chimney casting a long shadow. |
| `map_block_kiosks.png` | A little square with a newspaper kiosk, a bench and a fountain. |
| `map_block_lot.png` | An empty, dusty lot with tyre tracks and a few weeds. |
| `map_block_construction.png` | A half-finished building: concrete frame, rebar, a crane seen from above. |

## 2. Green and water (4)

| File | What to show | Format |
|---|---|---|
| `map_park1.png` | A park block: tree crowns as round clumps, curved paths, a bench. | 256 × 240, opaque |
| `map_park2.png` | A different park: a small playground and a row of poplars. | 256 × 240, opaque |
| `map_river.png` | The river seen from above, flowing top to bottom: turquoise water with ripples and stone embankment edges on the left and right. **Must tile seamlessly top-bottom.** | 128 × 1024, opaque |
| `map_bridge.png` | A short stone road bridge crossing the river, seen from above, running left to right. | 192 × 128, transparent background |

## 3. Office squares (5)

Each office sits on its own square in the city. These replace the flat cream rectangle behind the office card. Show the building's **roof from above** plus the square around it (paving, a flagpole, a couple of benches). Leave the **middle 70% fairly plain**, because the office card sits on top of it; the interest should be around the edges.
**Format:** 504 × 576 (portrait), opaque.

| File | Office | Character |
|---|---|---|
| `map_office_registry.png` | Registry (municipal) | Old Austro-Hungarian roof with a small clock tower, paved square with pigeons. |
| `map_office_police.png` | Police | Flat roof with an antenna, a fenced yard with two patrol cars. |
| `map_office_tax.png` | Tax Office | Grey modernist slab, a car park with a barrier. |
| `map_office_bureau.png` | Bureau | Brutalist roof with stepped concrete terraces. |
| `map_office_bank.png` | Bank | Smart roof with a skylight and a neat hedge. |

## 4. The player and the tram (4)

| File | What to show | Format |
|---|---|---|
| `map_yugo.png` | **You.** A red Zastava Yugo seen from directly above, nose pointing **right**. Simple and chunky so it reads at 40 × 26 px: red body, pale windscreen, dark roof line. Leave the four corner lights as small light-amber circles: the game makes them blink (hazards on, because it's parked on the pavement). | 400 × 260, transparent |
| `map_tram.png` | A short tram seen from above, pointing right: cream and red livery, pantograph on the roof. | 480 × 160, transparent |
| `map_tramstop.png` | A tram stop sign from above: a small shelter roof with a pole. | 128 × 128, transparent |
| `map_tramtrack.png` | Tram tracks on cobbles, running left to right. **Must tile seamlessly left-right.** | 256 × 64, opaque |

## 5. Map marks (3)

| File | What to show | Format |
|---|---|---|
| `map_visited.png` | An ink rubber-stamp tick mark, slightly smudged, for stops you've been to. | 256 × 256, transparent |
| `map_paper.png` | A riso paper-grain overlay laid over the whole map (cream fibres, faint ink speckles). **Must tile in both directions.** | 512 × 512, opaque, very subtle |
| `map_footsteps.png` | One pair of small inky footprints, pointing right, for drawing your trail. | 64 × 64, transparent |

## The stops themselves

The stop pictures are the `ext_*.png` files already listed in **ASSETS-v22.md, section 2**. They now appear in two places: the round badge on the map (46 px) and the preview card that opens when you tap a stop (56 px). So that brief still applies, with one addition: **give each stop a clear, simple background colour** (warm for good stops, cold with red accents for trouble), because on the busy city they need to pop out of the map, not blend into it.

## Priority

If you only make a few, make these first: `map_yugo`, the 8 core city blocks, `map_park1`, `map_river`, and the 13 `ext_*` stops from the v22 brief. That alone turns the coloured rectangles into a town.

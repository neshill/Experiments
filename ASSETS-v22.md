# FT1P v22: new art to make

v22 adds 24 new pictures. Until they exist, the game draws simple placeholder circles with a symbol, so nothing is broken without them.

## How to hand them over

- Put every file in one folder named `assets-v22/`, using the exact file names below (lowercase, `.png`).
- Any size works as long as it's at least the minimum listed. I'll crop, resize and compress them when I build them in (the game embeds every picture inside `index.html`, so they all get shrunk to a few KB each).
- No text in any image. Names, costs and labels are drawn by the game, so baked-in text would clash and wouldn't translate.
- Don't worry about matching card colours. Each card already has its own background colour in the code.

## Shared style (paste this at the start of every prompt)

> Riso-print and carbon-copy look: flat ink layers, slight misregistration, visible paper grain, stamp-like edges. Light cubist influence: faceted, angular shapes. 1980s Yugoslav palette: paper cream #f2e5c8, ink #18283a, navy #153c62, orange #e76a36, red #c93f31, turquoise #4c9e9b, gold #e8b44b, sage #7d9d80. One clear subject with a bold silhouette that reads at thumbnail size. No text, no letters, no numbers, no logos.

Make sure each picture is easy to tell apart when tiny. The map icons show at 44 px and the trinkets at 56 px.

---

## 1. Action cards (2)

Card illustrations, same family as the existing ones (Photocopy, Notarize).
**Format:** landscape, about 3:2, at least 768 × 512. Keep the subject in the middle, because the card crops the edges.

| File | Card | What to show |
|---|---|---|
| `act_reissue.png` | Re-issue | A counter window sliding a fresh, crisp copy of an old, yellowed certificate back to you, with a big date stamp hitting the new one. Feeling: "same paper, new date". |
| `act_backdate.png` | Backdate (shady) | A hand under a desk lamp nudging the dial of a rubber date stamp, with a slightly guilty look. Shady cards should feel a bit noir: darker, more ink. |

## 2. Map stops (13)

These show in round badges on the map, and also as small header pictures. **Format:** square, at least 512 × 512, with the subject centred and filling about 70%, because the outer corners get cut off by the circle. A background is fine, since the existing kiosk and café ones have one.

The café (`ext_cafe`) and kiosk (`ext_kiosk`) already have art.

**Good stops** (warm, inviting):

| File | Stop | What to show |
|---|---|---|
| `ext_kafana.png` | Kafana | A smoky tavern table: ćevapi plate, small rakija glasses, a tablecloth with a checked pattern. |
| `ext_copyshop.png` | Copy shop | A tired photocopier mid-copy, with a green light bar and a jammed sheet sticking out. |
| `ext_counter.png` | Citizen service centre | A row of numbered service windows with a ticket machine in front. Bright and official. |
| `ext_cousin.png` | Visit your cousin | A kitchen table with Turkish coffee in a džezva and two cups, and an old rotary phone. |
| `ext_shred.png` | Clean out your cards | A paper shredder or a wastebasket overflowing with crumpled forms. |
| `ext_drawer.png` | Your aunt's drawer | A sideboard drawer pulled open and crammed with papers, old bills and a 1987 calendar. |

**Bad stops** (colder, red accents):

| File | Stop | What to show |
|---|---|---|
| `ext_bus.png` | The bus doesn't come | An empty bus stop in the rain, with a dented timetable sign and puddles. |
| `ext_reno.png` | Neighbour's renovation | A power drill coming through a wall, with plaster dust and cracks. |
| `ext_flood.png` | Burst pipe upstairs | Water dripping from a ceiling stain onto a stack of documents. |
| `ext_inlaw.png` | Mother-in-law visits | A doorway silhouette with a handbag and a covered dish (the pita), seen from inside the flat. Imposing but affectionate. Show no specific face. |
| `ext_strike.png` | Post office strike | A closed post office counter with a handwritten sign taped on it (scribbles only, no readable text) and a pulled-down shutter. |

**Special:**

| File | Stop | What to show |
|---|---|---|
| `ext_event.png` | ? Something comes up | A crossroads signpost with two arrows pointing different ways, or a door left ajar. It should read as "a choice". |
| `ext_attic.png` | Grandpa's attic (rare) | A dusty attic with a trunk lit by a beam of light through a small window, and something glinting inside. This is the rare stop, so make it feel special: gold and violet accents. |

## 3. Vitrina trinkets (6)

Permanent keepsakes in grandma's glass cabinet, so they should feel like cherished objects.
**Format:** square, at least 512 × 512, **transparent background**, with the object centred and a soft drop shadow. They should all look like they belong on the same shelf, with similar lighting and angle.

| File | Trinket | What to show |
|---|---|---|
| `trk_thermos.png` | Thermos of coffee | A chunky 80s plaid thermos with its cup-lid off and steam rising. |
| `trk_stampbox.png` | Tin of fee stamps | An old biscuit tin, lid open, full of colourful perforated stamps. |
| `trk_notebook.png` | Grandpa's notebook | A small worn notebook with an elastic band and a pencil tucked in, plus dog-eared pages. |
| `trk_partycard.png` | Old party card | A small red booklet ID with a gold star emblem, slightly faded. Keep it generic (a plain star), not a real party's insignia. |
| `trk_folder.png` | Plastic folder with sleeves | A clear plastic sheet-protector folder with papers inside, slightly reflective. |
| `trk_laminator.png` | Laminated papers | A document sealed in glossy laminate, with a shine streak across it. |

## 4. Pocket items (3)

Single-use items, shown small in the top bar (26 px) and on the map.
**Format:** square, at least 512 × 512, **transparent background**, as one bold object. These need the strongest silhouettes of the whole set.

| File | Item | What to show |
|---|---|---|
| `pkt_rakija.png` | Bottle of rakija | A homemade rakija bottle (a reused glass bottle) with a cork and a pear inside. |
| `pkt_pita.png` | Grandma's pita | A round pita (burek-style spiral) on a baking tray, wrapped in a tea towel. |
| `pkt_ticket.png` | Priority ticket | A queue ticket torn from a machine, with a bright border and a big blank number area (no digits). |

---

## Optional, nice to have

- **Clerk intent icons** for the three new clerk moves ("This must be certified", "This one is too old", "The system is down"). They currently use drawn SVG icons that match the existing intent icons, so they're fine as they are.
- **Map background** texture (a city map or transit-map paper) at least 1080 × 2400, portrait, subtle and low contrast.

## Checklist (24 files)

```
act_reissue.png      act_backdate.png
ext_kafana.png       ext_copyshop.png     ext_counter.png      ext_cousin.png
ext_shred.png        ext_drawer.png       ext_bus.png          ext_reno.png
ext_flood.png        ext_inlaw.png        ext_strike.png       ext_event.png
ext_attic.png
trk_thermos.png      trk_stampbox.png     trk_notebook.png     trk_partycard.png
trk_folder.png       trk_laminator.png
pkt_rakija.png       pkt_pita.png         pkt_ticket.png
```

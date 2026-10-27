# FT1P v25: art for the tutorial (Žućko's practice office)

The tutorial ("How to play") runs one practice office at **Window 0**, staffed by **Žućko**, a puppy temp worker. Right now it borrows the Registry backdrop and Žućko is a hand-drawn SVG. This brief replaces both, plus adds the certificate you get at the end.

Nothing breaks without these: whatever is missing keeps its current drawing.

## How to hand them over

- One folder named `assets-tutorial/`, **outside the Experiments repo** (e.g. in the Archive), exact file names below, lowercase `.png`.
- Minimum sizes are listed per item. I'll crop, resize and compress them when I build them in.
- **No text, letters or numbers** in any image. Names, labels and the "Trained" stamp are drawn by the game so they can be translated.

---

## How to use this in ChatGPT

1. Start a **new chat**. Paste **Message 1** below and attach 2–3 existing pictures as style references (e.g. `office_Registry`, `doc_id`, one clerk portrait).
2. Then send one item per message (Message 2, 3, …). One image per message keeps quality up.
3. For the Žućko layers, generate `zucko_full.png` first, approve it, and then ask for the layers "using the exact same character as the image above".

### Message 1 (paste first)

> I'm making art for a mobile card game called *Fali ti jedan papir*, a comedy roguelike about Balkan bureaucracy. I'll ask you for one image per message. Every image must follow this shared style:
>
> Riso-print and carbon-copy look: flat ink layers, slight misregistration, visible paper grain, stamp-like edges. Light cubist influence: faceted, angular shapes. 1980s Yugoslav palette: paper cream #f2e5c8, ink #18283a, navy #153c62, orange #e76a36, red #c93f31, turquoise #4c9e9b, gold #e8b44b, sage #7d9d80. One clear subject with a bold silhouette that reads at thumbnail size. No text, no letters, no numbers, no logos, no watermark.
>
> Match the attached reference images for line weight, texture and colour. Reply "ready" and wait for my first request.

---

## 1. Practice office backdrop (1)

**`office_Practice.png`** — landscape 3:2, at least **1536 × 1024**, opaque.

> A small, slightly makeshift training counter in a 1980s Yugoslav municipal office: "Window 0", clearly the least important window in the building. A single service window with a glass pane and a little speaking hole, a worn counter top, a potted rubber plant, a wall clock, a pinned-up instruction poster with only scribble shapes, a stack of practice forms, a rubber stamp and an ink pad. A dog bowl and a squeaky toy bone tucked under the counter hint that a puppy works here. Warmer and friendlier than the other offices: more cream, gold and sage, less navy.
> Composition: straight-on view of the counter. Keep the **centre and left-centre** calm and empty, because the clerk is drawn there on top of this picture. Keep the **top-right corner** and the **bottom strip** quiet too, because game UI sits there. No people, no animals in this image.

## 2. Žućko, the puppy temp worker (5)

The game draws clerks as stacked layers so their faces can move (blink, talk, ears flop) while the body only breathes. So Žućko comes as one full reference picture plus layers that line up exactly.

**Character (keep identical in every image):** a young golden-yellow puppy (gold #e8b44b fur, "Žućko" means "Yellowy"), big floppy rust-brown ears, a darker orange patch around his left eye, cream muzzle, shiny black nose, round black eyes with a white highlight. He wears a cream short-sleeved office shirt with a navy tie, a red lanyard with a white ID badge clipped at a slight angle, and a **hat folded from an official form** (a paper-boat hat with faint ruled lines and a small red rubber-stamp circle on it). Eager, slightly overwhelmed, very proud of the job. Seen from the front, head and shoulders, looking at the viewer.

**`zucko_full.png`** — portrait 3:4, at least **1024 × 1365**, **transparent background**.

> [Character description above.] Bust portrait from mid-chest up, centred, facing the viewer, mouth closed in a small happy smile. No arms or paws visible.

Then, after approving it, ask for these on the **same canvas size and in the same position**, so they stack perfectly on top of each other:

| File | What to show |
|---|---|
| `zucko_bust.png` | Only the body: shirt, tie, lanyard and badge, cut off at the neck. Transparent everywhere else. No head. |
| `zucko_head.png` | Only the head (ears and paper hat included), eyes open, mouth closed. Transparent everywhere else. |
| `zucko_head_blink.png` | The same head, eyes closed as two soft curves. Nothing else changes. |
| `zucko_head_talk.png` | The same head, mouth open mid-word, small pink-orange tongue. Nothing else changes. |

Tip if ChatGPT drifts: "Use the exact same character and framing as the previous image. Only change [what]. Keep the canvas size and the head's position identical."

## 3. End of tutorial (2)

**`tut_certificate.png`** — portrait 3:4, at least **768 × 1024**, transparent background.

> A single official certificate on cream paper with an ornate guilloche border in navy and gold, a ribbon seal in the corner, and lines of scribble shapes where the text would be. Across the middle sits a big muddy **paw-print stamp** in red ink, slightly smudged, as if a puppy stamped it proudly. Slightly tilted, soft drop shadow.

**`tut_pawstamp.png`** — square, at least **512 × 512**, transparent background.

> A rubber stamp mark in the shape of a puppy paw print, red ink #c93f31, uneven ink coverage and a rough stamped edge. Just the mark, nothing else. (The game slams this onto the screen when you finish.)

---

## Checklist (8 files)

```
office_Practice.png
zucko_full.png       zucko_bust.png       zucko_head.png
zucko_head_blink.png zucko_head_talk.png
tut_certificate.png  tut_pawstamp.png
```

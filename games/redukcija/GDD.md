# Redukcija — Game Design Document

Last updated 6 Nov 2026 · Mirza Sadovic

This file is the game design document. It lives next to the game in the Redukcija folder and is versioned with it in git. **Every change to the game also updates this file:** the current-build section, the change log, and any section the change touches.

## Prototype v5.0 — current build

**v5.0.2 (6 Nov 2026):** about half the reading. Card situations are one or two short sentences (about 11 words on average, was 21), responses one line (about 7 words, was 14). Story that needs no decision is a **note**: a card you tap through, played before the morning screen (day 1: the notice, your household and story, the building; then official notices, a new event, days that passed). The morning is the day, the strip and a short *Today* list; the night lost its paragraphs. Mechanics, arrows and balance unchanged.

**v5.0.1 (6 Nov 2026):** the decision is one card. Its bottom is split into the two choices (left choice on the left half, right on the right), the result plays on the same card, and every choice label is four words or fewer. Rules, numbers and card text are otherwise unchanged. See *The decision card*.

v5.0 is the first step of `PROPOSAL-v5.md` (*v5.0: the new core*). The game is no longer one authored week: the city announces a water reduction, you get a rolled household through it, the city extends it, and if you reach the end the next run is a bigger household. Code lives in this folder (`index.html`, one file), tagged `v5.0` in git. The authored week of v4.4 (Almir's family, 42 cards) is tagged `v4.4`; its design is in this file at that tag.

**The run:** one **reduction**. The first morning shows the notice: *"Water supply will be reduced for 5 days due to planned maintenance."* The promised last day is in the top bar. The city usually extends it (see *The reduction*); reach the end, however far it moved, and you get the epilogue and move up a level. Hit a meter's edge and the run ends with that edge's ending; you replay the level with a new household.

**A day:** a morning (the delivery, the city's notices, an event if one is on, the radio), **5 cards**, then the night. Later in a long reduction a night can skip a day or two (*Two days pass. The queue at the depot starts at four now.*). A run plays 7–9 days and spans 7–12 days of story.

**Four meters:** Water, Spirits, Face, Money, all 0–100, all start at 50. **Both edges end the run:** run out and you're Dry, Falling apart, Cracked or Broke. From level 2, too much ends it too: Hoarder, Too precious, Poster family, Profiteer. Food and Hygiene are no longer meters; they're what cards spend Water and Money on.

**Cards show arrows, not numbers:** ▲ / ▲▲ / ▼ / ▼▼ per meter. ▲ is 6–10, ▲▲ is 12–18, rolled when the choice lands. The HUD bars always show the exact number.

**Levels (v5.0 has two):**

| Level | Household | Announced | Each night | Deliveries | Edges that end the run |
| --- | --- | --- | --- | --- | --- |
| 1 | Single person | 5 days (at most 9) | Water −8, Spirits −4, Money −4 | 8–13, about every other day | Bottom edges only |
| 2 | A couple | 7 days (at most 12) | Water −10, Spirits −3, Money −4 | 12–18, 6 days in 10 | Both edges |

Every night Face also drifts a quarter of the way back to 50 (keeping up an act takes effort). Levels 3–5 (a baby, a full family, a large family) come in v5.1; the title shows them locked.

**Rolled every run:** the names and looks of your household and of four neighbours, one story context (*The wedding*, *The exam*, *Just moved in*), one or two circumstances (*Top floor*, *Ground floor*, *Night shift*, *Works from home*), the delivery rota, the extension plan, and events.

**The pool:** 79 cards, drawn from a bag each morning by conditions and weight, plus story beats placed in time and consequences scheduled by earlier choices.

**Shell (same as Fali Ti Jedan Papir):** title screen with the ladder (levels, current level highlighted), *Continue*, *Begin level N*, *How to play*, *Endings found · n of 8*, *Quit*, `v5.0 · build N` bottom right and the sound button bottom left. Pause menu (Resume, How to play, This run so far, Music, Card sounds, Replay this morning, Save and go to title, Abandon this run). *Home* dialog: promises, your household with what each person remembers, the context and circumstances, the four neighbours with how they feel about you. Autosave after every decision; the ladder (level reached, endings found) is saved separately (`redukcija.ladder`).

**What changed from v4.4:**

| | v4.4 | v5.0 |
| --- | --- | --- |
| Run | One authored week, 7 days × 6 cards | One reduction, announced for 5 or 7 days and usually extended; 5 cards a day; time jumps later on |
| Progress | One week, then an epilogue | Levels: get through and the next run is a bigger household |
| Cards | 42, each written for a day | 79 in a bag with conditions, weights, cooldowns, name slots and text variants; 12 story beats placed in time; 5 consequences scheduled by choices |
| Household | Always Almir, Sanja, Aida, Selma | Rolled: names, looks, story context, circumstances |
| Neighbours | Vesna | Four rolled from archetypes, each with a hidden feeling about you (−2 to +2) that moves with how you treat them |
| Resources | Water (0–40), Food, Hygiene, Spirits, credits, errands, strain, complaint file, promises | Water, Spirits, Face, Money (0–100), all two-edged; promises and the complaint file are story state |
| Losing | Strain 3, then help, then relatives | A meter hits an edge; eight endings |
| Chips | Exact numbers | Arrows |
| Card picture | A scene per card | The speaker's portrait on a band coloured by place, and a pictogram on each choice. Scenes only on the title and the endings |

### Change log

| Version | Date | Build | What changed |
| --- | --- | --- | --- |
| v5.0.2 | 6 Nov 2026 | 13 | **The text cut.** All 79 cards rewritten shorter, with the detail that makes each one personal kept (situations ~11 words on average, was ~21; responses ~7, was ~14; the same number of text variants, so the dice and the balance are unchanged; `sim.js` and `dominance.js` give the same results). **Notes (decisionless cards):** a card with an eyebrow, one big line, an optional smaller line, portraits where people are introduced, and *Tap to continue* (also Enter, Space or →). They play before the morning screen: on day 1 the reduction notice, your household with the story context and circumstances, and the four neighbours (this replaces the long day-1 panel); official notices (*Extended to Sunday: 2 more days.*), a new event, and days that passed in a time jump. **Morning:** the day, the strip, then *Today*: the delivery, any event as name and rule, the radio. **Night:** the explanation paragraph is gone (it's in *How to play*); shorter night lines and time-jump line. Context, circumstance and event lines shortened; official notice texts shortened (and *1 days* fixed). Why: Mirza's note of 6 Nov (too much reading; story without a decision on interstitial cards). |
| v5.0.1 | 6 Nov 2026 | 12 | **One card.** The tray of two choice buttons under the card and the hint line are gone: the card's bottom is split into two halves, the left choice on the left and the right choice on the right, each with its label and arrow chips. Swipe the card, or tap a half; leaning or hovering darkens that half, fades the other and previews on the HUD as before. Pictograms leave the choices (they stay on the result and in *This run*). **The result** keeps the card's shape: the choice, the exact changes, the response, and a *Tap to continue* strip where the choices were; *Saved on this device* only shows if saving fails. **Labels:** 40 of 158 choice labels shortened to four words or fewer so they fit a half at phone width (one, *Miss it for the tanker*, keeps five). Why: Mirza's note of 6 Nov: too much reading, and the left/right decision should live inside one card, not three separate pieces. The text cut itself is the next step (v5.0.2). |
| v5.0 (publishing) | 3 Nov 2026 | 11 | Workflow only; the game is unchanged. This folder (`~/Desktop/Projects/Redukcija`) is now the one working copy, and the Experiments repo is a deploy target only. New `deploy.sh` copies just the playable files (`index.html`, `apple-touch-icon.png`, `audio/`, README, CHANGELOG, GDD) to `games/redukcija/` in Experiments; work files (Claude outputs, screenshots, prompts, tools, style tests, proposals, ChatGPT originals) stay here. README publishing notes rewritten to match. Why: keep drafts and tools out of the live site and stop the game being edited in two places. |
| v5.0 | 3 Nov 2026 | 10 | **The new core** from `PROPOSAL-v5.md`. **Run:** one water reduction, announced for a fixed number of days and extended by the city (about 4 runs in 5 at least once; a second time at level 2 about a third of the time; a burst main can add more); reaching the end is a clear. **Levels 1–2** (single person, couple); clearing moves you up, failing replays the level with a new household. **Four two-edged meters** (Water, Spirits, Face, Money, 0–100, start 50) replace water, Food, Hygiene, Spirits, credits, errands and strain; eight edge endings (top edges only from level 2). **Arrows on the chips** (▲ 6–10, ▲▲ 12–18) instead of numbers; exact numbers stay on the bars. **5 cards a day** from a bag (conditions, weights, cooldowns, name slots, variants), with story beats placed in time and scheduled consequences first. **Time jumps** from day 4, every other night, never over a story beat. **Rolled households**: names and looks, 3 story contexts (the wedding, the exam, just moved in), 4 circumstances (top floor, ground floor, night shift, works from home). **Neighbours**: 4 archetypes (the retired driver, the elder upstairs, the gossip, the spiteful one), each with a hidden feeling, memories, favours and revenge 1–5 days later, and cards that react to your meters (lots of water draws a report, lots of fun looks elitist, low Face gets gossiped about, spare money brings loan requests). **The city's people** recur in every run: Mr Begić at counter A17, Zoran the foreman, Spokesman Kovač, Mira the tanker driver, Lana from City TV. **Events**: heatwave, tanker strike, election week, burst main. **Card layout**: the speaker's portrait on a band coloured by place (home, stairwell, street, office), the text, then two choices with a pictogram each (16 pictograms) and arrow chips. **Morning**: a strip of the reduction's days (days the city added are hatched), the official notice when it changes, the delivery, the event, the radio (reassuring, then defensive, then silent); day 1 introduces the household, the story and the building. **Night**: *Running low* and, from level 2, *Running high*. **Endings**: a picture for each of the eight edges and for getting through; *Endings found* on the title. **Tools**: `sim.js` reports clear rate and the ending per level and play style, card frequency, repeats within a run and across 5 runs, and cards that never come up; `dominance.js` checks arrows. Save format v3 (a v4 week in progress starts over). |
| v4.4 | 3 Nov 2026 | 9 | New look. **Illustrated scenes:** the voxel renderer is replaced by flat vector illustration drawn in code as SVG (soft shapes, no outlines, short light and dark hatching strokes for texture), after reference illustrations. **Humans again:** the animals are gone; everyone is drawn by one person builder (hair, clothes, poses, what they hold). **Muted palette everywhere:** cream paper, brick, sand, sage, slate blue, charcoal; resource colours muted but still distinct. **No more pixel UI:** rounded corners, soft shadows, smooth icons, pill-shaped chips; motion eased instead of stepped. The scene frames the people (a camera that zooms to who is there) instead of always showing the whole room; sitting people sit side-on at the table. Morning and night themes retinted. Story, rules and numbers unchanged. |
| v4.3 | 3 Nov 2026 | 9 | Readability pass from playtest feedback (counting blocks was a chore). **Health bars:** water, Food, Hygiene and Spirits are continuous bars with the exact number beside them (24/40, 67/100), faint notches every 10, a dark notch at LOW (25; the drinking line at 8 on water), a *Low* tag under 25 and an amber *Low tonight* tag when tonight's drop would take a need under 25; otherwise the foot says what tonight takes (*tonight −28*). Errands and strain show N/max next to their pips. **Animation:** when a value changes, a loss drops fast and leaves a red chunk that drains away (the tile shakes), a gain shows a light chunk the fill grows into; the number counts and the change floats up (−3, +30). Counters bump. Reduced motion turns it off. **Card order:** top to bottom, the two choices with their effects (right under the HUD they change), then the situation, then the scene with the speaker tag; the result card shows what changed before the prose. Same on the dawn emergency and the help screen. **Night:** a dark, starry screen without the HUD: a *Running low* box first (low now, low by tomorrow night, water short for tomorrow; or *Nothing is running low*), then bars that drain by the night's drop with what tomorrow night leaves, strain as big pips, the night scene, *Sleep →*. **Morning:** a warm screen that opens with a sunrise card naming the day (*Day 2 of 7 · Tuesday*) that lifts away, a sunrise header with the weekday big, the brief, then *Today* (deliveries and news); the HUD animates the delivery in. Story, rules and numbers unchanged. |
| v4.2 | 3 Nov 2026 | 9 | Sound. Two music loops made in Suno: *Before the taps* (menu loop: title, quit and epilogue) and *Six cards a day* (in-game loop: brief, cards, night), crossfading over 1.2 s, played with Web Audio so they loop without a gap. One of eight card swipe sounds plays at random on every choice (never the same twice in a row), on release of a swipe or on a tap / key. Sound starts on the first tap or key press (browser rule). A speaker button on the title (bottom left) and in the top bar turns all sound on/off, the pause menu has separate Music and Card sounds toggles, M works anywhere; the setting is remembered (`redukcija.sound`). Files in `audio/`; without them the game plays silent. |
| v4.1 | 2 Nov 2026 | 8 | The family is renamed: Almir (you, father), Sanja (partner), Aida (daughter, 15) and Selma (the youngest, turning 7, now a daughter: every he/his on her cards, the promises, the memories and the epilogue rewritten). Selma's fox wears a little skirt. Save format v2, so older saves start a new week. |
| v4 | 2 Nov 2026 | 7 | New art: a soft-lit voxel renderer (ambient occlusion, sun shadows, lamp light at night, smooth edges) replaces the rough pixel voxels. Every card, the morning brief, the night, the dawn emergency and the epilogue show a scene: one of seven rooms (kitchen, bathroom, children's room, stairwell, street, depot office, river) with the people in it, what they hold, the time of day and the week's state. Everyone is an animal: the family are foxes, Vesna a badger, the officials wolves in suits, the private tower's lions on a billboard, the crew bears. Speaker shown as a name tag on the scene; portraits are busts from the same models. Story and numbers unchanged. |
| v3 | 30 Oct 2026 | 6 | Voxel art drawn in code: busts for the five people and a loudspeaker for the City (with a stepped blink), and the apartment corner on the morning brief, the night summary and the title, built from the week's state. Choices sit in a darker action tray; the result card is itself the Continue button (with a 250 ms guard against double taps). Rebalance: no card has a dominated option on its visible chips; promises and the complaint file show as chips; credits tightened (start 6, +1 a day, prices up Thursday, jobs pay 4). |
| v2.1 | 30 Oct 2026 | 3 | Renamed to Redukcija (subtitle: until the taps return). Placeholder pixel-drop icons for the iPhone home screen (180×180, file + embedded) and browser tab (32×32). Save key `redukcija.save`. Publishing notes for `games/redukcija/` in the Experiments repo. The GDD moved into the folder as `GDD.md`. |
| v2 | 30 Oct 2026 | 2 | Visual pass: light neutral pixel style (notched corners, hard shadows, dithering), one colour + pixel icon per resource, water tank as 40 blocks, need tiles with 10 blocks and LOW state, cost chips (filled gain / framed cost / dashed chance), blinking preview, portrait slots, Barlow Condensed + Atkinson Hyperlegible. |
| v1 | 30 Oct 2026 | 1 | First Claude version: swipe cards with live preview, strain instead of Health, two supply schedules, seeded tanker, tracked promises (sea, Sara), Family memories, complaint file, FT1P-style shell. Rebalanced from 400 simulated weeks per play style. |
| v0 | 25 Oct 2026 | — | ChatGPT concept: design doc 0.1 and a 7-day button prototype, 42 cards. Kept in the folder for reference. |

## Locked decisions

Decisions Mirza has made. Don't reopen them without a new reason from playtest.

| Date | Decision |
| --- | --- |
| 6 Nov 2026 | **The decision is one card** with its bottom split into the two choices (direction B of three: A was Reigns-style choices on lean only, C two rows inside the card). The result plays on the same card. |
| 6 Nov 2026 | **Text budget:** a card's situation is one or two short sentences (aim ~15 words), a response one line (aim ~10 words) or none. The morning is the day, the strip and *Today*; everything else that tells story without a choice is a note. |
| 6 Nov 2026 | **Less reading, same emotion.** Choice labels are four words or fewer. Story that needs no decision goes on decisionless cards (tap to continue) rather than into card text. |

## Pitch & pillars

**One-liner:** The city announces a water reduction for a fixed number of days. Get your household through it while acting as if everything is fine, then do it again with a bigger household.

**Title:** *Redukcija* (from v2.1), subtitled *until the taps return*. Published at `games/redukcija/` in the Experiments repo, next to Fali Ti Jedan Papir.

**Player fantasy:** "I can get us through today, and nobody needs to know what it took." The pleasure is reading four meters at once, keeping them away from both edges, and learning the building: who will help, who keeps score.

**Tone:** warm domestic humour beside frustration and fatigue; satire of a city that is incompetent and corrupt, made of people who are tired, scared and petty rather than evil. *Reigns* rhythm and edges, *Papers, Please* moral friction, *This War of Mine* stakes at a household scale.

### Design pillars (revised in v5)

1. **Every litre has a human purpose.** Water is spent on a shirt, a meal, a bath, a neighbour's tea, never on an abstraction.
2. **Care includes joy, within reason.** Spirits matter, but a household that lives as if nothing's wrong becomes the building's resentment.
3. **People remember.** The household, the neighbours and the people behind the counter.
4. **The system is made of people.** Corruption and incompetence are human: lazy, scared, petty, tired. Nobody is a cartoon, and everyone's life is touched by it.
5. **Act fine.** Face is the price of the city's story, and you pay it every day.
6. **Readable in two seconds.** Four meters, one pictogram per choice, arrows on the chips, exact numbers on the bars.

## World & people

A fictional city with electricity, shops, schools and phones, and a water network that failed after years of corrupt procurement and postponed repairs. Wealthy districts and the private tower (AQUA RESIDENCES, with a rooftop pool) keep their water. The world reaches you through the stairwell, the depot, the radio and the notice on the building door.

### Your household (rolled)

Size is the level: on your own at level 1, a couple at level 2. Names come from a pool of Bosnian names (`NAMES`), looks from the person builder (skin, hair style and colour, clothes, glasses, beard, earrings, all rolled; `rollLook`), so it's never the same household twice. You are always *you* in the text; your partner gets pronouns from their rolled name.

**Story contexts** (one per run, the spine of its arc; `CONTEXTS`). Each has four beats placed in time against the *announced* end (A). When the city extends the reduction, the beats don't move; the water does.

| Context | Beats | The hook |
| --- | --- | --- |
| The wedding | Day 2: your sibling sets the date for the day after the water comes back (a promise). A−2: the outfit needs washing. A: the venue has no water either. A+1: the day itself, only if the city extended | *The wedding was supposed to be after the water came back.* Keep the promise in your good clothes, or miss it for the tanker |
| The exam | Day 1: library or home. A−3: study group or queue. A−1: wash properly or sleep. A: the exam hall | The examiner asks if you're all right |
| Just moved in | Day 1: knock on doors or keep to yourself. Day 3: the building's group chat. A−1: a container on your doormat from the neighbour who likes you most. A: the building meeting decides about you | Neighbours start no warmer than neutral |

**Circumstances** (1 at level 1, 1–2 at level 2; `CIRCS`). They change the rules, and the arrows on the cards always include them.

| Circumstance | Rule |
| --- | --- |
| Top floor | Deliveries 3 smaller; every *carry* choice costs an extra Spirits ▼; a card about the five floors |
| Ground floor | Deliveries 3 bigger; neighbours come asking more often |
| Night shift | +3 Money a night; every *queue* choice costs an extra Spirits ▼; cards after the shift and at the bakery |
| Works from home | +2 Money a night; video-call cards (camera on and smile, or show them the containers) |

### The building (rolled)

Four neighbours, one per archetype (`ARCHETYPES`), each with a name, a floor, a look and a hidden **feeling** about you from −2 to +2. The Home dialog shows it in words (*Holds a grudge*, *Cool towards you*, *Neutral*, *Friendly*, *On your side*), never as a number.

| Archetype | Starts | What they do |
| --- | --- | --- |
| The retired driver | Friendly (+1) | Knows the tankers. Tips you off, asks for a bottle for tea and returns the favour 2–4 days later with interest, borrows money when you look flush |
| The elder upstairs | Neutral | Asks you to carry water up; 2–4 days later vouches for you in the queue (a jar of peppers); shut in during a heatwave |
| The gossip | Neutral | Spreads whatever you said 1–3 days later (fine *or* falling apart, both cost you); talks about you when Face is low; trades tanker times for other people's secrets |
| The spiteful one | Cool (−1) | Jumps the queue; reports you when Water is high (an inspector 1–3 days later); knocks over your container 2–5 days after you called them out; calls you elitist when Spirits are high; hints you're reselling when Money is high |

**Neighbours are woven into the meters, not a meter.** They react to what they can see, which makes the top edges reachable and fair: you see them turning before you hit the edge. Cards with a reaction get much likelier past a threshold (a report weighs 3 above 70 Water; *Nice for some* 3 above 74 Spirits; *People are talking* 2.2 below 38 Face; *Where's it from?* 3 above 75 Money).

### The city (the same people in every run)

The household is new each time; the city is the same (`CITY`). v5.0 gives each of them a side; v5.1 carries their small arcs between runs.

| Who | Role | Their side |
| --- | --- | --- |
| Mr Begić | Clerk, water depot counter A17 | Has no water at home either; his daughter washes her hair with a saucepan. Sells *priority handling*, under a sign that says ALL HOUSEHOLDS EQUAL. Gets petty if you were cold to him |
| Zoran | Foreman, maintenance crew | Digs where the work order says; has a mortgage. With 2+ complaints in your file he signs for the right repair (the end date moves a day closer) |
| Spokesman Kovač | Municipal water service | Believes about half of what he says at the microphone |
| Mira | Tanker driver | Decides which street gets the last 500 litres; on strike because she hasn't been paid since April |
| Lana | Reporter, City TV | Wants a smiling family for the news; would take a crying one |
| City radio | Notices | *Thank you for your patience.* Reassuring, then defensive after an extension, then silent (accordion music, the football, a jingle for AQUA RESIDENCES) |

### How corruption is playable

- **Priority handling** (the clerk): Money ▼▼ for Water ▲▲, or keep your place in line.
- **The extension notice**: *"…extended by 4 days due to unforeseen technical circumstances. Thank you for your patience."* Say it's fine, or say it on the stairs.
- **Ticket closed**, **excess-use fine**, **helpful tips on the radio**, **the tower's open day** (a "symbolic" towel fee, and your photo on their website).
- **The complaint file** (story state, not a meter): documenting the leak, filming the bathroom for TV, heckling the spokesman, writing to the station… With 2 or more, the crew can fix the right pipe and a hearing becomes possible; both move the end date a day closer.

### Narrative boundaries

No graphic illness, no child death, no sudden fatal outcomes. Every ending is social: you go to relatives, the household splits up for a while, you're reported, frozen out, put on a billboard, pulled into the scheme. Seeking help is written as a legitimate choice, not a failure.

## Core loop

A run is one reduction: about 7–9 played days, 35–45 cards, 15–25 minutes.

### A day from morning to night

1. **Morning.** A sunrise card names the day (*Day 3 of 7 · Wednesday*). Under the header, a strip of the reduction's days: past, today, the rest; days the city added are hatched red. Then *Today*: an official notice if the end date changed (red frame, *Thank you for your patience* stamp), the building delivery (*confirmed*, with arrows) or *none*, the event if one is on, and the radio. On day 1 an intro panel shows the notice, your household, the story context, the circumstances and the building's four neighbours.
2. **Five cards.** First any story beat that's due, then any consequence scheduled for today, then the bag (see *The deck*). A skipped beat or consequence comes on the next played day.
3. **Night.** The household uses water (−8 alone, −10 as a couple, −3 more in a heatwave), Spirits and Money tick down, and Face drifts a quarter of the way back to 50. Promises due by now and still open break (Spirits −15). If a meter is on an edge, the run ends in the morning; if this was the last day, the water comes back.

### The reduction

- **Announced:** 5 days at level 1, 7 at level 2. Shown in the top bar (*Back after Sun*) and on the morning strip.
- **Extensions:** planned when the run starts, announced in the morning. About 4 runs in 5 get one, 1–2 days before the promised end (+2–3 days at level 1, +3–4 at level 2). At level 2, about a third also get a second one 2–3 days after the original end (+2–3). A burst main can add 1–2 days more. Capped at 9 days (level 1) and 12 (level 2). The proposal's open question is answered *usually, not always*: you can never be sure the city keeps its word.
- **Pulled in:** the right repair (crew + 2 complaints) and speaking at the hearing each move the end a day closer.
- **Getting through:** reaching the night of the last day, however far it moved, is a clear: the epilogue, then the next level.

### Time jumps

From day 4, every other night, if at least 3 days are left: one day passes (two if 6 or more are left), never past a story beat or a scheduled consequence, never onto the last day. Skipped days cost a full night each and still bring their deliveries; the night screen says *Tonight and the next day pass* and the bars drain by all of it, and the next morning opens with a line (*A day passes. The radio says less than it did.*).

### Events

At most one at a time; from day 2 each morning has a 1 in 4 chance of starting one (`EVENTS`).

| Event | Days | Effect |
| --- | --- | --- |
| Heatwave | 3–4 | Water −3 more each night; sticky-heat, can't-sleep and elder-in-the-heat cards come up |
| Tanker strike | 2–3 | No building deliveries; Mira on the picket line |
| Election week | 3 | The city wants you to look fine: the spokesman, the reporter, a candidate's bottled water with his face on it |
| Burst main | 1 | Water down Titova street (fill everything, or help close it off); may extend the reduction |

### Meters

All four use the same scale and the same bar. Both edges end the run; the top edges only from level 2 (the proposal's open question 5). The night screen warns at 20 and below (*Low*) and at 80 and above (*High*, from level 2), and when tomorrow night would take a meter to 20 or below (*Soon*).

| Meter | What it means | Goes up | Goes down | At 0 | At 100 (level 2+) |
| --- | --- | --- | --- | --- | --- |
| **Water** | What's in the containers | Deliveries, queues, tankers, neighbours, the leak, priority handling | Washing, cooking, flushing, sharing; every night | **Dry.** You go to relatives | **Hoarder.** Reported; an inspector "redistributes" your containers to the tower's pool |
| **Spirits** | How the household is holding up | Meals, company, small comforts, kept promises | Skipping things, carrying, queueing, rows; every night; a broken promise −15 | **Falling apart.** The household splits up to stay with relatives | **Too precious.** Home is so nice it looks like nothing's wrong; the building freezes you out |
| **Face** | How well you keep up "everything is fine" | *Say it's fine* (smile), looking clean, paying for appearances | *Say how it is* (complain, record), looking rough, scenes in the stairwell | **Cracked.** You lose it on camera at the depot and drop to the bottom of the list | **Poster family.** Your smiling face on the EVERYTHING IS FINE billboard, over a dry tap |
| **Money** | Shop food, containers, fees, favours | Work, overtime, skipping lunch, your mother | Buying, fees, gifts, loans; every night | **Broke.** Nothing left to buy water with | **Profiteer.** Everyone assumes you're reselling, so the clerk pulls you into it |

**Face** is the theme as a mechanic (*Obraz* in the Bosnian version, v5.2). Many cards ask one question in different clothes: *say it's fine* (Face ▲, at a cost to Spirits or Money) or *say how it is* (Face ▼, but something real happens: a complaint filed, help offered, a neighbour who trusts you). Food and Hygiene live inside these: skipping lunch costs Spirits, the last clean shirt costs Water or Face.

## The decision card

One speaker, one short situation, two things you could *do*. Top to bottom:

1. **The speaker:** a band coloured by place (home sand, stairwell sage, street pale blue, office grey; the place name sits top right on wider screens) with their portrait (a head-and-shoulders crop from the person builder), the eyebrow (time of day and *2 of 5*, or the story context for a beat), their name and role (neighbours: archetype and floor).
2. **The title and the text.** Name slots (`{partner}`, `{driver}`, `{spiteful.he}`…), 1–3 variants on some cards, and lines that only appear when a story tag is set (what you told the gossip, whether the city extended, how many complaints you've filed).
3. **Two choices, as the card's two bottom halves** (v5.0.1): the left choice on the left half with a ←, the right choice on the right half with a →, each with its label (four words or fewer) and **arrow chips**: a gain filled with the meter's colour (*Water ▲*), a cost white and framed (*Spirits ▼▼*). Promise chips in amber (*Promise*, *Keeps promise*), *Breaks promise* in red, *End date −1* in slate.

**The 16 pictograms** (`PICT`): pour · boil · wash · cook · queue · carry · share · refuse · smile ("it's fine") · complain · record · pay · hide · knock · wait · leave.

- **Swipe, tap, hover, keys** as before. Leaning or hovering previews on the HUD: the bars that would move get a frame, an arrow badge by their name and a soft band over the range the meter could land in (6–10 or 12–18 away), so you see roughly where it goes without an exact number.
- **Swipe or tap a half.** Leaning or hovering darkens that half and fades the other. The pictogram of each action shows on the result and in *This run*, not on the choice.
- **After the decision:** the same card: band and portrait, the choice with its pictogram, the exact changes as chips (the HUD bars animate the same numbers), notes for promises and end-date changes, then the response. The bottom strip where the choices were says *Tap to continue* (*What happens next* if a meter hit an edge, *Put the day to bed* after the last card); the whole card is the button.
- **No disabled options:** with two-edged meters every option is always allowed; the edges are the limit.
- **Arrows, to try:** the first playtest has to check that a bad outcome still feels traceable to the choices.

Cards are data (`card()` / `opt()` in `content.js`): id, family, speaker, place, title, text, two options, and `when` (a condition), `w` (weight, a number or a function of the state), `cd` (cooldown in days, default 4), `once`, `boost` (weight during an event). An option has a label, a pictogram, arrows, a response and extras: `tag`, `inc` (counters such as the complaint file), `disp` (neighbours' feelings), `sched` (a consequence card 1–5 days later), `mem` (what someone remembers), `promise` / `keep` / `brk`, `end` (moves the end date).

## The deck: Reigns' bag

Each morning the game builds the day's five cards:

1. **Story beats** due today (up to 2), placed in time when the run starts.
2. **Consequences** scheduled by earlier choices for today (up to 3 cards so far): the driver's favour, the elder's good word, the gossip's story, the spiteful neighbour's revenge and their inspector.
3. **The bag** fills the rest: every card whose conditions hold, that isn't on cooldown and isn't a one-off already seen, drawn by weight. A card already seen this run weighs 0.6 as much; partner cards weigh a little more at level 2; an event lifts its cards to their boost weight. The bag cards are shuffled; beats lead the day.

| Family | Cards | Examples |
| --- | --- | --- |
| Routine | 23 | The bucket, one clean shirt, coffee or the café, your mother calls, the colleague who asks how you're managing, overtime, the gym with showers; with a partner: hair, lentils, the tally, a basin bath, the laundry mountain |
| Circumstance | 6 | Camera on; containers behind you on the call; after the night shift; yesterday's bread; five floors; by the entrance |
| Neighbour | 19 | 14 in the bag, 5 only when scheduled (see *The building*) |
| City | 16 | Priority handling, his side, lost in the system, the leak, the wrong valve, the thirsty crew, the last 500 litres, the microphone, the evening news, ticket closed, helpful advice, the tower's open day, excess use, the hearing, the extension, the new rota |
| Event | 3 | On strike, a bottle with a face, water down the hill |
| Story beats | 12 | Four per context |

**What happened to the v4 cards.** v5.0 has no children in the household, so Selma's sea, Sara's visit and Aida's recording wait for levels 3–4 (v5.1), as the proposal plans. Much of the rest is in the pool in new clothes: the porridge pot, the shirt, the lentils, the laundry geography, the hair wash, the shared tally, Vesna's kettle and tanker tip (now the retired-driver archetype), the priority fee, the leak behind the fence, ticket closed, the wrong valve, the microphone. Almir, Sanja, Aida and Selma are in the name pool; they're the household in the first level-4 run (v5.1).

## Promises, memory and the complaint file

**Promises** (story state with a due day): v5.0 has one, *Be at the wedding* (made on the wedding's first beat, due the day after the promised end). If the city extends the reduction, the wedding day comes up as a card: go and smile for the photos (keeps it) or miss it for the tanker (breaks it). Still open on its due night it breaks (Spirits −15). Open promises show as a badge on the Home button and as amber chips on the choices that make or keep them.

**Memories:** choices can leave a line with a person (*You filled his bottle for tea*, *You carried her water up the stairs*, *You brought the crew water*). The Home dialog lists them under each person.

**Tags** change text and unlock cards: what you told the gossip, whether you were cold to the clerk, whether the crew saw the right pipe, whether the city extended, whether you're in the group chat.

**The complaint file** is a counter, not a meter: 2 or more makes the foreman sign for the right repair, opens the hearing, and adds a line to the epilogue.

## Endings

**Eight edge endings** (`EDGES`), each with a title, two paragraphs that use the run's people (the spiteful neighbour reports you, the gossip tells everyone where you went, your partner goes to their sister) and a picture from the illustrated scenes: Dry (leaving down the stairs with the empty containers), Hoarder (the inspector in your kitchen), Falling apart, Too precious (the spiteful one pointing, the gossip filming), Cracked (shouting at the depot, the reporter's phone), Poster family (your face on the EVERYTHING IS FINE billboard), Broke, Profiteer (counter A17, an envelope). Found endings are listed on the title (*Endings found · n of 8*).

**Getting through:** *8 days. They said 5.* (or *They kept their word, this time.*), a picture of the household at the table with the neighbour who likes you most waving, then: the tap coughing back to life, the story context's epilogue (the wedding photos, the exam result, your name on the group chat), the repair or the complaint file, the neighbours who are on your side, and the spiteful one if they still hold a grudge. Below: the four meters, days (announced, and how many times extended), decisions, promises. Then *Level 2 →*, or at the top of this build *Play level 2 again*.

## Presentation & UX

Portrait phone first, one screen; landscape at 900 px and wider moves the HUD into a left column beside the card.

### Screen

- **Top bar:** day tile (*3/7*: today out of the current end date, the weekday, *Back after Sun*, with *they say* once the city has extended); Home button (badge = open promises); sound; pause.
- **HUD:** four bars in a 2×2 grid (a column in landscape), each with the exact number (*58/100*), a dark notch at 20, and a hatched danger zone at the bottom 20%; from level 2 also a notch at 80 and a zone at the top. The foot says what tonight does (*tonight −8*, Face *drifts to 50*), or a *Low* (red) / *High* (amber) tag. Changes animate as in v4.3 (a loss leaves a red chunk that drains, a gain fills in, the number counts and floats up).
- **Stage:** five progress ticks and one card: portrait band, title, text, and the two choices as its bottom halves (v5.0.1; no tray, no hint line).
- **Morning and night** keep their v4.3 looks. The morning adds the reduction strip and the official notice; the night has *Running low · running high* and the overnight bars, and the time-jump line when days pass.
- **Pictures:** only the title (a rolled household under the AQUA RESIDENCES billboard) and the endings have illustrated scenes now. Cards use portraits and pictograms, so each new card costs only text.

### Interaction

- Touch: swipe the card, or tap one of its halves. Mouse: hover a half to preview, click to choose.
- Keys: ← / → or 1 / 2 choose, Enter continue, F household, H this run so far, Esc or P pause, M sound on/off.
- No timers, no fast input anywhere. Saves after every decision; *Replay this morning* restores the day's start (the run's dice are part of the save, so it replays the same).

### Art and sound direction

Since v4.4: a muted, warm illustrated style, after two reference illustrations (winter people and a snowy town). Cream paper ground, soft rounded panels with gentle shadows, no outlines, no pixel look (v2 to v4.3 had notched corners, hard offset shadows and dithering). The morning screen is warmer and the night summary is the one dark screen (slate blue), so the day has a rhythm. One colour and one smooth icon per resource. Readable fonts, never pixel fonts: Barlow Condensed for numbers and labels (as in FT1P), Atkinson Hyperlegible for story text.

**Palette (`PAL` in `ui.js`):** cream #f0eee8, brick #b6604e, sand #c4ad7f, beige #e5cfb3, sage #7c9b9c, pale blue #d5e3e4, mint #c1dacf, teal #6f9a93, slate blue #5a8aa6, mustard #cfa349, charcoal #4a4a4a, grey #a8a8a6.

**Illustrated scenes (since v4.4), drawn in code.** No image files and no libraries: every scene is an SVG built from shapes. It replaces v4's voxel renderer (a small 3D engine); Since v5.0 the per-card scenes (v4's `SCENES`, `BRIEFS`) are gone: the renderer draws the title, the eight edge endings and the epilogue (`endScene` in `ui.js`), and every portrait. Rolled people are registered in `CAST` under their id for the run (`castSync`); the billboard takes any person and any slogan (`bbWho`, `bbText`), which is how *Poster family* puts your face on it.

- **Texture:** flat fills plus short hatching strokes, light on darker colours and dark on light ones, from a few shared SVG patterns (`ilDefs`), the way the references use brush strokes on coats, roofs and trees. Walls get a sparser version.
- **Stage:** front-on, 860×400. The back wall (or the street front) above the floor line; positions from the scene data become screen position, floor line and a little scale by depth (`SX`, `FY`, `SC`).
- **Camera:** each scene frames the people in it (wider when they stand apart, never cutting a head), so faces read on a phone. The title shows the whole street.
- **People** (`person()` and `CAST`): one builder for everyone, front-on with the face turned toward where they look. Four sizes (adult, teen, child, big), hair styles (short, long, bob, wavy, pigtails, bun, bald), clothes (sweater, turtleneck, hoodie, coat, puffer, suit, cardigan, tee, skirt), extras (beard, glasses, earrings, headphones, hats, scarf, hi-vis, tape measure, pencil), poses (stand, hold, sit, wave, point) and things they hold (`ITEMS`: the pan, the blue bowl, a container, the phone, the folder, the cake…). Sitting at the table they sit side-on on a chair; Selma sits in the bath on Saturday.
- **Rooms** (`ROOMS`): kitchen, bathroom, the children's room, the stairwell (with the landing), the street (the depot, the tanker, the leak, the fence, the trench, the loudspeaker, the standpipe, the river, the AQUA RESIDENCES billboard), the depot office. The containers by the kitchen door fill and empty with the Water meter. Windows show red roofs and firs across the street.
- **Time of day:** a colour wash over the scene (warm morning and afternoon, golden evening, blue night) and lamp glow in the evening and at night; the sky in the windows changes too.
- **Living:** everyone blinks now and then (open and closed eyes are both drawn, CSS swaps them on a slow loop, each person on their own beat); reduced motion turns it off.
- **Cost:** a scene is a string of SVG, built once and cached; portraits are head-and-shoulders crops of the same drawing.

The kitchen and the street are the most finished rooms; the bathroom, the children's room, the stairwell and the office are first passes. A second styling pass is planned once the gameplay settles. Official messages use a colder visual language.

**Portraits and pictograms (since v5.0).** A card's picture is the speaker's head and shoulders, cut from the same person builder, on a band coloured by place, and a pictogram for each choice: 16 line icons drawn in code (`PICT`), in the ink colour, inverted when the choice is hovered. The asset budget for a new card is text only.

**Sound (since v4.2).** Music is quiet and domestic: warm lo-fi chiptune with felt piano, nylon guitar and accordion, a light Balkan folk turn, never epic. Both tracks were generated in Suno (prompts below) and live in `audio/`; the code is the `sound` section of `ui.js` (`MUSIC`, `SWIPES`, `Sound`).

| Where | File | Length | Volume | Notes |
| --- | --- | --- | --- | --- |
| Title, quit, epilogue | `menu-before-the-taps.mp3` *Before the taps* | 4 min 55 s | 0.45 | Second take: the first 20 s loop didn't loop cleanly. A full track that fades out at the end and starts soft, so it loops whole. Trimmed 0.25 s of silence at the start, converted from Opus (.m4a, which Safari plays unreliably) to MP3 128 kbps |
| Morning, cards, night | `game-six-cards-a-day.mp3` *Six cards a day* (84 bpm, A minor) | 4 min 52 s | 0.3 | Lower, because you're reading. Trimmed: 0.5 s of lead-in and 2 s of silence at the end removed, 128 kbps |
| Every choice | `card-swipes.mp3` | 8 sounds in 7.6 s | 0.55 | One file cut into eight in code (`SWIPES.cuts`); random, never the same twice in a row |

Tracks crossfade over 1.2 s when you move between the title and the week. Sound pauses when the tab is hidden. Browsers allow sound only after the player touches the page, so the title is silent until the first tap or key. The files download and decode while the title is showing, so the music starts on that first tap (about 9.5 MB in all, mostly the two long tracks). Opened from disk in Chrome, the files can't be fetched for Web Audio, so plain `<audio>` tags play them instead (the loop may have a tiny gap there).

Suno prompts (Instrumental on; exclude *vocals, epic, orchestral, drop, heavy drums, distortion*):
- *Before the taps*: gentle lo-fi chiptune lullaby loop, warm soft square-wave melody, felt piano, nylon guitar plucks, quiet accordion pad, faint tape hiss, soft water-drip percussion, bittersweet and hopeful, kitchen at dawn, light Balkan folk inflection, sparse, instrumental.
- *Six cards a day*: minimal ambient chiptune bed loop, muted square-wave pulse, pizzicato plucks, soft clock-tick percussion, faint water-pipe hum, warm detuned keys, quiet domestic tension, steady and unobtrusive, no lead melody, background for reading and decisions, instrumental.

Still to come: the hollow cough of the tap, containers on stairs, a radio murmuring, a kettle; a quieter or different track for the night summary and the epilogue.

### Meter colours and icons

The same colour and icon on bars, chips, summaries and rules (`PIX`, `RCOL` and CSS variables, so a change in one place follows everywhere).

| Meter | Colour | Icon | Variable |
| --- | --- | --- | --- |
| Water | Slate blue #4f86a6 | Drop | `--water` |
| Spirits | Dusty rose #b85a6b | Heart | `--spirits` |
| Face | Muted plum #7a668f | A smiling face | `--face` |
| Money | Ochre #a5873b | Coin | `--cash` |
| Promises | Amber #b5813f | Star | `--promise` |
| End date | Slate #6b7984 | Calendar | `--file` |

**Bars:** filled with the meter's colour on a light tint; hatched danger zones at the edges; the frame turns red when low and amber when high.

**Arrow chips:** icon + ▲ / ▲▲ / ▼ / ▼▼. A gain is filled with the meter colour and white text; a cost is white with a frame and arrows in the meter colour. Direction, count, fill and colour each carry the meaning, so it reads without colour too.

### App icon and publishing

Placeholder icon: a white pixel water drop on a blue tile with a hard shadow, for the iPhone home screen (`apple-touch-icon.png`, 180×180, also embedded) and the browser tab (32×32, embedded). Replace both from the asset sheet. The game is published at `games/redukcija/` in the Experiments repo on GitHub, next to Fali Ti Jedan Papir: copy `index.html`, `apple-touch-icon.png` and the `audio/` folder there after committing in the Redukcija folder.

### Accessibility

Every number has a label; low and high values are coloured and say so in text (*Low*, *High*, *Soon*). Arrow chips have spoken labels (*Water down a lot*). Reduced motion turns off the card animations, the bar animations and the morning card. Bars always carry the exact number, and low states say so in words (*Low*, *High*), not only in colour. Full keyboard play, visible focus. Every choice works without swiping. Sound is never needed to play: every sound has an on/off, and the game works silent.


## Balance & playtest

Numbers are tuned against simulated runs: the game's own content and engine run headless (`node tools/sim.js index.html 400`), 400 runs per level and play style, each with its own rolled household, context, circumstances, rota, extensions and events. Target: a careful player usually gets through and learns why when they don't; any one-track style (always fine, always honest, hoard, spend) hits an edge within a few days; random play sometimes gets through at level 1 and rarely at level 2.

**v5.0** (400 runs per level and style):

| Level | Style | Got through | Ended by | Days played / story days | Extensions |
| --- | --- | --- | --- | --- | --- |
| 1 · single | Careful (keeps every meter away from its edges, counting tonight's drain) | 95% | Dry 3%, Broke 2% | 6.8 / 7.0 | 0.9 |
| 1 | Steady (keeps every meter near 50) | 85% | Dry 13%, Broke 2% | 6.7 / 6.9 | 0.9 |
| 1 | Random | 21% | Broke 29%, Dry 24%, Falling apart 23%, Cracked 5% | 4.6 / 5.2 | 0.8 |
| 1 | Always "it's fine" (most Face) | 1% | Falling apart 45%, Dry 44%, Broke 10% | 2.9 / 3.7 | 0.6 |
| 1 | Always honest (least Face) | 0% | Cracked 97% | 2.0 / 3.0 | 0.4 |
| 1 | Hoards water | 0% | Falling apart 57%, Broke 42% | 2.5 / 3.3 | 0.5 |
| 1 | Spends money | 2% | Broke 85% | 2.9 / 3.7 | 0.6 |
| 2 · couple | Careful | 69% | Dry 22%, Broke 8%, Falling apart 1% | 8.2 / 9.5 | 1.1 |
| 2 | Steady | 57% | Dry 40%, Broke 4% | 7.8 / 9.0 | 1.0 |
| 2 | Random | 6% | Dry 29%, Broke 29%, Falling apart 15%, Too precious 10%, Hoarder 9% | 4.0 / 5.1 | 0.5 |
| 2 | Always "it's fine" | 0% | Poster family 57%, Dry 25%, Falling apart 14% | 2.1 / 3.1 | 0.1 |
| 2 | Always honest | 0% | Cracked 60%, Hoarder 21%, Too precious 16% | 2.1 / 3.1 | 0.1 |
| 2 | Hoards water | 0% | Hoarder 51%, Broke 28%, Falling apart 21% | 1.9 / 2.8 | 0.1 |
| 2 | Spends money | 0% | Broke 69%, Poster family 12%, Hoarder 9% | 2.2 / 3.1 | 0.1 |

**Variety:** every card in the pool came up at least once; a card repeats within a run about once per run (cooldowns allow it after 4 days). Across runs the pool is still small: in the fifth run in a row at the same level, about 90% of the cards were seen in the four before. That is what v5.1 (~150 cards) and v5.2 (~200+, recent-run weighting, more variants) are for.

**What the simulation says to watch:**

- **Level 2 random play gets through 6% of the time.** The top edges add four ways to lose at once. If playtesters find level 2 a wall, soften the top edges (start them at 105, or warn earlier) before touching the drains.
- **Water is the careful player's usual failure** (Dry 22% at level 2), mostly in runs extended twice. That's the intended pressure; check it feels fair because the extension was announced.
- **Profiteer never happens in the simulation,** and Poster family only for a player who always says it's fine. Money income is low by design; more paid work (and a water-reselling temptation beyond the night shift) belongs in v5.1.
- **Least seen:** the loan card and *Where's it from?* (they need Money above 58 and 65), the spiteful one's *Nice for some*.

**Arrow check:** `node tools/dominance.js index.html` lists any card with identical arrows on both options, an option that does nothing, or an option that's ▲-or-equal on every meter (a warning only, since the top edges make "more" risky; a promise counts as a cost). v5.0 prints none.

### What the first playtest must answer (5–8 players)

- [ ] **Arrows:** does a bad outcome still feel traceable to their choices? Do they want the numbers back?
- [ ] Do they understand that both edges are dangerous before it happens to them at level 2?
- [ ] Do they notice the neighbours turning (a report, *Nice for some*) before they hit a top edge?
- [ ] Does an extension feel like the city's fault (the joke), or like the game cheating?
- [ ] Can they say what *Face* means without reading the rules?
- [ ] Two runs at the same level: do they feel like different households?
- [ ] Do the time jumps read, or do they feel they lost a day?

Track per player: level, ending, days played and story days, extensions, the meter that came closest to an edge each night, every choice.

## Open questions

- [x] **Cards per day:** 5 (decided for v5.0).
- [x] **How often the city extends:** usually, not always (about 4 runs in 5).
- [x] **Which edges at level 1:** the bottom edges only; the top edges from level 2.
- [x] **Time jumps:** fixed for now (every other night from day 4, never over a story beat). Events could drive them later.
- [x] **Failing a level:** replay the same level with a new household (v5.0). Dropping a level stays an option if level 2 proves a wall.
- [ ] **The recurring city people:** how much do their arcs carry between runs (v5.1), and is there an ending where the system itself shifts a little?
- [ ] **Arrows vs numbers:** to confirm in the playtest.
- [ ] **Neighbour feelings:** hidden (words only in the Home dialog). Is that enough to see them turning, or should their portraits show a mood?
- [ ] **Children:** levels 3–5 need child and teenager cards (Selma's sea, Aida's recording, Sara's visit, school, PE kit) and narrative boundaries for them.
- [ ] **Tone.** The balance of satire and domestic drama, now with eight endings that are mostly bleak-funny.
- [ ] **Sound.** Is one in-game track enough for a 20-minute run? A sting for an extension notice?
- [ ] **Languages.** FT1P ships in five; *Obraz* and the Bosnian strings are planned for v5.2, so string extraction should happen before the pool grows.

## Reference

- `PROPOSAL-v5.md` in this folder: the full v5 plan (v5.0 built; v5.1 the ladder, v5.2 depth).
- **Code:** `index.html` (one file). In the script: `content.js` (names and looks, archetypes, the city, levels, contexts, circumstances, events, the radio, the cards, the endings), `engine.js` (rolling a run, the bag, choices, nights, time jumps, the ladder; no drawing, so the tools can run it), then the illustrations, icons, `ui.js` and sound.
- **Screenshots:** `screenshots/v5-*.png` (title, morning, card, preview, result, night, endings, landscape); older builds in `screenshots/v4*.png` (kept out of git, like other PNGs).
- **Tools:** `tools/sim.js` (balance simulation) and `tools/dominance.js` (arrow check).
- **ChatGPT v0:** `Until_the_Taps_Return_Game_Design.docx` and `Until_the_Taps_Return.html` in this folder.
- [Fali Ti Jedan Papir — Game Design Document](https://claude.ai/artifact/8WpSt7vgQN6vmJ6nwFRLmr): the format, shell and release process this project follows.
- Games: *Reigns* (two-choice cards, two-edged meters, the bag), *Papers, Please* (moral friction at a desk), *This War of Mine* (care under scarcity), *Florence* (small domestic moments as play).

# Redukcija — Game Design Document

Last updated 30 Oct 2026 · Mirza Sadovic

This file is the game design document. It lives next to the game in the Redukcija folder and is versioned with it in git. **Every change to the game also updates this file:** the current-build section, the change log, and any section the change touches.

## Prototype v2.1 — current build

The [playable prototype](https://claude.ai/artifact/WP5M62RnJrT7uRsGGmAp2r) is the source of truth for how the game plays; this doc describes it and the direction beyond it. Code lives in this folder (`index.html`, one file), tagged `v2.1` in git, build 3.

**The run:** one week, Monday to Sunday, six decision cards a day (42 in all). You are Samir. Each card is one situation with two choices; you swipe the card left or right, tap a choice, or press ← / →. Every cost shows before you commit.

**Water:** the tank holds 40. Start at 24. Every night 8 go to drinking and essential care, so cards can only spend "free water" above 8. Building deliveries are confirmed the night before. One week rolls one of two supply schedules (*The usual promises* or *A dry middle*). The Wednesday depot tanker is *expected*, about even odds, decided at the start of the week so reloading never changes it.

**Needs:** Food, Hygiene and Spirits, 0–100, all start at 65. Every night: Food −28, Hygiene −20, Spirits −18, after the day's cards.

**Strain** (replaces v0's Health): each need under 25 at bedtime adds 1 strain; all three at 50 or more removes 1. At 3 strain (or Food at 0 two nights running) the family needs help: the first time they go to the community centre (+25 Food, +25 Hygiene, +10 Spirits, strain back to 1); the next time they stay with relatives and the week ends.

**Credits and errands:** start with 8 credits; Lejla's repair work adds 2 each morning from Tuesday. 2 errands a day for queues, paid jobs and civic work.

**Promises:** two so far. Niko's little sea (made Monday, due Sunday) and Sara's visit (made Thursday, due Saturday). Kept or broken on a card; still open on the due night means broken, −8 Spirits.

**Complaint file:** documenting the leak, re-filing the closed ticket and sharing Iman's recording each add 1. With 2 or more, walking the crew to the leak on Saturday gets the local valve repaired.

**Shell (same as Fali Ti Jedan Papir):** title screen (Continue / Begin Monday / How to play / Quit) with `v2.1 · build N` bottom right; pause menu (Resume, How to play, This week so far, Replay this morning, Save and go to title, End this week); Family dialog with promises and what each person remembers; autosave after every decision.

**What changed from the ChatGPT concept (v0):**

| Area | v0 (ChatGPT) | Now |
| --- | --- | --- |
| Decision input | Buttons in a desktop column | Swipeable card, portrait first; buttons and keys too |
| Cost preview | Text under each button | Drag or hover previews the change on the tank and need tiles |
| Health | Hidden-ish 0–100 meter fed by Food and Hygiene | Strain, 0–3 pips; Spirits counts too |
| Supply | One fixed schedule; forecast as prose | Two schedules; confirmed / expected / none tags |
| Uncertain tanker | Always missed | Seeded, about even odds, shown as odds |
| Promises | A flag | Tracked with due day, kept/broken, badge on Family |
| Memory | Flags only | Family dialog lists what each person remembers |
| Shell | Intro page | Title, rules, pause, version stamp, replay morning |
| Look | Editorial serif, text-only costs | Light neutral pixel style, one colour + icon per resource, cost chips |
| Numbers | Food −20 / Hygiene −15 / Morale −10, start 30 water, 12 credits | Food −28 / Hygiene −20 / Spirits −18, start 24 water, 8 credits, smaller deliveries |

### Change log

| Version | Date | Build | What changed |
| --- | --- | --- | --- |
| v2.1 | 30 Oct 2026 | 3 | Renamed to Redukcija (subtitle: until the taps return). Placeholder pixel-drop icons for the iPhone home screen (180×180, file + embedded) and browser tab (32×32). Save key `redukcija.save`. Publishing notes for `games/redukcija/` in the Experiments repo. The GDD moved into the folder as `GDD.md`. |
| v2 | 30 Oct 2026 | 2 | Visual pass: light neutral pixel style (notched corners, hard shadows, dithering), one colour + pixel icon per resource, water tank as 40 blocks, need tiles with 10 blocks and LOW state, cost chips (filled gain / framed cost / dashed chance), blinking preview, portrait slots, Barlow Condensed + Atkinson Hyperlegible. |
| v1 | 30 Oct 2026 | 1 | First Claude version: swipe cards with live preview, strain instead of Health, two supply schedules, seeded tanker, tracked promises (sea, Sara), Family memories, complaint file, FT1P-style shell. Rebalanced from 400 simulated weeks per play style. |
| v0 | 25 Oct 2026 | — | ChatGPT concept: design doc 0.1 and a 7-day button prototype, 42 cards. Kept in the folder for reference. |

## Pitch & pillars

**One-liner:** Manage a family's limited water through a week of everyday decisions, keeping them fed, clean and in good spirits while the city keeps promising the supply is back tomorrow.

**Title:** *Redukcija* (from v2.1), subtitled *until the taps return*. Published at `games/redukcija/` in the Experiments repo, next to Fali Ti Jedan Papir.

**Player fantasy:** "I can get us through today. But what am I asking everyone to give up?" The pleasure is finding resourceful compromises, learning the family's personalities, and having enough left to be generous when it matters.

**Tone:** warm domestic humour beside frustration and fatigue. *Reigns* rhythm, *Papers, Please* moral friction, *This War of Mine* stakes at a household scale, without the spectacle.

### Design pillars

1. **Every litre has a human purpose.** Water is always tied to something recognisable: a school shirt, a favourite stew, a bowl of sea for a birthday. No abstract trades.
2. **Care includes joy.** Keeping everyone alive is the floor. Spirits count toward strain, so play and comfort sometimes deserve the water they cost.
3. **People remember.** Promises have due days; small kindnesses and brush-offs show up later in dialogue and in the Family dialog.
4. **The crisis is political.** Scarcity comes from neglected maintenance, diverted tankers and a fee for priority. Saving water helps the family cope; it never excuses the institutions.
5. **Readable in two seconds, honest about costs.** Every cost shows before you commit. Uncertain outcomes are labelled with their odds and fixed in advance, never rerolled.

## World & household

A fictional near-future city with electricity, shops, schools and phones, and a water network that failed after years of corrupt procurement and postponed repairs. Residents live around tanker schedules and contradictory notices; wealthy districts and a new private complex get dependable service. The world reaches the apartment through the kitchen window, the stairwell, the radio and the building chat.

### Cast

| Person | Role | Wants | What they bring |
| --- | --- | --- | --- |
| Samir | You, father | A plan that holds | Used to check bus timetables; now checks tanker schedules |
| Lejla | Partner, 38 | To be a partner, not a line in your budget | Repairs clothes (+2 credits a day); dry humour; challenges going it alone |
| Iman | Daughter, 15 | Privacy, clean clothes, to be trusted | Records the city on an old phone; her recording can become evidence |
| Niko | Son, turning 7 on Sunday | A little sea for his birthday | Keeps the list WHEN IT COMES BACK; invents games that need no water |
| Vesna | Neighbour, fourth floor | Everyone to be all right | Retired bus driver; knows the routes, the queues and who needs checking on |
| The city | Municipal water service | Your patience | Notices, a priority fee, a crew sent to the wrong valve |

### How corruption is playable

- **The priority fee** (Tuesday): pay 5 credits for 12 water now, or keep your place on the standard list. Paying works today; the epilogue remembers.
- **The diverted tanker** (Wednesday): when it doesn't come, it went to a private complex.
- **Ticket closed** (Thursday): the building's complaint is marked resolved while the tap is dry.
- **Collective action** builds the complaint file and can win a bounded local repair. It never asks the family to become heroes to earn a humane ending.

### Narrative boundaries

No graphic illness, no child death, no sudden fatal outcomes. A family that can't cope gets help at the community centre, then stays with relatives. Seeking help is written as a legitimate choice, not a failure.

## Core loop

A day is a morning brief, six cards and a bedtime summary; a run is seven days, about 20 minutes.

### A day from morning to night

1. **Morning brief.** The delivery arrives (stopping at the tank's 40, overflow shown). Tags list what's known: *confirmed* deliveries and events, *expected* ones with odds, *none*, and a *radio* line from the city. Lejla's work adds 2 credits. Errands reset to 2.
2. **Dawn emergency** (only if water is under 8). Buy a container (−3 credits, +10 water), ask the residents (+8 water; free the first time, −4 Spirits after), or go to relatives (ends the week).
3. **Six cards:** morning, midday, afternoon, evening, night. Usually one meal, one wash, one supply or work errand, one family moment, one neighbour or civic card, one night conversation.
4. **Bedtime.** 8 water for drinking, needs decay once, strain updates, promises due today break if still open. The summary shows before and after for each need and tomorrow's confirmed delivery.

### Resources

| Resource | Range | Start | Goes up | Goes down |
| --- | --- | --- | --- | --- |
| Water | 0–40 units | 24 | Deliveries, queues, tankers, neighbours | Cards (free water only), 8 every night |
| Food | 0–100 | 65 | Meals | −28 every night |
| Hygiene | 0–100 | 65 | Washing, laundry | −20 every night |
| Spirits | 0–100 | 65 | Play, company, kept promises | −18 every night; broken promises −8 |
| Credits | 0+ | 8 | Paid jobs, +2 a day from Tuesday | Cold meals, cake, priority fee, emergency water |
| Errands | 2 a day | 2 | Reset each morning | Queues, jobs, civic work |
| Strain | 0–3 | 0 | +1 per need under 25 at bedtime | −1 when all three needs end at 50+ |

### Water accounting

The water tile shows free water as the big number, the 8 kept for drinking beside it, and the tank as 40 blocks. Cards can never spend the reserve. There are no hidden deductions: the only automatic use is the 8 at bedtime. Water past 40 spills: the preview stops at the top of the tank and the result says how much was lost.

## The decision card

One speaker, one short situation, two specific actions. The card fills the middle of a phone screen; the two choices sit under it, left and right, each listing its exact effects as chips.

- **Swipe:** drag the card left or right. Past 30 px it leans: a label names the choice and the HUD previews the result (blocks that would go blink striped, blocks that would come blink outlined, a +/− tag on each tile). Release past 100 px to commit; anything shorter springs back.
- **Tap, hover, keys:** tap a choice to commit. Hover or focus previews it. ← / → or 1 / 2 choose.
- **Costs are certain; chances are labelled.** A chance shows as a dashed chip, e.g. "+10? 50%". The outcome is rolled at the start of the week from the run's seed.
- **Disabled options say why:** "Needs 5 free water; 3 free." Errands and credits the same way.
- **Never trapped:** if neither choice is affordable, a third button appears: *Make do* (−2 Spirits).
- **After the decision:** the speaker, the choice you made, the outcome in prose, and what actually changed. Then Continue.

Cards are data: id, phase, speaker, title, text, two options and an optional `when` (is it in today's deck). An option has a label, effects, a response, extras (flags, `$promise`, `$keep`, `$break`) and an optional chance. Any of these can depend on earlier choices.

## The week

Seven authored days. Deliveries are building allocations, confirmed the night before; schedule A is *The usual promises*, B is *A dry middle* (A totals 32 units, B 29; queues, tankers and neighbours on the cards can add more).

| Day | Title | Delivery A / B | Also known that morning | Key cards |
| --- | --- | --- | --- | --- |
| Mon | Temporary interruption | 0 / 0 | Radio: normal pressure by tomorrow evening | Vesna's confirmed tanker (+10); Niko asks for a sea (promise); Vesna's kettle |
| Tue | By tomorrow evening | 8 / 6 | Radio: repair delayed 24 hours | The priority fee; Iman's room tone; the leak behind the depot (evidence) |
| Wed | A recording of rain | 0 / 5 | Expected: depot tanker, about even odds | Wait for the tanker; rain in Iman's headphones; Vesna returns the favour |
| Thu | Progress is being made | 8 / 0 | Radio: successful inspection | Iman cooks; Ticket closed (evidence); Sara visits now or later (promise) |
| Fri | The long way round | 0 / 0 | Confirmed: collection point, both errands | Across the river (+14); Iman's hair, in private; "Is it our fault?" |
| Sat | Someone has a spanner | 10 / 10 | Confirmed: crew on your street | The wrong work order (repair if 2+ evidence); Sara's visit is due; prepare the sea |
| Sun | A small sea | 6 / 8 | Radio: no promise of normal service | Launch day; seven candles; tomorrow's containers |

## Promises, memory and the complaint file

### Promises

| Promise | Who | Made | Due | Kept by | Broken by |
| --- | --- | --- | --- | --- | --- |
| A little sea for his birthday | Niko | Mon, *Six more sleeps* (left choice) | Sun | Preparing the sea Saturday (−4 water), or filling a bowl on launch day | Making the lighthouse story instead on Sunday; still open Sunday night |
| Sara can come before the week is out | Iman | Thu, *No big announcement* (walk instead) | Sat | *Another time*: invite Sara (−2 water, +9 Spirits) | "Not this week after all" (−5 Spirits); still open Saturday night |

A promise still open on its due night breaks automatically (−8 Spirits) and the summary says so. Open promises show as a badge on the Family button. Each promise gets one follow-up card, never an endless chain of postponements.

### What people remember

The Family dialog shows each person's bio and a line for each thing they remember (16 memories so far): Lejla remembers the plan you made together, the bowl you held while she patched it, one quiet minute. Iman remembers the shirt, the recording you listened to, the kitchen you handed her. Niko remembers the Minister of Rabbits. Vesna remembers the kettle. Memories also change card text later in the week (Vesna returns the bottle full; Iman cooks Sunday breakfast without supervision).

### The complaint file

Adds 1 for: documenting the leak (Tue), re-filing the closed ticket (Thu), helping Iman share her recording with names removed (Fri). With 2 or more by Saturday, walking the crew to the leak gets the local valve repaired: Sunday's notice comes from the foreman, and the epilogue has the best repair outcome. Below 2, the crew writes it down but can't authorise parts. The file shows in the HUD once it has anything in it.

## Endings

The epilogue describes the household instead of scoring it. Its title comes from strain: 0 *Together, and mostly all right*, 1 *Tired, and still together*, 2 *Through the week, just*. Then one paragraph each for:

- **The repair:** fixed valve (crew shown + 2 evidence), an open complaint file (1+), or only rumours.
- **The fee:** the receipt in your wallet (and next week's higher fee), or still on the standard list.
- **Niko's sea:** kept, broken ("added to the list for when the water comes back"), or never promised (the lighthouse).
- **Iman and Sara:** visited, quietly dropped, or a new recording she plays you unasked.
- **The notebook:** shared on the table, or Lejla has started her own.

**Relocation** (choosing relatives at dawn, or a second time at 3 strain) has its own epilogue: packing the sewing tin, the boats coming too, Vesna at the window. It offers *Replay this morning* as well as *A new week*.

Below the text: promises kept or broken, water left, strain, complaint file, number of decisions.

## Presentation & UX

Portrait phone first, one screen; landscape at 900 px and wider moves the HUD into a left column beside the card.

### Screen

- **Top bar:** day tile (number out of 7, weekday, the day's title); Family button (badge = open promises); pause gear.
- **HUD:** a blue water tile with free water as the big number and the tank drawn as 40 blocks (pale = kept for drinking, white = free, dark = empty). Food, Hygiene and Spirits as coloured tiles with 10 blocks each; under 25 a tile turns white with red blocks and a LOW tag. Small framed counters for credits, errands (2 pips), strain (3 pips) and, once it exists, the complaint file.
- **Stage:** six progress ticks, then the card, then the two choices and one hint line.

### Interaction

- Touch: swipe the card, or tap a choice. Mouse: hover to preview, click to choose.
- Keys: ← / → or 1 / 2 choose, Enter continue, F family, H this week so far, Esc or P pause.
- No timers, no fast input anywhere. Saves after every decision; *Replay this morning* restores the day's start.

### Art and sound direction

Since v2: a light, neutral take on pixel style. Notched corners, hard offset shadows and dithered shading on a warm light-grey ground; no dark screens. One saturated colour and one pixel icon per resource. Readable fonts, never pixel fonts: Barlow Condensed for numbers and labels (as in FT1P), Atkinson Hyperlegible for story text. People are dithered 64 px portrait frames with an initial until the art arrives. The target is intimate stylised portraits and one recurring apartment scene that changes through the week (containers by the door, the blue bowl, paper boats on the sill). Official messages use a colder visual language. Sound: the hollow cough of the tap, containers on stairs, a radio murmuring, a kettle; little or no music.

### Resource colours and icons

The same colour and icon on tiles, chips, summaries and rules. Icons are 10×10 pixel placeholders drawn in code (`PIX` in `ui.js`); the asset sheet replaces them. Colours are CSS variables, so a change in one place follows everywhere.

| Resource | Colour | Icon | Variable |
| --- | --- | --- | --- |
| Water | Blue #2a76c0 (reserve pale #9cc0e2) | Drop; lock for the reserve | `--water` |
| Food | Orange #cf6f12 | Steaming bowl | `--food` |
| Hygiene | Teal #12938a | Soap and bubbles | `--hygiene` |
| Spirits | Pink #c63a72 | Heart | `--spirits` |
| Credits | Gold #a7801a | Coin | `--cash` |
| Errands | Purple #6a4fb0 | Boot | `--errands` |
| Strain | Red #c33b2b | Lightning | `--strain` |
| Complaint file | Slate #55677b | Folder | `--file` |
| Promises | Amber #b0782a | Star | `--promise` |

**Cost chips:** icon + signed number. A gain is filled with the resource colour and white text; a cost is white with a frame and number in the resource colour; a chance is dashed and shows its odds ("+10? 50%"). Sign, fill and colour each carry the meaning, so it reads without colour too.

### App icon and publishing

Placeholder icon: a white pixel water drop on a blue tile with a hard shadow, for the iPhone home screen (`apple-touch-icon.png`, 180×180, also embedded) and the browser tab (32×32, embedded). Replace both from the asset sheet. The game is published at `games/redukcija/` in the Experiments repo on GitHub, next to Fali Ti Jedan Papir: copy `index.html` and `apple-touch-icon.png` there after committing in the Redukcija folder.

### Accessibility

Every number has a label; low values are red and say so in text. Reduced motion turns off the card animations. Full keyboard play, visible focus. Every choice works without swiping.

## Balance & playtest

Numbers (set in v1) were tuned against 400 simulated weeks per play style (the engine run headless, both supply schedules, seeded tankers). Target: a careful player finishes clean, a careless or stingy one ends the week strained, and hoarding water is not a strategy.

| Play style | Needed help | Moved out | Ended with 0 strain | Water left (avg) |
| --- | --- | --- | --- | --- |
| Balanced (spends on whatever need is lowest) | 0% | 0% | 100% | 6.4 |
| Always the generous choice | 0% | 0% | 100% | 10.7 |
| Random | 36% | 5% | 38% | 7.1 |
| Spends water freely | 42% | 0% | 0% | 0.8 |
| Hoards water | 100% | 0% | 0% | 32.0 |
| Always the cheap choice | 100% | 100% | 0% | 0.0 |

Two things to watch: credits pile up for most styles (30+ by Sunday for the spenders), so cash is not yet a real constraint; and the generous choice is never wrong, which may make the week feel easier than it reads.

### What the first playtest must answer (5–8 players)

- [ ] Can they explain why tomorrow is at risk?
- [ ] Do they ever choose joy over saving water?
- [ ] Can they name one thing each family member wants?
- [ ] Do they understand which costs are certain and which are chances?
- [ ] Does a bad outcome feel traceable to their choices?
- [ ] Do they find and use the swipe, or only the buttons?

Track per player: end-of-day resources, every choice, disabled options seen, emergencies, promises kept or broken, completion.

## Open questions

- [x] **Title and setting.** Decided: the game is called Redukcija and the city stays fictional.
- [ ] **Tone.** The balance of satire and domestic drama.
- [ ] **Replay.** All 42 cards are authored per day, so a second week is the same week with different numbers. Next step: a pool of meal, wash and neighbour cards with cooldowns, drawn into slots, with the story cards fixed.
- [ ] **Credits** need a job: rising prices midweek, a water seller, or Lejla's work depending on hygiene.
- [ ] **The generous choice is never wrong.** Add a few cards where the warm option costs something real later (a favour that has to be returned, a promise you can't afford).
- [ ] **More promises.** Two is thin for "people remember": candidates are Lejla's bath and Iman's recording.
- [ ] **Length.** Does a 21-day campaign add anything, or is one week the game?
- [ ] **Languages.** FT1P ships in five; worth planning string extraction before the script grows.

## Reference

- [Playable prototype (current build)](https://claude.ai/artifact/WP5M62RnJrT7uRsGGmAp2r) — also `index.html` in this folder, with `README.md` and `CHANGELOG.md`.
- **ChatGPT v0:** `Until_the_Taps_Return_Game_Design.docx` (design doc 0.1, 25 Oct 2026) and `Until_the_Taps_Return.html` in this folder. The cast, the city and the writing of all 42 scenes come from there.
- [Fali Ti Jedan Papir — Game Design Document](https://claude.ai/artifact/8WpSt7vgQN6vmJ6nwFRLmr): the format, shell and release process this project follows.
- Games: *Reigns* (two-choice card rhythm), *Papers, Please* (moral friction at a desk), *This War of Mine* (care under scarcity), *Florence* (small domestic moments as play).

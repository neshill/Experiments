# Changelog

Newest first. Each version is a git tag (`v24`, `v22`, …) on the last commit of that version, so `git checkout v22` gives you that build exactly. The build number is the commit count, shown on the title screen as `v24 · build N`. Full design notes for every version live in the game design doc's change log.

## v33 — 2026-11-06
- **Play data (opt-in).** The title screen asks once: "Help test the game?" With a yes, the game sends anonymous play events to Mixpanel plus a screen recording (session replay), so playtests show where people hesitate, mis-tap or quit without anyone writing it up. Options (title and pause menu) has a switch to turn it off or on again. Typed text (the feedback form) is never recorded.
- Events: Session Start, Screen (time on each screen, seconds to the first tap, taps and dead taps), Tap (every button), Card Tap (including blocked taps and why), Run Start/End, Office Enter/Done, Turn End, Map Stop, Errand, Reward Pick, Tutorial steps, Feedback Sent, Dead Tap (taps on things that do nothing), JS Error, Leave/Return.
- All of it lives in `js/analytics.js`, which watches the game from the outside (no game rules changed). The Mixpanel library is a pinned copy in `js/vendor/`. Copies opened from this computer send nothing unless the address ends in `?track`. Empty `ANALYTICS_TOKEN` to turn it off for a build.
- New lines are English only for now.

## v32 — 2026-11-03
- Stops on the map now show their result as a pop-up that slides up over the map: the stop's picture, what happened, and chips for exactly what changed (patience, Favours, cards, pocket, bag, connections, Vitrina unlocks, next-window hand size).
- "Go get it" is a pop-up over the window instead of its own screen: the paper's picture, "You get" next to "It costs", and a warning when the closing-time patience would end the run. Coming back shows the same kind of pop-up.
- Map screen decluttered: one-line header, everything you carry (Vitrina, pocket, bag, today's mood) in one row of small chips, legend moved onto the map, the how-it-works line moved into the hint card, and the city takes the rest of the screen.

## v31 — 2026-11-03
Making it a bit easier and clearer after a playtest.
- **No more time per turn.** Play as many cards as your hand allows; the turns of the day are the only clock (the lights around End turn, the clock on the HUD). Everything that used to give or take time now changes how many cards you draw up to: coffee break, "system down", the kafana and the renovation take a card, the café and Friday give one; the Strict-about-the-queue mood draws 1 less on the first turn; the Bank's system migration draws 1 less for 2 turns. Lunch break now means you can't hand in papers that turn (actions still work). Take a Number keeps the window open 1 more turn today; Friend on the inside does too; Neighbour who is a notary makes notarized copies never too old.
- **Draw cards each do something different:** Wait in Line draws until you get a paper the form asks for (3 at most, −1 patience); Polite Smile draws 1 and lets you keep 2 more cards at the end of the turn; Tabbed Folder takes a document (one the form wants, if possible) and then lets you swap any cards; Call Your Cousin, My Friend and Small Talk unchanged.
- **Redraws are no longer a run-wide counter on screen.** They come from Grandma's shopping bag (new Vitrina keepsake, you start with it: one swap per office, button "Bag swap", key R), Tabbed Folder and the priority ticket (pocket item, now "swap any cards"). Amra's perk loses the 2 extra redraws; Reform 5 "Digitalisation" now closes the window one turn earlier each day.
- **Go get it takes the rest of the day:** you come back tomorrow with the paper in your hand (and the cards you held). The clerk doesn't act, but closing time hits.
- **Closing time grows the longer you stay at one office:** −5, then −8, −11… (resets at every office; Working hours +5, Wall calendar −3). Papers still get a day older.
- New lines are English only for now.

## v30 — 2026-11-03
Phase 1 + 2 of the Steam roadmap: a full run is now a whole life, with characters and a difficulty ladder. New offices use placeholder art (they borrow an existing clerk and office until they get their own).
- **Three chapters:** Youth (student ID: Registry, Health Centre, Grammar School Office, Police, *boss* University Admissions), First job (the old run, salary account; the Bank is now its boss), Old age (first pension: Pension Fund, Health Insurance Fund, Municipal Court, Land Registry, *boss* Pension Commission). Each chapter rolls its own moods, forms, tips and city map; cards, bag, pocket, patience, Favours and Traces carry over. Between chapters a week passes (papers age 7 days), you get the new chapter's papers and recover 25 patience. Later chapters' forms ask a little more. The clerks' running story plays in the First job chapter only.
- **Bosses:** the last office of a chapter. Always in a signature mood (shown on the map) plus one rolled mood, and halfway through the form a second phase: a new rulebook reprints every unticked line (Admissions), a system migration takes 1 time for 2 turns and wants papers at most 3 days old (Bank), a new chairman un-ticks a line and brings his own mood (Commission).
- **Characters:** Amra the Student (By the book: Highlighter, hears the first "almost forgot" rule at every office, 2 extra redraws), Braco the Fixer (Connections: 1 Favour to start, +1 after every office, Call Your Cousin costs a Favour; opens after chapter 1), Dado the Returnee (Shady: envelopes 3 patience cheaper, 70 patience; opens after chapter 2). Each has their own starting deck. Picked on a new screen before the Vitrina.
- **Favours and Traces** (from the play-styles proposal): Favours (0–5) come from Small Talk, Bring a Burek, the kafana and your cousin's kitchen and are spent by Call in a Favour (3: tick any line, stays in your cards) and Everyone Knows Me. Shady cards leave Traces (max 6, −1 after every office); with Traces, clerks may *ask around about you* (2 patience per Trace, then −1 Trace). Clean Record removes 2.
- **11 new cards**, each with a play-style label (By the book / Connections / Shady): Cite the Law, Tabbed Folder, Stamp Pad, Complete File, Small Talk, Bring a Burek, Call in a Favour, Everyone Knows Me, Big Envelope, Lost in the Mail, Clean Record. Office rewards offer one card of your character's style and one of another; after a boss, three cards. Five cards start locked and join the reward pool one per run.
- **Reform levels** (difficulty ladder, per character, 10 levels): win at your highest level to open the next. Austerity, Streamlining, New forms, Customer focus, Digitalisation, Working hours, Harmonisation, Transparency, Efficiency, The Big Reform.
- **Vitrina:** 6 new keepsakes (Rolodex, Wall calendar from 1984, Grandpa's flask, Medal for Labour, Old Deutschmark note, Bookmark from the law library). Second slot after the salary account (chapter 2), third after your first pension (a full win).
- **The game is now split into files** so cards, offices and moods are easy to edit: `index.html` (page), `css/game.css`, `data/` (cards, chapters, bosses, characters, reforms, moods, places, trinkets, map stops, story), `js/` (game code), `art/` (pictures, formerly embedded), `i18n/*.js` (made from `i18n/*.json` by `i18n/bake.py`). Opens straight from disk like before. The build stamp now lives in `js/version.js`.
- Hand fan a bit snappier on touch (stiffer card springs, slide starts sooner).
- Save format v12: runs in progress from v29 restart. New lines are English only for now (other languages fall back to English).

## v29 — 2026-10-29 · build 44
- **Random forms:** every run rolls each office's form. The chain stays (each office still asks for the paper the office before gave you); the other lines are drawn from all ordinary papers (ID, birth certificate, rental contract, electricity bill, job offer, photo, one fee of a random kind, and earlier rewards) with a random form (original / copy / original-or-certified) and sometimes a date limit. Forms are rerolled until their difficulty is close to that office's target (same as the old fixed forms), and moods count toward it (a broken copier makes copy lines "cost" more).
- **Surprises share one budget per office** (Registry 1, Police/Tax/Bureau 2, Bank 3): each is either an "Ah, I almost forgot" line (an ordinary paper you can draw) or the FT1P (a strange paper you can't draw). About 2 FT1P per run, at least 1. Everything is decided at run start, so tips stay true.
- **Strange papers live in your bag, not your cards.** The one you start with, strange-paper rewards and your aunt's drawer go to the bag; when a clerk asks for one you have, tap **From your bag** on the form (free). Errands for a strange paper also put it in the bag. The map shows what's in it.
- **Redraws:** start each run with 3. During your turn tap **Redraw** (or R), pick any cards and swap them for new ones; it costs no time. +1 after every office and at the café or kafana, 6 at most.
- Office rewards now offer papers the coming forms actually ask for.
- Rules page updated; 20 new lines in all five languages.

## v28 — 2026-10-28 · build 43
- **Clerk moods:** every run, each clerk is in a mood, a rule for that whole office. The Registry has none or a mild/friendly one, the Police, Tax Office and Employment Bureau one each, the Bank two (the second stays hidden until you get there, or until My Friend Went Last Week tips you off). 16 moods: the copier is broken (no Photocopy), doesn't trust copies (certified only), a new circular (date limits 2 days shorter, 7 days where there was none), fresh ink (papers dated today don't count), checks everything twice (more rejections), the camera is on (shady cards cost double patience), just talked to the director (no Small Envelope), wants to leave early (one turn less a day), lunch at 11 (3rd turn of the day: no time), strict about the queue (−1 time on the day's first turn), didn't sleep (sighs and coffee breaks +2), a new memo (new rules twice as often); friendly: dying for a coffee (Coffee free and draws 1), loves a tidy file (+2 patience per document handed in), birthday (sighs and coffee breaks −2), Friday feeling (+1 time on the day's first turn).
- Rolled so a run never piles on one way of playing (at most 2 that hurt papers-and-copies play, 1 that hurts shady play, 2 that hurt everyone) and always has at least one friendly mood.
- Shown as taped notes at the top of the form, announced when you reach the window, and on the map for the office you're heading to (also on its route card). Rules page explains them. Not in the practice office.
- Translated into all five languages (53 new lines).

## v27 — 2026-10-27 · build 42
- **New app icon** (home screen icon on iPhone and the browser tab icon).

## v26 — 2026-10-27 · build 41
- **Tutorial art:** Žućko is now drawn like the other clerks, from layered pictures (body, head, and small closed-eyes and open-mouth patches switched on for blinks and talking, so the rest of his face never flickers). He has his own office (Window 0: a sunny training counter with a dog bowl under it), stamps each line of the form with his paw as you tick it off, and the end screen shows the Certificate of Completed Training with Žućko asleep next to it.
- Art brief: `ASSETS-tutorial.md` (made with ChatGPT; source PNGs are kept outside the repo).

## v25 — 2026-10-24 · build 40
Includes the hand springs (build 39: cards trail and lean when you slide the hand, pop up and bounce back, deal in from the Draw pile).
- **Tutorial:** *How to play* on the title screen opens a practice office, and the first time the game is opened on a device it offers it once (Show me / Not now). The clerk is on sick leave until 2031, so the window is run by Žućko, a temporary worker: a puppy in a hat folded from an old form. Fixed deck, 15 coached steps (a ring around the thing being explained, Žućko's speech bubble, only the next move can be tapped): the form, Patience, Time, handing in, photocopying, the next action, fees, End turn, keeping cards, a new rule, a fee stamp, the Small Envelope. Ends on a Certificate of Completed Training. Doesn't touch the Vitrina or run counts.
- **Languages:** English, Bosnian/Croatian, Serbian (Cyrillic), German, Spanish, French. *Options* on the title screen, or *Language* in the pause menu. The first open follows the phone's language; after that the choice is remembered on the device. Serbian is written in Latin in the table and shown in Cyrillic.
- Title menu: Start new run / How to play / Rules / Options / Quit.
- Fixes: the route card's "On the way" line showed a dark dot and overlapping text when a stop had trouble on the way; a few clerk lines said "she" for male clerks.
- Translations live in `i18n/*.json` (English sentence → translation) and are baked into `index.html`; `i18n/README.md` explains how to add or fix a line.

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

# Fali Ti Jedan Papir — playable prototype

A bureaucratic roguelike deck-builder about paperwork, patience and "you're missing one paper".
Web prototype (v20): phone portrait plus a landscape layout for desktop and handheld screens (designed at 1100×690, scales up). Open `index.html` in any browser; on a phone, Share → Add to Home Screen plays it full-screen.

**Feedback:** pause menu → Send feedback posts a row (type, message, optional name, version, office, device) to a Google Sheet. Setup steps are at the top of `feedback-apps-script.gs`; paste the deployed web app URL into `FEEDBACK_URL` in `index.html`.

**v20:** the five clerks are animated puppets: they breathe, blink, glance around, move their mouths while they talk, look over at the next window when your neighbour speaks, and pull faces that match their next action and react to what you play (a small envelope gets a raised eyebrow, then a smirk).

**v18:** large cut-out clerk portraits whose speech bubbles point at their mouths; the clerks gossip continuously, and one story runs through all five offices; menu and in-game music (`waiting-room-shuffle.mp3`, `ingame-music.mp3`, keep them next to `index.html`); a pause menu (gear button, Esc or P) with End run; a bigger, centred desktop layout; floating cards and springy buttons on the title screen.

**v17:** new title screen (Start game / Rules / Quit), you choose which cards to keep at the end of every turn (keep none to redraw all 5), and gossip pops up as speech bubbles from the clerk.

**How to play (touch):** tap a card to play it, hold to preview, slide across the hand to browse, slide up out of the hand to play the previewed card. Tap the round button to end your turn; the red segments around it are the turns left before the window closes.

**Mouse:** hover to preview, click to play.
**Keyboard:** 1–9 play a card, Space/E end turn, Esc cancel/close/pause, P pause, M map, C cards.

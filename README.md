# Neshill Gameworks — live site

This repo is the **deploy target only**. It holds the finished, playable files that GitHub Pages serves:

| Path | What | Working copy (edit here, not in this repo) |
| --- | --- | --- |
| `index.html` | Game hub (studio home screen) linking both games | `~/Desktop/Projects/Neshill Gameworks/hub/` |
| `games/ft1p/` | Fali Ti Jedan Papir (demo) | `~/Desktop/Projects/FT1P/` |
| `games/redukcija/` | Redukcija (early alpha) | `~/Desktop/Projects/Redukcija/` |

## Rule: work in Projects, deploy to this repo
1. Edit and commit in the game's working folder under `~/Desktop/Projects/` (its own git repo; the pre-commit hook stamps the build number there).
2. Run `./deploy.sh` in that folder. It copies only the deployable files into this repo.
3. Commit and push here.

Never put work files here: Claude outputs, screenshots, source art (`assets-*`), asset briefs, prompts, tools, proposals, translation sources. They stay in the working folder.

Both games share this site's origin, so saves are kept apart by key: FT1P uses `ft1p.*`, Redukcija `redukcija.*`.

FT1P's history up to v32 (when it lived at the root of this repo) is in this repo's log and also in the FT1P working repo.

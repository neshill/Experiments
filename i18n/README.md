# Translations

The game shows every sentence in the player's language by looking it up in a table: English sentence → translation.
One table per language: `bs.json` (Bosnian/Croatian), `sr.json` (Serbian, written in Latin; the game shows it in Cyrillic),
`de.json`, `es.json`, `fr.json`. `en_keys.json` lists every English sentence the game uses, with a note on what `{0}`, `{1}` stand for.

In a translation:
- `{0}`, `{1}`… are values the game fills in (a name, a number). Keep them; the order can change.
- `[[his|her]]` picks a word by the clerk's gender (male|female).
- `[[0:dan|dana|dana]]` picks a plural form for the number in `{0}` (one|few|many in Bosnian/Serbian, one|other elsewhere).
- Keep HTML tags like `<b>…</b>` and `<br>`.

To fix a line: edit the JSON, run `python3 i18n/check_tr.py bs` (any language code) to check it, then
`python3 i18n/bake.py` to copy all tables into `index.html`. A sentence missing from a table simply shows in English.

# Lore Faire — gallery images, 2026-08-18 shoot # 

Built 2026-08-19 by Cole from the 191 photos in `photos-raw/Jewelry Art/`.
Originals untouched, and still in Google Drive (My Drive → Crafts → Jewelry Art).

## Three tiers

| Folder | Size | Weight | Use |
|---|---|---|---|
| `thumb/` | 500 × 625 | ~50 KB each, **12 MB total** | the gallery grid |
| `loose/` | 1280 × 1600 | ~445 KB each, 85 MB total | the lightbox (4:5 — matches the vitrine natively) |
| `tight/` | 1600 × 1600 | ~514 KB each, 96 MB total | square catalog / listing crops. Not used by the site; gitignored |

Same filename in all three. `manifest.csv` maps every original `PXL_*` to its new name.

**Serve `thumb/` in the grid, not `loose/`.** 191 tiles at full size is 85 MB per
pageview — about 1,200 views before Netlify's free 100 GB/month is gone, and unusable
on mobile. With thumbs plus `loading="lazy"` it's ~400 KB above the fold, which is
250,000+ views. That's the whole storage question: it was never GitHub or Netlify
capacity, it's page weight.

## Naming

```
<case>-<descriptor>-NN.jpg
dnd-die-purple-butterfly-01.jpg
```

`<case>` matches the `data-cat` values on the gallery's filter chips exactly.

**Slugs are identifiers; the tile labels are copy. They deliberately don't match** —
copy gets revised, identifiers shouldn't. Renaming a slug means renaming files and
breaking `#hash` links, so it stays put. The mapping:

| Slug | Files | Tile label | Where it goes |
|---|---|---|---|
| dnd | 48 | The Fantasy Treasury | gallery chip |
| victorian | 38 | The Victorian Parlour | gallery chip |
| mystery | 29 | The Curio Cabinet | gallery chip |
| renfaire | 20 | The Faire Grounds | gallery chip |
| fine-art | 18 | The Atelier | `art.html` — not wired yet |
| steampunk | 14 | The Steampunk Salon | gallery chip |
| dragons | 8 | The Dragon's Hoard | gallery chip |
| terrariums | 8 | The Conservatory | gallery chip |
| the-library | 2 | The Library | `the-library.html` — not wired yet |

**The line between Atelier and Curio Cabinet is form, not subject.** Works on canvas or
paper — paintings, prints, collage, pressed flowers, the stained-glass panel — are the
Atelier. Objects mounted in a frame or under glass are the Curio Cabinet, whether the
subject is a spider or an owl. The first pass split those on subject (cute → art, creepy
→ mystery), which was arbitrary; corrected 2026-08-19.

## Excluded shots

`manifest.csv` has an `excluded` column. Six rows carry a reason and are kept out of the
site. The files still exist in all three tiers — nothing was deleted — so clearing the
column puts one back.

| File | Why |
|---|---|
| `fine-art-painting-deco-woman-01` | blurry (148) — worth a retake |
| `renfaire-window-frame-lights-flowers-01` | soft (219); shot 02 scores 2487, so the piece is still shown |
| `terrariums-bottle-pokemon-stones-01` | soft (279) — glass focus hunt |
| `victorian-cabochon-fairy-oval-01` | soft (263) |
| `victorian-purple-floral-bead-01` | soft (241) |
| `mystery-quartz-figure-small-01` | soft (232) |

Sharpness is variance-of-Laplacian over the centre 60%, measured on the originals.
Median across the shoot is **1810**, p10 is 617 — the batch is good. Softness clusters on
glass: six of nine terrarium shots landed in the bottom 15%, against a 15% baseline. That
is autofocus hunting on transparent surfaces, not camera shake. Tap-to-focus on an opaque
part (cork, twine, a stone) before framing, or put something matte behind the glass.

Eight more sit in a 300–450 band — fine at 500px thumbnail size, visibly soft in the
lightbox. Left live: `jar-squirtle`, `specimen-jar-amber`, `die-opal-spike`,
`glass-domes-pair`, `cameo-oval-large`, `triquetra-twisted-chain`, `jar-moss-figure`,
`jars-pokemon-pair`.

## Deploying (first done 2026-08-19)

Three folders, and only one is the site:

| Folder | Role |
|---|---|
| `Desktop\KorkWorks\Lore Faire\Canon\lorefaire-site` | **the site** — edit here. Not a git repo. |
| `C:\Users\kelly\lorefaire-push` | the clone that pushes. Disposable. |
| `Projects\lorefaire.com` | stale clone + image workshop. **Never push from here** — it holds older copies of the same filenames and would overwrite the live site. |

Routine update, from Git Bash:

```bash
cd ~/lorefaire-push
git pull                       # in case anything changed on GitHub
cp -r "/c/Users/kelly/Desktop/KorkWorks/Lore Faire/Canon/lorefaire-site/"* .
rm -rf _backup-*
git add -A
git status                     # read this before committing
git commit -m "what changed"
git push
```

Use `cp -r`, not robocopy — robocopy in MINGW64 is fussy about Windows paths and silently
copied nothing the first time. The `*` skips dotfiles, so `.git` is safe.

**The three-step trap.** `git add`/`git rm` only *stage*. `git commit` makes the commit.
`git push` uploads commits and nothing else. Push without committing and git says
"Everything up-to-date" — truthfully, because there were no commits to send. If a push
seems to do nothing, that's the first thing to check.

`cp` never deletes. If a file is removed from the site folder it survives in the clone
until you `git rm` it explicitly.

## Where the site actually lives

**Not this folder.** The deployed source of truth is
`Desktop\KorkWorks\Lore Faire\Canon\lorefaire-site\`, which matches the GitHub repo.
`Projects\lorefaire.com` is a stale clone — it predates `about.html`, `art.html`, and
`the-library.html`, and still carries the old brown palette. Don't edit it.

This folder is the image workshop only: originals in, three derivative tiers out.

## What was already done to the site (2026-08-19)

All of this is applied in `Canon\lorefaire-site\`; backups in `_backup-2026-08-19/`.

- `categorize()` now reads the case prefix off the filename, with the old regex kept as
  a fallback for legacy names. No `cat:` field needs hand-typing into `PIECES`.
- `normalize()` gained `o.thumb`; the grid renders `thumb`, the lightbox renders `src`.
- Terrariums added as a chip and to the `#hash` whitelist; its homepage tile is a link.
- All 35 legacy pieces removed from `PIECES` — it is exactly the 156 new photos.
- Nine tiles renamed with a separate `<span class="collection-article">The</span>` line
  above the name, plus subtitles.

**Not uploaded.** 390 files, ~93 MB. GitHub's web uploader struggles past ~100 files per
drag, so this wants GitHub Desktop or several batches.

- Search added to `gallery.html` — italic field on a hairline underline, Cinzel count
  beside it, combines with the chips rather than replacing them. Escape clears.
- `about.html` repointed at `images/Carousel/` after those files moved. It was broken.

### The Atelier (`art.html`) — wired 2026-08-19

18 pieces, in a fourth image tier built specifically for it:

| Folder | Size | Use |
|---|---|---|
| `photos-gallery/atelier/` | 1400px long edge, 6.6 MB | lightbox, one at a time |
| `photos-gallery/atelier-thumb/` | 600px, 913 KB total | the masonry grid |

**These are cropped by hand, not by recipe.** Two automatic approaches failed — canvas
edge detection found garbage in a third of them, and leaving them uncropped was no good
either because every source is 0.56 or 1.78 (phone shape), never the shape of a canvas.
The boxes were read off a percentage-grid overlay, one image at a time; they live in
`atelier-captions.csv` alongside titles, medium, and alt text.

Masonry preserves each canvas's own aspect, which is the whole reason this page exists
separately from the gallery — the vitrine's fixed 4:5 would slice the landscape canvases.

Page copy changed: "The Studio" and `<h1>Fine Art</h1>` are both now The Atelier, and the
nav label across all five pages reads Atelier.

### Still open

- `the-library.html` — the 2 `the-library` pieces.
- Twelve legacy files loose in `images/` (`necklace-*`, `pendant-*`, `ring-*`, `set-*`)
  and eight in `art/` (including `dice-assemblage.jpg`, the Critical Role frame) are
  unreferenced by any page. Nothing deleted — decide whether they join Carousel or go.
- `print-cats-floral-pair` is two prints in one photograph, listed as one piece.

## Fixing what I got wrong

`manifest.csv` has empty `your_title` and `your_note` columns. Fill any row and the
rename re-runs off the CSV — nothing needs re-cropping. Same for `case` if I filed
something under the wrong tile.

Likeliest misfiles: the `renfaire` / `victorian` line (I split on earthy-handmade vs.
formal-ornate, which is a judgment call), and the Pokémon pieces, which I spread across
`dnd` and `fine-art` rather than giving them a case of their own.

## Crop method

Automatic subject detection failed — the styled backgrounds (wicker, cork, gargoyles)
carry more edge detail than the smooth display boards, so every detector locked onto the
scenery. A fixed compositional recipe worked, because the shooting setup was consistent:

- portrait sources: square crop at 48% of frame height centred at (50%, 50%);
  4:5 crop at 78% of height, same centre
- landscape sources: near-full-frame centre crop
- Lanczos resample; q90 for tight/loose, q78 progressive for thumbs

## Do not commit

`photos-raw/` (519 MB) and `photos-raw.zip` are gitignored. Git keeps binaries forever —
committing them once bloats the repo permanently even if you delete them later. Drive is
the backup.

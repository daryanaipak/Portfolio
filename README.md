# Portfolio
Darya Naipak, Product Marketing Strategic Lead. The website is a rendered antique study you can turn and click through.

## The site
The landing page shows the name and slogan beside an isometric study, rendered in Blender (Cycles). Visitors turn the room by dragging it, swiping it, or swiping two fingers sideways on a trackpad; the room turns towards the French window, in day or night light. Each piece in the room opens a part of the portfolio:

| Piece | Section |
| --- | --- |
| Pin board | Expertise |
| Chest of drawers (top drawer) | Tools |
| Coffee table newspaper, *The Naipak Times* | About me |
| Bookshelves, five case books | Cases |
| Three visitors | Testimonials |
| The cat with the business card | Contact |

## Structure
- `index.html`: the page (HTML, CSS and JavaScript). GSAP 3.12.5 loads from cdnjs.
- `cases.js`, `cases.css`: the five case books, page-turning reader, brochure viewer and video player.
- `frames/`: the turning sequence: `day_XX.webp` and `night_XX.webp`, plus `mask_XX.png` click maps (each piece in its own red value) and `masks.json` (frame count, size, and each piece's box per frame).
- `heroes/`: close-up renders of each piece, book covers and spines, the social preview image and the icon.
- `img/`, `brochures/`: case visuals, tool logos and brochure pages.
- `fonts/`: Mix Tumble (headings), Garet (body), Dudu Calligraphy (handwriting), Enchanted Land (used by the previous site).

## The previous site
The earlier *Naipak Books & Café* site is kept two ways:
- `legacy.html` in this repository, with all its images and fonts, so it still opens at `/legacy.html`;
- the `backup-books-cafe-site` branch, an exact copy of the repository before the redesign.

## Running it
It's a static site with no build step. Serve the folder with any local web server, for example:

```
python3 -m http.server
```

then visit http://localhost:8000. Opening the file directly (`file://`) does not work, because the page reads its click maps from image data.

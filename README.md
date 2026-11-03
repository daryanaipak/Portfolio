# Portfolio
Experience website where you can read more about my experiences and professional cases.

**Naipak Books & Café** is an immersive portfolio site: you step into a painted, acrylic-style 3D book café and walk through it as you scroll: the cork board (expertise), the café nook (*The Naipak Times*), the bookshelf with five case books, three visitors with testimonials, and the shop cat with a business card.

## Structure
- `index.html`: the whole site (HTML, CSS and JavaScript in one file). three.js r128 loads from cdnjs.
- `img/`: portraits, figures, stickers, trip photos, tool logos and case visuals.
- `brochures/`: page images for the brochure flipbooks inside the case books.
- `fonts/`: Garet, Enchanted Land and Dudu Calligraphy (woff2).

## Running it
It's a static site with no build step. Open `index.html` through any local web server, for example:

```
python3 -m http.server
```

then visit http://localhost:8000. Opening the file directly (`file://`) works too, but the 3D figures need a server to load their images.

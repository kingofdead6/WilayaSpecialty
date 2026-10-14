# سلالة تيسمسيلت

A one-page presentation website for « سلالة تيسمسيلت », the doum-palm basketry brand of
غرفة الصناعة التقليدية و الحرف تيسمسيلت, built from the brand's visual identity charter.

**Stack:** React 19 · Vite 6 · Tailwind CSS 4 · Framer Motion. No backend.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in dist/ (deploy to Vercel, Netlify, any static host)
npm run build:single # one self-contained index.html in dist-single/ (images and JS inlined)
```

## Structure

```
src/
  router.jsx              tiny router: clean paths (/faq) over http, #/faq when opened from disk
  data.js                 all copy from the charter, plus FAQ and policies text (edit text here)
  pages/
    Home.jsx              the one-page presentation (all sections below)
    Faq.jsx               searchable FAQ accordion
    Policies.jsx          terms, privacy, cookies, IP, brand rules, with a live table of contents
    NotFound.jsx          404 page for any unknown route
  index.css               Tailwind theme tokens: colours and fonts
  assets/                 logo, wordmark, map and photos extracted from the charter PDF
  components/
    WeaveCanvas.jsx       canvas doum weave that plaits itself in, lifts under the pointer
    Nav.jsx               sticky nav, active-section pill, scroll progress, mobile menu
    Hero.jsx              wordmark reveal + woven disc echoing the emblem
    Tissemsilt.jsx        name meaning, map with pin, borders, distance counters, crafts
    History.jsx           history, parallax basket photo, product ribbon
    Doum.jsx              raw materials, animated doum fan leaf
    Stages.jsx            the 5 preparation stages with a scroll-filled timeline
    Plait.jsx             interactive plait (9 / 11 / 13 leaves) + techniques
    Symbols.jsx           the 25 symbols (24 named in the charter)
    Identity.jsx          logo versions, protection zone, Brown Herbal, typefaces
    Footer.jsx            woven hem, call to action, link columns, contact details
    ScrollTop.jsx         back-to-top button with a reading-progress ring
    PageHeader.jsx        header band shared by the secondary pages
```

Unknown URLs fall back to `index.html` so the 404 page can render: `vercel.json` covers Vercel and
`public/_redirects` covers Netlify. Other hosts need the equivalent SPA fallback rule.

## Brand notes

- Official colour: Brown Herbal `#472e1e` (CMYK 47 / 66 / 75 / 70).
- Charter fonts: Montserrat, Al Arabiya, ArabFont Kufi LT. The last two are not web fonts, so the site
  uses Reem Kufi (display) and Noto Naskh Arabic as close stand-ins, with Almarai for body text.
  If you have licensed web files for the originals, add them with `@font-face` and swap the tokens in `index.css`.
- The logo is used unmodified, in the three versions the charter allows.
- Animations respect the visitor's "reduce motion" setting.

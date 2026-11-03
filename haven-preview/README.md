# Haven portfolio previews

Static GitHub Pages demonstrations. The entry page shares the case study's session
password gate; underlying files are public. This is not access control.

- `platform/`: production build copied from the supplied `portfolio-original/dist`.
  Original UI with fictional fixtures, backend requests disabled, and an offline CSP.
  Asset paths are relative for Pages subdirectory hosting; `hosting.js` keeps
  root-relative page links in the hash router. English is the first-visit default.
- `design-system/`: supplied standalone design system, English default, with a CSP
  preventing network API calls. Embedded component previews are retained.
- `index.html`, `preview.js`, `preview.css`: shared password entry and preview switcher.

No credentials or backend services are required. Do not enter real client information.
The public demo and presentation-only password gate were approved for publication.

# MitsuCap — Content Reference Site

A static HTML/CSS/JS rebuild of **mitsucap.com**, with content recovered from the Wayback Machine snapshot of 7 Dec 2019. The live WordPress site was hacked, so this copy is the source of truth for **structure and copy** while the new site is designed and developed.

- Plain HTML, CSS and vanilla JS. No frameworks, no build step, no backend.
- Styled with the **AMI Brand Guidelines 2026** (`AMI_Brand_Guidelines_2026_DIGITAL.pdf.pdf`) and the supplied `Logo.svg`.
- All copy is **verbatim**, typos included, so nothing is lost or reworded. Page headings and button labels were added only where the layout needed them.

## Open it

Double-click `index.html`, or serve the folder with any static server. Every link is relative, so it also works from `file://`.

Open **Content Map** (`sitemap.html`, linked in the footer) to see each page, its original URL, and its content status.

## Content notes

Dashed, striped boxes labelled **"Content note"** explain gaps and quirks in the original content. Examples: text that was never written, widgets the archive didn't capture, and legal copy that needs review. Use the **Hide content notes** button (bottom left) to switch them off for a clean view. The choice is remembered per browser.

## Structure

```
index.html                     Home
about-us.html                  About Us            ┐
mitsucaps-philosophy.html      Philosophy          │
our-team.html                  Our Team            │
news.html / blog.html          (Coming soon)       │ "About Us" menu
career.html + careers/*.html   Career + 2 postings │
associations.html              Associations        │
affiliations.html              Affiliations        │
privacy-policy.html / terms-of-use.html / all-declarations.html (legal)
solutions.html + services/*.html   8 lease & finance programs      "Solutions" menu
industries-served.html         12 industries (anchor per industry)  "Industries" menu
forms.html / brochures.html / benefits-of-leasing.html              "Information" menu
contact.html / schedule-a-call.html / get-a-quote.html / make-an-appointment.html   "Contact Us" menu
sitemap.html                   Content map for the team
assets/css/style.css           All styles (brand tokens at the top)
assets/js/main.js              Nav drawer, sliders, demo forms, notes toggle
assets/img/logo.svg            Supplied logo · logo-reversed.svg = white version for dark backgrounds
assets/img/legacy/             Original site images recovered from the archive (+ logos/ for associations)
```

The header, footer and sidebars are repeated in each page, so every file stands on its own. When you edit the nav, edit it in all pages.

## How the brand guideline is applied

| Guideline | Where it shows up |
|---|---|
| Colour palette: AMI Red `#ED1C24`, Charcoal `#30313C`, Cool Gray `#656E7D`, Silver `#D1D3D4`, Warm White `#E6E7E8` | CSS custom properties in `:root` |
| Typeface: Gilroy, Light → ExtraBold | Used when Gilroy is installed. Otherwise it falls back to Plus Jakarta Sans (Google Fonts). To self-host, see the comment at the top of `style.css`. |
| Type hierarchy: Display, Section, Subheading, Small heading, Body, Caption, CTA | `.h0`, `.h1`, `.h2`, `.h3`, `.body-lg`, `.caption`, `.btn` |
| Icons: 24 × 24 grid, 2 px stroke, rounded | Inline SVG, `.icon` |
| Imagery | Photos are shown as-is (`.img-cover`), with no tint. Heroes get only a soft charcoal fade behind the text so it stays readable. The guideline's red overlay and diagonal/bar graphics were deliberately left out after review. |
| Red usage | Red is kept to a minimum: primary buttons, text links, the active-menu underline, and the keyboard focus ring. Icons, section backgrounds, bullets and dividers use charcoal and gray. |
| Website system: navbar, hero, buttons (primary / secondary / tertiary / text / icon), cards | Header, heroes, `.btn--*`, `.card` |

## Forms (demo only)

The Contact, Home contact, Get a Quote and Forms-download forms rebuild the original fields and options, and the `*` required flags match the original form. Nothing is sent: submitting a form shows a "demo only" message. The Get a Quote page keeps the original country → state behaviour.

## Things the client needs to supply or confirm

1. **Terms of Use needs legal review.** It names "Dominion" three times, left over from another company's terms, and has literal "(hyperlink)" placeholders. Privacy Policy and Declaration are dated 2017, and the Declaration's clause numbering is irregular.
2. **Missing PDFs.** The Commercial Credit Application, Collateral Asset List and Supporting Documentation Form were never archived.
3. **Pages that never had content.** News, Blog, Brochures / Company presentation, and Bank & Credit Union program.
4. **Our Team.** No people or profiles, and a list after "Some of the areas… include:" is missing.
5. **Affiliations.** The list of affiliates was never published.
6. **Careers.** The two postings are from Oct 2017, their Responsibilities and Skills sections are empty, and the application form wasn't archived.
7. **Booking tool.** Schedule A Call and Make an Appointment used a WordPress booking plugin that wasn't captured. The two pages are also duplicates.
8. **Interest-rate swaps widget** on Home. It is embedded from the Web Archive copy (frozen data from 2019-2022). For a live feed, point the iframe at thefinancials.com directly or replace it.
9. **Social media profiles.** The icons on the old site had no URLs.
10. **Out of scope.** My Account and Login, which were WordPress user pages.

## Source

- Snapshot: https://web.archive.org/web/20191207234801/https://mitsucap.com/
- Pages were fetched from the closest captures to Dec 2019 (Nov 2019 to Jan 2019).

# yashwanthmutthuluru.github.io

Personal website for **Yashwanth Sai Mutthuluru**, Data Engineer.

## Live

[yashwanthmutthuluru.github.io](https://yashwanthmutthuluru.github.io)

## Stack

- Semantic HTML, modern CSS design system, and vanilla JavaScript
- Static GitHub Pages hosting
- Dark/light mode with system preference support and manual toggle

## Local development

```bash
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

Run the dependency-free checks used by GitHub Actions:

```bash
node scripts/validate-site.mjs
```

Selected Work uses `#selected-work`, and Expertise uses `#expertise`.
The other section targets are `#about`, `#experience`, `#freelance`,
`#education`, `#recommendations`, and `#contact`.

## Contact form setup

The Contact section submits to `https://formspree.io/f/maylvono` asynchronously using
the independent, deferred `js/contact.js` script. Success and error messages appear
below the form without navigating away or opening another tab.
Create a free Formspree form and configure its destination email in the Formspree dashboard.
To change the endpoint in `index.html`, find the form with `id="contact-form"` and
update its `action` URL with the endpoint from your Formspree dashboard.
No email address, API key, or credentials need to be added to the site.

If the endpoint is changed back to `YOUR_FORM_ID`, JavaScript blocks submission and directs visitors to LinkedIn.
With a real endpoint, successful submissions reset the form; failed submissions keep
the entered values for retry. If the contact script cannot run, the standard POST
opens Formspree in a new tab, leaving the portfolio open.
After setup, send a test message and verify delivery in your inbox.

Email validation displays an inline message for missing or malformed addresses,
including a missing `@` or a domain without a dot (for example, `name@example`).
The optional phone field requires exactly 10 ASCII digits when filled.
There is no country selector or automatic country-code prefix. Validation checks
format only, not email deliverability, phone ownership, or whether a number is active.
Native HTML validation also applies when JavaScript is unavailable.

## Assets

- Social previews use `img/og-image.png`.
- Favicons and profile images are served from `img/`.

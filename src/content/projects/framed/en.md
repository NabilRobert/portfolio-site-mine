---
title: "Framed: portfolio pages anyone can make, with no code"
summary: A portfolio platform. Anyone can claim an address like framed.my.id/your-name and build a page from blocks, editing it in place in the browser, with no code.
category: other
order: 9
status: live
stack: Vue 3 · TypeScript · Hono · Better Auth · SQLite / Cloudflare D1
coverAlt: "Cover with the word “Framed” over a yellow picture frame holding a small page built from blocks: a red banner, a picture beside lines of text, more text and a button, with a pencil at the corner; captioned “framed.my.id/your-name”, with “Portfolios” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/author-website", primary: true }
  - { label: Live site, href: "https://framed.my.id" }
screenshots:
  - src: landing.webp
    alt: "Framed’s home page: the heading “Your work, framed.”, the line “A portfolio page you design yourself, for writers, designers, architects, artists and makers. Free.”, a “Make your page” button, and four cards: your own address, build it from blocks, show your work, and make it look like you."
    caption: "The front door"
    description: "This is what a visitor sees at framed.my.id. The promise is in the heading and the line under it: a portfolio page that people design themselves, free, for anyone with work to show. The four cards are the whole idea in short: an address of your own to put on a CV or a business card, a page built from blocks you stack, your work kept once and shown wherever you want it, and colours, fonts and a background pattern of your choice, with a live preview. “Make your page” leads to sign-up, which is by invitation for now."
    terms:
      - { term: "Address", meaning: "Each page lives at framed.my.id/ followed by the name its owner picks, checked against rules for which names are allowed." }
      - { term: "Blocks", meaning: "The pieces a page is built from: a banner, text, picture and text, lists, quotes, buttons, work, news, contact details and a press kit." }
      - { term: "Live preview", meaning: "The editor shows the page as visitors will see it while you change it, so nothing needs code or a separate publish step to check." }
---
A portfolio platform, for anyone with work to show: writers, designers, architects, artists and makers. Each person signs up, claims an address such as `framed.my.id/your-name`, and builds their page from blocks, editing it in place in the browser with a live preview. No code is involved at any point. It began as a site for a writer, and grew into a platform anyone can use.

- **Building blocks:** a banner, text, picture and text, lists, quotes, buttons, a showcase of work (projects, books, buildings or art), news, contact details and a press kit.
- **Making it look like yours:** themes for colours, fonts and background, patterns drawn in CSS, a style for each block's own box, and picture cropping. Picture and PDF uploads are built, but switched off for now.
- **Accounts:** an email and a password through Better Auth, with emailed codes to confirm the email and to reset a forgotten password. Sign-up is by invitation for now.
- **Keeping it safe:** anyone can report a page that breaks the rules, such a page can be hidden from the public, and people can delete their account, which removes their site and pictures.
- **Tested:** over 300 tests, with the API's run twice, against Cloudflare's D1 and against SQLite.
- **Where it runs:** live at framed.my.id, as one Node process with a SQLite database on a small server. The same code also runs on Cloudflare's free plan (Pages, a Hono function, D1 and R2).

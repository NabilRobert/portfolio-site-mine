---
title: "juku-arcade: a Japanese learning game, inspired by Balatro"
summary: An arcade card game for learning the readings of Japanese words, inspired by the card game Balatro. In progress, and playable in the browser, best on a laptop or desktop.
category: other
order: 10
status: wip
stack: Vue 3 · TypeScript · Tailwind CSS · Vite · Dexie
coverAlt: "Cover with the word “Juku” over a game board on a blue table: three kanji word cards (本, 三日, 上) above a fan of four reading cards (ほん, みっか, みか, うえ), captioned “A Japanese learning game”, with “Arcade” spelled out below."
links:
  - { label: Play it, href: "https://nabilrobert.github.io/juku-arcade/", primary: true }
  - { label: Repository, href: "https://github.com/NabilRobert/juku-arcade" }
screenshots:
  - src: board.webp
    alt: "A hand in juku-arcade’s Words mode at level N5. Five word cards across the top (本, 三日, 取る, 上, 四つ) and six reading cards below (ほん, とる, みか, よっつ, みっか, うえ), with a Play button and the deck. A panel on the left shows today’s progress, the level (1 of 5), the combo, sound settings, the pot not yet banked with a Bank button, Scout, the score and End run."
    caption: "A hand in Words mode"
    description: "The start of a run at level N5. Across the top are five word cards, each written in kanji. Below them are six reading cards: one for each word, and one decoy. Here the decoy is みか, which looks like the reading of 三日 but drops its small っ (the right answer is みっか). Matching readings one after another builds a combo, combos raise the level, and points go into a pot that you can bank to keep, or lose. The panel on the left keeps the level, the combo, the pot and the score in view."
    terms:
      - { term: "Reading", meaning: "How a word written in kanji is pronounced, written in kana: 三日 is read みっか." }
      - { term: "Decoy", meaning: "An extra reading card that is a likely mistake, such as a reading without its small っ, a long vowel gone wrong, or another reading of the same kanji." }
      - { term: "Pot", meaning: "Points won during a run that aren’t safe yet. Bank them to keep them." }
      - { term: "N5", meaning: "The first of the five levels of the JLPT, the Japanese-Language Proficiency Test. The game has decks from N5 to N1." }
---
A Japanese learning game, built for Japanese learners: an arcade card game, inspired by the card game Balatro, for learning the readings of Japanese words. In the main mode you match five kanji word cards (三日) to their readings (みっか), with a decoy in the mix. Combos raise the level and fill a pot that you can bank or lose.

- **Three modes:** Words, as above; Kanji, which asks for every reading of one kanji; and Bunpou, where you put grammar tiles in order to build a short generated tale.
- **Decoys made from real mistakes:** each decoy is a common slip: a mistake with a long vowel, the small っ, a dakuten mark or a small ゃ, ゅ or ょ, or another reading of the same kanji.
- **Word data:** decks for every JLPT level from N5 to N1, built from OpenJLPT, which draws on JMdict, KANJIDIC2, Jonathan Waller’s JLPT lists and Tatoeba. The decks are shared under CC BY-SA 4.0, like their source.
- **No server:** a static web app. There are no accounts, and progress stays in the browser. Every push to the main branch that passes the lint, type check, tests and build deploys to GitHub Pages.
- **Measuring it:** an optional daily check-up is designed to measure whether playing improves recall. No learners have been measured yet, so there is no result to report.
- **Status:** in progress, and playable now. It’s best on a laptop or desktop, because the layout isn’t made for phones yet. The code has no licence yet.

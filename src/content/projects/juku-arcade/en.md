---
title: "juku-arcade: a Japanese learning card game with score combos"
summary: An original arcade card game with score combos, in the same genre as Balatro, for learning the readings of Japanese words. In progress, and playable in the browser on laptops, tablets and phones held upright.
category: other
order: 10
status: wip
stack: Vue 3 · TypeScript · Tailwind CSS · Vite · Dexie
coverAlt: "Cover with the word “Juku” over a game board on a blue table: three kanji word cards (本, 三日, 上) above a fan of four reading cards (ほん, みっか, みか, うえ), captioned “A Japanese learning game”, with “Arcade” spelled out below."
links:
  - { label: Play it, href: "https://arcade.nabilrobert.my.id/", primary: true }
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
  - src: kanji.webp
    alt: "juku-arcade’s Kanji mode at level N5. One kanji card, 二, with its meaning “two; two radical (no. 7)”, above eight reading cards: ふた, ゼイ, むずか(しい), び, ニ, ふた(つ), あか(らめる) and よわ(まる). A panel on the left shows the kanji count (1 of 10), the score, the combo, Scout and End run, and three red lanterns sit beside the board."
    caption: "Kanji mode: every reading of one kanji"
    description: "One kanji is dealt with eight readings, and the job is to pick every right one before pressing Play. For 二 they are ニ, ふた and ふた(つ); the other five belong to other kanji. Three wrong picks are allowed for each kanji. A kanji left with readings unfound puts out one of the three lanterns, and the run ends when all three are out. This mode doesn’t change your reviews."
    terms:
      - { term: "On and kun readings", meaning: "Most kanji have readings borrowed from Chinese (on, written in katakana, like ニ) and native Japanese ones (kun, in hiragana, like ふた)." }
      - { term: "Lanterns", meaning: "The run’s three lives. Each kanji left with readings unfound puts one out." }
  - src: bunpou.webp
    alt: "juku-arcade’s Bunpou mode at level N5. A pixel-art scene of a figure on a stage at the top; below it the hint “時間＋に” (time + に), five empty boxes, and five tiles to put in order: は, 夜, に, お父さん and 来ます. A panel on the left shows today’s progress, grammar known, the score, the level, hints and End run."
    caption: "Bunpou: grammar tiles that build a tale"
    description: "Bunpou is the grammar mode. Each sentence comes as tiles to put in order, here は, 夜 (night), に, お父さん (father) and 来ます (comes), with a hint naming the pattern being practised: a time word followed by に. Put each sentence in order, and the sentences together make a short generated tale, played out in the scene at the top. The game marks this mode as N5 only for now, and still in development."
    terms:
      - { term: "Particle", meaning: "A short word such as は or に that marks a word’s role in the sentence. に after a time word says when." }
      - { term: "Hint", meaning: "The pattern being practised, shown above the boxes. Hints can be switched off." }
  - src: phone.webp
    alt: "juku-arcade’s Words mode on a phone held upright: five word cards in two rows (東, 二つ, 持つ, 本, 上), a Play button, and six reading cards below in two rows (うえ, もつ, ほん, ひがし, ふたつ, もうつ), with Pause at the top right."
    caption: "On a phone, held upright"
    description: "The same Words board, laid out for a phone held upright. The word cards wrap into two rows and the reading cards into a grid below, so a whole hand fits on the screen without scrolling. Here the decoy is もうつ, a misreading of もつ with a long vowel. Turning the phone sideways shows a notice asking to turn it back, because landscape on a phone isn’t supported."
---
A Japanese learning game, built for Japanese learners: an original arcade card game with score combos, in the same genre as Balatro, for learning the readings of Japanese words. In the main mode you match five kanji word cards (三日) to their readings (みっか), with a decoy in the mix. Combos raise the level and fill a pot that you can bank or lose.

**To play the online demo:** it asks for a username and password. Username: `USERNAME-HERE`. Password: `PASSWORD-HERE`.

- **Modes:** Words, as above; Kanji, which asks for every reading of one kanji; Bunpou, where you put grammar tiles in order to build a short generated tale; and Practice, which mixes the words, kanji and grammar you’ve already met.
- **Decoys made from real mistakes:** each decoy is a common slip: a mistake with a long vowel, the small っ, a dakuten mark or a small ゃ, ゅ or ょ, or another reading of the same kanji.
- **Word data:** decks for every JLPT level from N5 to N1, built from OpenJLPT, which draws on JMdict, KANJIDIC2, Jonathan Waller’s JLPT lists and Tatoeba. The decks are shared under CC BY-SA 4.0, like their source.
- **No backend:** a static web app. There are no accounts, and progress stays in the browser. The online demo is the same static files, and the web server asks for the username and password above before it sends any of them.
- **Measuring it:** an optional daily check-up is designed to measure whether playing improves recall. No learners have been measured yet, so there is no result to report.
- **Status:** in progress, and playable now in the browser, on laptops, tablets and phones held upright. The code is all rights reserved: public to read, not to reuse. The word decks are CC BY-SA 4.0.

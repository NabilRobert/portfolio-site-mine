---
title: "id-chat-research: tools for evaluating AI chat agents on Indonesian sales chats"
summary: Open research tools for evaluating customer-facing AI chat agents on Indonesian sales conversations. The first, an anonymiser measured by what it misses, is built and tested on synthetic chats; a relationship rubric comes next.
category: opensource
order: 14
status: wip
stack: Python · Presidio · NusaBert · Pydantic · Typer
coverAlt: "Cover with the word “Chat” over three chat bubbles on a yellow ground. In the customer’s two bubbles, dark blocks labelled “Nama”, “Telepon” and “Alamat” stand where a name, a phone number and an address were, and a red magnifying glass checks the address block. Captioned “Personal data, removed”, with “Research” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/id-chat-research", primary: true }
  - { label: Results, href: "https://github.com/NabilRobert/id-chat-research/blob/main/docs/results-anonymiser.md" }
---

Open research tools for evaluating customer-facing AI chat agents on Indonesian sales conversations, in the WhatsApp style that buyers and sellers use. Before anyone can study such chats, the personal data in them has to go. So the first tool is an anonymiser, judged by what it misses rather than by what it finds. The second, a rubric for how an agent builds a relationship with a customer, is planned.

- **The anonymiser:** it replaces names, phone numbers, national ID numbers (NIK), addresses, vehicle plates, emails, bank account numbers and order IDs with numbered placeholders that keep the type, such as `TELEPON_1`. Patterns built on Presidio catch the numbers. A local NER model, NusaBert, which spots names and places in text, catches names and addresses, with name and street patterns beneath it.
- **Measured on held-out chats:** on 1,704 synthetic chats, from templates frozen before any recogniser was written, the patterns missed none of 1,827 phone numbers, 1,552 NIKs, 1,704 emails, 1,000 plates or 1,552 account numbers (95% upper bounds of 0.21% to 0.38%). They redacted none of 4,844 look-alikes, such as prices, product names and dates. The chats share one author’s templates, so this is a lower bound on difficulty; numbers spelled out in words and disguised emails still slip through.
- **Names and addresses:** three NER models were compared on 2,000 development chats, and NusaBert was kept. With the name and street patterns added, it misses 2.4% of names (54) and no addresses, and redacts no look-alikes. Those patterns were written knowing the development templates, so these numbers flatter them, and the held-out test showed it. Scored once against targets fixed in advance, it missed 8.3% of names (213 of 2,554, against a target of at most 5%) and redacted 90 promo codes and product names (against a target of none), so it **fails** both. It passed on addresses (0 of 593 missed) and on the direct identifiers (none missed). That held-out result is published on a branch not yet merged into main.
- **Privacy first:** everything so far is synthetic. Real chats wait for written permission covering research and publication, and for ethics approval. They are never put in the repository or sent to outside AI services, and a test fails the build if a chat marked real is ever committed.
- **The rubric (planned):** it will code the agent’s turns on ideas from marketing research: commitment and trust, SERVQUAL’s responsiveness, assurance and empathy, and personalisation. Human raters and two or three local AI judges will score it, and a judge is trusted only on the codes where it agrees with people.
- **Status:** in progress, under the MIT licence. The anonymiser is built, and so is the chat record format that every tool reads and writes, tagged v0.1.0 so other projects can depend on it. The anonymiser fails its held-out targets for names and look-alikes, so its next step is new development templates for the shapes it got wrong. The rubric and the judges come after that.

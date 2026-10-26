---
title: "MCP-backbone: server basis data yang tidak dapat disalahgunakan oleh AI"
summary: Server MCP yang memungkinkan model AI mengajukan kueri ke Postgres secara aman.
category: portfolio
order: 1
status: live
stack: Python · FastAPI · MCP SDK · Postgres
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/MCP-backbone", primary: true }
  - { label: Situs daring, href: "https://mcp.my.id" }
  - { label: Red team, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/RED_TEAM.md" }
  - { label: Tolok ukur, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/BENCHMARK.md" }
---

Server MCP yang memungkinkan model AI menelusuri dan mengajukan kueri ke basis data Postgres secara aman.

- Setiap kueri diurai, diperiksa biayanya, dijalankan dalam mode baca saja, dan dicatat.
- Basis data itu sendiri menolak operasi penulisan, sehingga kesalahan pada validator tidak dapat menyebabkan hilangnya data.
- **Bukti:** rangkaian uji *red team* yang bersifat adversarial serta 141 pengujian terhadap basis data Postgres sungguhan. Dalam tolok ukur, `gpt-5-mini` menjawab 29 dari 30 pertanyaan dengan benar di bawah penilaian yang ketat.

Sistem ini menjadi fondasi bagi dua proyek lainnya. *Harness* evaluasi mengukur agen yang menggunakannya, dan skema alatnya diperbaiki setelah *harness* tersebut menemukan bahwa skema itu tidak kompatibel dengan mode ketat (*strict mode*) OpenAI.

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
screenshots:
  - src: step1.gif
    still: step1-still.png
    alt: "Claude Code memuat skill query-database, memanggil list_tables dan describe_table, lalu menjawab dengan tiga film yang paling sering disewa."
    caption: "Ajukan pertanyaan. Claude menelusuri skema, lalu menjalankan satu kueri baca-saja."
  - src: step2.gif
    still: step2-still.png
    alt: "Ketika diminta menjalankan DELETE FROM rental, server menolaknya karena hanya pernyataan SELECT yang diizinkan, sehingga tidak ada data yang terhapus."
    caption: "Coba ubah data. Server menolak apa pun selain satu pernyataan SELECT."
  - src: step3.png
    alt: "Jejak audit di konsol: DELETE yang ditolak ditampilkan dengan warna merah beserta alasannya, kueri yang berhasil beserta biayanya, dan grafik 14 hari."
    caption: "Periksa apa yang dijalankan. Setiap kueri, termasuk yang ditolak, tercatat dalam jejak audit."
---

Server MCP yang memungkinkan model AI menelusuri dan mengajukan kueri ke basis data Postgres secara aman.

- Setiap kueri diurai, diperiksa biayanya, dijalankan dalam mode baca saja, dan dicatat.
- Basis data itu sendiri menolak operasi penulisan, sehingga kesalahan pada validator tidak dapat menyebabkan hilangnya data.
- **Bukti:** rangkaian uji *red team* yang bersifat adversarial serta 141 pengujian terhadap basis data Postgres sungguhan. Dalam tolok ukur, `gpt-5-mini` menjawab 29 dari 30 pertanyaan dengan benar di bawah penilaian yang ketat.

Sistem ini menjadi fondasi bagi dua proyek lainnya. *Harness* evaluasi mengukur agen yang menggunakannya, dan skema alatnya diperbaiki setelah *harness* tersebut menemukan bahwa skema itu tidak kompatibel dengan mode ketat (*strict mode*) OpenAI.

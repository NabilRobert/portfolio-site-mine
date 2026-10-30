// Indonesian interface strings, in formal standard Indonesian (bahasa baku,
// addressing the reader as "Anda"). Written for meaning rather than
// translated word for word. tests/content.spec.ts keeps its keys in step with en.ts.
import type { LocaleStrings } from '../types'

export default {
  meta: {
    title: 'Muhammad Nabil Rinaldi | AI Fullstack Engineer',
    description:
      'Portofolio Muhammad Nabil Rinaldi, AI fullstack engineer: server MCP basis data yang tidak dapat disalahgunakan oleh AI, gateway keamanan yang terukur untuk alat agen AI, harness evaluasi agen, pelacakan permintaan agen dari ujung ke ujung, dan pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu.',
  },
  nav: {
    label: 'Navigasi utama',
    skip: 'Langsung ke konten',
    work: 'Karya',
    about: 'Profil',
    contact: 'Kontak',
    language: 'Bahasa',
  },
  about: {
    heading: 'Profil',
    name: 'Muhammad Nabil Rinaldi',
    role: 'AI Fullstack Engineer',
    lead: 'Saya merancang dan membangun sistem AI, serta membuktikan bahwa sistem tersebut berfungsi. Portofolio ini menyajikan server basis data yang tidak dapat disalahgunakan oleh AI, harness yang mengukur apakah kinerja suatu agen meningkat atau menurun, pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu, gateway pengaman alat agen AI yang setiap klaimnya dibuktikan lewat pengukuran, pelacakan yang mengikuti satu permintaan agen melalui semua sistem tersebut, platform belajar bahasa Jepang yang dijalankan oleh tim kecil agen AI, serta bug yang ditemukan oleh harness tersebut dan dilaporkan ke kerangka kerja sumber terbuka Inspect AI.',
    seeking: 'Terbuka untuk posisi AI engineer.',
  },
  featured: { label: 'Unggulan', draft: 'Draf, belum diterbitkan' },
  flow: {
    heading: 'Keterkaitan ketujuh proyek',
    steps: {
      'mcp-backbone': 'Sistem yang digunakan oleh AI',
      'agent-eval-harness': 'Mengukur sistem semacam itu',
      pitstop: 'Satu sistem yang telah beroperasi, beserta buktinya',
      'mcp-security-gateway': 'Mengamankan alat yang disediakan sistem semacam itu bagi AI',
      'agent-observability': 'Melacak satu permintaan melalui semuanya, beserta waktu dan biayanya',
      juku: 'Menerapkan semuanya bagi pelajar bahasa Jepang',
      'inspect-strict-tools': 'Bug yang ditemukan harness, dilaporkan ke hulu',
    },
  },
  categories: {
    portfolio: 'Proyek portofolio',
    opensource: 'Kontribusi sumber terbuka',
    other: 'Karya lainnya',
  },
  status: {
    live: 'Aktif',
    ci: 'CI',
    archived: 'Diarsipkan',
    wip: 'Dalam pengerjaan',
    proposed: 'Diusulkan',
    review: 'Sedang ditinjau',
  },
  projectsPage: {
    heading: 'Semua proyek',
    lead: 'Setiap proyek menautkan kode sumbernya serta bukti yang mendukung klaimnya.',
  },
  project: {
    back: 'Semua proyek',
    notFound: 'Proyek yang Anda cari tidak ditemukan.',
    stack: 'Teknologi',
    status: 'Status',
    screenshots: 'Tur singkat',
    key: 'Keterangan',
    links: 'Tautan',
  },
  contact: {
    heading: 'Kontak',
    text: 'Silakan menghubungi saya mengenai karya mana pun di sini. Rincian setiap proyek tersedia di repositorinya, dan buktinya disajikan dalam studi kasus.',
    links: { github: 'GitHub', email: 'Surel', linkedin: 'LinkedIn', cv: 'CV (PDF)' },
  },
  notFound: {
    heading: 'Halaman tidak ditemukan',
    text: 'Alamat tersebut mungkin keliru, atau halamannya telah dipindahkan.',
    home: 'Kembali ke beranda',
  },
} satisfies LocaleStrings

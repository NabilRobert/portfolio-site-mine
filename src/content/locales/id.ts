// Indonesian interface strings, in formal standard Indonesian (bahasa baku,
// addressing the reader as "Anda"). Written for meaning rather than
// translated word for word. tests/content.spec.ts keeps its keys in step with en.ts.
import type { LocaleStrings } from '../types'

export default {
  meta: {
    title: 'Nabil Robert | AI Fullstack Engineer',
    description:
      'Portofolio Nabil Robert, AI fullstack engineer: server MCP basis data yang tidak dapat disalahgunakan oleh AI, harness evaluasi agen, dan pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu.',
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
    name: 'Nabil Robert',
    role: 'AI Fullstack Engineer',
    lead: 'Saya merancang dan membangun sistem AI, serta membuktikan bahwa sistem tersebut berfungsi. Portofolio ini menyajikan server basis data yang tidak dapat disalahgunakan oleh AI, harness yang mengukur apakah kinerja suatu agen meningkat atau menurun, dan pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu, yang didokumentasikan dari catatan operasionalnya sendiri.',
    seeking: '',
  },
  featured: { label: 'Unggulan' },
  flow: {
    heading: 'Keterkaitan ketiga proyek',
    steps: {
      'mcp-backbone': 'Sistem yang digunakan oleh AI',
      'agent-eval-harness': 'Mengukur sistem semacam itu',
      pitstop: 'Satu sistem yang telah beroperasi, beserta buktinya',
    },
  },
  categories: {
    portfolio: 'Proyek portofolio',
    opensource: 'Kontribusi sumber terbuka',
    other: 'Karya lainnya',
  },
  status: { live: 'Aktif', ci: 'CI', archived: 'Diarsipkan', wip: 'Dalam pengerjaan' },
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

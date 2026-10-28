// English interface strings, in a formal register. Project text lives in
// content/projects/*/en.md. TODO(Arthur): the "seeking" line.
export default {
  meta: {
    title: 'Nabil Robert | AI Fullstack Engineer',
    description:
      'Portfolio of Nabil Robert, AI fullstack engineer: a database MCP server that an AI cannot misuse, an agent evaluation harness, and an agent pipeline that ran unattended for eleven weeks.',
  },
  nav: {
    label: 'Main',
    skip: 'Skip to content',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    language: 'Language',
  },
  about: {
    heading: 'About',
    name: 'Nabil Robert',
    role: 'AI Fullstack Engineer',
    lead: 'I design and build AI systems, and I demonstrate that they work. This portfolio presents a database server that an AI cannot misuse, a harness that measures whether an agent has improved or regressed, and an agent pipeline that ran unattended for eleven weeks, documented from its own run records.',
    seeking: '',
  },
  featured: { label: 'Featured', draft: 'Draft, not published' },
  flow: {
    heading: 'How the three projects relate',
    steps: {
      'mcp-backbone': 'A system that an AI uses',
      'agent-eval-harness': 'Measures systems of this kind',
      pitstop: 'One such system in operation, with evidence',
    },
  },
  categories: {
    portfolio: 'Portfolio projects',
    opensource: 'Open-source contributions',
    other: 'Other work',
  },
  status: { live: 'Live', ci: 'CI', archived: 'Archived', wip: 'In progress' },
  projectsPage: {
    heading: 'All projects',
    lead: 'Each project links to its source code and to the evidence behind its claims.',
  },
  project: {
    back: 'All projects',
    notFound: 'This project could not be found.',
    stack: 'Stack',
    status: 'Status',
    screenshots: 'A guided tour',
    key: 'Key',
    links: 'Links',
  },
  contact: {
    heading: 'Contact',
    text: 'I welcome enquiries about any of this work. Each repository documents the details, and the case study presents the evidence.',
    links: { github: 'GitHub', email: 'Email', linkedin: 'LinkedIn', cv: 'CV (PDF)' },
  },
  notFound: {
    heading: 'Page not found',
    text: 'The address may be mistyped, or the page may have moved.',
    home: 'Return home',
  },
}

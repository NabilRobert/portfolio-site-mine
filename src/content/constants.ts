// The fixed lists the content is checked against. Kept free of any library,
// so the site's bundle can use them without pulling in the schema validator.

export const categories = ['portfolio', 'opensource', 'other'] as const
export const statuses = ['live', 'ci', 'archived', 'wip', 'proposed'] as const

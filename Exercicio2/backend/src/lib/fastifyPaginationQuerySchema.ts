export const paginationQuerySchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        take: { type: 'number' },
      },
    },
  },
}

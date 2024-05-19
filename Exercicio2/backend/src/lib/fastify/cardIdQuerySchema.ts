export const cardIdQuerySchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        cardId: { type: 'string' },
      },
    },
  },
}

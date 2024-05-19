export const plateQuerySchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        plate: { type: 'string' },
      },
    },
  },
}

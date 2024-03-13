import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        // Add a new field to the schema.
        category: z
          .enum(['components', 'experimental', 'frameworks', 'getting-started', 'resources', 'tokens', 'tutorials'])
          .optional()
      })
    })
  }),
  i18n: defineCollection({ type: 'data', schema: i18nSchema() })
};

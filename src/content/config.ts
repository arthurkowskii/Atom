import { defineCollection, z } from 'astro:content';

// Define the projects collection schema
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    domain: z.string(), // Determines which shell (e.g., "Web Dev", "Machine Learning", "Design")
    description: z.string(),
    tech: z.array(z.string()),
    status: z.enum(['completed', 'in-progress', 'planned']),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    date: z.date(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
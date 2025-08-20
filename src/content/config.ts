import { defineCollection, z } from 'astro:content';

// Define the projects collection schema
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    domain: z.string().optional(), // Optional - will be computed from folder structure if not provided
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

// Define the bio collection schema
const bioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(), // Display name
    subtitle: z.string(),
    bio: z.string(), // Markdown string
    portrait: z.string().optional(),
    email: z.string().email(),
    social: z
      .array(z.object({ platform: z.string(), url: z.string().url() }))
      .optional(),
    skills: z
      .array(
        z.object({
          category: z.string(),
          tools: z.array(z.string()),
        })
      )
      .optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  bio: bioCollection,
};

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    pubDate: z.date(),
    updated: z.date().optional(),
    category: z.enum(['AI Persona 基礎', '個人品牌定位', 'AI 視覺與角色宇宙', 'AI 客戶理解', '案例觀察']),
    pillar: z.string().optional(),          // 內部配比用，不輸出
    cover: z.string().optional(),
    coverSlot: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { articles };

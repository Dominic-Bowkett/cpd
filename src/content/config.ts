/**
 * Content Collections — typed frontmatter for all article content.
 * Two collections: `training` (career/qualification pages at the site root) and
 * `cpd` (the CPD hub + free-resources directory under /cpd). They share one
 * schema so ArticleLayout can render either uniformly.
 */
import { defineCollection, z } from "astro:content";

const faqItem = z.object({
  question: z.string(),
  answer: z.string(), // may contain inline HTML; rendered with set:html
});

const howToStep = z.object({
  name: z.string(),
  text: z.string(),
});

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  /** Primary SEO target keyword for this page. */
  targetKeyword: z.string(),
  /** Last human-reviewed date (E-E-A-T "last reviewed"). */
  lastReviewed: z.coerce.date(),
  /** Optional published date; defaults to lastReviewed if omitted. */
  datePublished: z.coerce.date().optional(),
  /** Which CTA block to show at the end of the article. */
  cta: z.enum(["signup", "course", "directory"]).default("signup"),
  /** Emit Course JSON-LD as well as Article (for training/qualification pages). */
  course: z.boolean().default(false),
  /** Optional FAQ block → rendered + FAQPage schema. */
  faqs: z.array(faqItem).optional(),
  /** Optional step list → HowTo schema on step-by-step pages. */
  howToSteps: z.array(howToStep).optional(),
  /** Optional per-page OG image override. */
  ogImage: z.string().optional(),
  /** Hide from listings/sitemap while drafting. */
  draft: z.boolean().default(false),
});

const training = defineCollection({ type: "content", schema: articleSchema });
const cpd = defineCollection({ type: "content", schema: articleSchema });

export const collections = {
  training,
  cpd,
};

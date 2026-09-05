import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Locale } from './i18n';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

function localeDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale);
}

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Post metadata for one locale, newest first. */
export function getPosts(locale: Locale): PostMeta[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ''),
        excerpt: String(data.excerpt ?? ''),
        author: data.author ? String(data.author) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingMinutes: readingMinutes(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(locale: Locale, slug: string): Post | null {
  const file = path.join(localeDir(locale), `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    excerpt: String(data.excerpt ?? ''),
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function formatDate(date: string, locale: Locale): string {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(locale === 'hu' ? 'hu-HU' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

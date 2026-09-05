import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Post metadata, newest first. */
export function getPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
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

export function getPost(slug: string): Post | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
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

export function formatDate(date: string): string {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { content } from '@/lib/content';
import { getPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: content.blog.title,
  description: content.blog.lede,
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{content.nav.blog}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {content.blog.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {content.blog.lede}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {posts.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <p className="text-sm text-foreground-secondary">{content.blog.empty}</p>
          </div>
        ) : (
          <ul className="border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link href={`/blog/${post.slug}`} className="group block py-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <time dateTime={post.date} className="font-mono-id text-foreground-tertiary">
                      {formatDate(post.date)}
                    </time>
                    <span className="font-mono-id text-foreground-tertiary">
                      {post.readingMinutes} {content.blog.minuteRead}
                    </span>
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    {content.blog.readMore}
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

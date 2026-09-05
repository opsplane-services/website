import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { content } from '@/lib/content';
import { getPost, getPosts, formatDate } from '@/lib/blog';

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date || undefined,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        {content.blog.back}
      </Link>

      <header className="mt-8 border-b border-border pb-8">
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
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary">{post.excerpt}</p>
        )}
        {post.author && <p className="mt-4 text-sm text-foreground-tertiary">{post.author}</p>}
      </header>

      <div className="article mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/lib/dictionaries';
import { getPosts, formatDate } from '@/lib/blog';
import { locales, isLocale, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return { title: dict.blog.title, description: dict.blog.lede };
}

export default function BlogIndex({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const posts = getPosts(locale);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.nav.blog}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {dict.blog.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.blog.lede}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {posts.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <p className="text-sm text-foreground-secondary">{dict.blog.empty}</p>
          </div>
        ) : (
          <ul className="border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link href={`/${locale}/blog/${post.slug}`} className="group block py-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <time dateTime={post.date} className="font-mono-id text-foreground-tertiary">
                      {formatDate(post.date, locale)}
                    </time>
                    <span className="font-mono-id text-foreground-tertiary">
                      {post.readingMinutes} {dict.blog.minuteRead}
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
                    {dict.blog.readMore}
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

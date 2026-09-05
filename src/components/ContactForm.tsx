'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Mail, Send } from 'lucide-react';
import { Button, ButtonLink } from './ui/Button';
import { content } from '@/lib/content';
import { site } from '@/lib/site';

const inputClass =
  'mt-1 h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-tertiary focus:border-accent';
const labelClass = 'block text-xs font-medium uppercase tracking-wide text-foreground-secondary';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Without a Formspree id there is no endpoint to post to, so fall back to
  // opening the visitor's mail client rather than showing a form that fails.
  if (!site.formspreeId) {
    return (
      <div className="border border-border bg-background p-6">
        <div className="flex items-start gap-3">
          <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-foreground-secondary" />
          <div>
            <h2 className="text-sm font-medium text-foreground">{content.contact.directTitle}</h2>
            <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
              {content.contact.directBody}
            </p>
          </div>
        </div>
        <ButtonLink href={`mailto:${site.email}`} size="lg" className="mt-5 w-full">
          <Mail size={16} strokeWidth={1.5} />
          {site.email}
        </ButtonLink>
        <p className="mt-3 text-xs text-foreground-tertiary">{content.contact.mailtoNote}</p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people leave this hidden field empty.
    if (data.get('_gotcha')) return;

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-background p-6">
      {status === 'sent' && (
        <div className="mb-5 flex items-start gap-2 border border-border bg-background-secondary px-3 py-2 text-sm text-foreground">
          <CheckCircle2 size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          {content.contact.success}
        </div>
      )}
      {status === 'error' && (
        <div className="mb-5 flex items-start gap-2 border border-severity-critical px-3 py-2 text-sm text-severity-critical">
          <AlertCircle size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          {content.contact.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {content.contact.name}
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {content.contact.email}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {content.contact.company}{' '}
            <span className="normal-case text-foreground-tertiary">({content.contact.optional})</span>
          </label>
          <input id="company" name="company" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>
            {content.contact.subject}
          </label>
          <input id="subject" name="subject" type="text" required className={inputClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          {content.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1 w-full resize-y border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-foreground-tertiary focus:border-accent"
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Button
        type="submit"
        size="lg"
        loading={status === 'sending'}
        className="mt-5 w-full sm:w-auto"
      >
        {status !== 'sending' && <Send size={16} strokeWidth={1.5} />}
        {status === 'sending' ? content.contact.sending : content.contact.send}
      </Button>
    </form>
  );
}

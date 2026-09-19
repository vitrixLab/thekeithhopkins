'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

import type { SiteConfig } from '@/lib/types';

/* Media appearances quoted from the live artist page (thekeithhopkins.com):
   "public appearances on major TV networks like NEWSMAX, FOX 5 Las Vegas,
    FOX 35 Orlando, and KUSI San Diego". Rendered as text badges, not
   outbound links — no URLs invented. */
const MEDIA_APPEARANCES = [
  'NEWSMAX',
  'FOX 5 Las Vegas',
  'FOX 35 Orlando',
  'KUSI San Diego',
];

export default function ContactSection({ config }: { config: SiteConfig }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      {/* ─── Media appearances bar (quoted from live artist page) ──────── */}
      <section
        id="partners"
        aria-label="Media Appearances"
        className="border-y border-gray-800 bg-surface-1 py-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-gray-600">
            As Seen On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {MEDIA_APPEARANCES.map((name) => (
              <span
                key={name}
                className="text-sm font-bold uppercase tracking-widest text-gray-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Form ──────────────────────────────────────────── */}
      <section
        id="contact"
        aria-label="Contact Keith Hopkins"
        className="section-padding bg-surface-base"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            {/* Left — copy with real contact details from live site */}
            <div>
              <span className="badge">Contact Us</span>
              <h2 className="text-display-lg mt-4 text-white">
                Have a project in mind?{' '}
                <span className="text-gradient-gold">Let&apos;s discuss</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Reach out about services, products, or partnerships.
              </p>

              <ul className="mt-10 space-y-5 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  <div>
                    <span className="font-semibold text-white">Our Location: </span>
                    {config.contact.address}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  <div>
                    <span className="font-semibold text-white">Email Us: </span>
                    <a href={`mailto:${config.contact.email}`} className="link-hover text-brand-400">
                      {config.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  <div>
                    <span className="font-semibold text-white">Call Us: </span>
                    <a href={`tel:+1${config.contact.phone}`} className="link-hover text-brand-400">
                      {config.contact.phone_display}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  <div>
                    <span className="font-semibold text-white">Working Hours: </span>
                    {config.contact.hours.join(' · ')}
                  </div>
                </li>
              </ul>
            </div>

            {/* Right — form */}
            <div className="glass-card p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle className="h-14 w-14 text-brand-400" />
                  <h3 className="text-xl font-bold text-white">
                    Message Received!
                  </h3>
                  <p className="text-gray-400">
                    Keith will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-ghost mt-4 text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  {submitError && (
                    <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-label-sm mb-1.5 block text-gray-400"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        {...register('name')}
                        className={cn(
                          'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                          errors.name
                            ? 'border-red-500/50'
                            : 'border-gray-700',
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-label-sm mb-1.5 block text-gray-400"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className={cn(
                          'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                          errors.email
                            ? 'border-red-500/50'
                            : 'border-gray-700',
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="text-label-sm mb-1.5 block text-gray-400"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="How can Keith help?"
                      {...register('subject')}
                      className={cn(
                        'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                        errors.subject
                          ? 'border-red-500/50'
                          : 'border-gray-700',
                      )}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-label-sm mb-1.5 block text-gray-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project, goals, or questions…"
                      {...register('message')}
                      className={cn(
                        'w-full resize-none rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                        errors.message
                          ? 'border-red-500/50'
                          : 'border-gray-700',
                      )}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      'Sending…'
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

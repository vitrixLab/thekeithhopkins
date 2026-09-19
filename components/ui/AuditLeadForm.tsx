'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  company: z.string().min(2, 'Company name is required'),
  website: z.string().url('Please enter a valid URL (e.g. https://yourcompany.com)').optional().or(z.literal('')),
  currentRevenue: z.string().min(1, 'Please select your revenue range'),
  primaryBottleneck: z.string().min(1, 'Please select your primary bottleneck'),
});

type AuditFormData = z.infer<typeof schema>;

export default function AuditLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AuditFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/audit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to submit audit request. Please try again.');
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

  if (submitted) {
    return (
      <div className="glass-card flex flex-col items-center p-8 sm:p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/30">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-display-md mt-6 text-white">
          Audit Request Confirmed
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-300">
          We have received your business details. Our commercial strategy team is reviewing your pipeline and will deliver your customized audit brief within 24–48 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-ghost mt-6 text-xs"
        >
          Submit another audit request
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 sm:p-10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">
          Request Your Free Pipeline Audit
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Zero cost, zero obligation. Get a comprehensive diagnostic of your revenue bottlenecks and actionable growth levers.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="text-label-sm mb-1.5 block text-gray-400">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Keith Hopkins"
              {...register('fullName')}
              className={cn(
                'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                errors.fullName ? 'border-red-500/50' : 'border-gray-700',
              )}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          {/* Work Email */}
          <div>
            <label htmlFor="email" className="text-label-sm mb-1.5 block text-gray-400">
              Work Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="keith@yourcompany.com"
              {...register('email')}
              className={cn(
                'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                errors.email ? 'border-red-500/50' : 'border-gray-700',
              )}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Company Name */}
          <div>
            <label htmlFor="company" className="text-label-sm mb-1.5 block text-gray-400">
              Company Name *
            </label>
            <input
              id="company"
              type="text"
              placeholder="Acme Ventures"
              {...register('company')}
              className={cn(
                'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                errors.company ? 'border-red-500/50' : 'border-gray-700',
              )}
            />
            {errors.company && (
              <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label htmlFor="website" className="text-label-sm mb-1.5 block text-gray-400">
              Website URL
            </label>
            <input
              id="website"
              type="url"
              placeholder="https://yourcompany.com"
              {...register('website')}
              className={cn(
                'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                errors.website ? 'border-red-500/50' : 'border-gray-700',
              )}
            />
            {errors.website && (
              <p className="mt-1 text-xs text-red-400">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Revenue Range */}
          <div>
            <label htmlFor="currentRevenue" className="text-label-sm mb-1.5 block text-gray-400">
              Current Annual Revenue *
            </label>
            <select
              id="currentRevenue"
              {...register('currentRevenue')}
              className={cn(
                'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                errors.currentRevenue ? 'border-red-500/50' : 'border-gray-700',
              )}
            >
              <option value="">Select range...</option>
              <option value="Under $250K">Under $250K</option>
              <option value="$250K - $1M">$250K - $1M</option>
              <option value="$1M - $5M">$1M - $5M</option>
              <option value="$5M - $20M">$5M - $20M</option>
              <option value="$20M+">$20M+</option>
            </select>
            {errors.currentRevenue && (
              <p className="mt-1 text-xs text-red-400">{errors.currentRevenue.message}</p>
            )}
          </div>

          {/* Primary Bottleneck */}
          <div>
            <label htmlFor="primaryBottleneck" className="text-label-sm mb-1.5 block text-gray-400">
              Primary Bottleneck *
            </label>
            <select
              id="primaryBottleneck"
              {...register('primaryBottleneck')}
              className={cn(
                'w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30',
                errors.primaryBottleneck ? 'border-red-500/50' : 'border-gray-700',
              )}
            >
              <option value="">Select primary challenge...</option>
              <option value="Lead Generation & Qualified Volume">Lead Generation &amp; Qualified Volume</option>
              <option value="Sales Pipeline Conversion">Sales Pipeline Conversion</option>
              <option value="Commercial Contract & Pricing Strategy">Commercial Contract &amp; Pricing Strategy</option>
              <option value="Operational Scaling & Team Capacity">Operational Scaling &amp; Team Capacity</option>
              <option value="Market Entry & Partnership Development">Market Entry &amp; Partnership Development</option>
            </select>
            {errors.primaryBottleneck && (
              <p className="mt-1 text-xs text-red-400">{errors.primaryBottleneck.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {isSubmitting ? (
            'Analyzing Pipeline…'
          ) : (
            <>
              Request Free AI Pipeline Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

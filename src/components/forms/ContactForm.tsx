'use client';

import { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <GlassPanel className="text-center relative">
        <GradientOrb color="forest" size="sm" speed="normal" className="-top-10 -right-10 opacity-20" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-forest-500/10 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-2">Message Sent!</h3>
          <p className="text-charcoal-950/60">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
        </div>
      </GlassPanel>
    );
  }

  const inputClasses = 'w-full py-3 px-4 rounded-lg bg-white/50 border border-charcoal-900/10 text-charcoal-950 placeholder:text-charcoal-950/40 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] outline-none';

  return (
    <GlassPanel className="relative">
      <GradientOrb color="amber" size="sm" speed="slow" className="-top-10 -left-10 opacity-20" />
      <GradientOrb color="forest" size="sm" speed="normal" className="-bottom-10 -right-10 opacity-15" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-1">Message Us Anytime</h3>
        <p className="text-charcoal-950/60 mb-8">Schedule a Meeting</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal-950/70 mb-1">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal-950/70 mb-1">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="your@email.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-charcoal-950/70 mb-1">Phone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="(555) 000-0000" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-charcoal-950/70 mb-1">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses} placeholder="Subject" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-charcoal-950/70 mb-1">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={`${inputClasses} resize-none`} placeholder="Your message..." />
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
            Send Message
          </Button>
        </form>
      </div>
    </GlassPanel>
  );
}

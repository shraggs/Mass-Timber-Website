import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { slideshowImages } from '@/data/slideshow-images';
import { CONTACT_EMAIL, CONTACT_PHONE, BUSINESS_HOURS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with IW Mass Timber. Schedule a meeting or ask about mass timber construction services.',
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with our mass timber experts"
        backgroundImage="/images/rotated-contact.jpeg"
        images={slideshowImages.contact}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <GlassCard hover padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">Email</h3>
                    <p className="text-sm text-charcoal-950/60 mt-1">Email us anytime and we will respond to your question</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-500 font-semibold text-sm mt-2 inline-block hover:text-amber-600 transition-colors">{CONTACT_EMAIL}</a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">Phone</h3>
                    <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`} className="text-amber-500 font-semibold text-sm mt-2 inline-block hover:text-amber-600 transition-colors">{CONTACT_PHONE}</a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">Business Hours</h3>
                    <p className="text-sm text-charcoal-950/60 mt-1">{BUSINESS_HOURS}</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <PartnerLogos />
    </>
  );
}

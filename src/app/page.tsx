import { HeroSection } from '@/components/sections/HeroSection';
import { WhatIsMassTimber } from '@/components/sections/WhatIsMassTimber';
import { StatsBar } from '@/components/sections/StatsBar';
import { DirectoryPreview } from '@/components/sections/DirectoryPreview';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ProjectCategories } from '@/components/sections/ProjectCategories';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { ContactPreview } from '@/components/sections/ContactPreview';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { SectionDivider } from '@/components/ui/SectionDivider';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="wave" fillColor="#FDFCF8" />
      <WhatIsMassTimber />
      <StatsBar />
      <SectionDivider variant="diagonal" fillColor="#FDFCF8" />
      <DirectoryPreview />
      <SectionDivider variant="diagonal-reverse" fillColor="#FDFCF8" />
      <FeaturedProjects />
      <SectionDivider variant="diagonal" fillColor="#1A1A17" />
      <ProjectCategories />
      <SectionDivider variant="wave" fillColor="#FDFCF8" />
      <ProcessTimeline />
      <ComparisonSection />
      <SectionDivider variant="diagonal" fillColor="#FDFCF8" />
      <TestimonialSlider />
      <FAQSection />
      <SectionDivider variant="diagonal-reverse" fillColor="#1A1A17" />
      <CTASection />
      <SectionDivider variant="wave" fillColor="#FDFCF8" />
      <ContactPreview />
      <PartnerLogos />
    </>
  );
}

import { HeroSection } from '@/components/sections/HeroSection';
import { WhatIsMassTimber } from '@/components/sections/WhatIsMassTimber';
import { DirectoryPreview } from '@/components/sections/DirectoryPreview';
import { ProjectCategories } from '@/components/sections/ProjectCategories';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { ContactPreview } from '@/components/sections/ContactPreview';
import { PartnerLogos } from '@/components/sections/PartnerLogos';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatIsMassTimber />
      <DirectoryPreview />
      <ProjectCategories />
      <TestimonialSlider />
      <ContactPreview />
      <PartnerLogos />
    </>
  );
}

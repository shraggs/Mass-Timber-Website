'use client';

import type { ComponentType } from 'react';
import type { BlockDefinition } from '@/types/page-builder';

import { HeroSection } from '@/components/sections/HeroSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { StatsSection } from '@/components/sections/StatsSection';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { NetworkSection } from '@/components/sections/NetworkSection';
import { TeamPreview } from '@/components/sections/TeamPreview';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { ProjectsOfTheYear } from '@/components/sections/ProjectsOfTheYear';
import { ContactPreview } from '@/components/sections/ContactPreview';
import { DirectoryPreview } from '@/components/sections/DirectoryPreview';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { ProjectCategories } from '@/components/sections/ProjectCategories';
import { WhatIsMassTimber } from '@/components/sections/WhatIsMassTimber';
import { PageBanner } from '@/components/layout/PageBanner';
import { ContactForm } from '@/components/forms/ContactForm';
import { AboutUnionSection } from '@/components/sections/AboutUnionSection';
import { AboutFeaturedProjects } from '@/components/sections/AboutFeaturedProjects';
import { ContactInfoSection } from '@/components/sections/ContactInfoSection';
import { ProjectsDirectory } from '@/components/sections/ProjectsDirectory';
import { ContractorsDirectory } from '@/components/sections/ContractorsDirectory';
import { SuppliersDirectory } from '@/components/sections/SuppliersDirectory';
import { FAQWithChat } from '@/components/sections/FAQWithChat';
import { SafetyIntro } from '@/components/sections/SafetyIntro';
import { SafetyPillars } from '@/components/sections/SafetyPillars';
import { SafetyCTA } from '@/components/sections/SafetyCTA';
import { TrainingLinks } from '@/components/sections/TrainingLinks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>;

// Component map: type string -> React component
export const blockComponents: Record<string, AnyComponent> = {
  HeroSection,
  PageBanner,
  StatsBar,
  StatsSection,
  FeaturedProjects,
  TeamPreview,
  TestimonialSlider,
  ComparisonSection,
  ProjectsOfTheYear,
  NetworkSection,
  PartnerLogos,
  ContactPreview,
  ContactForm,
  ContactInfoSection,
  DirectoryPreview,
  CTASection,
  FAQSection,
  ProcessTimeline,
  ProjectCategories,
  WhatIsMassTimber,
  AboutUnionSection,
  AboutFeaturedProjects,
  ProjectsDirectory,
  ContractorsDirectory,
  SuppliersDirectory,
  FAQWithChat,
  SafetyIntro,
  SafetyPillars,
  SafetyCTA,
  TrainingLinks,
};

// Block metadata: labels, icons, categories, configurable fields
export const blockDefinitions: Record<string, BlockDefinition> = {
  HeroSection: {
    label: 'Hero Section',
    icon: 'Monitor',
    category: 'hero',
    fields: [],
    defaultProps: {},
  },
  PageBanner: {
    label: 'Page Banner',
    icon: 'Image',
    category: 'hero',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'backgroundImage', label: 'Background Image', type: 'image' },
    ],
    defaultProps: { title: 'Page Title', subtitle: '', backgroundImage: '/images/hero-interior.png' },
  },
  StatsBar: {
    label: 'Stats Bar',
    icon: 'BarChart3',
    category: 'data',
    fields: [],
    defaultProps: {},
  },
  StatsSection: {
    label: 'Stats Section',
    icon: 'TrendingUp',
    category: 'data',
    fields: [],
    defaultProps: {},
  },
  FeaturedProjects: {
    label: 'Featured Projects',
    icon: 'Star',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  TeamPreview: {
    label: 'Team Preview',
    icon: 'Users',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  TestimonialSlider: {
    label: 'Testimonials',
    icon: 'MessageSquare',
    category: 'social-proof',
    fields: [],
    defaultProps: {},
  },
  ComparisonSection: {
    label: 'Comparison Table',
    icon: 'Table',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  ProjectsOfTheYear: {
    label: 'Projects of the Year',
    icon: 'Award',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  NetworkSection: {
    label: 'Network Section',
    icon: 'Globe',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  PartnerLogos: {
    label: 'Partner Logos',
    icon: 'Handshake',
    category: 'social-proof',
    fields: [],
    defaultProps: {},
  },
  ContactPreview: {
    label: 'Location Cards',
    icon: 'MapPin',
    category: 'content',
    fields: [
      { key: 'showCta', label: 'Show CTA Button', type: 'boolean' },
    ],
    defaultProps: { showCta: true },
  },
  ContactForm: {
    label: 'Contact Form',
    icon: 'Mail',
    category: 'cta',
    fields: [],
    defaultProps: {},
  },
  ContactInfoSection: {
    label: 'Contact Info Cards',
    icon: 'Phone',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  DirectoryPreview: {
    label: 'Directory Preview',
    icon: 'Building2',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  CTASection: {
    label: 'Call to Action',
    icon: 'Megaphone',
    category: 'cta',
    fields: [],
    defaultProps: {},
  },
  FAQSection: {
    label: 'FAQ Accordion',
    icon: 'HelpCircle',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  ProcessTimeline: {
    label: 'Process Timeline',
    icon: 'GitBranch',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  ProjectCategories: {
    label: 'Project Categories',
    icon: 'Grid3X3',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  WhatIsMassTimber: {
    label: 'What is Mass Timber',
    icon: 'TreePine',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  AboutUnionSection: {
    label: 'About the Union',
    icon: 'BookOpen',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  AboutFeaturedProjects: {
    label: 'Featured Projects Grid',
    icon: 'LayoutGrid',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  ProjectsDirectory: {
    label: 'Projects Directory',
    icon: 'Briefcase',
    category: 'data',
    fields: [],
    defaultProps: {},
  },
  ContractorsDirectory: {
    label: 'Contractors Directory',
    icon: 'Building2',
    category: 'data',
    fields: [],
    defaultProps: {},
  },
  SuppliersDirectory: {
    label: 'Suppliers Directory',
    icon: 'Package',
    category: 'data',
    fields: [],
    defaultProps: {},
  },
  FAQWithChat: {
    label: 'FAQ + AI Chat',
    icon: 'HelpCircle',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  SafetyIntro: {
    label: 'Safety Intro',
    icon: 'Shield',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  SafetyPillars: {
    label: 'Safety Pillars Grid',
    icon: 'Shield',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
  SafetyCTA: {
    label: 'Safety CTA',
    icon: 'Megaphone',
    category: 'cta',
    fields: [],
    defaultProps: {},
  },
  TrainingLinks: {
    label: 'Training Links Grid',
    icon: 'GraduationCap',
    category: 'content',
    fields: [],
    defaultProps: {},
  },
};

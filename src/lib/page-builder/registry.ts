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
import { RichTextSection } from '@/components/sections/RichTextSection';
import { ImageSection } from '@/components/sections/ImageSection';
import { TwoColumnSection } from '@/components/sections/TwoColumnSection';
import { CustomCardGrid } from '@/components/sections/CustomCardGrid';
import { CustomCTA } from '@/components/sections/CustomCTA';
import { SpacerSection } from '@/components/sections/SpacerSection';
import { HeadingBlock } from '@/components/sections/HeadingBlock';
import { ButtonBlock } from '@/components/sections/ButtonBlock';
import { VideoBlock } from '@/components/sections/VideoBlock';
import { QuoteBlock } from '@/components/sections/QuoteBlock';
import { DividerBlock } from '@/components/sections/DividerBlock';

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
  RichTextSection,
  ImageSection,
  TwoColumnSection,
  CustomCardGrid,
  CustomCTA,
  SpacerSection,
  HeadingBlock,
  ButtonBlock,
  VideoBlock,
  QuoteBlock,
  DividerBlock,
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
  RichTextSection: {
    label: 'Text Section',
    icon: 'Type',
    category: 'custom',
    description: 'Heading, subtitle and paragraphs of body copy.',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Text', type: 'text', placeholder: 'e.g. Our Story' },
      { key: 'title', label: 'Heading', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'body', label: 'Body Text', type: 'textarea', placeholder: 'Use blank lines between paragraphs' },
      { key: 'align', label: 'Alignment', type: 'select', options: ['left', 'center'] },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { title: 'Section Title', body: '', align: 'left', darkBackground: false },
  },
  ImageSection: {
    label: 'Image',
    icon: 'ImageIcon',
    category: 'custom',
    description: 'Standalone image with optional caption.',
    fields: [
      { key: 'src', label: 'Image Path', type: 'text', required: true, placeholder: '/images/filename.jpg' },
      { key: 'alt', label: 'Alt Text', type: 'text', required: true },
      { key: 'caption', label: 'Caption', type: 'text' },
      { key: 'height', label: 'Height (px)', type: 'number' },
      { key: 'fullWidth', label: 'Full Width (edge to edge)', type: 'boolean' },
    ],
    defaultProps: { src: '/images/hero-interior.png', alt: 'Image', height: '400', fullWidth: false },
  },
  TwoColumnSection: {
    label: 'Text + Image',
    icon: 'Columns2',
    category: 'custom',
    description: 'Two-column layout pairing body text with an image.',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { key: 'title', label: 'Heading', type: 'text', required: true },
      { key: 'body', label: 'Body Text', type: 'textarea', placeholder: 'Use blank lines between paragraphs' },
      { key: 'imageSrc', label: 'Image Path', type: 'text', required: true, placeholder: '/images/filename.jpg' },
      { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
      { key: 'imagePosition', label: 'Image Position', type: 'select', options: ['left', 'right'] },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { title: 'Section Title', body: '', imageSrc: '/images/hero-interior.png', imageAlt: 'Image', imagePosition: 'right', darkBackground: false },
  },
  CustomCardGrid: {
    label: 'Card Grid',
    icon: 'LayoutGrid',
    category: 'custom',
    description: 'Grid of titled cards with descriptions.',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { key: 'title', label: 'Heading', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'cards', label: 'Cards (Title|Description per line)', type: 'textarea', placeholder: 'Card Title|Card description\nAnother Card|Another description' },
      { key: 'columns', label: 'Columns', type: 'select', options: ['2', '3', '4'] },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { title: 'Section Title', cards: 'Card One|Description for card one\nCard Two|Description for card two\nCard Three|Description for card three', columns: '3', darkBackground: false },
  },
  CustomCTA: {
    label: 'Custom CTA',
    icon: 'Megaphone',
    category: 'custom',
    description: 'Headline, body, and up to two buttons.',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text', required: true },
      { key: 'body', label: 'Body Text', type: 'text' },
      { key: 'primaryButtonText', label: 'Primary Button Text', type: 'text' },
      { key: 'primaryButtonHref', label: 'Primary Button Link', type: 'text', placeholder: '/contact' },
      { key: 'secondaryButtonText', label: 'Secondary Button Text', type: 'text' },
      { key: 'secondaryButtonHref', label: 'Secondary Button Link', type: 'text' },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { heading: 'Ready to Get Started?', body: 'Connect with our team to learn more.', primaryButtonText: 'Contact Us', primaryButtonHref: '/contact', darkBackground: false },
  },
  SpacerSection: {
    label: 'Spacer',
    icon: 'Minus',
    category: 'custom',
    description: 'Blank vertical space between sections.',
    fields: [
      { key: 'height', label: 'Height (px)', type: 'number' },
      { key: 'showDivider', label: 'Show Divider Line', type: 'boolean' },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { height: '64', showDivider: false, darkBackground: false },
  },
  HeadingBlock: {
    label: 'Heading',
    icon: 'Heading',
    category: 'custom',
    description: 'Standalone heading — H1/H2/H3/H4 with optional eyebrow.',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'e.g. Introducing' },
      { key: 'text', label: 'Heading Text', type: 'text', required: true },
      { key: 'level', label: 'Heading Level', type: 'select', options: ['h1', 'h2', 'h3', 'h4'] },
      { key: 'align', label: 'Alignment', type: 'select', options: ['left', 'center', 'right'] },
      { key: 'underline', label: 'Show Underline Accent', type: 'boolean' },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { text: 'Heading', level: 'h2', align: 'left', underline: false, darkBackground: false },
  },
  ButtonBlock: {
    label: 'Button',
    icon: 'MousePointerClick',
    category: 'custom',
    description: 'A single call-to-action button.',
    fields: [
      { key: 'text', label: 'Button Text', type: 'text', required: true },
      { key: 'href', label: 'Link URL', type: 'text', required: true, placeholder: '/contact or https://...' },
      { key: 'variant', label: 'Style', type: 'select', options: ['primary', 'outline'] },
      { key: 'align', label: 'Alignment', type: 'select', options: ['left', 'center', 'right'] },
      { key: 'openInNewTab', label: 'Open in New Tab', type: 'boolean' },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { text: 'Learn More', href: '#', variant: 'primary', align: 'center', openInNewTab: false, darkBackground: false },
  },
  VideoBlock: {
    label: 'Video',
    icon: 'Video',
    category: 'custom',
    description: 'Embed a YouTube, Vimeo, or direct video file.',
    fields: [
      { key: 'url', label: 'Video URL', type: 'text', required: true, placeholder: 'YouTube, Vimeo, or .mp4 URL' },
      { key: 'caption', label: 'Caption', type: 'text' },
      { key: 'aspectRatio', label: 'Aspect Ratio', type: 'select', options: ['16:9', '4:3', '1:1'] },
      { key: 'fullWidth', label: 'Full Width (edge to edge)', type: 'boolean' },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { url: '', aspectRatio: '16:9', fullWidth: false, darkBackground: false },
  },
  QuoteBlock: {
    label: 'Quote',
    icon: 'Quote',
    category: 'custom',
    description: 'A featured pull-quote or testimonial.',
    fields: [
      { key: 'quote', label: 'Quote Text', type: 'textarea', required: true },
      { key: 'attribution', label: 'Attribution (Name)', type: 'text' },
      { key: 'role', label: 'Role / Company', type: 'text' },
      { key: 'align', label: 'Alignment', type: 'select', options: ['left', 'center'] },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { quote: 'A powerful quote goes here.', align: 'center', darkBackground: false },
  },
  DividerBlock: {
    label: 'Divider',
    icon: 'Minus',
    category: 'custom',
    description: 'Horizontal divider (line, dots, dashes, or wave).',
    fields: [
      { key: 'style', label: 'Style', type: 'select', options: ['line', 'dots', 'dashes', 'wave'] },
      { key: 'spacing', label: 'Spacing', type: 'select', options: ['sm', 'md', 'lg'] },
      { key: 'label', label: 'Optional Label', type: 'text', placeholder: 'e.g. OR' },
      { key: 'darkBackground', label: 'Dark Background', type: 'boolean' },
    ],
    defaultProps: { style: 'line', spacing: 'md', darkBackground: false },
  },
};

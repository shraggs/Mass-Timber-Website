export interface SlideshowImage {
  src: string;
  alt: string;
}

export const slideshowImages: Record<string, SlideshowImage[]> = {
  hero: [
    { src: '/images/hero-interior.png', alt: 'Mass timber interior with steel cross-bracing' },
    { src: '/images/timber-ceiling.png', alt: 'Timber ceiling construction detail' },
    { src: '/images/panoramic-beams.png', alt: 'Panoramic timber beams' },
    { src: '/images/clean-interior.png', alt: 'Clean mass timber interior space' },
  ],
  about: [
    { src: '/images/about-hero.jpg', alt: 'Mass timber construction overview' },
    { src: '/images/timber-frame-wide.jpg', alt: 'Wide timber frame detail' },
    { src: '/images/site-overview.jpg', alt: 'Construction site overview' },
    { src: '/images/building-exterior.jpeg', alt: 'Mass timber building exterior' },
  ],
  leadership: [
    { src: '/images/clean-interior.png', alt: 'Clean mass timber interior' },
    { src: '/images/hero-interior.png', alt: 'Mass timber interior' },
    { src: '/images/timber-ceiling.png', alt: 'Timber ceiling detail' },
  ],
  projects: [
    { src: '/images/rotated-projects.jpeg', alt: 'Mass timber project' },
    { src: '/images/construction-wide.png', alt: 'Wide construction site view' },
    { src: '/images/rotated-site-1.jpg', alt: 'Construction site view' },
    { src: '/images/timber-beams-wide.png', alt: 'Timber beams wide shot' },
  ],
  contractors: [
    { src: '/images/workers-installing.png', alt: 'Workers installing mass timber' },
    { src: '/images/construction-wide.png', alt: 'Wide construction site view' },
    { src: '/images/rotated-frame-1.jpeg', alt: 'Mass timber frame' },
    { src: '/images/timber-beams-wide.png', alt: 'Timber beams wide shot' },
  ],
  suppliers: [
    { src: '/images/connector-detail.png', alt: 'Steel connector close-up detail' },
    { src: '/images/timber-beams-wide.png', alt: 'Timber beams wide shot' },
    { src: '/images/panoramic-beams.png', alt: 'Panoramic timber beams' },
  ],
  contact: [
    { src: '/images/rotated-contact.jpeg', alt: 'Contact us' },
    { src: '/images/building-exterior.jpeg', alt: 'Mass timber building exterior' },
    { src: '/images/site-overview.jpg', alt: 'Construction site overview' },
  ],
  training: [
    { src: '/images/rotated-training.jpeg', alt: 'Mass timber training' },
    { src: '/images/workers-installing.png', alt: 'Workers installing mass timber' },
    { src: '/images/rotated-site-2.jpg', alt: 'Training site' },
  ],
  trainingAbout: [
    { src: '/images/rotated-training.jpeg', alt: 'Training program overview' },
    { src: '/images/construction-wide.png', alt: 'Construction site' },
    { src: '/images/clean-interior.png', alt: 'Clean mass timber interior' },
  ],
  trainingCenters: [
    { src: '/images/rotated-site-3.jpg', alt: 'Training center site' },
    { src: '/images/rotated-training.jpeg', alt: 'Training in progress' },
    { src: '/images/timber-frame-wide.jpg', alt: 'Timber frame construction' },
  ],
  trainingContractors: [
    { src: '/images/workers-installing.png', alt: 'Workers installing mass timber' },
    { src: '/images/rotated-frame-1.jpeg', alt: 'Timber frame construction' },
    { src: '/images/construction-wide.png', alt: 'Construction overview' },
  ],
  trainingMembers: [
    { src: '/images/rotated-site-1.jpg', alt: 'Construction site' },
    { src: '/images/timber-ceiling.png', alt: 'Timber ceiling detail' },
    { src: '/images/hero-interior.png', alt: 'Mass timber interior' },
  ],
  default: [
    { src: '/images/construction-wide.png', alt: 'Construction site' },
    { src: '/images/timber-beams-wide.png', alt: 'Timber beams' },
    { src: '/images/panoramic-beams.png', alt: 'Panoramic beams' },
  ],
};

'use client';

import { Container } from '@/components/ui/Container';

interface VideoBlockProps {
  url?: string;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  darkBackground?: boolean;
  fullWidth?: boolean;
}

function toEmbed(url: string): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  if (/^https?:\/\/.+\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return url;
  if (/\/embed\//.test(url)) return url;
  return null;
}

export function VideoBlock({
  url = '',
  caption = '',
  aspectRatio = '16:9',
  darkBackground = false,
  fullWidth = false,
}: VideoBlockProps) {
  const embed = toEmbed(url);
  const padding = aspectRatio === '4:3' ? '75%' : aspectRatio === '1:1' ? '100%' : '56.25%';
  const isFile = embed && /\.(mp4|webm|ogg)(\?.*)?$/i.test(embed);

  const inner = embed ? (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{ paddingTop: padding }}>
      {isFile ? (
        <video src={embed} controls className="absolute inset-0 w-full h-full" />
      ) : (
        <iframe
          src={embed}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={caption || 'Video'}
        />
      )}
    </div>
  ) : (
    <div className={`rounded-2xl border border-dashed ${darkBackground ? 'border-white/20 text-cream/40' : 'border-charcoal-950/20 text-charcoal-950/40'} py-20 text-center text-sm`}>
      Paste a YouTube, Vimeo, or direct video URL in the properties panel.
    </div>
  );

  return (
    <section className={`py-12 md:py-16 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      {fullWidth ? (
        inner
      ) : (
        <Container>{inner}</Container>
      )}
      {caption && (
        <Container>
          <p className={`text-sm text-center mt-3 ${darkBackground ? 'text-cream/50' : 'text-charcoal-950/50'}`}>{caption}</p>
        </Container>
      )}
    </section>
  );
}

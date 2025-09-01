// components/testimonials/TestimonialCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export type Testimonial = {
  quote: string | null;
  name: string;
  company?: string;
  avatarUrl?: string;
  accent?: string;
  textColor?: string;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
}

// Very small contrast helper (black/white) if textColor is not provided
function pickReadableText(bg?: string): '#000000' | '#FFFFFF' {
  if (!bg) return '#FFFFFF';
  // normalize hex like #RRGGBB
  const hex = bg.trim().startsWith('#') ? bg.slice(1) : bg;
  if (hex.length !== 6) return '#FFFFFF';
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Perceived luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#000000' : '#FFFFFF';
}

export function TestimonialCard({
  quote,
  name,
  company,
  avatarUrl,
  accent = '#111',
  textColor,
}: Testimonial) {
  const ink = textColor || pickReadableText(accent);
  return (
    <Card
      aria-label={`Testimonial from ${name}`}
      className="rounded-none shadow-sm"
      style={
        {
          // use CSS vars so you can theme in Tailwind if desired
          '--card-accent': accent,
          '--card-ink': ink,
          backgroundColor: 'var(--card-accent)',
          color: 'var(--card-ink)',
        } as React.CSSProperties
      }
      data-accent={accent}
    >
      <CardContent className="p-8 lg:p-10 h-full">
        <figure className="flex h-full flex-col gap-10">
          <blockquote className="text-pretty leading-relaxed text-lg lg:text-xl">
            {quote}
          </blockquote>

          <figcaption className="mt-auto flex items-center gap-3">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={`${name} avatar`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center text-xs font-semibold">
                {getInitials(name)}
              </div>
            )}

            <div className="text-sm/5 opacity-95">
              <div className="font-medium">{name}</div>
              {company && <div className="opacity-80">{company}</div>}
            </div>
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  );
}

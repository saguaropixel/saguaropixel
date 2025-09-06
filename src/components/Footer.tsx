// src/components/Footer.tsx
'use client';

import { cn } from '@/lib/utils';
import type { Content } from '@prismicio/client';
import { asText } from '@prismicio/client';
import Image from 'next/image';
import Link from 'next/link';

type Props = { data: Content.FooterDocument };

export default function Footer({ data }: Props) {
  const nav = data.data.nav_links ?? [];
  const legal = data.data.legal_rich_text;
  // const location = data.data.location ?? '';

  return (
    <footer className="bg-dark-brown-900 text-off-white-500">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-3">
            {data.data.logo?.url && (
              <Image
                src={data.data.logo.url}
                alt={data.data.logo.alt || 'Logo'}
                width={434}
                height={103}
                className="h-20 w-45"
                priority
              />
            )}
            {/* {data.data.brand_text && (
              <span className="font-semibold tracking-wide">
                {data.data.brand_text}
              </span>
            )} */}
          </div>

          {/* Center: Nav */}
          <nav className="justify-center md:flex">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {nav.map((item, i) => {
                const href =
                  item.link?.link_type === 'Web'
                    ? item.link.url
                    : (item.link as any)?.url;
                if (!href) return null;
                return (
                  <li key={i}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label || 'Link'}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Legal + Location */}
          <div className="text-center md:text-right text-xs leading-5 text-neutral-300">
            {legal?.length ? (
              <div
                className={cn('[&_p]:m-0 [&_p+*]:mt-1')}
                dangerouslySetInnerHTML={{ __html: asText(legal) }}
              />
            ) : null}
            {/* {location && <div className="mt-1">{location}</div>} */}
          </div>
        </div>
      </div>
    </footer>
  );
}

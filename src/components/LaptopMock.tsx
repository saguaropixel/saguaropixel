import type { FilledImageFieldImage } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import Image from 'next/image';

type Props = {
  img: FilledImageFieldImage | null | undefined;
  tech?: string[];
};

export default function LaptopMock({ img, tech = [] }: Props) {
  return (
    <div className="relative w-full max-w-[1260px] mx-auto">
      {/* Laptop SVG frame */}
      <Image
        src="/laptop.svg"
        alt="Laptop Frame"
        width={800}
        height={600}
        className="w-full h-auto"
      />

      {/* Screen overlay positioned by SVG percentages */}
      <div
        className="
          absolute
          top-[5.8%]    /* 15.16 / 222 */
          left-[12.3%]  /* 49.22 / 399 */
          w-[75.4%]     /* 300.53 / 399 */
          h-[84.1%]     /* 180.03 / 222 */
          overflow-hidden
          rounded-md
        "
      >
        {img ? (
          <PrismicNextImage
            field={img}
            className="h-full w-full object-cover"
            fallbackAlt=""
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-white/70 bg-black">
            No image
          </div>
        )}
      </div>

      {/* Tech row */}
      {tech && tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.22em] text-neutral-500">
          {tech.map((t, i) => (
            <li key={`${t}-${i}`} className="uppercase">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

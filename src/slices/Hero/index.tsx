import { Bounded } from '@/components/Bounded';
import { Heading } from '@/components/Heading';
import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import { JSX } from 'react';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-gradient-to-b from-brand-yellow to-brand-white relative h-dvh overflow-hidden text-brand-black"
    >
      <div className="grid inset-0 mx-auto mt-48 max-w-6xl grid-row-2 place-items-end px-6 ~py-10/16 text-center">
        <Heading
          size="xl"
          className="relative max-w-9xl place-self-start lowercase"
        >
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </div>
      {/* <PrismicRichText field={slice.primary.body} /> */}
      <PrismicNextLink field={slice.primary.link} />

      {/* <InteractiveCactus /> */}
      {/* <InteractiveCactus2 /> */}
    </Bounded>
  );
};

export default Hero;

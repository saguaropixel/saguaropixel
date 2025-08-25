import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

export type SplitContentProps = SliceComponentProps<Content.SplitContentSlice>;

const SplitContent: FC<SplitContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      {/* top accent bars */}
      <span className="pointer-events-none absolute left-0 top-0 h-1.5 w-2/3 bg-turquoise-500" />
      <span className="pointer-events-none absolute right-0 top-0 h-1.5 w-24 bg-cyan-300" />

      {/* bottom accent bar (left) */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-1/2 bg-magenta-500" />

      <div className="mx-auto max-w-screen-2xl px-6 py-10 md:px-10 md:py-14">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="md:col-span-7">
            <PrismicRichText
              field={slice.primary.content}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300 md:text-[17px]">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitContent;

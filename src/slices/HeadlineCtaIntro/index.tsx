import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

/**
 * Props for `HeadlineCtaIntro`.
 */
export type HeadlineCtaIntroProps =
  SliceComponentProps<Content.HeadlineCtaIntroSlice>;

/**
 * Component for "HeadlineCtaIntro" Slices.
 */
const HeadlineCtaIntro: FC<HeadlineCtaIntroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Placeholder component for headline_cta_intro (variation: {slice.variation}
      ) slices. */}
      <PrismicRichText field={slice.primary.headline} />
      {/* Render CTA buttons */}
      <div className="flex gap-4">
        {slice.primary.cta_buttons.map((link, i) => (
          <Button key={i} asChild variant={link.variant}>
            <PrismicNextLink field={link}>
              {link.text || 'Learn More'}
            </PrismicNextLink>
          </Button>
        ))}
      </div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        <PrismicRichText field={slice.primary.description} />
      </h1>
      {/**
       * 💡 Use Prismic MCP with your code editor
       *
       * Get AI-powered help to build your slice components — based on your actual model.
       *
       * ▶️ Setup:
       * 1. Add a new MCP Server in your code editor:
       *
       * {
       *   "mcpServers": {
       *     "Prismic MCP": {
       *       "command": "npx",
       *       "args": ["-y", "@prismicio/mcp-server@latest"]
       *     }
       *   }
       * }
       *
       * 2. Select a model optimized for coding (e.g. Claude 3.7 Sonnet or similar)
       *
       * ✅ Then open your slice file and ask your code editor:
       *    "Code this slice"
       *
       * Your code editor reads your slice model and helps you code faster ⚡
       * 🎙️ Give your feedback: https://community.prismic.io/t/help-us-shape-the-future-of-slice-creation/19505
       * 📚 Documentation: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default HeadlineCtaIntro;

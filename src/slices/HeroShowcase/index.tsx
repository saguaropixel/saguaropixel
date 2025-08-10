import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

/**
 * Props for `HeroShowcase`.
 */
export type HeroShowcaseProps = SliceComponentProps<Content.HeroShowcaseSlice>;

/**
 * Component for "HeroShowcase" Slices.
 */
const HeroShowcase: FC<HeroShowcaseProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for hero_showcase (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      <PrismicRichText field={slice.primary.title} />
      <PrismicRichText field={slice.primary.subtitle} />
      {slice.primary.tech_stack.map((item, i) => (
        <PrismicNextImage key={i} field={item.logo} />
      ))}
      <PrismicNextImage field={slice.primary.device_mockup} />
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

export default HeroShowcase;

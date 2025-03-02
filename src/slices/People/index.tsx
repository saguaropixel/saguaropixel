import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `People`.
 */
export type PeopleProps = SliceComponentProps<Content.PeopleSlice>;

/**
 * Component for "People" Slices.
 */
const People = ({ slice }: PeopleProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.name}
    </section>
  );
};

export default People;

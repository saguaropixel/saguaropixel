// components/testimonials/TestimonialsCarousel.tsx
'use client';

// import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Testimonial, TestimonialCard } from './TestimonialCard';

type Props = {
  items: Testimonial[];
};

export default function TestimonialsCarousel({ items }: Props) {
  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      // plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      className="w-full"
      aria-label="Client testimonials"
    >
      <CarouselContent className="-ml-6">
        {items.map((t, i) => (
          <CarouselItem
            key={i}
            className="pl-6 basis-full md:basis-1/2 xl:basis-1/3"
          >
            <TestimonialCard {...t} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="hidden md:flex gap-2 absolute right-6 -top-14">
        <CarouselPrevious className="static translate-x-0 translate-y-0 bg-off-white-500 text-dark-brown-500 hover:bg-magenta-500 hover:text-off-white-500" />
        <CarouselNext className="static translate-x-0 translate-y-0 bg-off-white-500 text-dark-brown-500 hover:bg-magenta-500 hover:text-off-white-500" />
      </div>
    </Carousel>
  );
}

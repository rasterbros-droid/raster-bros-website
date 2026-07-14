import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating?: number;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [viewportRef, api] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    []
  );

  const [isHovered, setIsHovered] = React.useState(false);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  React.useEffect(() => {
    if (!api) return;
    if (isHovered) return;
    if (testimonials.length <= 1) return;

    const id = window.setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => window.clearInterval(id);
  }, [api, isHovered, testimonials.length]);

  if (!testimonials?.length) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Viewport */}
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="min-w-0 shrink-0 grow-0 basis-full flex items-stretch"
            >
              <div className="w-full rounded-2xl border border-white/25 bg-gradient-to-br from-white/[0.16] via-white/[0.08] to-white/[0.03] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 h-full">
                  {/* Image */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-h-48 md:max-h-[280px] aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden border border-white/20">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-4 md:gap-6">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({
                        length: testimonial.rating || 5,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 md:h-6 md:w-6 fill-white text-white"
                        />
                      ))}
                    </div>

                    {/* Quote Highlight */}
                    <div className="space-y-3 md:space-y-4">
                      <p className="text-xl md:text-3xl font-display font-bold text-white leading-tight">
                        "{
                        testimonial.quote.split("\n")[0] ||
                          testimonial.quote
                        }"
                      </p>
                    </div>

                    {/* Full Quote */}
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {testimonial.quote.includes("\n")
                        ? testimonial.quote.split("\n").slice(1).join("\n")
                        : testimonial.quote}
                    </p>

                    {/* Attribution */}
                    <div className="pt-2 md:pt-4 border-t border-white/20">
                      <p className="text-sm md:text-base font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-white/60 mt-1">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Buttons */}
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={scrollPrev}
        className="absolute left-0 md:left-[-60px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white/80 transition hover:bg-white hover:text-black hover:border-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={scrollNext}
        className="absolute right-0 md:right-[-60px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white/80 transition hover:bg-white hover:text-black hover:border-white"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

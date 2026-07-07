import * as React from "react";
import Link from "next/link";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/schema";

type LatestReleaseCarouselProps = {
  projects: Project[];
};

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export default function LatestReleaseCarousel({ projects }: LatestReleaseCarouselProps) {
  const [viewportRef, api] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
    },
    []
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = React.useCallback((index: number) => api?.scrollTo(index), [api]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = (embla: UseEmblaCarouselType[1]) => {
      if (!embla) return;
      setSelectedIndex(embla.selectedScrollSnap());
    };

    setSnapCount(api.scrollSnapList().length);
    onSelect(api);

    api.on("select", onSelect);
    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length);
      onSelect(api);
    });

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    if (isHovered) return;
    if (projects.length <= 1) return;

    const id = window.setInterval(() => {
      api.scrollNext();
    }, 3500);

    return () => window.clearInterval(id);
  }, [api, isHovered, projects.length]);

  if (!projects?.length) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Viewport */}
      <div ref={viewportRef} className="overflow-hidden">
        <div className="-ml-4 flex touch-pan-y">
          {projects.map((project) => (
            <div
              key={project.id}
              className="pl-4 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Link href={`/project/${project.slug}`} className="block h-full">
                <div className="group h-full rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden transition will-change-transform hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 z-10" />
                    <img
                      src={project.imageUrl}
                      alt={project.songTitle}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex h-[92px] flex-col justify-between gap-2 px-5 py-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg md:text-xl font-display font-semibold text-white/90 group-hover:text-white transition-colors">
                        {project.songTitle}
                      </h3>
                      <p className="truncate text-xs md:text-sm text-white/50 uppercase tracking-wider">
                        {project.category}
                        {project.year ? ` • ${project.year}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Buttons */}
      <button
        type="button"
        aria-label="Previous"
        onClick={scrollPrev}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-11 w-11 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white/80 transition hover:bg-white hover:text-black hover:border-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={scrollNext}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-11 w-11 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white/80 transition hover:bg-white hover:text-black hover:border-white"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* Dots (optional) */}
      {snapCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => {
            const active = i === clampIndex(selectedIndex, snapCount);
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={[
                  "h-2 w-2 rounded-full transition",
                  active ? "bg-white/80" : "bg-white/20 hover:bg-white/40",
                ].join(" ")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}


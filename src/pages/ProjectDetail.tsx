import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Paperclip } from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import FlyingPosters from "@/components/FlyingPosters";
import { resolveYoutubeEmbedUrl } from "@/lib/youtube";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:slug");
  const slug = params?.slug || "";
  const { data: project, isLoading } = useProject(slug);

  // Scroll to top when project loads or slug changes
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.scrollTo(0, 0);
  //     document.documentElement.scrollTop = 0;
  //     document.body.scrollTop = 0;
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, [slug]);

  const [index, setIndex] = useState(0);

  const heroImages = useMemo(() => {
    if (!project) return [];
    if (project.carouselImages?.length) return project.carouselImages;
    if (project.galleryImages?.length) return project.galleryImages.slice(0, 5);
    return [project.imageUrl];
  }, [project]);

  const songVideoEmbedUrl = useMemo(
    () => resolveYoutubeEmbedUrl(project?.embeddedVideoSong),
    [project?.embeddedVideoSong],
  );
  const btsVideoEmbedUrl = useMemo(
    () => resolveYoutubeEmbedUrl(project?.embeddedVideoBTS),
    [project?.embeddedVideoBTS],
  );

  useEffect(() => {
    setIndex(0);
  }, [slug]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen text-foreground">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-white/50">Loading project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-background min-h-screen text-foreground">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Project not found</h1>
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const workTypeLabels: Record<string, string> = {
    movie: "Movie Production",
    photography: "Photography",
    videography: "Videography",
    "web-series": "Web Series Production",
    advertisement: "Brand Commercial",
  };

  const featuredFrames = project.galleryImages?.slice(0, 12) || [];
  const orbitFrames = featuredFrames.slice(0, 12);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navigation />

      {/* Hero images with ease in and out */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="sync">
            {heroImages.length > 0 && (
              <motion.img
                key={heroImages[index]}
                src={heroImages[index]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              transition={{
                opacity: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 6, ease: "easeOut" },
                filter: { duration: 0.9, ease: "easeOut" },
              }}
            />
            )}
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-black/35"
            animate={{ opacity: [0.88, 0.95, 0.88] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('/grain.png')]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,220,170,0.07),transparent_28%)]" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between container mx-auto px-6 py-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Work</span>
          </Link>

          <div className="mb-20">
            <motion.h1
              className="text-2xl md:text-4xl lg:text-6xl font-display font-bold leading-none mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {project?.songTitle}
              {/* <span className=" text-sm md:text-base text-white/60 mt-2"> */}
                            <span className="ml-[15%] block text-lg md:text-2xl lg:text-3xl font-display font-semibold leading-none mb-6">

                {project?.singer}
              </span>
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-4 text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* <span className="uppercase tracking-wider">{project.category}</span> */}
              {/* <span>•</span> */}
              {/* <span>{project.year}</span> */}
              {/* <span>Rasterbros</span> */}
              {/* {project.workType && (
                <>
                  <span>•</span>
                  <span>{workTypeLabels[project.workType] || project.workType}</span>
                </>
              )} */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Banner with Video */}
      {/* <section className="relative h-screen w-full overflow-hidden">
        ...
      </section> */}

      {/* Song Video */}
      {songVideoEmbedUrl && (
        <section className="container mx-auto px-6 py-20">
          {/* <h2 className="text-sm uppercase tracking-widest text-white/50 ">Song Video</h2> */}
           <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-widest text-white/60 mb-8">
                  Song Video
                </span>
          <motion.div
            className="aspect-video bg-black rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src={songVideoEmbedUrl}
              title={`${project.songTitle} song video`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>
        </section>
      )}

      {/* Carousel Section */}
      {/* {project.carouselImages && project.carouselImages.length > 0 && (
        <section className="py-20 bg-white/5">
          ...
        </section>
      )} */}

      {/* Description Section */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            {/* <h2 className="text-sm uppercase tracking-widest text-white/50 mb-8">Project Overview</h2> */}
             <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-widest text-white/60 mb-8">
                  Project Overview
                </span>
          </div>
          <div className="md:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-2xl md:text-3xl font-display font-light leading-relaxed text-white/90 mb-8">
                {project.description}
              </p>
            </motion.div>

            {project.detailedDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4 text-white/60 leading-relaxed"
              >
                <p>{project.detailedDescription}</p>
              </motion.div>
            )}

            {project.workType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-8 border-t border-white/10"
              >
                <p className="text-sm uppercase tracking-wider text-white/50 mb-2">Work Type</p>
                <p className="text-xl font-display">{workTypeLabels[project.workType] || project.workType}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* BTS Video */}
      {btsVideoEmbedUrl && (
        <section className="container mx-auto px-6 py-20">
          {/* <h2 className="text-sm uppercase tracking-widest text-white/50 mb-8">BTS Video</h2> */}
          <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-widest text-white/60 mb-8">
                  BTS Video
                </span>
          <motion.div
            className="aspect-video bg-black rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src={btsVideoEmbedUrl}
              title={`${project.songTitle} bts video`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>
        </section>
      )}

      {/* Gallery Section (grid layout - commented out) */}
      {/* {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-sm uppercase tracking-widest text-white/50 mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-[4/3] overflow-hidden rounded-sm bg-white/5 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={image}
                  alt={`${project.title} - Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )} */}

      {/* Raster Board Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="container mx-auto px-6 py-20">
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] tracking-[0.2em] text-white/70">
                STUDIO CONTACT SHEET
              </span>
              <span className="inline-flex items-center rounded-full border border-[#ffc48f]/35 bg-[#ffc48f]/10 px-3 py-1 text-[10px] tracking-[0.2em] text-[#ffd9b8]">
                {project.galleryImages.length} FRAMES
              </span>
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.95]">Raster Board</h2>
                <p className="mt-3 text-sm md:text-base text-white/60 max-w-xl">
                  Built like a premium studio wall with a hero-led sequence, editorial rhythm, and cinematic contrast.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Curated Frames • Rotating Clockwise
              </p>
            </div>
          </motion.div>

          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-[#ececec] p-4 sm:p-5 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.55),transparent_30%)]" />

            {/* Desktop orbit layout */}
            <div className="relative hidden md:block h-[820px] lg:h-[900px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5" />

              <motion.div
                className="absolute left-1/2 top-1/2 h-0 w-0 raster-orbit"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7 }}
              >
                {orbitFrames.map((img, i) => {
                  const angle = -90 + (360 / orbitFrames.length) * i;
                  const radius = 338;
                  const width = 202;
                  const height = 236;

                  return (
                    <div
                      key={img + i}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                        transformOrigin: "center center",
                      }}
                    >
                      <div className="raster-orbit-upright" style={{ width: `${width}px`, height: `${height}px` }}>
                        <div className="raster-orbit-card group relative h-full w-full overflow-hidden border border-black/10 bg-black/15 shadow-[0_14px_30px_rgba(0,0,0,0.2)]">
                          <img
                            src={img}
                            alt={`${project.songTitle} frame ${i + 1}`}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              <div className="absolute left-1/2 top-1/2 w-[272px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-black/20 bg-[#f4f4f4] p-8 text-center shadow-[0_18px_35px_rgba(0,0,0,0.18)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-400/70 text-neutral-600">
                  <Paperclip className="h-8 w-8 -rotate-45" />
                </div>
                <p className="text-neutral-900 font-display text-[35px] leading-none">Raster Board</p>
                {/* <p className="mt-2 text-[13px] font-medium text-neutral-700">Upload or drop your assets</p> */}
              </div>
            </div>

            {/* Mobile layout */}
            <div className="relative md:hidden space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={project.galleryImages[0]}
                  alt={`${project.songTitle} hero frame`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-[#ffcb9a]/35 bg-[#ffcb9a]/15 px-2.5 py-1 text-[10px] tracking-[0.18em] text-[#ffe2c3]">
                  HERO SHOT
                </span>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                {project.galleryImages.slice(1).map((img, i) => (
                  <motion.div
                    key={img + i}
                    className={`relative overflow-hidden rounded-xl border border-white/10 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.45, delay: i * 0.03 }}
                  >
                    <img
                      src={img}
                      alt={`${project.songTitle} frame ${i + 2}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </motion.div>
                ))}
              </div>

              <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pt-1">
                {project.galleryImages.map((img, i) => (
                  <div
                    key={`${img}-strip-${i}`}
                    className="relative h-24 min-w-[120px] snap-start overflow-hidden rounded-lg border border-white/10"
                  >
                    <img src={img} alt={`${project.songTitle} strip ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Flying Posters (unused) */}
      {/* <div style={{ height: '100vh' }}>
        <FlyingPosters items={posterItems} />
      </div> */}

      {/* Next Project CTA */}
      <section className="container mx-auto px-6 py-32 border-t border-white/10">
        <Link href="/#work">
          <motion.div
            className="text-center cursor-pointer group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-white/50 mb-4">View More Work</p>
            <p className="text-4xl md:text-6xl font-display font-bold group-hover:text-white/70 transition-colors">
              Selected Work
            </p>
          </motion.div>
        </Link>
      </section>
    </div>
  );
}


// ─── Raster board grid layout (alternative - commented out) ──────────────────
// {project.galleryImages && project.galleryImages.length > 0 && (
//   <section className="container mx-auto px-6 py-20">
//     <div className="container mx-auto mb-12">
//       <h2 className="text-4xl md:text-6xl font-display font-bold">Raster Board</h2>
//     </div>
//     <div className="bg-neutral-200 rounded-3xl p-6 md:p-10">
//       <div className="hidden md:grid grid-cols-12 auto-rows-[110px] gap-4">
//         {project.galleryImages?.slice(0, 12).map((img, i) => {
//           const layout = [
//             "col-span-4 row-span-2",
//             "col-span-4 row-span-2",
//             "col-span-3 row-span-2",
//             "col-span-1 row-span-4",
//             "col-span-2 row-span-1",
//             "col-span-2 row-span-1",
//             "col-span-4 row-span-4",
//             "col-span-3 row-span-2",
//             "col-span-3 row-span-2",
//             "col-span-2 row-span-3",
//             "col-span-1 row-span-2",
//             "col-span-3 row-span-2",
//           ];
//           return (
//             <div key={i} className={`${layout[i]} overflow-hidden rounded-xl group`}>
//               <img src={img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
//             </div>
//           );
//         })}
//       </div>
//       <div className="grid md:hidden grid-cols-2 gap-3">
//         {project.galleryImages?.map((img, i) => (
//           <div key={i} className="aspect-[4/5] overflow-hidden rounded-xl">
//             <img src={img} className="w-full h-full object-cover" />
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// )}
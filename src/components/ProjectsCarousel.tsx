import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/schema";

// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
import "slick-carousel/slick/slick-theme.css";
import SliderBase from "react-slick";


interface Props {
  projects: Project[];
}

/* ---------- Custom Arrows (UNCHANGED DESIGN) ---------- */
function PrevArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      aria-label="Previous"
      className="
        absolute -left-4 top-1/2 z-20 
        -translate-y-1/2
        flex items-center justify-center
        w-11 h-11
        rounded-full
        border border-white/40
        text-white/80 text-xl font-semibold
        backdrop-blur-md bg-white/5
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:border-white
        hover:bg-white
        hover:text-black
        hover:scale-110
        hover:shadow-lg
        active:scale-95
      "
    >
      ‹
    </button>
  );
}

function NextArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      aria-label="Next"
      className="
        absolute -right-4 top-1/2 z-20 
        -translate-y-1/2
        flex items-center justify-center
        w-11 h-11
        rounded-full
        border border-white/40
        text-white/80 text-xl font-semibold
        backdrop-blur-md bg-white/5
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:border-white
        hover:bg-white
        hover:text-black
        hover:scale-110
        hover:shadow-lg
        active:scale-95
      "
    >
      ›
    </button>
  );
}



/* ---------- Carousel Component ---------- */
export default function ProjectsCarousel({ projects }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const settings = {
    dots: false,
    arrows: !isMobile, // Hide arrows on mobile
    infinite: true,

    slidesToShow: isMobile ? 1 : 3, // Force 1 on mobile, 3 on desktop
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 3500, // delay between slides
    speed: 900, // slide animation duration
    cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",

    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    touchThreshold: 10,

    prevArrow: isMobile ? <></> : <PrevArrow />,
    nextArrow: isMobile ? <></> : <NextArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          arrows: false,
          swipe: true,
          touchMove: true,
        },
      },
    ],
  };

  const Slider = SliderBase as unknown as React.ComponentType<any>;


  return (
    <div className="relative overflow-hidden w-full max-w-full projects-carousel-wrapper">
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={project.id} className="px-2 md:px-4 cursor-pointer">
            <ProjectCard
              project={project}
              index={index}
              disableAnimation
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

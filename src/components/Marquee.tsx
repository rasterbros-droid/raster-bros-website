import { motion } from "framer-motion";

export default function ImageMarquee() {

  const images = [
    "/artist_images/1.jpg",
    "/artist_images/2.jpg",
    "/artist_images/3.jpg",
    "/artist_images/4.jpg",
    "/artist_images/5.jpg",
    "/artist_images/6.jpg",
    "/artist_images/7.jpg",
    "/artist_images/8.jpg",
    "/artist_images/9.jpg",
    "/artist_images/10.jpg",
    "/artist_images/11.jpg",
    "/artist_images/12.jpg",
    "/artist_images/13.jpg",
    "/artist_images/14.jpg",
  ];

  // duplicate → seamless infinite scroll
  const loopImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-10 bg-black">
       <div className="container mx-auto mb-12">
          <h2 className="text-3xl md:text-6xl font-display font-bold ml-6 sm:ml-10">
          Where Talent Meets Vision</h2>
        </div>

      {/* MOVING CONTAINER */}
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 50,   // ← increase for slower speed
          ease: "linear"
        }}
      >

        {loopImages.map((src, i) => (

        <motion.div
          key={i}
          className="relative flex-shrink-0"
          whileHover={{
            scale: 1.25,
            y: -10,
            zIndex: 50
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >

          <img
            src={src}
            alt="artist"
            className="
              w-32 h-32
              md:w-40 md:h-40
              lg:w-48 lg:h-48
              object-cover
              rounded-xl
              shadow-lg
              pointer-events-none
            "
          />

        </motion.div>

        ))}


      </motion.div>

    </div>
  );
}






// import { motion } from "framer-motion";

// export function Marquee() {
//   const text = "STRATEGY — BRANDING — DIGITAL — CONTENT — ";
  
//   return (
//     <div className="w-full py-20 overflow-hidden border-y border-white/10 bg-white/[0.02]">
//       <motion.div
//         className="flex whitespace-nowrap"
//         animate={{ x: [0, -1000] }}
//         transition={{
//           repeat: Infinity,
//           ease: "linear",
//           duration: 20
//         }}
//       >
//         {[...Array(4)].map((_, i) => (
//         <span
//   key={i}
//   className="
//     font-display
//     text-8xl md:text-[10rem]
//     font-bold
//     px-4
//     opacity-30
//     bg-gradient-to-r
//     from-purple-400
//     via-blue-500
//     to-red-500
//     bg-clip-text
//     text-transparent
//   "
// >
//   {text}
// </span>

//         ))}
//       </motion.div>
//       <style jsx>{`
//         .stroke-text {
//           -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// }

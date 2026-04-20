import { motion } from "framer-motion";

export default function AnimatedCard({ className = "", children, delay = 0 }) {
  return (
    <motion.article
      className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.2)] backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.article>
  );
}

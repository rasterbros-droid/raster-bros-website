import { motion } from "framer-motion";

export default function SectionWrapper({
  id,
  className = "",
  contentClassName = "",
  children,
  animate = true,
}) {
  const content = (
    <div className={`container mx-auto px-6 ${contentClassName}`}>{children}</div>
  );

  return (
    <section id={id} className={`relative py-20 md:py-24 ${className}`}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </section>
  );
}

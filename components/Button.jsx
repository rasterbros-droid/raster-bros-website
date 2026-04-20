import Link from "next/link";
import { motion } from "framer-motion";

const styles = {
  primary:
    "bg-white text-black hover:bg-white/90 focus-visible:ring-white/40 shadow-[0_8px_26px_rgba(255,255,255,0.2)]",
  secondary:
    "bg-white/5 text-white border border-white/15 hover:bg-white/10 focus-visible:ring-white/20",
};

const commonClassName =
  "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2";

export default function Button({
  href,
  className = "",
  variant = "primary",
  children,
  ...props
}) {
  if (href) {
    return (
      <Link href={href} className="inline-flex">
        <motion.span whileTap={{ scale: 0.98 }} className={`${commonClassName} ${styles[variant]} ${className}`}>
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${commonClassName} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

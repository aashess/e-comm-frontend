import { motion } from "motion/react";

/**
 * Reusable page-level entrance animation wrapper.
 * Wraps any page content in a fade + slide-up animation.
 */
function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;

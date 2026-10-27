import loadingAnimation from "@/assets/minds-loading.svg"
import { cn } from "@/lib/utils"

const SIZES = {
  sm: "size-36",
  md: "size-60",
  lg: "size-96",
}

/**
 * The Minds logo head bouncing: the loading mark for a view that is waiting on
 * one thing (sign-in, a page-level fetch). Use skeletons for content that has a
 * shape; use this when there is nothing to draw yet. Holds still when the
 * viewer prefers reduced motion.
 */
function LoadingMark({ size = "md", className, ...props }) {
  return (
    <img
      data-slot="loading-mark"
      src={loadingAnimation}
      alt=""
      aria-hidden="true"
      className={cn("block shrink-0", SIZES[size], className)}
      {...props} />
  );
}

export { LoadingMark }

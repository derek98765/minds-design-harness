import React from "react";
import { motion } from "motion/react";

/**
 * Staggered-entrance group from motion-primitives, vendored as a shadcn-style
 * component. Wraps each child in a `motion.<asChild>` and drives them with
 * container/item variants for a sequenced reveal on mount.
 *
 * Upstream: https://motion-primitives.com/docs/animated-group
 * Source:   https://github.com/ibelick/motion-primitives
 *
 * Defaults here are tuned for this codebase: `staggerChildren: 0.12`, slow
 * smooth ease on the item transition. Override via `variants` when needed.
 */

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1] },
  },
};

const presetVariants = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.9 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: "blur(4px)" },
    visible: { filter: "blur(0px)" },
  },
  "blur-slide": {
    hidden: { filter: "blur(4px)", y: 20 },
    visible: { filter: "blur(0px)", y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  },
};

const mergeWithDefaults = (variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

export function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = "div",
  asChild = "div",
  ...rest
}) {
  const selected = {
    item: mergeWithDefaults(preset ? presetVariants[preset] : {}),
    container: defaultContainerVariants,
  };
  const containerVariants = variants?.container || selected.container;
  const itemVariants = variants?.item || selected.item;

  const MotionContainer = React.useMemo(() => motion.create(as), [as]);
  const MotionChild = React.useMemo(() => motion.create(asChild), [asChild]);

  return (
    <MotionContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
      {...rest}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionContainer>
  );
}

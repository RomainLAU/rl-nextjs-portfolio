import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { RANDOM_COLORS } from "@/constants/randomColors";
import { useTransitionState } from "@/context/TransitionContext";

export default function PageTransition() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [colorIndex, setColorIndex] = useState(() =>
    Math.floor(Math.random() * RANDOM_COLORS.length)
  );
  const { setIsTransitioning } = useTransitionState();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setColorIndex(Math.floor(Math.random() * RANDOM_COLORS.length));
      setIsAnimating(true);
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setIsAnimating(false);
        setIsTransitioning(false);
        const newColorIndex =
          Math.random() < 0.5
            ? (colorIndex - 1 + RANDOM_COLORS.length) % RANDOM_COLORS.length
            : (colorIndex + 1) % RANDOM_COLORS.length;
        setColorIndex(newColorIndex);
      }, 1000);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, colorIndex, setIsTransitioning]);

  const transition = {
    type: "tween",
    duration: 1,
  } as const;

  const opacityVariants = {
    initial: { x: "-100%" },
    animate: { x: "0%" },
    exit: { x: "100%" },
  } as const;

  return (
    <AnimatePresence mode="popLayout">
      {isAnimating && (
        <motion.div
          key={`transition-out-${router.route}`}
          variants={opacityVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          style={{
            position: "fixed",
            background: RANDOM_COLORS[colorIndex],
            width: "100vw",
            height: "100vh",
            top: 0,
            zIndex: 1000,
          }}
        />
      )}
    </AnimatePresence>
  );
}

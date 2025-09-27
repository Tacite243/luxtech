"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  to: number;
}

export default function AnimatedCounter({ to }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, to, {
        duration: 2, // Animation duration of 2 seconds
        ease: "easeOut",
        onUpdate(value) {
          // Update the text content with the rounded integer value
          node.textContent = Math.round(value).toString();
        }
      });
      // Cleanup function to stop animation if component unmounts
      return () => controls.stop();
    }
  }, [isInView, to]);

  // The ref is attached here
  return <span ref={nodeRef}>0</span>;
}
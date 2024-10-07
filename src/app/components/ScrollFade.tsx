import React, { useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

interface ScrollFadeProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
}

const ScrollFade: React.FC<ScrollFadeProps> = ({ topContent, bottomContent }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useMotionValue(0); // Create a MotionValue for scrollY

  // Handle scroll events to update scrollY
  const handleScroll = () => {
    if (scrollRef.current) {
      scrollY.set(scrollRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [scrollRef]);

  const topOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const topY = useTransform(scrollY, [0, 500], [0, -50]);
  const bottomOpacity = useTransform(scrollY, [500, 1000], [0, 1]);
  const bottomY = useTransform(scrollY, [500, 1000], [50, 0]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Scrollable container for the top and bottom content */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ height: '100vh' }} // Make sure it takes the full viewport height
      >
        <div className="h-screen snap-start">
          {/* Top content that fades out and moves up */}
          <motion.div
            className="absolute top-0 transform -translate-x-1/2 w-full h-full flex items-center justify-center"
            style={{ opacity: topOpacity, y: topY }}
          >
            {topContent}
          </motion.div>
        </div>
        <div className="h-screen snap-start">
          {/* Bottom content that fades in and moves up */}
          <motion.div
            className="absolute top-0 transform -translate-x-1/2 w-full h-full flex items-center justify-center"
            style={{ opacity: bottomOpacity, y: bottomY }}
          >
            {bottomContent}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollFade;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherAppPreview from './weatherAppPreview';
import PersonalWebsitePreview from './personalWebpagePreview';
import UpcomingPreview from './upcoming';

interface Project {
    id: string;
    title: string;
    component: JSX.Element;
}

const projects: Project[] = [
  { id: 'weather-app', title: 'Weather App', component: <WeatherAppPreview /> },
  { id: 'personal-website', title: 'Personal Website', component: <PersonalWebsitePreview /> },
  { id: 'upcoming', title: 'Coming Soon...', component: <UpcomingPreview /> },
];

interface AnimationProps {
    direction: number;
    position: string;
}

const zIndex = {
    left: 1,
    center: 2,
    right: 1,
};

const variants = {
    enter: ({ direction }: AnimationProps) => {
        return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
    },
    center: ({ position }: { position: () => string }) => ({
        scale: position() === 'center' ? 1 : 0.7,
        x: 0,
        zIndex: zIndex[position() as keyof typeof zIndex],
        opacity: 1,
    }),
    exit: ({ direction }: AnimationProps) => {
        return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
    },
};

const NO_OF_VISIBLE_ITEMS = 3;

export default function App() {
    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

    const indexInArrayScope =
      ((activeIndex % projects.length) + projects.length) % projects.length;

    const visibleItems = [...projects, ...projects].slice(
      indexInArrayScope,
      indexInArrayScope + NO_OF_VISIBLE_ITEMS
    );

    if (visibleItems.length < NO_OF_VISIBLE_ITEMS) {
        const missingItemsCount = NO_OF_VISIBLE_ITEMS - visibleItems.length;
        visibleItems.push(...projects.slice(0, missingItemsCount));
    }

    const handleClick = (newDirection: number) => {
        setActiveIndex(prevIndex => [prevIndex[0] + newDirection, newDirection]);
    };

    return (
      <div className="w-[90vw] h-[90vh] md:w-[70vw] md:h-[70vh] items-center">
        <div className="md:flex">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item) => {
              return (
                <motion.div
                  className="w-[90vw] md:w-[25vw] md:h-[70vh] h-[30vh] p-2"
                  key={item.id}
                  layout
                  custom={{
                    direction,
                    position: () => {
                      if (item === visibleItems[0]) {
                        return 'left';
                      } else if (item === visibleItems[1]) {
                        return 'center';
                      } else {
                        return 'right';
                      }
                    },
                  }}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 1 }}
                >
                  {item.component}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => handleClick(-1)}
            className='text-lg'
          >
            ◀︎
          </motion.button>
          <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => handleClick(1)}
          className='text-lg'>
            ▶︎
          </motion.button>
        </div>
      </div>
    );
}

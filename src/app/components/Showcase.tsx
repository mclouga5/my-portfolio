'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveComponent {
  id: number;
  title: string;
  Component: React.FC;
}

const components: InteractiveComponent[] = [
  { id: 1, title: 'Interactive Component One', Component: () => <div className="p-4 bg-blue-400 rounded-lg">Component 1</div> },
  { id: 2, title: 'Interactive Component Two', Component: () => <div className="p-4 bg-red-400 rounded-lg">Component 2</div> },
  { id: 3, title: 'Interactive Component Three', Component: () => <div className="p-4 bg-green-400 rounded-lg">Component 3</div> },
];

const Showcase: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-10 bg-gray-100">
      {components.map(({ id, title, Component }) => (
        <motion.div
          key={id}
          className="relative w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Interactive Component */}
          <motion.div
            className="flex items-center justify-center w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Component />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
        </motion.div>
      ))}
    </div>
  );
};

export default Showcase;

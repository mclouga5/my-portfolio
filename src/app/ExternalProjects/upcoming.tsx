import React from 'react';
import { motion } from 'framer-motion';

const UpcomingPreview: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="p-5 h-full w-full bg-gray-100/10 rounded-lg flex flex-col items-center justify-center text-center"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is in view
    >
      <h3 className="text-2xl font-semibold mb-2">Coming Soon...</h3>
      <p className="mb-4">
        An open-source library of reusable ClojureScript Shadcn/ui components!
      </p>
    </motion.div>
  );
};

export default UpcomingPreview;
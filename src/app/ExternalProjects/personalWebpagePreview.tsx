// components/ExternalProjects/PersonalWebsite.tsx
import React from 'react';
import { motion } from 'framer-motion';

const PersonalWebsitePreview: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className=" p-5 h-full w-full w-full bg-gray-100/10 rounded-lg flex flex-col items-center text-center justify-center"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is in view
    >
      <h3 className="text-2xl font-semibold mb-2">My Personal Website</h3>
      <p className="mb-4">
        Get to know a bit more about me, my work and skills!
      </p>
      <motion.a
            href="https://nextjs-weather-gu3wr108z-aoifes-projects-f9da3bfc.vercel.app/" // Replace with your live demo link
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Live Demo
          </motion.a>
    </motion.div>
  );
};

export default PersonalWebsitePreview;

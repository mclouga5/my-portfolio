'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WeatherAppPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      className="p-5 h-full w-full bg-gray-100/10 rounded-lg flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          variants={itemVariants}
          whileInView="visible"
        >
          Weather App
        </motion.h2>
        <motion.p className="mb-6" variants={itemVariants}>
          Check out my Weather App repository, powered by nextJS, React and TypeScript. This app fetches
          weather data from an external API and displays it beautifully.
        </motion.p>
        <div className="flex justify-center space-x-4">
          <motion.a
            href="https://github.com/mclouga5/nextjs_weather_app"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 hover:bg-amber-400 text-white font-bold p-2 rounded-lg transition duration-300"
          >
            View on GitHub
          </motion.a>
          <motion.a
            href="https://nextjs-weather-gu3wr108z-aoifes-projects-f9da3bfc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

export default WeatherAppPreview;

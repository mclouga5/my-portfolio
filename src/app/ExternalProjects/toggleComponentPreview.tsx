'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ToggleComponentPreview = () => {
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
          Toggle Answer Question Component
        </motion.h2>
        <motion.p className="mb-6" variants={itemVariants}>
          A base component that I'm in the process of making reusable for any quiz you like!
          Usable for questions with single or multiple correct answers, or with multiple parts to build up a correct answer, with a background that changes based on how correct the selected answer is.
          <br></br>
          <br></br>
          Responsive across devices and made using React, Typescript and Tailwind CSS.
        </motion.p>
        <div className="flex justify-center space-x-4">
          <motion.a
            href="https://github.com/mclouga5/react_toggle_quiz_project"
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
            href="https://mclouga5.github.io/react_toggle_quiz_project/"
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

export default ToggleComponentPreview;